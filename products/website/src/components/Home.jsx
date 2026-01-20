import { useState } from 'react';
import MediaShelf from './MediaShelf';

/**
 * Home Page Component
 *
 * Implements progressive disclosure for tier 0 content.
 * Shows key entry points without overwhelming the user.
 */
export default function Home({ manifest, error }) {
  const [showMedia, setShowMedia] = useState(false);

  // Get tier 0 public resources
  const tier0Resources = manifest.resources.filter(r =>
    r.audience === 'public' && r.tier === 0
  );

  // Find home resource specifically
  const homeResource = manifest.resources.find(r => r.uri === 'klappy://public/home');

  const handleResourceClick = (resource) => {
    const route = resource.uri.replace('klappy://', '');
    window.location.hash = route;
  };

  if (error) {
    return (
      <div className="container" style={{ padding: 'var(--space-8) 0' }}>
        <div style={{ textAlign: 'center', color: 'var(--color-error)' }}>
          <h1 className="text-h1">Page Not Found</h1>
          <p className="text-body" style={{ marginBottom: 'var(--space-6)' }}>{error}</p>
          <a href="#/" className="btn" onClick={(e) => { e.preventDefault(); window.location.hash = '/'; }}>
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundColor: 'var(--color-bg-secondary)',
        padding: 'var(--space-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>
            Outcome-Driven Development
          </h1>
          <p className="text-lead" style={{
            maxWidth: '600px',
            margin: '0 auto var(--space-6)',
            color: 'var(--color-text-secondary)'
          }}>
            A methodology for building software through evidence, not assumptions.
            Explore progressively without getting overwhelmed.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#/odd/README.md" className="btn" onClick={(e) => {
              e.preventDefault();
              handleResourceClick(tier0Resources.find(r => r.uri === 'klappy://public/odd'));
            }}>
              Start Here: What is ODD?
            </a>
            <button
              className="btn"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)' }}
              onClick={() => setShowMedia(!showMedia)}
            >
              {showMedia ? 'Hide' : 'Watch'} Introduction
            </button>
          </div>
        </div>
      </section>

      {/* Media Section (Progressive Disclosure) */}
      {showMedia && homeResource?.assets && (
        <section style={{ padding: 'var(--space-8) 0', backgroundColor: 'var(--color-bg-primary)' }}>
          <div className="container">
            <MediaShelf assets={homeResource.assets} />
          </div>
        </section>
      )}

      {/* Key Entry Points */}
      <section className="entry-points" style={{ padding: 'var(--space-10) 0' }}>
        <div className="container">
          <h2 className="text-h2" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            Explore Progressively
          </h2>

          <div className="entry-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-10)'
          }}>
            {tier0Resources.map(resource => (
              <div key={resource.uri} className="card" style={{
                padding: 'var(--space-6)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onClick={() => handleResourceClick(resource)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <h3 className="text-h3" style={{ marginBottom: 'var(--space-3)' }}>
                  {resource.title}
                </h3>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  {resource.tags?.slice(0, 3).join(' • ')}
                </p>
              </div>
            ))}
          </div>

          {/* Call to deeper exploration */}
          <div style={{ textAlign: 'center' }}>
            <p className="text-body" style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
              Ready to go deeper? Explore the full canon or see active projects.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#/canon/index.md" className="link" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                Browse Canon →
              </a>
              <a href="#/projects/index.md" className="link" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                View Projects →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        padding: 'var(--space-6) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <p className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
            Built with evidence, not assumptions •
            <a href="#/about/why-this-exists.md" className="link" style={{ marginLeft: 'var(--space-1)' }}>
              Why this exists
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}