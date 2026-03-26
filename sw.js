self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('ramadan-v1').then(cache => {
      return cache.addAll([
        'index.html','styles.css','app.js','manifest.json',
        'icons/icon-96.png','icons/icon-192.png','icons/icon-512.png'
      ]);
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
