import { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ContentPage from './components/ContentPage';

/**
 * klappy.dev Website
 * 
 * Progressive disclosure website for ODD (Outcomes-Driven Development).
 * 
 * Requirements (from PRD):
 * - First load: ≤7 nav items
 * - Mobile usable without horizontal scroll
 * - Canon discoverable without file paths
 * - No agent/CLI language exposed
 * - Deep links work
 */
export default function App() {
  const [manifest, setManifest] = useState(null);
  const [error, setError] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [navOpen, setNavOpen] = useState(false);
  const [expandedTiers, setExpandedTiers] = useState({ 0: true, 1: false, 2: false });

  // Load manifest on mount
  useEffect(() => {
    fetch('/content/manifest.json')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load content');
        return r.json();
      })
      .then(setManifest)
      .catch(e => setError(e.message));
  }, []);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setNavOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate to a path
  const navigate = useCallback((path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, []);

  // Get resource by URI or path
  const getResource = useCallback((pathOrUri) => {
    if (!manifest?.resources) return null;
    return manifest.resources.find(r => 
      r.path === pathOrUri || 
      r.uri === pathOrUri ||
      r.path === `/content${pathOrUri}` ||
      pathToUri(pathOrUri) === r.uri
    );
  }, [manifest]);

  // Convert URL path to resource path
  const urlToResourcePath = useCallback((urlPath) => {
    if (urlPath === '/') return null; // Home
    // Remove leading slash and add /content prefix
    return urlPath;
  }, []);

  // Get resources for navigation (filtered by tier and audience)
  const getNavResources = useCallback(() => {
    if (!manifest?.resources) return [];
    
    return manifest.resources.filter(r => {
      // Only show public-facing content
      if (r.audience !== 'public') return false;
      // Only show navigable content
      if (r.exposure === 'hidden' || r.exposure === 'internal') return false;
      return true;
    });
  }, [manifest]);

  // Toggle tier expansion
  const toggleTier = useCallback((tier) => {
    setExpandedTiers(prev => ({ ...prev, [tier]: !prev[tier] }));
  }, []);

  if (error) {
    return (
      <div className="app-layout">
        <main className="main">
          <div className="content">
            <div className="error">
              <h2>Unable to load content</h2>
              <p>{error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="app-layout">
        <main className="main">
          <div className="content">
            <div className="loading">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  // Determine what to render based on path
  const isHome = currentPath === '/';
  const resourcePath = urlToResourcePath(currentPath);
  const currentResource = resourcePath ? getResource(resourcePath) : null;

  return (
    <div className="app-layout">
      <button 
        className="nav-toggle" 
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation"
      >
        {navOpen ? '✕ Close' : '☰ Menu'}
      </button>
      
      <Navigation
        resources={getNavResources()}
        currentPath={currentPath}
        navigate={navigate}
        isOpen={navOpen}
        expandedTiers={expandedTiers}
        toggleTier={toggleTier}
      />
      
      <main className="main">
        {isHome ? (
          <Home navigate={navigate} manifest={manifest} />
        ) : currentResource ? (
          <ContentPage resource={currentResource} navigate={navigate} />
        ) : (
          <div className="content">
            <div className="error">
              <h2>Page not found</h2>
              <p>The page you're looking for doesn't exist.</p>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Go home
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper to convert path to URI format
function pathToUri(path) {
  // /odd/README.md -> klappy://public/odd
  // /about/why-this-exists.md -> klappy://about/why-this-exists
  if (!path) return null;
  
  const clean = path
    .replace(/^\/content/, '')
    .replace(/^\//, '')
    .replace(/\.md$/, '')
    .replace(/\/README$/, '')
    .replace(/\/index$/, '');
  
  // Map paths to URIs
  if (clean.startsWith('odd/')) return `klappy://public/${clean.replace(/^odd\//, 'odd')}`;
  if (clean.startsWith('about/')) return `klappy://about/${clean.replace(/^about\//, '')}`;
  if (clean.startsWith('projects/')) return `klappy://projects/${clean.replace(/^projects\//, '')}`;
  if (clean.startsWith('canon/')) return `klappy://canon/${clean.replace(/^canon\//, '')}`;
  
  return `klappy://${clean}`;
}
