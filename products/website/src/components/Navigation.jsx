import React from 'react';

const Navigation = ({ manifest, navigate, currentPath }) => {
  // PRD Success Criteria: ≤7 items on first load.
  // We'll filter for Tier 0 and Tier 1 resources with exposure 'nav'.
  const navItems = manifest.resources
    .filter(r => r.exposure === 'nav' && (r.tier === 0 || r.tier === 1))
    .slice(0, 7);

  return (
    <nav className="main-nav">
      <div className="logo" onClick={() => navigate('/')}>klappy.dev</div>
      <ul>
        {navItems.map(item => (
          <li key={item.uri} className={currentPath === item.path.replace('.md', '') ? 'active' : ''}>
            <button onClick={() => navigate(item.path.replace('.md', ''))}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
