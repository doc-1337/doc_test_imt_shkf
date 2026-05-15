const CACHE_NAME = 'amputation-calc-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Додайте інші ресурси, якщо вони є (наприклад, стилі, шрифти)
];

// Встановлення service worker – кешування файлів
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Відповідь на запити – спочатку мережа, потім кеш (офлайн)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// Оновлення service worker – видалення старого кешу
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});