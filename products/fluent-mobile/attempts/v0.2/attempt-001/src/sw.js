/**
 * Service Worker for Fluent Mobile PoC v0.2
 * 
 * Provides basic offline support via cache-first strategy.
 */

const CACHE_NAME = 'fluent-mobile-v0.2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/waveform.js',
  '/manifest.json'
];

// Install: cache assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('[SW] Install complete');
        return self.skipWaiting();
      })
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activate complete');
        return self.clients.claim();
      })
  );
});

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Cache hit:', event.request.url);
          return cachedResponse;
        }
        
        console.log('[SW] Cache miss, fetching:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-ok responses
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Clone response for caching
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
      .catch((err) => {
        console.error('[SW] Fetch failed:', err);
        // Return offline fallback if available
        return caches.match('/index.html');
      })
  );
});
