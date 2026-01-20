import { useState, useEffect } from 'react';
import { marked } from 'marked';

/**
 * Content Page Component
 * 
 * Renders markdown content from the manifest.
 * Handles deep links and progressive disclosure.
 */
export default function ContentPage({ resource, navigate }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load content when resource changes
  useEffect(() => {
    if (!resource?.path) {
      setError('No content path');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch the markdown content
    const contentPath = resource.path.startsWith('/content') 
      ? resource.path 
      : `/content${resource.path}`;

    fetch(contentPath)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load: ${r.status}`);
        return r.text();
      })
      .then(text => {
        // Remove frontmatter
        const cleaned = text.replace(/^---[\s\S]*?---\n*/, '');
        setContent(cleaned);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [resource]);

  // Handle link clicks within content
  const handleContentClick = (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href) return;

    // Handle internal links
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href.replace(/\.md$/, ''));
    }
    // External links open in new tab
    else if (href.startsWith('http')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  };

  // Render markdown to HTML
  const renderContent = () => {
    if (!content) return '';
    
    // Configure marked for safe rendering
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false,
    });

    // Transform internal links in the rendered HTML
    let html = marked.parse(content);
    
    // Fix markdown links that reference .md files
    html = html.replace(/href="([^"]*?)\.md"/g, 'href="$1"');
    html = html.replace(/href="\/canon\//g, 'href="/content/canon/');
    html = html.replace(/href="\/odd\//g, 'href="/content/odd/');
    
    return html;
  };

  // Get tier label
  const getTierLabel = () => {
    switch (resource?.tier) {
      case 0: return 'Core';
      case 1: return 'Extended';
      case 2: return 'Deep Dive';
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content">
        <div className="error">
          <h2>Unable to load content</h2>
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Go home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <header className="content-header">
        <h1>{resource.title}</h1>
        <div className="content-meta">
          {getTierLabel() && (
            <span className={`tier-badge tier-${resource.tier}`}>
              {getTierLabel()}
            </span>
          )}
          {resource.tags && resource.tags.length > 0 && (
            <span style={{ marginLeft: '0.5rem', color: 'var(--color-text-subtle)' }}>
              {resource.tags.slice(0, 3).join(' · ')}
            </span>
          )}
        </div>
      </header>
      
      <article 
        className="content-body"
        onClick={handleContentClick}
        dangerouslySetInnerHTML={{ __html: renderContent() }}
      />
    </div>
  );
}
