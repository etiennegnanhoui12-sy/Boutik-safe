const CACHE_NAME = 'boutik-safe-v6';
const CORE_ASSETS = [
  './',
  './index.html',
  './application.html',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './manifest.json',
  './product-placeholder.svg',
  './images/alimentaire.svg',
  './images/agriculture.svg',
  './images/vehicules.svg',
  './images/electronique.svg',
  './images/mode.svg',
  './images/maison.svg',
  './images/construction.svg',
  './images/machines.svg',
  './images/beaute.svg',
  './images/services.svg',
  './vendor/exceljs.min.js',
  './vendor/chart.umd.min.js',
  './vendor/jspdf.umd.min.js',
  './vendor/jspdf.plugin.autotable.min.js'
];
// Toutes les bibliothèques sont désormais servies localement (dossier vendor/,
// inclus dans l'APK et mis en cache comme n'importe quel autre fichier du site).
// Plus aucune dépendance à un CDN externe : l'export Excel/PDF fonctionne
// hors ligne dès la toute première ouverture, même sans connexion initiale.

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
