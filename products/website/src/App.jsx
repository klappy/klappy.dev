import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { ContentPage } from './components/ContentPage';
import './App.css';

export default function App() {
  const [manifest, setManifest] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [currentResourceUri, setCurrentResourceUri] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/content/manifest.json')
      .then(r => r.json())
      .then(data => {
        setManifest(data);
      })
      .catch(e => setError(e.message));
  }, []);

  const handleNavigate = (view, resourceUri = null) => {
    setCurrentView(view);
    setCurrentResourceUri(resourceUri);
    
    // Update URL for deep linking
    if (resourceUri) {
      const path = resourceUri.replace('klappy://', '');
      window.history.pushState({}, '', `/${path}`);
    } else {
      window.history.pushState({}, '', view === 'home' ? '/' : `/${view}`);
    }
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') {
        handleNavigate('home');
      } else {
        // Try to find resource by path
        const resourceUri = `klappy://${path.slice(1)}`;
        const resource = manifest?.resources.find(r => r.uri === resourceUri);
        if (resource) {
          handleNavigate('content', resourceUri);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [manifest]);

  if (error) {
    return (
      <div className="error-container">
        <h1>Unable to Load Content</h1>
        <p>{error}</p>
        <p>Please check that the manifest is available at <code>/content/manifest.json</code></p>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation 
        currentView={currentView} 
        onNavigate={handleNavigate}
        manifest={manifest}
      />
      
      <main className="main-content">
        {currentView === 'home' && (
          <Home manifest={manifest} onNavigate={handleNavigate} />
        )}
        
        {currentView === 'content' && currentResourceUri && (
          <ContentPage 
            resourceUri={currentResourceUri}
            manifest={manifest}
            onNavigate={handleNavigate}
          />
        )}
      </main>
    </div>
  );
}
