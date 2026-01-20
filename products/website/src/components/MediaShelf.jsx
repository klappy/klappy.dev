import { useState } from 'react';
import './MediaShelf.css';

export function MediaShelf({ assets, resourceTitle }) {
  const [expandedMedia, setExpandedMedia] = useState({});

  if (!assets || Object.keys(assets).length === 0) {
    return null;
  }

  const toggleMedia = (key) => {
    setExpandedMedia(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getMediaType = (path) => {
    if (path.endsWith('.mp4') || path.endsWith('.webm')) return 'video';
    if (path.endsWith('.mp3') || path.endsWith('.m4a') || path.endsWith('.wav')) return 'audio';
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.gif') || path.endsWith('.webp')) return 'image';
    if (path.endsWith('.pdf')) return 'pdf';
    return 'unknown';
  };

  const formatMediaLabel = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case 'video': return '▶';
      case 'audio': return '🎵';
      case 'image': return '🖼';
      case 'pdf': return '📄';
      default: return '📎';
    }
  };

  return (
    <div className="media-shelf">
      <h3 className="media-shelf-title">Media</h3>
      <p className="media-shelf-description">
        Optional resources to enhance your understanding. Expand to view.
      </p>
      
      <div className="media-items">
        {Object.entries(assets).map(([key, path]) => {
          const mediaType = getMediaType(path);
          const isExpanded = expandedMedia[key];
          const label = formatMediaLabel(key);
          
          return (
            <div key={key} className="media-item">
              <button 
                className="media-toggle"
                onClick={() => toggleMedia(key)}
                aria-expanded={isExpanded}
              >
                <span className="media-icon">{getMediaIcon(mediaType)}</span>
                <span className="media-label">{label}</span>
                <span className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}>
                  ▾
                </span>
              </button>
              
              {isExpanded && (
                <div className="media-content">
                  {mediaType === 'video' && (
                    <video 
                      controls 
                      className="media-player"
                      preload="metadata"
                    >
                      <source src={path} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  )}
                  
                  {mediaType === 'audio' && (
                    <audio 
                      controls 
                      className="media-player"
                      preload="metadata"
                    >
                      <source src={path} />
                      Your browser does not support audio playback.
                    </audio>
                  )}
                  
                  {mediaType === 'image' && (
                    <img 
                      src={path} 
                      alt={label}
                      className="media-image"
                      loading="lazy"
                    />
                  )}
                  
                  {mediaType === 'pdf' && (
                    <div className="media-link-wrapper">
                      <a 
                        href={path} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="media-link"
                      >
                        Open PDF in new tab →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
