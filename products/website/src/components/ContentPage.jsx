import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

const ContentPage = ({ resource, navigate }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Content is served from /content/
    const contentPath = `/content${resource.path}`;
    fetch(contentPath)
      .then(res => res.text())
      .then(text => setContent(text));
  }, [resource]);

  return (
    <div className="content-page">
      <div className="breadcrumb">
        <button onClick={() => navigate('/')}>Home</button> / {resource.title}
      </div>
      <article dangerouslySetInnerHTML={{ __html: marked(content) }} />
      
      {resource.assets && (
        <div className="resource-media">
          <h3>Related Media</h3>
          <ul>
            {Object.entries(resource.assets).map(([key, url]) => (
              <li key={key}>
                <a href={url} target="_blank" rel="noopener noreferrer">{key.replace('_', ' ')}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
