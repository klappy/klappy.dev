import { useState, useMemo } from 'react';

/**
 * Navigation Component
 * 
 * PRD v1.1 Requirements:
 * - First load shows ≤7 nav items
 * - Progressive disclosure tiers (0/1/2)
 * - Tier 0: immediate orientation (always visible)
 * - Tier 1: core canon (in expandable section)
 * - Tier 2: deep content (hidden until explicitly expanded)
 */

// Group resources by tier and category
function organizeResources(resources) {
  const tier0 = resources.filter(r => r.tier === 0);
  const tier1 = resources.filter(r => r.tier === 1);
  const tier2 = resources.filter(r => r.tier === 2);
  
  // Group tier 2 by first tag or path prefix
  const tier2Groups = {};
  tier2.forEach(r => {
    // Use path prefix for grouping
    const pathParts = r.path.split('/').filter(Boolean);
    const group = pathParts[0] || 'other';
    if (!tier2Groups[group]) {
      tier2Groups[group] = [];
    }
    tier2Groups[group].push(r);
  });

  return { tier0, tier1, tier2, tier2Groups };
}

// Get display name for group
function getGroupName(key) {
  const names = {
    'canon': 'Canon',
    'projects': 'Projects',
    'about': 'About',
    'odd': 'ODD',
    'other': 'Other'
  };
  return names[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

export default function Navigation({ 
  resources, 
  currentUri, 
  onNavigate, 
  onNavigateHome,
  isOpen,
  onClose 
}) {
  const [tier1Expanded, setTier1Expanded] = useState(false);
  const [tier2Expanded, setTier2Expanded] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  const { tier0, tier1, tier2Groups } = useMemo(
    () => organizeResources(resources),
    [resources]
  );

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Count visible items for ≤7 requirement
  // tier0 + "Core Canon" button + "More" button = up to 5 items
  const visibleOnLoad = tier0.length + 2;

  return (
    <nav className={`nav ${isOpen ? 'nav--open' : ''}`}>
      <div className="nav-inner">
        {/* Logo - desktop only */}
        <div className="nav-header">
          <button className="nav-logo" onClick={onNavigateHome}>
            <span className="nav-logo-text">klappy.dev</span>
          </button>
        </div>

        {/* Tier 0: Immediate orientation - always visible */}
        <div className="nav-section">
          <div className="nav-items">
            {tier0.map(resource => (
              <NavItem
                key={resource.uri}
                resource={resource}
                isActive={currentUri === resource.uri}
                onClick={() => onNavigate(resource.uri)}
              />
            ))}
          </div>
        </div>

        {/* Tier 1: Core canon - expandable */}
        <div className="nav-section">
          <button 
            className="nav-section-toggle"
            onClick={() => setTier1Expanded(!tier1Expanded)}
            aria-expanded={tier1Expanded}
          >
            <span className="nav-section-toggle-icon">
              {tier1Expanded ? '−' : '+'}
            </span>
            <span>Core Canon</span>
            <span className="nav-section-count">{tier1.length}</span>
          </button>
          
          {tier1Expanded && (
            <div className="nav-items nav-items--nested">
              {tier1.map(resource => (
                <NavItem
                  key={resource.uri}
                  resource={resource}
                  isActive={currentUri === resource.uri}
                  onClick={() => onNavigate(resource.uri)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tier 2: Deep content - hidden by default */}
        <div className="nav-section">
          <button 
            className="nav-section-toggle"
            onClick={() => setTier2Expanded(!tier2Expanded)}
            aria-expanded={tier2Expanded}
          >
            <span className="nav-section-toggle-icon">
              {tier2Expanded ? '−' : '+'}
            </span>
            <span>Explore More</span>
            <span className="nav-section-count">
              {Object.values(tier2Groups).flat().length}
            </span>
          </button>
          
          {tier2Expanded && (
            <div className="nav-groups">
              {Object.entries(tier2Groups)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([group, items]) => (
                  <div key={group} className="nav-group">
                    <button
                      className="nav-group-toggle"
                      onClick={() => toggleGroup(group)}
                      aria-expanded={expandedGroups[group]}
                    >
                      <span className="nav-group-toggle-icon">
                        {expandedGroups[group] ? '▾' : '▸'}
                      </span>
                      <span>{getGroupName(group)}</span>
                      <span className="nav-group-count">{items.length}</span>
                    </button>
                    
                    {expandedGroups[group] && (
                      <div className="nav-items nav-items--nested">
                        {items
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map(resource => (
                            <NavItem
                              key={resource.uri}
                              resource={resource}
                              isActive={currentUri === resource.uri}
                              onClick={() => onNavigate(resource.uri)}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="nav-footer">
          <span className="nav-footer-text">
            {resources.length} resources
          </span>
        </div>
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--nav-width);
          height: 100vh;
          background: var(--color-bg-elevated);
          border-right: 1px solid var(--color-border);
          z-index: 95;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .nav-inner {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
        }

        .nav-header {
          margin-bottom: var(--space-6);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .nav-logo-text {
          font-size: var(--text-xl);
          font-weight: 600;
          color: var(--color-text);
        }

        .nav-section {
          margin-bottom: var(--space-4);
        }

        .nav-section-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-3);
          color: var(--color-text);
          font-weight: 500;
          font-size: var(--text-sm);
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
        }

        .nav-section-toggle:hover {
          background: var(--color-bg-hover);
        }

        .nav-section-toggle-icon {
          width: 16px;
          text-align: center;
          color: var(--color-text-secondary);
          font-size: var(--text-base);
        }

        .nav-section-count {
          margin-left: auto;
          color: var(--color-text-tertiary);
          font-size: var(--text-xs);
          font-weight: 400;
        }

        .nav-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .nav-items--nested {
          margin-top: var(--space-2);
          padding-left: var(--space-4);
        }

        .nav-groups {
          margin-top: var(--space-2);
          padding-left: var(--space-4);
        }

        .nav-group {
          margin-bottom: var(--space-2);
        }

        .nav-group-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-2);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          border-radius: var(--radius-sm);
        }

        .nav-group-toggle:hover {
          background: var(--color-bg-hover);
          color: var(--color-text);
        }

        .nav-group-toggle-icon {
          width: 12px;
          font-size: var(--text-xs);
        }

        .nav-group-count {
          margin-left: auto;
          color: var(--color-text-tertiary);
          font-size: var(--text-xs);
        }

        .nav-footer {
          margin-top: auto;
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border-subtle);
        }

        .nav-footer-text {
          font-size: var(--text-xs);
          color: var(--color-text-tertiary);
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .nav {
            transform: translateX(-100%);
            transition: transform var(--transition-base);
            top: var(--header-height);
            height: calc(100vh - var(--header-height));
          }

          .nav--open {
            transform: translateX(0);
          }

          .nav-header {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

// Individual nav item component
function NavItem({ resource, isActive, onClick }) {
  return (
    <button
      className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
      onClick={onClick}
      title={resource.title}
    >
      <span className="nav-item-title">{resource.title}</span>
    </button>
  );
}

// Add NavItem styles
const navItemStyles = `
  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: var(--space-2) var(--space-3);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    text-align: left;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    overflow: hidden;
  }

  .nav-item:hover {
    background: var(--color-bg-hover);
    color: var(--color-text);
  }

  .nav-item--active {
    background: var(--color-accent-subtle);
    color: var(--color-accent);
    font-weight: 500;
  }

  .nav-item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

// Inject NavItem styles
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = navItemStyles;
  document.head.appendChild(styleEl);
}
