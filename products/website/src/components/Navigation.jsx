import React from 'react';

function Navigation({ currentPage }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-logo">klappy.dev</a>
        <ul className="nav-links">
          <li className="nav-link">
            <a href="#klappy://public/odd">ODD</a>
          </li>
          <li className="nav-link">
            <a href="#klappy://about/why-this-exists">About</a>
          </li>
          <li className="nav-link">
            <a href="#klappy://projects/index">Projects</a>
          </li>
          <li className="nav-link">
            <a href="#klappy://meta/canon-index">Canon</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
