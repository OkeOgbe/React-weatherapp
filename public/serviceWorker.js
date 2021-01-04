//Precache resources
const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/',
    'src/App.js',
    'src/index.js',
    'src/App.css'
]

self.addEventListener('install', e => {
    console.log('service worker reg started');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request)
        .then(cachedResponse => {
            (cachedResponse) ? cachedResponse : fetch(e.request)
        })
    );
});