const cacheName = `app-name`;
const filesToCache = [`/images/logo.svg`, `/index.html`];
self.addEventListener(`install`, function (e) {  //eslint-disable-line
  console.log(`[ServiceWorker] Install`);
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log(`[ServiceWorker] Caching app shell`);
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener(`activate`, (event) => {//eslint-disable-line
  event.waitUntil(self.clients.claim());//eslint-disable-line
});
self.addEventListener(`fetch`, (event) => {//eslint-disable-line
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((response) => response || fetch(event.request))
  );
});
