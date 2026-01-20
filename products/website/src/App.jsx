import { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import ContentPage from './components/ContentPage';
import Home from './components/Home';

/**
 * Main App Component
 * 
 * PRD v1.1 Requirements:
 * - Deep links work (URL represents resource + section)
 * - Progressive disclosure tiers (0/1/2)
 * - Mobile usable without horizontal scrolling
 * - First load shows ≤7 nav items
 * - No agent instructions in UI
 */

// Parse URL to extract resource and section
function parseUrl() {
  const params = new URLSearchParams(window.location.search);
  const resourceUri = params.get('r') || null;
  const section = window.location.hash.slice(1) || null;
  return { resourceUri, section };
}

// Build URL from resource and section
function buildUrl(resourceUri, section) {
  const base = window.location.pathname;
  if (!resourceUri) {
    return base;
  }
  const url = `${base}?r=${encodeURIComponent(resourceUri)}`;
  if (section) {
    return `${url}#${section}`;
  }
  return url;
}

export default function App() {
  const [manifest, setManifest] = useState(null);
  const [resources, setResources] = useState([]);
  const [currentUri, setCurrentUri] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  // Load manifest on mount
  useEffect(() => {
    fetch('/content/manifest.json')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load manifest: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setManifest(data);
        setResources(data.resources || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Manifest load error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Parse URL on mount and on popstate
  useEffect(() => {
    const handleUrlChange = () => {
      const { resourceUri, section } = parseUrl();
      setCurrentUri(resourceUri);
      setCurrentSection(section);
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Scroll to section when it changes
  useEffect(() => {
    if (currentSection) {
      // Small delay to allow content to render
      setTimeout(() => {
        const element = document.getElementById(currentSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Add highlight effect
          element.classList.add('highlight-section');
          setTimeout(() => element.classList.remove('highlight-section'), 2000);
        }
      }, 100);
    }
  }, [currentSection, currentUri]);

  // Navigate to a resource
  const navigateTo = useCallback((uri, section = null) => {
    const url = buildUrl(uri, section);
    window.history.pushState({}, '', url);
    setCurrentUri(uri);
    setCurrentSection(section);
    setNavOpen(false); // Close mobile nav
  }, []);

  // Navigate home
  const navigateHome = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname);
    setCurrentUri(null);
    setCurrentSection(null);
    setNavOpen(false);
  }, []);

  // Find current resource from URI
  const currentResource = currentUri 
    ? resources.find(r => r.uri === currentUri)
    : null;

  // Loading state
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app-error">
        <h1>Unable to Load Content</h1>
        <p>{error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Mobile header */}
      <header className="app-header">
        <button 
          className="nav-toggle"
          onClick={() => setNavOpen(!navOpen)}
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        >
          <span className="nav-toggle-icon" data-open={navOpen}>
            {navOpen ? '✕' : '☰'}
          </span>
        </button>
        <button className="app-logo" onClick={navigateHome}>
          klappy.dev
        </button>
      </header>

      {/* Navigation sidebar */}
      <Navigation
        resources={resources}
        currentUri={currentUri}
        onNavigate={navigateTo}
        onNavigateHome={navigateHome}
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
      />

      {/* Mobile nav overlay */}
      {navOpen && (
        <div 
          className="nav-overlay" 
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className="app-main">
        {!currentUri ? (
          <Home
            manifest={manifest}
            resources={resources}
            onNavigate={navigateTo}
          />
        ) : currentResource ? (
          <ContentPage
            resource={currentResource}
            onNavigate={navigateTo}
          />
        ) : (
          <div className="not-found">
            <h1>Page Not Found</h1>
            <p>The requested resource could not be found.</p>
            <button onClick={navigateHome} className="home-link">
              Return home
            </button>
          </div>
        )}
      </main>

      <style>{`
        .app {
          display: flex;
          min-height: 100vh;
        }

        .app-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background: var(--color-bg-elevated);
          border-bottom: 1px solid var(--color-border);
          z-index: 100;
          padding: 0 var(--space-4);
          align-items: center;
          gap: var(--space-3);
        }

        .nav-toggle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: var(--color-text);
          font-size: var(--text-xl);
        }

        .nav-toggle:hover {
          background: var(--color-bg-hover);
        }

        .app-logo {
          font-weight: 600;
          font-size: var(--text-lg);
          color: var(--color-text);
        }

        .app-main {
          flex: 1;
          margin-left: var(--nav-width);
          min-width: 0;
        }

        .nav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 90;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .app-header {
            display: flex;
          }

          .app-main {
            margin-left: 0;
            padding-top: var(--header-height);
          }

          .nav-overlay {
            display: block;
          }
        }

        /* Loading state */
        .app-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: var(--space-4);
          color: var(--color-text-secondary);
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Error state */
        .app-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: var(--space-8);
          text-align: center;
        }

        .app-error h1 {
          color: #dc2626;
          margin-bottom: var(--space-4);
        }

        /* Not found */
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          padding: var(--space-8);
          text-align: center;
        }

        .not-found h1 {
          margin-bottom: var(--space-4);
        }

        .not-found p {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }

        .home-link {
          padding: var(--space-3) var(--space-6);
          background: var(--color-accent);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: background var(--transition-fast);
        }

        .home-link:hover {
          background: var(--color-accent-hover);
        }

        /* Section highlight animation */
        .highlight-section {
          animation: highlight 2s ease-out;
        }

        @keyframes highlight {
          0% { background: var(--color-accent-subtle); }
          100% { background: transparent; }
        }
      `}</style>
    </div>
  );
}
