import { useState, useEffect } from 'react';

function Navigation({ manifest, currentResource, onResourceSelect }) {
  const [expandedTiers, setExpandedTiers] = useState({ 1: false, 2: false });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Filter resources by tier and exposure
  const tier0 = manifest.resources.filter(
    r => r.tier === 0 && r.exposure === 'nav' && r.audience === 'public'
  );
  const tier1 = manifest.resources.filter(
    r => r.tier === 1 && r.exposure === 'nav' && r.audience === 'public'
  );
  const tier2 = manifest.resources.filter(
    r => r.tier === 2 && r.exposure === 'nav' && r.audience === 'public'
  );

  // Count initial visible items (tier 0 + home)
  const initialVisibleCount = tier0.length + 1; // +1 for home

  const toggleTier = (tier) => {
    setExpandedTiers(prev => ({ ...prev, [tier]: !prev[tier] }));
  };

  const handleResourceClick = (resource) => {
    onResourceSelect(resource);
    setMobileOpen(false); // Close mobile menu on selection
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1001,
          padding: '0.5rem',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'none', // Hidden on desktop
        }}
        className="mobile-menu-button"
      >
        ☰
      </button>

      {/* Navigation sidebar */}
      <nav
        className={`navigation-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        style={{
          width: '280px',
          borderRight: '1px solid #e0e0e0',
          padding: '1.5rem',
          overflowY: 'auto',
          background: '#fafafa',
        }}
      >
        {/* Home link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => handleResourceClick(null)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: currentResource === null ? '600' : '400',
              color: currentResource === null ? '#000' : '#666',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              padding: '0.5rem 0',
            }}
          >
            Home
          </button>
        </div>

        {/* Tier 0 - Always visible */}
        {tier0.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            {tier0.map(resource => (
              <button
                key={resource.uri}
                onClick={() => handleResourceClick(resource)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: currentResource?.uri === resource.uri ? '600' : '400',
                  color: currentResource?.uri === resource.uri ? '#000' : '#666',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  padding: '0.5rem 0',
                  display: 'block',
                }}
              >
                {resource.title}
              </button>
            ))}
          </div>
        )}

        {/* Tier 1 - Progressive disclosure */}
        {tier1.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => toggleTier(1)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#888',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                padding: '0.5rem 0',
                marginBottom: '0.5rem',
              }}
            >
              {expandedTiers[1] ? '▼' : '▶'} Tier 1 ({tier1.length})
            </button>
            {expandedTiers[1] && (
              <div style={{ paddingLeft: '1rem' }}>
                {tier1.map(resource => (
                  <button
                    key={resource.uri}
                    onClick={() => handleResourceClick(resource)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.9rem',
                      fontWeight: currentResource?.uri === resource.uri ? '600' : '400',
                      color: currentResource?.uri === resource.uri ? '#000' : '#666',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      padding: '0.4rem 0',
                      display: 'block',
                    }}
                  >
                    {resource.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tier 2 - Progressive disclosure */}
        {tier2.length > 0 && (
          <div>
            <button
              onClick={() => toggleTier(2)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#888',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                padding: '0.5rem 0',
                marginBottom: '0.5rem',
              }}
            >
              {expandedTiers[2] ? '▼' : '▶'} Tier 2 ({tier2.length})
            </button>
            {expandedTiers[2] && (
              <div style={{ paddingLeft: '1rem' }}>
                {tier2.map(resource => (
                  <button
                    key={resource.uri}
                    onClick={() => handleResourceClick(resource)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: currentResource?.uri === resource.uri ? '600' : '400',
                      color: currentResource?.uri === resource.uri ? '#000' : '#666',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      padding: '0.4rem 0',
                      display: 'block',
                    }}
                  >
                    {resource.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block !important;
          }
          .navigation-sidebar {
            position: fixed !important;
            height: 100vh !important;
            transform: translateX(-100%) !important;
            z-index: 1000 !important;
          }
          .navigation-sidebar.mobile-open {
            transform: translateX(0) !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
          .navigation-sidebar {
            position: relative !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navigation;
