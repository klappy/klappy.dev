import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

function ContentPage({ resource, currentSection, onSectionChange }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  // Load markdown content
  useEffect(() => {
    if (!resource) return;

    setLoading(true);
    setError(null);

    // Convert path to content URL
    const contentPath = resource.path.startsWith('/')
      ? `/content${resource.path}`
      : `/content/${resource.path}`;

    fetch(contentPath)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load: ${r.status}`);
        return r.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [resource]);

  // Scroll to section when currentSection changes
  useEffect(() => {
    if (currentSection && contentRef.current) {
      const element = document.getElementById(currentSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Brief highlight
        element.style.backgroundColor = '#fff9c4';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 2000);
      }
    }
  }, [currentSection]);

  // Generate heading anchors and add click handlers
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      // Generate stable ID
      const text = heading.textContent || '';
      const baseId = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      let id = baseId;
      let counter = 1;
      while (document.getElementById(id)) {
        id = `${baseId}-${counter}`;
        counter++;
      }

      heading.id = id;

      // Add copy link button
      const button = document.createElement('button');
      button.textContent = '🔗';
      button.style.cssText = `
        margin-left: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        font-size: 0.8em;
        vertical-align: middle;
      `;
      button.onclick = (e) => {
        e.stopPropagation();
        const url = new URL(window.location);
        url.searchParams.set('r', resource.uri);
        url.hash = id;
        navigator.clipboard.writeText(url.toString());
        button.textContent = '✓';
        setTimeout(() => {
          button.textContent = '🔗';
        }, 1000);
      };
      button.onmouseover = () => {
        button.style.opacity = '1';
      };
      button.onmouseout = () => {
        button.style.opacity = '0.5';
      };
      heading.appendChild(button);
    });
  }, [content, resource]);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h2>Error loading content</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Convert markdown to HTML
  const html = marked(content);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '600' }}>
          {resource.title}
        </h1>
        {resource.tags && resource.tags.length > 0 && (
          <div style={{ fontSize: '0.9rem', color: '#888' }}>
            {resource.tags.join(' • ')}
          </div>
        )}
      </div>

      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          lineHeight: '1.7',
          fontSize: '1rem',
        }}
        className="markdown-content"
      />

      <style>{`
        .markdown-content h1 {
          font-size: 2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          padding-top: 1rem;
          border-top: 1px solid #e0e0e0;
        }
        .markdown-content h1:first-child {
          border-top: none;
          padding-top: 0;
        }
        .markdown-content h2 {
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          padding-top: 0.75rem;
          border-top: 1px solid #f0f0f0;
        }
        .markdown-content h3 {
          font-size: 1.25rem;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .markdown-content p {
          margin-bottom: 1rem;
        }
        .markdown-content ul, .markdown-content ol {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
        .markdown-content li {
          margin-bottom: 0.5rem;
        }
        .markdown-content code {
          background: #f5f5f5;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
          font-family: 'Monaco', 'Courier New', monospace;
        }
        .markdown-content pre {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .markdown-content pre code {
          background: none;
          padding: 0;
        }
        .markdown-content blockquote {
          border-left: 3px solid #ddd;
          padding-left: 1rem;
          margin-left: 0;
          color: #666;
          font-style: italic;
        }
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        .markdown-content th,
        .markdown-content td {
          border: 1px solid #ddd;
          padding: 0.5rem;
          text-align: left;
        }
        .markdown-content th {
          background: #f5f5f5;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .markdown-content {
            font-size: 0.95rem;
          }
          .markdown-content h1 {
            font-size: 1.75rem;
          }
          .markdown-content h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

export default ContentPage;
