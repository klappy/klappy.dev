import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { MediaShelf } from './MediaShelf';
import './ContentPage.css';

export function ContentPage({ resourceUri, manifest, onNavigate }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resource = manifest?.resources.find(r => r.uri === resourceUri);

  useEffect(() => {
    if (resource) {
      setLoading(true);
      setError(null);
      
      fetch(`/content${resource.path}`)
        .then(r => {
          if (!r.ok) throw new Error(`Failed to load content: ${r.status}`);
          return r.text();
        })
        .then(md => {
          // Configure marked for better rendering
          marked.setOptions({
            breaks: true,
            gfm: true,
          });
          setContent(marked.parse(md));
          setLoading(false);
        })
        .catch(e => {
          setError(e.message);
          setLoading(false);
        });
    }
  }, [resource]);

  if (loading) {
    return (
      <div className="content-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-error">
        <h2>Unable to Load Content</h2>
        <p>{error}</p>
        <button onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="content-error">
        <h2>Content Not Found</h2>
        <p>The requested resource could not be found.</p>
        <button onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <article className="content-page">
      <header className="content-header">
        <div className="content-meta">
          {resource.tier !== undefined && (
            <span className="tier-badge">Tier {resource.tier}</span>
          )}
          {resource.audience && (
            <span className="audience-badge">{resource.audience}</span>
          )}
        </div>
        <h1>{resource.title}</h1>
      </header>

      <div 
        className="content-body markdown-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {resource.assets && Object.keys(resource.assets).length > 0 && (
        <aside className="content-media">
          <MediaShelf 
            assets={resource.assets}
            resourceTitle={resource.title}
          />
        </aside>
      )}

      {resource.tags && resource.tags.length > 0 && (
        <footer className="content-footer">
          <div className="content-tags">
            {resource.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
