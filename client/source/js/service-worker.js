/**
 * A very simple ServiceWorker that caches the
 * site for offline use.
 */


// Keep track of the cache.
let CACHE_VERSION = 'v1';


self.addEventListener('install', (event) => {
    console.log('sw installing');
    // Store some files on first load.
    function onInstall () {
        return caches.open(CACHE_VERSION)
            .then(cache => cache.addAll([
                    '/main.min.js',
                    '/stylesheets/styles.css',
                    '/index.html',
                ])
            );
    }

    event.waitUntil(onInstall(event));

});

// Clear out the cache if service worker is updated.
self.addEventListener('activate', (event) => {
    console.log('sw activated');
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Handle fetch events by sending back the cached resource if available.
self.addEventListener('fetch', (event) => {
    function onFetch (event) {
        console.log('got get request');
        let request = event.request;
        let acceptHeader = request.headers.get('Accept');
        let resourceType = 'static';
        let cacheKey;

        if (acceptHeader.indexOf('text/html') !== -1) { // Make different cashes for different content to retrieve later.
            resourceType = 'content';
        } else if (acceptHeader.indexOf('image') !== -1) {
            resourceType = 'image';
        }

        cacheKey = resourceType;

        event.respondWith(
            fromNetwork(event.request, 1000)
                .then((response) => addToCache(cacheKey, request, response))
                .catch(() => fetchFromCache(event))
                .catch(() => fetch(request))
                .then((response) => addToCache(cacheKey, request, response)));
    }

    // Add responses to cache to fetch later.
    function addToCache (cacheKey, request, response) {
        if (response.ok) {
            let copy = response.clone(); // Copy the response as to not use it up.
            caches.open(cacheKey).then((cache) => {
                cache.put(request, copy);
            });

            return response;
        }
    }

    // Get responses from cache.
    function fetchFromCache (event) {
        return caches.match(event.request).then((response) => {
            if (!response) {
                throw Error('${event.request.url} not found in cache');
            }
            return response;
        });
    }

    function fromNetwork(request, timeout) {
        console.log('tries to respond from network');
        return new Promise((resolve, reject) => {
            let timeoutId = setTimeout(reject, timeout);

            fetch(request)
                .then((response) => {
                    clearTimeout(timeoutId);
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    console.log(event);

    // Use cache first if GET request.
    if (event.request.method === 'GET') {
        onFetch(event);
    }
});
