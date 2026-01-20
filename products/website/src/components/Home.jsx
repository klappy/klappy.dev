import React from 'react';

const Home = ({ manifest, navigate }) => {
  const homeResource = manifest.resources.find(r => r.uri === 'klappy://public/home');

  return (
    <div className="home-page">
      <h1>Outcome-Driven Development</h1>
      <p className="subtitle">Building with AI agents through evidence, constraints, and progressive disclosure.</p>
      
      <div className="hero-actions">
        <button onClick={() => navigate('/odd/README')}>Start Here</button>
        <button onClick={() => navigate('/about/why-this-exists')}>Why This Exists</button>
      </div>

      {homeResource?.assets && (
        <div className="home-media">
          {/* Media is opt-in per PRD */}
          <p>Explore ODD visually:</p>
          <div className="media-grid">
            {Object.entries(homeResource.assets).map(([key, url]) => (
              <div key={key} className="media-item">
                <a href={url} target="_blank" rel="noopener noreferrer">{key.replace('_', ' ')}</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
