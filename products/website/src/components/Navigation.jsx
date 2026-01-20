import { useState } from 'react';

/**
 * Navigation Component
 *
 * Shows ≤7 navigation items as required by PRD.
 * Mobile responsive with hamburger menu.
 */
export default function Navigation({ manifest, currentRoute }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get public tier 0 and 1 resources for navigation
  const navResources = manifest.resources.filter(r =>
    r.audience === 'public' &&
    r.exposure === 'nav' &&
    r.tier <= 1
  ).slice(0, 7); // Limit to 7 items max

  const handleNavClick = (path) => {
    // Convert klappy:// URI to hash route
    let route = '/';
    if (path.startsWith('klappy://public/')) {
      route = path.replace('klappy://public', '');
    } else if (path.startsWith('klappy://')) {
      route = path.replace('klappy://', '');
    } else if (path.startsWith('/')) {
      route = path;
    }

    window.location.hash = route;
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo/Home Link */}
          <a
            href="#/"
            className="nav-link"
            style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-xl)' }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
          >
            ODD
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-list" style={{ display: 'flex' }}>
            {navResources.map(resource => {
              const isActive = currentRoute === resource.path ||
                              currentRoute === resource.uri.replace('klappy://', '') ||
                              currentRoute === resource.uri.replace('klappy://public', '');

              return (
                <li key={resource.uri}>
                  <a
                    href={`#${resource.uri.replace('klappy://', '')}`}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(resource.uri);
                    }}
                  >
                    {resource.title}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 'var(--space-2)'
            }}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-bg-primary)',
            borderBottom: '1px solid var(--color-border-primary)',
            padding: 'var(--space-4)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {navResources.map(resource => {
                const isActive = currentRoute === resource.path ||
                                currentRoute === resource.uri.replace('klappy://', '') ||
                                currentRoute === resource.uri.replace('klappy://public', '');

                return (
                  <li key={resource.uri} style={{ marginBottom: 'var(--space-2)' }}>
                    <a
                      href={`#${resource.uri.replace('klappy://', '')}`}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      style={{
                        display: 'block',
                        padding: 'var(--space-3)',
                        margin: '0 calc(-1 * var(--space-3))'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(resource.uri);
                      }}
                    >
                      {resource.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-list {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}