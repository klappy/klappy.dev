function Home({ manifest, onResourceSelect }) {
  // Get tier 0 resources for quick access
  const tier0 = manifest.resources.filter(
    r => r.tier === 0 && r.exposure === 'nav' && r.audience === 'public'
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '600' }}>
        klappy.dev
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        Outcomes-Driven Development
      </p>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '500' }}>
          Start Here
        </h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
          Welcome to klappy.dev. This site explains Outcomes-Driven Development (ODD) 
          through progressive disclosure—start with the essentials, explore deeper as you need.
        </p>

        {tier0.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tier0.map(resource => (
              <button
                key={resource.uri}
                onClick={() => onResourceSelect(resource)}
                style={{
                  padding: '1rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#999';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                  {resource.title}
                </h3>
                {resource.tags && resource.tags.length > 0 && (
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    {resource.tags.slice(0, 3).join(', ')}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          Use the navigation sidebar to explore more content. Tier 1 and Tier 2 items 
          are available through progressive disclosure.
        </p>
      </div>
    </div>
  );
}

export default Home;
