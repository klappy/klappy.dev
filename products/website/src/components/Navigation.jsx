import { useMemo } from 'react';

/**
 * Progressive Navigation Component
 * 
 * PRD Requirements:
 * - First load shows ≤7 navigational items
 * - Canon discoverable without file paths
 * - No agent/CLI language exposed
 * - Progressive disclosure tiers (0/1/2)
 */
export default function Navigation({ 
  resources, 
  currentPath, 
  navigate, 
  isOpen,
  expandedTiers,
  toggleTier 
}) {
  // Group resources by section and tier
  const sections = useMemo(() => {
    if (!resources) return [];

    // Map resources to clean navigation structure
    const grouped = {
      'Start Here': [],
      'About': [],
      'Projects': [],
      'Canon': []
    };

    resources.forEach(r => {
      // Determine section from URI
      if (r.uri?.includes('/odd') || r.uri?.includes('/why-this-exists')) {
        grouped['Start Here'].push(r);
      } else if (r.uri?.includes('/about/') || r.uri?.includes('/bio') || r.uri?.includes('/credibility') || r.uri?.includes('/faq')) {
        grouped['About'].push(r);
      } else if (r.uri?.includes('/projects/')) {
        grouped['Projects'].push(r);
      } else if (r.uri?.includes('/canon/') || r.uri?.includes('/meta/')) {
        grouped['Canon'].push(r);
      }
    });

    // Sort within each section by tier, then title
    Object.keys(grouped).forEach(section => {
      grouped[section].sort((a, b) => {
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.title.localeCompare(b.title);
      });
    });

    return grouped;
  }, [resources]);

  // Generate URL path from resource
  const getUrlPath = (resource) => {
    // Convert resource path to URL path
    // /content/odd/README.md -> /odd
    // /content/about/why-this-exists.md -> /about/why-this-exists
    const path = resource.path
      .replace(/^\/content/, '')
      .replace(/^\//, '/')
      .replace(/\.md$/, '')
      .replace(/\/README$/, '')
      .replace(/\/index$/, '');
    return path || '/';
  };

  // Check if link is active
  const isActive = (resource) => {
    const urlPath = getUrlPath(resource);
    return currentPath === urlPath;
  };

  // Filter items based on tier expansion
  const getVisibleItems = (items) => {
    return items.filter(item => {
      const tier = item.tier ?? 2;
      return expandedTiers[tier] || tier === 0;
    });
  };

  // Count items per tier
  const countByTier = (items, tier) => {
    return items.filter(item => (item.tier ?? 2) === tier).length;
  };

  // Render section
  const renderSection = (title, items) => {
    if (!items || items.length === 0) return null;
    
    const visibleItems = getVisibleItems(items);
    const tier1Count = countByTier(items, 1);
    const tier2Count = countByTier(items, 2);
    const hasHiddenTier1 = !expandedTiers[1] && tier1Count > 0;
    const hasHiddenTier2 = !expandedTiers[2] && tier2Count > 0;

    return (
      <div className="nav-section" key={title}>
        <h3 className="nav-section-title">{title}</h3>
        <ul className="nav-list">
          {visibleItems.map(item => (
            <li className="nav-item" key={item.uri}>
              <a
                href={getUrlPath(item)}
                className={`nav-link ${isActive(item) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(getUrlPath(item));
                }}
              >
                {item.title}
                {item.tier === 0 && <span className="tier-badge tier-0">Core</span>}
              </a>
            </li>
          ))}
        </ul>
        {(hasHiddenTier1 || hasHiddenTier2) && (
          <div 
            className="nav-expand" 
            onClick={() => toggleTier(hasHiddenTier1 ? 1 : 2)}
          >
            <span>+</span>
            <span>
              {hasHiddenTier1 ? `${tier1Count} more` : `${tier2Count} deep dives`}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`nav ${isOpen ? 'open' : ''}`}>
      <a 
        href="/" 
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        klappy.dev
      </a>
      
      {renderSection('Start Here', sections['Start Here'])}
      {renderSection('About', sections['About'])}
      {renderSection('Projects', sections['Projects'])}
      
      {/* Canon section - only show when tier 1 or 2 is expanded */}
      {(expandedTiers[1] || expandedTiers[2]) && renderSection('Canon', sections['Canon'])}
      
      {/* Show "Go Deeper" if no tiers expanded */}
      {!expandedTiers[1] && !expandedTiers[2] && sections['Canon']?.length > 0 && (
        <div className="nav-section">
          <div 
            className="nav-expand" 
            onClick={() => toggleTier(1)}
          >
            <span>↓</span>
            <span>Go deeper</span>
          </div>
        </div>
      )}
    </nav>
  );
}
