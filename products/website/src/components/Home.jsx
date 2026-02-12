import { useMemo } from 'react';
import MediaShelf from './MediaShelf';

/**
 * Home Page Component
 * 
 * PRD Requirements:
 * - Clear entry points ("Start here", "Go deeper")
 * - Progressive disclosure UX
 * - Visual calm
 */
export default function Home({ manifest, resources, onNavigate }) {
  // Find the home resource for media assets
  const homeResource = useMemo(() => {
    return resources.find(r => r.uri === 'klappy://public/home') || null;
  }, [resources]);

  // Get featured content by tier
  const featured = useMemo(() => {
    // Tier 0: Entry points
    const tier0 = resources
      .filter(r => r.tier === 0 && r.exposure === 'nav')
      .sort((a, b) => a.title.localeCompare(b.title));

    // Tier 1: Core concepts
    const tier1 = resources
      .filter(r => r.tier === 1 && r.exposure === 'nav' && r.audience !== 'internal')
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 4);

    return { tier0, tier1 };
  }, [resources]);

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

      {/* Start Here Section */}
      <section className="section">
        <h2>Start Here</h2>
        <p className="section-intro">
          New to ODD? These are the best places to begin understanding the approach.
        </p>
        <div className="card-grid">
          {featured.tier0.slice(0, 3).map(resource => (
            <a 
              key={resource.uri}
              href={`#${resource.path}`}
              className="card"
              onClick={(e) => handleNavigate(e, resource.path)}
            >
              <h3>{resource.title}</h3>
              <p className="card-tags">
                {resource.tags?.slice(0, 3).join(' · ')}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Go Deeper Section */}
      <section className="section">
        <h2>Go Deeper</h2>
        <p className="section-intro">
          Ready to understand the foundations? Explore constraints, decision rules, and evidence policies.
        </p>
        <div className="card-grid">
          {featured.tier1.map(resource => (
            <a 
              key={resource.uri}
              href={`#${resource.path}`}
              className="card"
              onClick={(e) => handleNavigate(e, resource.path)}
            >
              <h3>{resource.title}</h3>
              <p className="card-tags">
                {resource.tags?.slice(0, 3).join(' · ')}
              </p>
            </a>
          ))}
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

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-4);
        }

        .card {
          display: block;
          padding: var(--space-5);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-decoration: none;
        }

        .card h3 {
          font-size: var(--font-size-lg);
          color: var(--color-text-primary);
          margin-bottom: var(--space-2);
        }

        .card-tags {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin: 0;
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
      `}</style>
    </div>
  );
}
