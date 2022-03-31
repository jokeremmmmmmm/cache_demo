var VERSION = "v1";
var urlsToCache = [
  "/index.html",
  // '/assets/cache-control.js',
  // '/assets/expires.js',
  "/assets/Etag.js",
  // '/assets/Last-Modified.js',
];

// 缓存
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// 缓存更新
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 捕获请求并返回缓存数据
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        console.log("sw match:", response.url);
        // 如果匹配到缓存里的资源，则直接返回
        if (response) {
          return response;
        }
      })
      .catch(function () {
        console.log('non match',event.request.url)
        return fetch(event.request);
      })
  );
});
