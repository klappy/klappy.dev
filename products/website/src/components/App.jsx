import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Home from './Home';
import ContentPage from './ContentPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUri, setCurrentUri] = useState(null);

  useEffect(() => {
    // Simple hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setCurrentPage('home');
        setCurrentUri(null);
      } else if (hash.startsWith('klappy://')) {
        setCurrentPage('content');
        setCurrentUri(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app">
      <Navigation currentPage={currentPage} />
      <main className="main">
        <div className="container">
          {currentPage === 'home' && <Home />}
          {currentPage === 'content' && <ContentPage uri={currentUri} />}
        </div>
      </main>
      <footer className="footer">
        <p>klappy.dev — Built with ODD (Outcomes-Driven Development)</p>
      </footer>
    </div>
  );
}

export default App;
