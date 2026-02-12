import { useMemo } from 'react';
import { isPublicFacing, getNavigableFolders, effectiveTier, isApocrypha, FOLDER_LABELS } from '../utils/filtering';

/**
 * Browse Component — Folder-Based Navigation
 *
 * Displays documents within a specific folder, grouped by tier:
 * - Tier 0-1 (Essential): Full cards with description visible
 * - Tier 2 (Supporting): Title-only cards that show tags
 * - Tier 3 (Reference): Compact list items
 */
export default function Browse({ resources, folderPath, onNavigate }) {
  const publicResources = useMemo(() => {
    return resources.filter(isPublicFacing);
  }, [resources]);

  const allFolders = useMemo(() => {
    return getNavigableFolders(resources);
  }, [resources]);

  // If no folder is specified, show top-level folder index
  const currentFolder = folderPath ? allFolders[folderPath] : null;

  const handleNavigate = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  // Folder index view (when no specific folder selected)
  if (!currentFolder) {
    const orderedFolders = Object.values(allFolders).sort((a, b) => {
      const order = Object.keys(FOLDER_LABELS);
      const ia = order.indexOf(a.key);
      const ib = order.indexOf(b.key);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    return (
      <div className="browse-page">
        <header className="browse-header">
          <h1>Browse Documents</h1>
          <p className="browse-intro">
            {publicResources.length} documents organized by topic.
          </p>
        </header>

        <div className="folder-index">
          {orderedFolders.map(group => {
            const tier1Count = group.docs.filter(d => effectiveTier(d) <= 1).length;
            const hasApocrypha = group.docs.some(isApocrypha);
            return (
              <a
                key={group.key}
                href={`#/browse${group.key}`}
                className={`folder-index-card ${hasApocrypha ? 'folder-index-card--apocrypha' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/browse${group.key}`);
                }}
              >
                <h2>{group.label}</h2>
                <p className="folder-index-meta">
                  {group.docs.length} document{group.docs.length !== 1 ? 's' : ''}
                  {tier1Count > 0 && <span className="folder-index-essential"> · {tier1Count} essential</span>}
                </p>
                {/* Show first 3 essential doc titles as preview */}
                <ul className="folder-preview">
                  {group.docs
                    .filter(d => effectiveTier(d) <= 1)
                    .slice(0, 3)
                    .map(d => (
                      <li key={d.uri}>{d.title}</li>
                    ))}
                </ul>
              </a>
            );
          })}
        </div>

        <style>{browseStyles}</style>
      </div>
    );
  }

  // Folder detail view
  const essential = currentFolder.docs.filter(d => effectiveTier(d) <= 1);
  const supporting = currentFolder.docs.filter(d => effectiveTier(d) === 2);
  const reference = currentFolder.docs.filter(d => effectiveTier(d) >= 3);

  return (
    <div className="browse-page">
      <header className="browse-header">
        <a
          href="#/browse"
          className="browse-back"
          onClick={(e) => handleNavigate(e, '/browse')}
        >
          All Topics
        </a>
        <h1>{currentFolder.label}</h1>
        <p className="browse-intro">
          {currentFolder.docs.length} document{currentFolder.docs.length !== 1 ? 's' : ''}
        </p>
      </header>

      {/* Tier 1: Essential — full cards with blockquote/tags visible */}
      {essential.length > 0 && (
        <section className="doc-section">
          <h2 className="doc-section-label">Essential</h2>
          <div className="doc-list-essential">
            {essential.map(resource => (
              <a
                key={resource.uri}
                href={`#${resource.path}`}
                className={`doc-card-essential ${isApocrypha(resource) ? 'doc-card--apocrypha' : ''}`}
                onClick={(e) => handleNavigate(e, resource.path)}
              >
                <h3>{resource.title}</h3>
                {resource.tags?.length > 0 && (
                  <p className="doc-card-tags">
                    {resource.tags.slice(0, 4).join(' · ')}
                  </p>
                )}
                {resource.stability && (
                  <span className="doc-card-badge">{resource.stability}</span>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Tier 2: Supporting — title-only cards */}
      {supporting.length > 0 && (
        <section className="doc-section">
          <h2 className="doc-section-label">Supporting</h2>
          <div className="doc-list-supporting">
            {supporting.map(resource => (
              <a
                key={resource.uri}
                href={`#${resource.path}`}
                className={`doc-card-supporting ${isApocrypha(resource) ? 'doc-card--apocrypha' : ''}`}
                onClick={(e) => handleNavigate(e, resource.path)}
              >
                <h3>{resource.title}</h3>
                {resource.tags?.length > 0 && (
                  <span className="doc-card-tags-inline">
                    {resource.tags.slice(0, 3).join(' · ')}
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Tier 3: Reference — compact list */}
      {reference.length > 0 && (
        <section className="doc-section">
          <h2 className="doc-section-label">Reference</h2>
          <ul className="doc-list-reference">
            {reference.map(resource => (
              <li key={resource.uri}>
                <a
                  href={`#${resource.path}`}
                  className={isApocrypha(resource) ? 'doc-link--apocrypha' : ''}
                  onClick={(e) => handleNavigate(e, resource.path)}
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <style>{browseStyles}</style>
    </div>
  );
}

const browseStyles = `
  .browse-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--space-6) var(--space-4) var(--space-12);
  }

  .browse-header {
    margin-bottom: var(--space-8);
  }

  .browse-header h1 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-3);
  }

  .browse-intro {
    color: var(--color-text-secondary);
    margin: 0;
  }

  .browse-back {
    display: inline-block;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-3);
  }

  .browse-back:hover {
    color: var(--color-accent);
  }

  /* Folder index */
  .folder-index {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-4);
  }

  .folder-index-card {
    display: block;
    padding: var(--space-5);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-primary);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .folder-index-card:hover {
    border-color: var(--color-accent);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    text-decoration: none;
  }

  .folder-index-card--apocrypha {
    border-color: #c4a882;
    background: #faf6f0;
  }

  .folder-index-card--apocrypha:hover {
    border-color: #8b7355;
  }

  .folder-index-card h2 {
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
    margin-bottom: var(--space-2);
  }

  .folder-index-meta {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0 0 var(--space-3);
  }

  .folder-index-essential {
    color: var(--color-accent);
    font-weight: var(--font-weight-medium);
  }

  .folder-preview {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .folder-preview li {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    padding: var(--space-1) 0;
    border-top: 1px solid var(--color-border-secondary);
  }

  /* Document sections */
  .doc-section {
    margin-bottom: var(--space-8);
  }

  .doc-section-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--color-border-secondary);
  }

  /* Essential docs — full cards */
  .doc-list-essential {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .doc-card-essential {
    display: block;
    padding: var(--space-5);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-primary);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .doc-card-essential:hover {
    border-color: var(--color-accent);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    text-decoration: none;
  }

  .doc-card-essential h3 {
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
    margin-bottom: var(--space-2);
  }

  .doc-card-tags {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0;
  }

  .doc-card-badge {
    display: inline-block;
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    padding: var(--space-1) var(--space-2);
    background: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
    border-radius: 4px;
    margin-top: var(--space-2);
  }

  /* Supporting docs — title-only */
  .doc-list-supporting {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-3);
  }

  .doc-card-supporting {
    display: block;
    padding: var(--space-4);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-secondary);
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .doc-card-supporting:hover {
    border-color: var(--color-accent);
    text-decoration: none;
  }

  .doc-card-supporting h3 {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin: 0;
  }

  .doc-card-tags-inline {
    display: block;
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin-top: var(--space-1);
  }

  /* Apocrypha styling */
  .doc-card--apocrypha {
    border-color: #c4a882;
    background: #faf6f0;
  }

  .doc-card--apocrypha:hover {
    border-color: #8b7355;
  }

  .doc-link--apocrypha {
    color: #8b7355;
  }

  /* Reference docs — compact list */
  .doc-list-reference {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .doc-list-reference li {
    border-bottom: 1px solid var(--color-border-secondary);
  }

  .doc-list-reference a {
    display: block;
    padding: var(--space-3) var(--space-2);
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    text-decoration: none;
    transition: background 0.1s ease;
  }

  .doc-list-reference a:hover {
    background: var(--color-bg-tertiary);
    text-decoration: none;
    color: var(--color-accent);
  }

  @media (max-width: 768px) {
    .browse-page {
      padding: var(--space-4) var(--space-4) var(--space-8);
    }

    .browse-header h1 {
      font-size: var(--font-size-2xl);
    }

    .folder-index {
      grid-template-columns: 1fr;
    }

    .doc-list-supporting {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-color-scheme: dark) {
    .doc-card--apocrypha,
    .folder-index-card--apocrypha {
      border-color: #6b5a42;
      background: #1f1b16;
    }

    .doc-card--apocrypha:hover,
    .folder-index-card--apocrypha:hover {
      border-color: #a08060;
    }

    .doc-link--apocrypha {
      color: #a08060;
    }
  }
`;
