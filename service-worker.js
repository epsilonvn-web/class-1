// Lớp 1 — PWA service worker
// Network-first cho app shell; bỏ qua Apps Script/cross-origin và dữ liệu học động.
const CACHE_NAME = 'epsilon-class1-runtime-v9';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/js/app.js',
  './favicon.jpg',
  './icon-192.png',
  './icon-512.png',
  './logo-home.jpg',
  './banner-main.jpg',
  './banner-main-mobile.jpg',
  './banner-sub.jpg',
  './footer-bg.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.allSettled(
        APP_SHELL.map((url) => cache.add(new Request(url, { cache: 'reload' })))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const crossOrigin = url.origin !== self.location.origin;
  const dynamicData = url.pathname.includes('/assets/data/');
  if (crossOrigin || dynamicData) return;

  event.respondWith(
    fetch(new Request(req, { cache: 'no-store' }))
      .then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});
