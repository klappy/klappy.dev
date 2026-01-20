import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

function ContentPage({ uri }) {
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uri) return;

    setLoading(true);
    setError(null);

    // Load manifest to find the resource
    fetch('/content/manifest.json')
      .then(res => res.json())
      .then(manifest => {
        const resource = manifest.resources.find(r => r.uri === uri);
        if (!resource) {
          throw new Error(`Resource not found: ${uri}`);
        }

        setMetadata(resource);

        // Load the markdown content
        return fetch(`/content${resource.path}`);
      })
      .then(res => {
        if (!res.ok) throw new Error('Content not found');
        return res.text();
      })
      .then(markdown => {
        // Remove frontmatter
        const withoutFrontmatter = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
        setContent(marked(withoutFrontmatter));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [uri]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <p><a href="#">Go home</a></p>
      </div>
    );
  }

  return (
    <div className="content">
      {metadata && (
        <div style={{ marginBottom: 'var(--space-6)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          <span>Audience: {metadata.audience}</span>
          {' · '}
          <span>Tier: {metadata.tier}</span>
          {' · '}
          <span>Stability: {metadata.stability}</span>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default ContentPage;
