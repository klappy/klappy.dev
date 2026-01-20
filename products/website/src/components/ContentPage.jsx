import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

/**
 * ContentPage Component
 * 
 * Renders markdown content from canonical resources.
 * 
 * PRD v1.1 Requirements:
 * - Deep links to sections
 * - Anchor stability (unique heading IDs)
 * - Copy link affordance for headings
 */

// Configure marked for heading IDs
const renderer = new marked.Renderer();
const headingCounts = {};

renderer.heading = function(text, level) {
  // Generate stable anchor ID
  let slug = text
    .toLowerCase()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .trim();
  
  // Handle duplicate headings
  if (headingCounts[slug]) {
    headingCounts[slug]++;
    slug = `${slug}-${headingCounts[slug]}`;
  } else {
    headingCounts[slug] = 1;
  }
  
  return `
    <h${level} id="${slug}" class="content-heading">
      <a href="#${slug}" class="heading-anchor" aria-label="Link to ${text}">
        <span class="heading-anchor-icon">#</span>
      </a>
      ${text}
    </h${level}>
  `;
};

marked.setOptions({
  renderer,
  gfm: true,
  breaks: false,
});

export default function ContentPage({ resource, onNavigate }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!resource?.path) return;
    
    // Reset heading counts for each page
    Object.keys(headingCounts).forEach(k => delete headingCounts[k]);
    
    setLoading(true);
    setError(null);
    
    // Fetch content from the path
    const contentPath = `/content${resource.path}`;
    
    fetch(contentPath)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
        return res.text();
      })
      .then(md => {
        // Parse markdown to HTML
        const html = marked.parse(md);
        setContent(html);
        setLoading(false);
      })
      .catch(err => {
        console.error('Content load error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [resource?.path]);

  // Handle click on heading anchors to copy link
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('.heading-anchor');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        const section = href.slice(1);
        
        // Update URL
        const currentUrl = new URL(window.location);
        currentUrl.hash = section;
        window.history.pushState({}, '', currentUrl.toString());
        
        // Copy to clipboard
        navigator.clipboard.writeText(currentUrl.toString()).then(() => {
          // Show feedback
          const icon = anchor.querySelector('.heading-anchor-icon');
          const original = icon.textContent;
          icon.textContent = '✓';
          setTimeout(() => { icon.textContent = original; }, 1500);
        });
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('click', handleAnchorClick);
      return () => container.removeEventListener('click', handleAnchorClick);
    }
  }, [content]);

  // Handle internal links to navigate within the app
  useEffect(() => {
    const handleInternalLinks = (e) => {
      const link = e.target.closest('a[href^="klappy://"]');
      if (link) {
        e.preventDefault();
        const uri = link.getAttribute('href');
        onNavigate(uri);
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('click', handleInternalLinks);
      return () => container.removeEventListener('click', handleInternalLinks);
    }
  }, [content, onNavigate]);

  if (loading) {
    return (
      <div className="content-page content-page--loading">
        <div className="loading-spinner" />
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-page content-page--error">
        <h1>Unable to Load Content</h1>
        <p>{error}</p>
        <p>Resource: {resource.path}</p>
      </div>
    );
  }

  return (
    <article className="content-page">
      <header className="content-header">
        {resource.tier !== undefined && (
          <span className="content-tier" data-tier={resource.tier}>
            {resource.tier === 0 ? 'Start Here' : 
             resource.tier === 1 ? 'Core' : 'Deep Dive'}
          </span>
        )}
        <h1 className="content-title">{resource.title}</h1>
        {resource.tags && resource.tags.length > 0 && (
          <div className="content-tags">
            {resource.tags.slice(0, 5).map(tag => (
              <span key={tag} className="content-tag">{tag}</span>
            ))}
          </div>
        )}
      </header>
      
      <div 
        ref={contentRef}
        className="content-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <style>{`
        .content-page {
          max-width: var(--content-max-width);
          margin: 0 auto;
          padding: var(--space-8) var(--space-6);
        }

        .content-page--loading,
        .content-page--error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          text-align: center;
        }

        .content-page--error h1 {
          color: #dc2626;
        }

        .content-header {
          margin-bottom: var(--space-8);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--color-border);
        }

        .content-tier {
          display: inline-block;
          padding: var(--space-1) var(--space-3);
          margin-bottom: var(--space-3);
          font-size: var(--text-xs);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: var(--radius-sm);
          background: var(--color-bg-hover);
          color: var(--color-text-secondary);
        }

        .content-tier[data-tier="0"] {
          background: var(--color-accent-subtle);
          color: var(--color-accent);
        }

        .content-title {
          font-size: var(--text-3xl);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: var(--space-4);
        }

        .content-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .content-tag {
          padding: var(--space-1) var(--space-2);
          font-size: var(--text-xs);
          background: var(--color-bg-hover);
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
        }

        /* Content body styling */
        .content-body {
          line-height: 1.7;
        }

        .content-body h1,
        .content-body h2,
        .content-body h3,
        .content-body h4,
        .content-body h5,
        .content-body h6 {
          margin-top: var(--space-8);
          margin-bottom: var(--space-4);
          position: relative;
        }

        .content-body h1:first-child,
        .content-body h2:first-child {
          margin-top: 0;
        }

        .content-body .content-heading {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .heading-anchor {
          opacity: 0;
          color: var(--color-text-tertiary);
          text-decoration: none;
          transition: opacity var(--transition-fast);
          margin-left: -24px;
          width: 20px;
        }

        .content-heading:hover .heading-anchor,
        .heading-anchor:focus {
          opacity: 1;
        }

        .heading-anchor:hover {
          color: var(--color-accent);
        }

        .heading-anchor-icon {
          font-size: var(--text-sm);
          font-weight: 400;
        }

        .content-body p {
          margin-bottom: var(--space-4);
        }

        .content-body img {
          max-width: 100%;
          height: auto;
          border-radius: var(--radius-md);
          margin: var(--space-4) 0;
        }

        .content-body a {
          color: var(--color-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .content-body a:hover {
          color: var(--color-accent-hover);
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .content-page {
            padding: var(--space-6) var(--space-4);
          }

          .content-title {
            font-size: var(--text-2xl);
          }

          .heading-anchor {
            display: none;
          }
        }
      `}</style>
    </article>
  );
}
