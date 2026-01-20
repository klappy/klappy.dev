import { useState } from 'react';

/**
 * Media Shelf Component
 *
 * Implements the media learning layer.
 * Shows optional videos, images, and audio with user-initiated controls.
 * Never autoplays and doesn't interfere with primary content.
 */
export default function MediaShelf({ assets }) {
  const [expandedAsset, setExpandedAsset] = useState(null);

  if (!assets || Object.keys(assets).length === 0) {
    return null;
  }

  const handleAssetClick = (key, assetPath) => {
    if (expandedAsset === key) {
      setExpandedAsset(null);
    } else {
      setExpandedAsset(key);
    }
  };

  const renderAsset = (key, assetPath) => {
    const isExpanded = expandedAsset === key;
    const fileExtension = assetPath.split('.').pop().toLowerCase();

    let mediaType = 'unknown';
    let affordance = 'View';

    if (['mp4', 'webm', 'mov'].includes(fileExtension)) {
      mediaType = 'video';
      affordance = 'Watch';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
      mediaType = 'image';
      affordance = 'View';
    } else if (['mp3', 'm4a', 'wav'].includes(fileExtension)) {
      mediaType = 'audio';
      affordance = 'Listen';
    }

    return (
      <div key={key} style={{ marginBottom: 'var(--space-3)' }}>
        <button
          className="media-toggle btn"
          onClick={() => handleAssetClick(key, assetPath)}
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-primary)',
            width: '100%',
            textAlign: 'left',
            justifyContent: 'space-between'
          }}
        >
          <span>
            <strong>{affordance}:</strong> {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          <span>{isExpanded ? '−' : '+'}</span>
        </button>

        {isExpanded && (
          <div className="media-content" style={{
            marginTop: 'var(--space-3)',
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-bg-tertiary)',
            borderRadius: '4px'
          }}>
            {mediaType === 'video' && (
              <video
                controls
                style={{ width: '100%', maxWidth: '600px', borderRadius: '4px' }}
                preload="metadata"
              >
                <source src={assetPath} />
                Your browser does not support the video tag.
              </video>
            )}

            {mediaType === 'image' && (
              <img
                src={assetPath}
                alt={key}
                style={{ width: '100%', maxWidth: '600px', borderRadius: '4px' }}
                loading="lazy"
              />
            )}

            {mediaType === 'audio' && (
              <audio
                controls
                style={{ width: '100%', maxWidth: '600px' }}
                preload="metadata"
              >
                <source src={assetPath} />
                Your browser does not support the audio element.
              </audio>
            )}

            {mediaType === 'unknown' && (
              <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  Unsupported media type: {fileExtension}
                </p>
                <a href={assetPath} className="btn" target="_blank" rel="noopener noreferrer">
                  Download File
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="media-shelf" style={{
      backgroundColor: 'var(--color-bg-primary)',
      border: '1px solid var(--color-border-secondary)',
      borderRadius: '8px',
      padding: 'var(--space-5)',
      marginBottom: 'var(--space-6)'
    }}>
      <h3 className="text-h3" style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
        📚 Learning Layer
      </h3>
      <p className="text-caption" style={{
        marginBottom: 'var(--space-4)',
        color: 'var(--color-text-secondary)',
        fontStyle: 'italic'
      }}>
        Optional media assets for deeper understanding. The page remains complete without them.
      </p>

      <div className="media-assets">
        {Object.entries(assets).map(([key, assetPath]) =>
          renderAsset(key, assetPath)
        )}
      </div>
    </div>
  );
}