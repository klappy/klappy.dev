import { useMemo } from 'react';
import MediaShelf from './MediaShelf';
import { HUMAN_START_HERE, isPublicFacing, getNavigableFolders, effectiveTier, isApocrypha } from '../utils/filtering';

/**
 * Home Page Component
 *
 * Curated landing page with:
 * - 5 hardcoded human start-here documents
 * - Folder-based "notebooks on the desk" navigation
 * - Tier-based progressive disclosure
 */
export default function Home({ manifest, resources, onNavigate }) {
  const homeResource = useMemo(() => {
    return resources.find(r => r.uri === 'klappy://public/home') || null;
  }, [resources]);

  // Resolve start-here paths to actual resources
  const startHereDocs = useMemo(() => {
    return HUMAN_START_HERE
      .map(entry => {
        const resource = resources.find(r => r.path === entry.path);
        if (!resource) return null;
        return { ...entry, resource };
      })
      .filter(Boolean);
  }, [resources]);

  // Build folder groups for browsing
  const folderGroups = useMemo(() => {
    return getNavigableFolders(resources);
  }, [resources]);

  // Order folders for display — core ODD/canon first
  const orderedFolders = useMemo(() => {
    const order = [
      '/odd',
      '/canon/values',
      '/canon/constraints',
      '/canon/methods',
      '/canon/principles',
      '/canon/definitions',
      '/canon/defaults',
      '/canon/diagnostics',
      '/canon/decisions',
      '/canon/resonance',
      '/canon/apocrypha',
      '/canon/meta',
      '/odd/appendices',
      '/odd/getting-started',
      '/odd/decisions',
      '/about',
      '/projects',
    ];
    const groups = Object.values(folderGroups);
    groups.sort((a, b) => {
      const ia = order.indexOf(a.key);
      const ib = order.indexOf(b.key);
      const sa = ia === -1 ? 999 : ia;
      const sb = ib === -1 ? 999 : ib;
      return sa - sb;
    });
    return groups;
  }, [folderGroups]);

  const handleNavigate = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Outcome-Driven Development</h1>
        <p className="hero-subtitle">
          A methodology for building with AI agents through evidence, constraints, and progressive disclosure.
        </p>
        <div className="hero-actions">
          <a
            href="#/odd/README.md"
            className="button button-primary"
            onClick={(e) => handleNavigate(e, '/odd/README.md')}
          >
            What is ODD?
          </a>
          <a
            href="#/about/why-this-exists.md"
            className="button button-secondary"
            onClick={(e) => handleNavigate(e, '/about/why-this-exists.md')}
          >
            Why This Exists
          </a>
        </div>
        {homeResource?.assets?.hero_image && (
          <div className="hero-media">
            <img
              src={homeResource.assets.hero_image}
              alt="ODD hero diagram"
              className="hero-image"
            />
          </div>
        )}
      </section>

      {/* Orientation Layer Media (optional, opt-in) */}
      {homeResource?.assets && (
        <MediaShelf
          title="Orientation Layer"
          subtitle="Optional media to orient quickly. You can ignore this and still navigate successfully."
          assets={{
            orientation_map: homeResource.assets.orientation_map,
            explainer_video: homeResource.assets.explainer_video,
          }}
        />
      )}

      {/* Start Here — Curated Human Entry Points */}
      <section className="section">
        <h2>Start Here</h2>
        <p className="section-intro">
          New to ODD? These five documents are the recommended reading order.
        </p>
        <div className="start-here-list">
          {startHereDocs.map((entry, i) => (
            <a
              key={entry.path}
              href={`#${entry.path}`}
              className="start-here-card"
              onClick={(e) => handleNavigate(e, entry.path)}
            >
              <span className="start-here-number">{i + 1}</span>
              <div className="start-here-content">
                <h3>{entry.label}</h3>
                <p>{entry.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Browse by Folder — Notebooks on the Desk */}
      <section className="section">
        <h2>Browse</h2>
        <p className="section-intro">
          Explore documents by topic. Each folder contains related documents sorted by importance.
        </p>
        <div className="folder-grid">
          {orderedFolders.map(group => {
            const tier1Count = group.docs.filter(d => effectiveTier(d) <= 1).length;
            const hasApocrypha = group.docs.some(isApocrypha);
            return (
              <a
                key={group.key}
                href={`#/browse${group.key}`}
                className={`folder-card ${hasApocrypha ? 'folder-card--apocrypha' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/browse${group.key}`);
                }}
              >
                <h3>{group.label}</h3>
                <p className="folder-meta">
                  {group.docs.length} document{group.docs.length !== 1 ? 's' : ''}
                  {tier1Count > 0 && <span className="folder-essential"> · {tier1Count} essential</span>}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="section section-muted">
        <h2>About klappy.dev</h2>
        <p>
          This is the public face of an evolving experiment in human-AI collaboration.
          Built with the same methodology it describes.
        </p>
        <p className="version-info">
          Canon v{manifest?.pack?.version || '0.0.0'} · Last updated {manifest?.pack?.updated_at || 'unknown'}
        </p>
      </section>

      <style>{`
        .home {
          min-height: 100%;
        }

        .hero {
          text-align: center;
          padding: var(--space-12) var(--space-4);
          background: linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
        }

        .hero h1 {
          font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-4xl));
          margin-bottom: var(--space-4);
          letter-spacing: var(--letter-spacing-tight);
        }

        .hero-subtitle {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto var(--space-6);
          line-height: var(--line-height-relaxed);
        }

        .hero-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-media {
          margin: var(--space-6) auto 0;
          max-width: 980px;
          padding: 0 var(--space-4);
        }

        .hero-image {
          width: 100%;
          height: auto;
          border-radius: 14px;
          border: 1px solid var(--color-border-primary);
          background: var(--color-bg-primary);
        }

        .button {
          display: inline-block;
          padding: var(--space-3) var(--space-5);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .button-primary {
          background: var(--color-accent);
          color: var(--color-text-inverse);
        }

        .button-primary:hover {
          background: var(--color-accent-hover);
          color: var(--color-text-inverse);
          text-decoration: none;
        }

        .button-secondary {
          background: var(--color-bg-tertiary);
          color: var(--color-text-primary);
        }

        .button-secondary:hover {
          background: var(--color-border-primary);
          color: var(--color-text-primary);
          text-decoration: none;
        }

        .section {
          max-width: 1000px;
          margin: 0 auto;
          padding: var(--space-10) var(--space-4);
        }

        .section h2 {
          font-size: var(--font-size-2xl);
          margin-bottom: var(--space-3);
        }

        .section-intro {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
          max-width: 600px;
        }

        .section-muted {
          background: var(--color-bg-secondary);
          max-width: none;
        }

        .section-muted > * {
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Start Here — numbered reading list */
        .start-here-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .start-here-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-5);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .start-here-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-decoration: none;
        }

        .start-here-number {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          border-radius: 50%;
        }

        .start-here-content h3 {
          font-size: var(--font-size-lg);
          color: var(--color-text-primary);
          margin-bottom: var(--space-1);
        }

        .start-here-content p {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin: 0;
          line-height: var(--line-height-normal);
        }

        /* Folder Grid — notebooks on the desk */
        .folder-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-4);
        }

        .folder-card {
          display: block;
          padding: var(--space-5);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .folder-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-decoration: none;
        }

        .folder-card--apocrypha {
          border-color: var(--color-apocrypha-border, #c4a882);
          background: var(--color-apocrypha-bg, #faf6f0);
        }

        .folder-card--apocrypha:hover {
          border-color: var(--color-apocrypha-accent, #8b7355);
        }

        .folder-card h3 {
          font-size: var(--font-size-base);
          color: var(--color-text-primary);
          margin-bottom: var(--space-2);
        }

        .folder-meta {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin: 0;
        }

        .folder-essential {
          color: var(--color-accent);
          font-weight: var(--font-weight-medium);
        }

        .version-info {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-top: var(--space-4);
        }

        @media (max-width: 768px) {
          .hero {
            padding: var(--space-8) var(--space-4);
          }

          .section {
            padding: var(--space-8) var(--space-4);
          }
        }

        @media (prefers-color-scheme: dark) {
          .folder-card--apocrypha {
            border-color: var(--color-apocrypha-border-dark, #6b5a42);
            background: var(--color-apocrypha-bg-dark, #1f1b16);
          }

          .folder-card--apocrypha:hover {
            border-color: var(--color-apocrypha-accent-dark, #a08060);
          }
        }
      `}</style>
    </div>
  );
}
