import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ContentPage from './components/ContentPage';
import Home from './components/Home';

/**
 * Main App Component
 * 
 * Implements PRD requirements:
 * - Load /content/manifest.json
 * - Render home page with ≤7 nav items
 * - Render markdown content
 * - Mobile-usable
 * - Deep links work (URL represents resource)
 */
export default function App() {
  const [manifest, setManifest] = useState(null);
  const [resources, setResources] = useState([]);
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  const [error, setError] = useState(null);

  // Load manifest
  useEffect(() => {
    fetch('/content/manifest.json')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load manifest: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setManifest(data);
        setResources(data.resources || []);
      })
      .catch(err => {
        console.error('Manifest load error:', err);
        setError(err.message);
      });
  }, []);

  // Handle hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const newPath = window.location.hash.slice(1) || '/';
      setCurrentPath(newPath);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigate to a path
  const navigateTo = (path) => {
    window.location.hash = path;
  };

  // Error state
  if (error) {
    return (
      <div className="error-page">
        <h1>Error Loading Content</h1>
        <p>{error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  // Loading state
  if (!manifest) {
    return (
      <div className="loading-page">
        <p>Loading...</p>
      </div>
    );
  }

  // Find current resource
  const currentResource = resources.find(r => r.path === currentPath);

  return (
    <div className="app">
      <Navigation 
        resources={resources} 
        currentPath={currentPath}
        onNavigate={navigateTo}
      />
      
      <main className="main-content">
        {currentPath === '/' ? (
          <Home 
            manifest={manifest} 
            resources={resources}
            onNavigate={navigateTo}
          />
        ) : currentResource ? (
          <ContentPage resource={currentResource} />
        ) : (
          <div className="not-found">
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
            <a href="#/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }}>
              Return home
            </a>
          </div>
        )}
      </main>

      <style>{`
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
        }

        .error-page,
        .loading-page,
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          padding: var(--space-8);
          text-align: center;
        }

        .error-page h1 {
          color: var(--color-error);
        }

        .not-found h1 {
          margin-bottom: var(--space-4);
        }

        .not-found p {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }
      `}</style>
    </div>
  );
}
