import { useState } from 'react';
import './Navigation.css';

export function Navigation({ currentView, onNavigate, manifest }) {
  const [expandedCanon, setExpandedCanon] = useState(false);

  const primaryNavItems = [
    { id: 'home', label: 'Home', view: 'home' },
    { id: 'odd', label: 'What is ODD?', uri: 'klappy://public/odd' },
    { id: 'projects', label: 'Projects', uri: 'klappy://projects/index' },
    { id: 'why', label: 'Why This Exists', uri: 'klappy://about/why-this-exists' },
    { id: 'about', label: 'About', uri: 'klappy://about/bio' },
    { id: 'canon', label: 'Explore Canon', isExpandable: true },
  ];

  const handleNavClick = (item) => {
    if (item.isExpandable) {
      setExpandedCanon(!expandedCanon);
    } else if (item.view) {
      onNavigate(item.view);
    } else if (item.uri) {
      onNavigate('content', item.uri);
    }
  };

  // Get tier 1 canon resources for expanded view
  const canonResources = manifest?.resources.filter(r => 
    r.audience === 'canon' && 
    r.exposure === 'nav' && 
    r.tier === 1
  ) || [];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => onNavigate('home')}>
          <span className="brand-text">klappy.dev</span>
        </div>
        
        <ul className="nav-list">
          {primaryNavItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-button ${
                  currentView === item.view || currentView === item.uri ? 'active' : ''
                }`}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
                {item.isExpandable && (
                  <span className={`expand-icon ${expandedCanon ? 'expanded' : ''}`}>
                    ▾
                  </span>
                )}
              </button>
              
              {item.isExpandable && expandedCanon && (
                <ul className="canon-submenu">
                  {canonResources.map(resource => (
                    <li key={resource.uri}>
                      <button
                        className="submenu-button"
                        onClick={() => onNavigate('content', resource.uri)}
                      >
                        {resource.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
