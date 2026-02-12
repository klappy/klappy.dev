import { useState, useMemo } from 'react';

/**
 * Navigation Component
 * 
 * PRD Requirements:
 * - First load shows ≤7 navigational items (Tier 0/1 only)
 * - Progressive disclosure: deeper items revealed on demand
 * - Mobile usable without horizontal scrolling
 * - Canon discoverable without file paths exposed
 */
export default function Navigation({ resources, currentPath, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(new Set());

  // Get primary navigation items (Tier 0 and 1 with nav exposure, max 7)
  const primaryNavItems = useMemo(() => {
    const navItems = resources
      .filter(r => 
        r.exposure === 'nav' && 
        (r.tier === 0 || r.tier === 1) &&
        r.audience !== 'internal'
      )
      .sort((a, b) => {
        // Sort by tier first, then alphabetically
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.title.localeCompare(b.title);
      });

    // Group by category and take top 7
    const categories = [
      { key: 'about', label: 'About', match: r => r.path.includes('/about/') },
      { key: 'odd', label: 'ODD', match: r => r.path.includes('/odd/') || r.uri?.includes('odd') },
      { key: 'projects', label: 'Projects', match: r => r.path.includes('/projects/') },
      { key: 'canon', label: 'Canon', match: r => r.path.includes('/canon/') && !r.path.includes('/odd/') },
    ];

    // Create nav structure: Home + top categories
    const nav = [
      { key: 'home', label: 'Home', path: '/', isHome: true },
    ];

    // Add ODD as primary entry (Tier 0)
    const oddEntry = navItems.find(r => r.uri === 'klappy://public/odd');
    if (oddEntry) {
      nav.push({ key: 'odd', label: 'What is ODD?', path: oddEntry.path });
    }

    // Add Why This Exists (Tier 0)
    const whyEntry = navItems.find(r => r.uri === 'klappy://about/why-this-exists');
    if (whyEntry) {
      nav.push({ key: 'why', label: 'Why This Exists', path: whyEntry.path });
    }

    // Add Projects (Tier 0)
    const projectsEntry = navItems.find(r => r.uri === 'klappy://projects/index');
    if (projectsEntry) {
      nav.push({ key: 'projects', label: 'Projects', path: projectsEntry.path });
    }

    // Add Constraints (Tier 1 - important for understanding)
    const constraintsEntry = navItems.find(r => r.uri === 'klappy://canon/constraints');
    if (constraintsEntry) {
      nav.push({ key: 'constraints', label: 'Constraints', path: constraintsEntry.path });
    }

    // Add Bio (Tier 1 - credibility)
    const bioEntry = navItems.find(r => r.uri === 'klappy://about/bio');
    if (bioEntry) {
      nav.push({ key: 'bio', label: 'About Me', path: bioEntry.path });
    }

    // Add FAQ (Tier 2 but useful)
    const faqEntry = resources.find(r => r.uri === 'klappy://about/faq');
    if (faqEntry && nav.length < 7) {
      nav.push({ key: 'faq', label: 'FAQ', path: faqEntry.path });
    }

    return nav.slice(0, 7); // Enforce max 7 items
  }, [resources]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <a 
          href="#/" 
          className="site-logo"
          onClick={(e) => handleNavClick(e, '/')}
        >
          klappy.dev
        </a>

        {/* Mobile menu button */}
        <button 
          className="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-icon">{isMenuOpen ? '✕' : '☰'}</span>
        </button>

        {/* Navigation */}
        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="nav-list">
            {primaryNavItems.map(item => (
              <li key={item.key} className="nav-item">
                <a
                  href={`#${item.path}`}
                  className={`nav-link ${currentPath === item.path ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.path)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border-primary);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-4);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
        }

        .site-logo {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-primary);
          text-decoration: none;
          letter-spacing: var(--letter-spacing-tight);
        }

        .site-logo:hover {
          color: var(--color-accent);
          text-decoration: none;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: var(--font-size-xl);
          cursor: pointer;
          padding: var(--space-2);
          color: var(--color-text-primary);
        }

        .main-nav {
          display: flex;
        }

        .nav-list {
          display: flex;
          list-style: none;
          gap: var(--space-1);
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: block;
          padding: var(--space-2) var(--space-3);
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-tertiary);
          text-decoration: none;
        }

        .nav-link.is-active {
          color: var(--color-accent);
          background: var(--color-bg-tertiary);
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .main-nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-bg-secondary);
            border-bottom: 1px solid var(--color-border-primary);
            display: none;
            padding: var(--space-4);
          }

          .main-nav.is-open {
            display: block;
          }

          .nav-list {
            flex-direction: column;
            gap: var(--space-1);
          }

          .nav-link {
            padding: var(--space-3) var(--space-4);
          }
        }
      `}</style>
    </header>
  );
}
