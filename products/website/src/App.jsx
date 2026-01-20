import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ContentPage from './components/ContentPage';

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [manifest, setManifest] = useState(null);

  useEffect(() => {
    fetch('/content/manifest.json')
      .then(res => res.json())
      .then(data => setManifest(data));

    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (!manifest) return <div>Loading...</div>;

  const renderContent = () => {
    if (currentPath === '/' || currentPath === '/home') {
      return <Home manifest={manifest} navigate={navigate} />;
    }

    const resource = manifest.resources.find(r => {
      // Simple path matching for now
      const slug = r.path.replace('.md', '').toLowerCase();
      return currentPath.toLowerCase() === slug || currentPath.toLowerCase() === slug.replace('/readme', '');
    });

    if (resource) {
      return <ContentPage resource={resource} navigate={navigate} />;
    }

    return <div>Page not found</div>;
  };

  return (
    <div className="app-container">
      <Navigation manifest={manifest} navigate={navigate} currentPath={currentPath} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
