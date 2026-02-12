import { useState, useEffect } from 'react';
import { marked } from 'marked';
import MediaShelf from './MediaShelf';

/**
 * Content Page Component
 * 
 * PRD Requirements:
 * - Render markdown content
 * - Deep links work (URL represents resource + section)
 * - Mobile usable
 */
export default function ContentPage({ resource }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resource?.path) return;

    setLoading(true);
    setError(null);

    // Fetch the markdown content
    fetch(`/content${resource.path}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load content: ${res.status}`);
        return res.text();
      })
      .then(md => {
        // Strip frontmatter if present
        const contentWithoutFrontmatter = md.replace(/^---[\s\S]*?---\n*/m, '');
        
        // Configure marked for safe rendering
        marked.setOptions({
          gfm: true,
          breaks: true,
        });

        // Parse markdown to HTML
        const html = marked.parse(contentWithoutFrontmatter);
        setContent(html);
        setLoading(false);

        // Scroll to top on content change
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error('Content load error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [resource?.path]);

  if (loading) {
    return (
      <div className="content-page">
        <div className="content-loading">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-page">
        <div className="content-error">
          <h1>Error Loading Content</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">
      <article className="content-article">
        {/* Metadata badge */}
        <div className="content-meta">
          {resource.tier !== undefined && (
            <span className="meta-badge">Tier {resource.tier}</span>
          )}
          {resource.stability && (
            <span className="meta-badge">{resource.stability}</span>
          )}
          {resource.audience && resource.audience !== 'public' && (
            <span className="meta-badge">{resource.audience}</span>
          )}
        </div>

        {/* Learning Layer Media (optional, opt-in) */}
        <MediaShelf assets={resource.assets} />

        {/* Rendered markdown content */}
        <div 
          className="content-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {resource.tags?.length > 0 && (
          <div className="content-tags">
            {resource.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </article>

      <style>{`
        .content-page {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-6) var(--space-4) var(--space-12);
        }

        .content-loading,
        .content-error {
          padding: var(--space-8);
          text-align: center;
          color: var(--color-text-secondary);
        }

        .content-error h1 {
          color: var(--color-error);
          margin-bottom: var(--space-4);
        }

        .content-meta {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-bottom: var(--space-4);
        }

        .meta-badge {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          padding: var(--space-1) var(--space-2);
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          border-radius: 4px;
        }

        .content-body {
          line-height: var(--line-height-relaxed);
        }

        .content-body h1 {
          font-size: var(--font-size-3xl);
          margin-top: 0;
          margin-bottom: var(--space-6);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border-primary);
        }

        .content-body h2 {
          font-size: var(--font-size-2xl);
          margin-top: var(--space-8);
          margin-bottom: var(--space-4);
        }

        .content-body h3 {
          font-size: var(--font-size-xl);
          margin-top: var(--space-6);
          margin-bottom: var(--space-3);
        }

        .content-body h4 {
          font-size: var(--font-size-lg);
          margin-top: var(--space-5);
          margin-bottom: var(--space-2);
        }

        .content-body p {
          margin-bottom: var(--space-4);
        }

        .content-body ul,
        .content-body ol {
          margin-bottom: var(--space-4);
          padding-left: var(--space-6);
        }

        .content-body li {
          margin-bottom: var(--space-2);
        }

        .content-body blockquote {
          margin: var(--space-4) 0;
          padding: var(--space-4);
          padding-left: var(--space-5);
          border-left: 4px solid var(--color-accent);
          background: var(--color-bg-tertiary);
          border-radius: 0 8px 8px 0;
        }

        .content-body blockquote p:last-child {
          margin-bottom: 0;
        }

        .content-body table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: var(--space-4);
          font-size: var(--font-size-sm);
        }

        .content-body th,
        .content-body td {
          text-align: left;
          padding: var(--space-3);
          border-bottom: 1px solid var(--color-border-primary);
        }

        .content-body th {
          font-weight: var(--font-weight-semibold);
          background: var(--color-bg-tertiary);
        }

        .content-body img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: var(--space-4) 0;
        }

        .content-body hr {
          border: none;
          height: 1px;
          background: var(--color-border-primary);
          margin: var(--space-8) 0;
        }

        .content-tags {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-top: var(--space-8);
          padding-top: var(--space-6);
          border-top: 1px solid var(--color-border-primary);
        }

        .tag {
          font-size: var(--font-size-xs);
          padding: var(--space-1) var(--space-2);
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .content-page {
            padding: var(--space-4) var(--space-4) var(--space-8);
          }

          .content-body h1 {
            font-size: var(--font-size-2xl);
          }

          .content-body h2 {
            font-size: var(--font-size-xl);
          }

          .content-body table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}
