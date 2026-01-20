import { useMemo } from 'react';

/**
 * Home Component
 * 
 * Landing page for klappy.dev
 * 
 * PRD v1.1 Requirements:
 * - Progressive disclosure UX
 * - Clear entry points ("Start here", "Go deeper")
 * - Visual calm
 * - No agent instructions in UI
 */

export default function Home({ manifest, resources, onNavigate }) {
  // Organize resources by tier
  const { tier0, tier1 } = useMemo(() => {
    const t0 = resources.filter(r => r.tier === 0);
    const t1 = resources.filter(r => r.tier === 1);
    return { tier0: t0, tier1: t1 };
  }, [resources]);

  // Find key resources
  const oddPublic = resources.find(r => r.uri === 'klappy://public/odd');
  const whyExists = resources.find(r => r.uri === 'klappy://about/why-this-exists');
  const projects = resources.find(r => r.uri === 'klappy://projects/index');
  const canonIndex = resources.find(r => r.uri === 'klappy://meta/canon-index');

  return (
    <div className="home">
      {/* Hero section */}
      <section className="hero">
        <h1 className="hero-title">klappy.dev</h1>
        <p className="hero-subtitle">
          Exploring outcome-driven development, canon-first architecture, 
          and what it means to build systems that explain themselves.
        </p>
      </section>

      {/* Start Here section */}
      <section className="home-section">
        <h2 className="section-title">Start Here</h2>
        <p className="section-description">
          New? These are the best entry points.
        </p>
        
        <div className="card-grid">
          {oddPublic && (
            <Card
              resource={oddPublic}
              onClick={() => onNavigate(oddPublic.uri)}
              description="What is Outcome-Driven Development? A brief orientation."
            />
          )}
          {whyExists && (
            <Card
              resource={whyExists}
              onClick={() => onNavigate(whyExists.uri)}
              description="The philosophy and motivation behind this project."
            />
          )}
          {projects && (
            <Card
              resource={projects}
              onClick={() => onNavigate(projects.uri)}
              description="Active projects exploring these ideas in practice."
            />
          )}
        </div>
      </section>

      {/* Go Deeper section */}
      <section className="home-section">
        <h2 className="section-title">Go Deeper</h2>
        <p className="section-description">
          Ready to explore the core ideas?
        </p>
        
        <div className="card-grid card-grid--compact">
          {tier1.slice(0, 6).map(resource => (
            <CompactCard
              key={resource.uri}
              resource={resource}
              onClick={() => onNavigate(resource.uri)}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="home-section home-stats">
        <div className="stat">
          <span className="stat-value">{resources.length}</span>
          <span className="stat-label">resources</span>
        </div>
        <div className="stat">
          <span className="stat-value">{tier0.length + tier1.length}</span>
          <span className="stat-label">core docs</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {manifest?.pack?.version || '0.0.0'}
          </span>
          <span className="stat-label">pack version</span>
        </div>
      </section>

      <style>{`
        .home {
          max-width: 900px;
          margin: 0 auto;
          padding: var(--space-8) var(--space-6);
        }

        /* Hero */
        .hero {
          text-align: center;
          padding: var(--space-16) 0 var(--space-12);
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-4);
          background: linear-gradient(135deg, var(--color-text) 0%, var(--color-text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: var(--text-lg);
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Sections */
        .home-section {
          margin-bottom: var(--space-12);
        }

        .section-title {
          font-size: var(--text-xl);
          font-weight: 600;
          margin-bottom: var(--space-2);
        }

        .section-description {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }

        /* Card grid */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-4);
        }

        .card-grid--compact {
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-3);
        }

        /* Stats */
        .home-stats {
          display: flex;
          justify-content: center;
          gap: var(--space-10);
          padding: var(--space-8) 0;
          border-top: 1px solid var(--color-border-subtle);
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: var(--text-2xl);
          font-weight: 600;
          color: var(--color-text);
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .home {
            padding: var(--space-6) var(--space-4);
          }

          .hero {
            padding: var(--space-10) 0 var(--space-8);
          }

          .home-stats {
            gap: var(--space-6);
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}

// Card component for featured resources
function Card({ resource, onClick, description }) {
  return (
    <button className="card" onClick={onClick}>
      <span className="card-tier" data-tier={resource.tier}>
        {resource.tier === 0 ? 'Start Here' : 'Core'}
      </span>
      <h3 className="card-title">{resource.title}</h3>
      <p className="card-description">
        {description || resource.summary || 'Explore this resource.'}
      </p>
      
      <style>{`
        .card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: var(--space-6);
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          text-align: left;
          transition: all var(--transition-fast);
        }

        .card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .card-tier {
          padding: var(--space-1) var(--space-2);
          margin-bottom: var(--space-3);
          font-size: var(--text-xs);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: var(--radius-sm);
          background: var(--color-bg-hover);
          color: var(--color-text-secondary);
        }

        .card-tier[data-tier="0"] {
          background: var(--color-accent-subtle);
          color: var(--color-accent);
        }

        .card-title {
          font-size: var(--text-lg);
          font-weight: 600;
          margin-bottom: var(--space-2);
          color: var(--color-text);
        }

        .card-description {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </button>
  );
}

// Compact card for secondary resources
function CompactCard({ resource, onClick }) {
  return (
    <button className="compact-card" onClick={onClick}>
      <h4 className="compact-card-title">{resource.title}</h4>
      {resource.tags && resource.tags.length > 0 && (
        <span className="compact-card-tag">{resource.tags[0]}</span>
      )}
      
      <style>{`
        .compact-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4);
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          text-align: left;
          transition: all var(--transition-fast);
        }

        .compact-card:hover {
          border-color: var(--color-accent);
          background: var(--color-bg-hover);
        }

        .compact-card-title {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text);
        }

        .compact-card-tag {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }
      `}</style>
    </button>
  );
}
