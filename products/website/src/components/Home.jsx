/**
 * Home Page Component
 * 
 * Landing page with progressive disclosure CTAs.
 * Clear entry points: "Start Here" and "Go Deeper"
 */
export default function Home({ navigate, manifest }) {
  // Get tier 0 resources for featured content
  const featuredResources = manifest?.resources?.filter(r => 
    r.tier === 0 && r.audience === 'public'
  ) || [];

  return (
    <div className="home">
      <section className="home-hero">
        <h1 className="home-title">
          Outcomes-Driven Development
        </h1>
        <p className="home-subtitle">
          A methodology for building software that prioritizes real-world results 
          over artifacts. Evidence over explanation. Clarity over velocity.
        </p>
        <div className="home-cta">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/odd')}
          >
            Read the Manifesto
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/about/why-this-exists')}
          >
            Why This Exists
          </button>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <h3>Evidence Over Explanation</h3>
          <p>
            In an age of AI-generated content, fluent explanations are easy to produce 
            but easy to trust incorrectly. ODD emphasizes showing working systems over 
            describing them.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>Clarity Over Velocity</h3>
          <p>
            When generation becomes cheap, the limiting factor is no longer production 
            speed—it's clarity of intent, quality of verification, and the ability to 
            choose among outcomes.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>Restartability Over Polish</h3>
          <p>
            Treat code as ephemeral. The value isn't in the artifact but in the 
            learning captured and the ability to regenerate outcomes reliably from 
            clear intent.
          </p>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <h3>Start Here</h3>
          <ul style={{ marginTop: '1rem', listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="/odd" 
                onClick={(e) => { e.preventDefault(); navigate('/odd'); }}
                style={{ color: 'var(--color-accent)' }}
              >
                ODD Manifesto
              </a>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}> — The core philosophy</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="/about/why-this-exists" 
                onClick={(e) => { e.preventDefault(); navigate('/about/why-this-exists'); }}
                style={{ color: 'var(--color-accent)' }}
              >
                Why This Exists
              </a>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}> — The problem being solved</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="/projects" 
                onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
                style={{ color: 'var(--color-accent)' }}
              >
                Projects
              </a>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}> — ODD in practice</span>
            </li>
          </ul>
        </div>

        <div className="feature-card">
          <h3>About</h3>
          <ul style={{ marginTop: '1rem', listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="/about/bio" 
                onClick={(e) => { e.preventDefault(); navigate('/about/bio'); }}
                style={{ color: 'var(--color-accent)' }}
              >
                Bio
              </a>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}> — Who's behind this</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="/about/credibility" 
                onClick={(e) => { e.preventDefault(); navigate('/about/credibility'); }}
                style={{ color: 'var(--color-accent)' }}
              >
                Credibility
              </a>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}> — Track record</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="/about/faq" 
                onClick={(e) => { e.preventDefault(); navigate('/about/faq'); }}
                style={{ color: 'var(--color-accent)' }}
              >
                FAQ
              </a>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}> — Common questions</span>
            </li>
          </ul>
        </div>
      </section>

      <section style={{ 
        textAlign: 'center', 
        padding: 'var(--space-12) 0',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'var(--space-8)'
      }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          This is a record of thinking under uncertainty.
          <br />
          Not a framework. Not a demo. A working hypothesis.
        </p>
      </section>
    </div>
  );
}
