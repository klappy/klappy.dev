import { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';

function slugify(raw) {
  return String(raw || '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/(^-|-$)/g, '');
}

function getCurrentRoute() {
  const url = new URL(window.location.href);
  const uri = url.searchParams.get('r') || '';
  const hash = (url.hash || '').replace(/^#/, '');
  return { uri, hash };
}

function setRoute(nextUri, nextHash = '') {
  const url = new URL(window.location.href);
  if (nextUri) url.searchParams.set('r', nextUri);
  else url.searchParams.delete('r');
  url.hash = nextHash ? `#${nextHash}` : '';
  window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('popstate'));
}

function classifyAsset(path) {
  const lower = String(path || '').toLowerCase();
  if (/\.(png|jpg|jpeg|gif|webp)$/.test(lower)) return 'image';
  if (/\.(mp4|webm|mov)$/.test(lower)) return 'video';
  if (/\.(m4a|mp3|wav|ogg)$/.test(lower)) return 'audio';
  if (/\.(pdf)$/.test(lower)) return 'pdf';
  return 'file';
}

function MediaShelf({ assets }) {
  const entries = Object.entries(assets || {});
  if (entries.length === 0) return null;

  return (
    <div className="media">
      <details>
        <summary>Media (optional)</summary>
        <div className="media-grid">
          {entries.map(([key, path]) => {
            const kind = classifyAsset(path);
            return (
              <div className="media-asset" key={key}>
                <div className="muted" style={{ fontSize: 13, marginBottom: 8 }}>
                  {key}
                </div>
                {kind === 'image' ? (
                  <a href={path} target="_blank" rel="noreferrer">
                    <img src={path} alt={key} loading="lazy" />
                  </a>
                ) : null}
                {kind === 'video' ? <video controls preload="none" src={path} /> : null}
                {kind === 'audio' ? <audio controls preload="none" src={path} style={{ width: '100%' }} /> : null}
                {kind === 'pdf' ? (
                  <a href={path} target="_blank" rel="noreferrer">
                    Open PDF
                  </a>
                ) : null}
                {kind === 'file' ? (
                  <a href={path} target="_blank" rel="noreferrer">
                    Open file
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}

function useManifest() {
  const [manifest, setManifest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/content/manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error(`Manifest fetch failed: ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (!cancelled) setManifest(json);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { manifest, error };
}

function buildRenderer() {
  const seen = new Map();
  const renderer = new marked.Renderer();

  function uniqueId(base) {
    const n = (seen.get(base) || 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  }

  renderer.heading = function heading(text, level) {
    const id = uniqueId(slugify(text));
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  return renderer;
}

function MarkdownView({ title, markdown, assets }) {
  const html = useMemo(() => {
    const renderer = buildRenderer();
    return marked.parse(markdown || '', { renderer });
  }, [markdown]);

  useEffect(() => {
    const { hash } = getCurrentRoute();
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [html]);

  return (
    <div className="card">
      <div className="md" aria-label={title} dangerouslySetInnerHTML={{ __html: html }} />
      <MediaShelf assets={assets} />
    </div>
  );
}

function filterBrowsable(resources) {
  // Hide internal-only material from the human-facing website UI.
  return (resources || []).filter((r) => r && r.exposure !== 'internal' && r.audience !== 'internal');
}

function groupForBrowse(resource) {
  const uri = resource?.uri || '';
  if (uri.startsWith('klappy://about/')) return 'About';
  if (uri.startsWith('klappy://projects/')) return 'Projects';
  if (uri.startsWith('klappy://canon/') || uri.startsWith('klappy://meta/')) return 'Canon';
  if (uri.startsWith('klappy://public/')) return 'Start here';
  return 'More';
}

export default function App() {
  const { manifest, error } = useManifest();
  const [route, setRouteState] = useState(() => getCurrentRoute());
  const [markdown, setMarkdown] = useState('');
  const [contentError, setContentError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onPop = () => setRouteState(getCurrentRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const resources = manifest?.resources || [];
  const byUri = useMemo(() => {
    const map = new Map();
    for (const r of resources) map.set(r.uri, r);
    return map;
  }, [resources]);

  const featuredNav = useMemo(() => {
    // Exactly 7 top-level navigation items (PRD requirement).
    const items = [
      { label: 'Home', uri: 'klappy://public/home' },
      { label: 'ODD', uri: 'klappy://public/odd' },
      { label: 'Canon', uri: 'klappy://meta/canon-index' },
      { label: 'Projects', uri: 'klappy://projects/index' },
      { label: 'Bio', uri: 'klappy://about/bio' },
      { label: 'Credibility', uri: 'klappy://about/credibility' },
      { label: 'FAQ', uri: 'klappy://about/faq' },
    ];

    // Only keep entries that exist in the manifest.
    return items.filter((i) => byUri.has(i.uri));
  }, [byUri]);

  const activeUri = route.uri || featuredNav[0]?.uri || '';
  const activeResource = byUri.get(activeUri);

  useEffect(() => {
    setContentError(null);
    setLoading(true);

    if (!activeResource) {
      setMarkdown('');
      setLoading(false);
      return;
    }

    const url = `/content${activeResource.path}`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Content fetch failed: ${r.status}`);
        return r.text();
      })
      .then((md) => {
        setMarkdown(md);
      })
      .catch((e) => {
        setContentError(e.message || String(e));
        setMarkdown('');
      })
      .finally(() => setLoading(false));
  }, [activeResource?.path]);

  const browseGroups = useMemo(() => {
    const grouped = new Map();
    for (const r of filterBrowsable(resources)) {
      const key = groupForBrowse(r);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(r);
    }
    for (const [, list] of grouped) {
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }
    return Array.from(grouped.entries());
  }, [resources]);

  if (error) {
    return (
      <div className="app">
        <div className="main">
          <div className="card">
            <h1>Site loading failed</h1>
            <p className="muted">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="app">
        <div className="main">
          <div className="card">
            <p>Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">klappy.dev</div>
          <nav className="nav" aria-label="Primary">
            {featuredNav.map((i) => (
              <button
                key={i.uri}
                type="button"
                onClick={() => setRoute(i.uri)}
                aria-current={i.uri === activeUri ? 'page' : undefined}
              >
                {i.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="grid">
          <section className="card" aria-label="Browse">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontWeight: 650 }}>Browse</div>
              <div className="muted" style={{ fontSize: 13 }}>
                (no file paths)
              </div>
            </div>
            <div style={{ height: 10 }} />

            {browseGroups.map(([group, list]) => (
              <details key={group} style={{ marginBottom: 10 }}>
                <summary>
                  {group} <span className="muted" style={{ fontSize: 13 }}>({list.length})</span>
                </summary>
                <div className="list" style={{ marginTop: 8 }}>
                  {list.slice(0, 20).map((r) => (
                    <button
                      key={r.uri}
                      type="button"
                      onClick={() => setRoute(r.uri)}
                      aria-current={r.uri === activeUri ? 'page' : undefined}
                    >
                      <div style={{ fontWeight: 600 }}>{r.title}</div>
                      <div className="muted" style={{ fontSize: 13 }}>
                        Tier {r.tier} · {r.audience}
                      </div>
                    </button>
                  ))}
                  {list.length > 20 ? (
                    <div className="muted" style={{ fontSize: 13, padding: '4px 2px' }}>
                      Showing first 20…
                    </div>
                  ) : null}
                </div>
              </details>
            ))}
          </section>

          <section aria-label="Content">
            {loading ? (
              <div className="card">
                <p>Loading…</p>
              </div>
            ) : contentError ? (
              <div className="card">
                <h1>Content loading failed</h1>
                <p className="muted">{contentError}</p>
              </div>
            ) : (
              <MarkdownView title={activeResource?.title || 'Content'} markdown={markdown} assets={activeResource?.assets} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

