/**
 * A very simple ServiceWorker that caches the
 * site for offline use.
 */


// Keep track of the cache.
let CACHE_VERSION = 'v17';


self.addEventListener('install', (event) => {
    // Store some files on first load.

    function onInstall () {
        return caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll([
                '/main.min.js',
                '/stylesheets/styles.css',
                '/index.html',
                '/assets/logo.png',
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
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Handle fetch events by first asking the network, then sending back the cached resource if available.
self.addEventListener('fetch', (event) => {
    function onFetch (event) {
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
                .then((response) => {

                  if (response.type === 'opaqueredirect') {
                        // Do not cache redirects, follow them.
                        return Promise.reject(event);
                    }

                    return addToCache(cacheKey, request, response);
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
    function fetchFromCache (event) {
        return caches.match(event.request).then((response) => {
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
