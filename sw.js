// Minimal service worker to enable PWA installability and basic runtime caching
const CACHE_NAME = 'isenborg-menu-cache-v1';

self.addEventListener('install', (event) => {
  // Activate immediately on install
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Become active service worker for all clients
  event.waitUntil(self.clients.claim());
});

// Runtime cache: network-first, fallback to cache if offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      fetch(request)
        .then((response) => {
          // Cache a copy of successful responses
          if (response && response.status === 200 && response.type === 'basic') {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cache.match(request))
    )
  );
});


