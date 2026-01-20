import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Home from './Home';
import ContentPage from './ContentPage';

/**
 * Main App Component
 *
 * Handles routing and renders the appropriate page based on URL hash.
 * Loads manifest on startup and manages global state.
 */
export default function App() {
  const [manifest, setManifest] = useState(null);
  const [currentRoute, setCurrentRoute] = useState('/');
  const [error, setError] = useState(null);

  // Load manifest on startup
  useEffect(() => {
    fetch('/content/manifest.json')
      .then(r => r.json())
      .then(setManifest)
      .catch(e => setError(e.message));
  }, []);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentRoute(hash);
    };

    handleHashChange(); // Set initial route
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Loading state
  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'var(--color-error)' }}>
        <h1 className="text-h1">Manifest Load Failed</h1>
        <p className="text-body">{error}</p>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div style={{ padding: '2rem' }}>
        <p className="text-body">Loading ODD content...</p>
      </div>
    );
  }

  // Route to component mapping
  const renderPage = () => {
    if (currentRoute === '/') {
      return <Home manifest={manifest} />;
    }

    // Find resource by URI or path
    const resource = manifest.resources.find(r =>
      r.uri === `klappy://${currentRoute}` ||
      r.path === currentRoute ||
      r.uri === `klappy://public${currentRoute}` ||
      r.uri === `klappy://canon${currentRoute}`
    );

    if (resource) {
      return <ContentPage resource={resource} manifest={manifest} />;
    }

    // 404 - show home with error
    return (
      <Home manifest={manifest} error={`Page not found: ${currentRoute}`} />
    );
  };

  return (
    <div className="app">
      <Navigation manifest={manifest} currentRoute={currentRoute} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}