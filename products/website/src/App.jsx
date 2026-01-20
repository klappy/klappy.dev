import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ContentPage from './components/ContentPage';

function App() {
  const [manifest, setManifest] = useState(null);
  const [currentResource, setCurrentResource] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load manifest on mount
  useEffect(() => {
    fetch('/content/manifest.json')
      .then(r => r.json())
      .then(data => {
        setManifest(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Handle URL state (deep linking)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resourceUri = params.get('r');
    const hash = window.location.hash.slice(1); // Remove #

    if (resourceUri && manifest) {
      const resource = manifest.resources.find(r => r.uri === resourceUri);
      if (resource) {
        setCurrentResource(resource);
        if (hash) {
          setCurrentSection(hash);
        }
      }
    }
  }, [manifest]);

  // Update URL when resource changes
  const handleResourceChange = (resource) => {
    setCurrentResource(resource);
    setCurrentSection(null);
    if (resource) {
      const url = new URL(window.location);
      url.searchParams.set('r', resource.uri);
      url.hash = '';
      window.history.pushState({}, '', url);
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  // Handle section navigation
  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
    if (currentResource) {
      const url = new URL(window.location);
      url.searchParams.set('r', currentResource.uri);
      url.hash = sectionId;
      window.history.pushState({}, '', url);
    }
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const resourceUri = params.get('r');
      const hash = window.location.hash.slice(1);

      if (resourceUri && manifest) {
        const resource = manifest.resources.find(r => r.uri === resourceUri);
        if (resource) {
          setCurrentResource(resource);
          setCurrentSection(hash || null);
        }
      } else {
        setCurrentResource(null);
        setCurrentSection(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [manifest]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Manifest not found</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Navigation
        manifest={manifest}
        currentResource={currentResource}
        onResourceSelect={handleResourceChange}
      />
      <main style={{ flex: 1, overflow: 'auto', padding: '1rem', minWidth: 0 }}>
        {currentResource ? (
          <ContentPage
            resource={currentResource}
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
          />
        ) : (
          <Home manifest={manifest} onResourceSelect={handleResourceChange} />
        )}
      </main>
    </div>
  );
}

export default App;
