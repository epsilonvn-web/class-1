// Lớp 1 - PWA service worker
// Chỉ cache app shell công khai cùng origin.
// Không cache Apps Script, API, session, quyền học hay dữ liệu người dùng.

const CACHE_NAME = "epsilon-lop1-shell-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/js/app.js",
  "./favicon.jpg",
  "./logo-home.jpg",
  "./icon-192.jpg",
  "./icon-512.jpg",
  "./banner-main.jpg",
  "./banner-main-mobile.jpg",
  "./banner-sub.jpg",
  "./footer-bg.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: "reload" }))))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname.toLowerCase();
  const privateLike =
    path.includes("/api/") ||
    path.includes("/private/") ||
    path.includes("/admin/") ||
    path.includes("/session/") ||
    path.includes("/account/") ||
    path.includes("/assets/data/");

  if (privateLike) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    fetch(new Request(request.url, { cache: "no-store" }))
      .then((response) => {
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
