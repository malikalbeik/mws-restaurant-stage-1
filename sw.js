var CACHE_NAME = 'my-site-cache-v1';

var urlsToCache = [
  '/',
  '/restaurant.html',
  '/js/main.js',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/css/responsive.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true
    })
    .then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
        console.log('response given from caches')
      }

      return fetch(event.request);
    }).catch(function(err) {
      console.log(err);
    })
  );
});