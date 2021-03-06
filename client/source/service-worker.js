/**
 * A very simple ServiceWorker that caches the
 * site for offline use.
 */


// Keep track of the cache.
let CACHE_VERSION = 'v23';
let STATIC_CACHE = 'static';

let expectedCaches = [CACHE_VERSION, STATIC_CACHE];


self.addEventListener('install', (event) => {
    // Store some files on first load.

    function onInstall () {
        return caches.open(STATIC_CACHE)
            .then((cache) => cache.addAll([
                '/main.min.js',
                '/stylesheets/styles.css',
                '/index.html',
                '/assets/logo.png',
                '/assets/favicon.ico',
                '/assets/intro-bg.jpg',
                '/assets/icons/add-need-icon-grey.png',
                '/assets/icons/add-need-icon-red.png',
                '/assets/icons/applications-icon-grey.png',
                '/assets/icons/applications-icon-red.png',
                '/assets/icons/matches-icon-grey.png',
                '/assets/icons/matches-icon-red.png',
                '/assets/icons/profile-icon-grey.png',
                '/assets/icons/profile-icon-red.png'
            ]));
    }

    event.waitUntil(onInstall(event));

});

// Clear out the cache if service worker is updated.
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.map((key) => {
                    if (!expectedCaches.includes(key)) {
                        return caches.delete(key);
                    }
                })
            ))
    );
});

// Handle fetch events by first asking the network, then sending back the cached resource if available.
self.addEventListener('fetch', (event) => {
    function onFetch (event) {
        let request = event.request;

        event.respondWith(
            fromNetwork(event.request, 1000)
                .then((response) => {

                  if (response.type === 'opaqueredirect') {
                        // Do not cache redirects, follow them.
                        return Promise.reject(event);
                    }

                    return addToCache(CACHE_VERSION, request, response);
                })
                .catch(() => fetchFromCache(event))
                .catch(() => fetch(request)));
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
    function fetchFromCache (fetchevent) {

        return caches.match(fetchevent.request).then((response) => {
            if (!response) {
                throw Error('${event.request.url} not found in cache');
            }

            return response;
        });
    }

    // Get response from network.
    function fromNetwork(request, timeout) {
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

    // Use cache first if GET request.
    if ((isNotFacebook(event.request.url)) && event.request.method === 'GET') {
        onFetch(event);
    }

    // Do not intervene with facebook requests.
    function isNotFacebook(requestURL) {
        return !(requestURL.includes('facebook'));
    }
});
