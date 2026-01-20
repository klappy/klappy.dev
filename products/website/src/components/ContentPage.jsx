import { useState, useEffect } from 'react';
import MediaShelf from './MediaShelf';

/**
 * Content Page Component
 *
 * Displays individual content pages by loading markdown and rendering it.
 * Handles deep linking to sections within the content.
 */
export default function ContentPage({ resource, manifest }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(resource.path);
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [resource.path]);

  // Handle deep linking to sections
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('#')) {
      const sectionId = hash.split('#')[1];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [content]);

  // Simple markdown-like rendering (basic implementation)
  const renderContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: 'var(--space-4)',
              borderRadius: '4px',
              overflow: 'auto',
              fontFamily: 'var(--font-family-mono)',
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--line-height-normal)',
              margin: 'var(--space-4) 0'
            }}>
              <code>{codeBlockContent.trim()}</code>
            </pre>
          );
          inCodeBlock = false;
          codeBlockContent = '';
        } else {
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3);
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-h1" id={line.slice(2).toLowerCase().replace(/[^a-z0-9]+/g, '-')} style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}>{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-h2" id={line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-')} style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-h3" id={line.slice(4).toLowerCase().replace(/[^a-z0-9]+/g, '-')} style={{ marginTop: 'var(--space-5)', marginBottom: 'var(--space-2)' }}>{line.slice(4)}</h3>);
      }
      // Lists
      else if (line.startsWith('- ')) {
        elements.push(<li key={i} style={{ marginBottom: 'var(--space-1)' }}>{line.slice(2)}</li>);
      }
      // Empty lines (create paragraphs)
      else if (line.trim() === '') {
        // Skip empty lines, they'll be handled by content grouping
      }
      // Regular paragraphs
      else {
        elements.push(<p key={i} className="text-body" style={{ marginBottom: 'var(--space-3)', lineHeight: 'var(--line-height-relaxed)' }}>{line}</p>);
      }
    }

    return elements;
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: 'var(--space-8) 0' }}>
        <p className="text-body">Loading {resource.title}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: 'var(--space-8) 0' }}>
        <div style={{ color: 'var(--color-error)' }}>
          <h1 className="text-h1">Content Load Failed</h1>
          <p className="text-body">{error}</p>
          <a href="#/" className="btn" style={{ marginTop: 'var(--space-4)' }}>Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">
      <div className="container" style={{ padding: 'var(--space-8) 0' }}>
        {/* Breadcrumb navigation */}
        <nav style={{ marginBottom: 'var(--space-6)' }}>
          <a href="#/" className="link">Home</a>
          <span style={{ margin: '0 var(--space-2)', color: 'var(--color-text-secondary)' }}>›</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>{resource.title}</span>
        </nav>

        {/* Media assets (if available) */}
        {resource.assets && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <MediaShelf assets={resource.assets} />
          </div>
        )}

        {/* Content */}
        <article>
          <header style={{ marginBottom: 'var(--space-6)' }}>
            <h1 className="text-h1">{resource.title}</h1>
            {resource.tags && (
              <div style={{ marginTop: 'var(--space-3)' }}>
                {resource.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-secondary)',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--space-1)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      marginRight: 'var(--space-2)',
                      marginBottom: 'var(--space-2)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--letter-spacing-wide)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="content">
            {renderContent(content)}
          </div>
        </article>

        {/* Footer navigation */}
        <footer style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#/" className="link">← Back to Home</a>
            <a href="#/canon/index.md" className="link">Browse Canon →</a>
          </div>
        </footer>
      </div>
    </div>
  );
}