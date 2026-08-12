const CACHE_NAME = "christ-group-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./ajustes.html",
    "./editor.html",
    "./index.js",
    "./ajustes.js",
    "./editor.js",
    "./libreria.js",
    "./manifest.json"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS))
    );

});

self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(claves => {

            return Promise.all(
                claves
                    .filter(clave => clave !== CACHE_NAME)
                    .map(clave => caches.delete(clave))
            );

        })
    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => {

                return respuesta || fetch(event.request);

            })

    );

});