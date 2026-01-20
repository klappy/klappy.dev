import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { MediaShelf } from './MediaShelf';
import './Home.css';

export function Home({ manifest, onNavigate }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Find the home resource
  const homeResource = manifest?.resources.find(r => r.uri === 'klappy://public/home');

  useEffect(() => {
    if (homeResource) {
      fetch(`/content${homeResource.path}`)
        .then(r => r.text())
        .then(md => {
          setContent(marked.parse(md));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [homeResource]);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <div 
          className="hero-content" 
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>

      {homeResource?.assets && (
        <section className="home-media">
          <MediaShelf 
            assets={homeResource.assets}
            resourceTitle={homeResource.title}
          />
        </section>
      )}

      <section className="home-cta">
        <h2>Start Exploring</h2>
        <div className="cta-cards">
          <div className="cta-card">
            <h3>What is ODD?</h3>
            <p>Learn about Outcomes Driven Development and how it works.</p>
            <button onClick={() => onNavigate('content', 'klappy://public/odd')}>
              Read the Manifesto →
            </button>
          </div>
          
          <div className="cta-card">
            <h3>Explore Projects</h3>
            <p>See what's being built with ODD principles.</p>
            <button onClick={() => onNavigate('content', 'klappy://projects/index')}>
              View Projects →
            </button>
          </div>
          
          <div className="cta-card">
            <h3>Dive into Canon</h3>
            <p>Browse the constraints, decisions, and evidence policies.</p>
            <button onClick={() => onNavigate('content', 'klappy://meta/canon-index')}>
              Explore Canon →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
