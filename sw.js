const CACHE = "v1";

self.addEventListener("install",(e)=>{
  e.waitUntil(
    caches.open(CACHE).then(cache=>{
      return cache.addAll([
        "./",
        "./Js/logica.js",
        "./Css/style.css",
        "./manifest.json",
        "./Pngs/icon-512.png",
        "./Pngs/icon-192.png"
        ])
    })
    )
})

self.addEventListener("activate",(e)=>{
  e.waitUntil(
    caches.keys().then(cache=>{
      return Promise.all(
      cache.map(nome => {
        if(nome !== CACHE){
          return caches.delete(nome)
        }
      })
      )
    })
    )
})

self.addEventListener("fetch",(e)=>{
  e.respondWith(
    fetch(e.request).then(response =>{
      const copia = response.clone()
      caches.open(CACHE).then(cache =>{
        cache.put(e.request,copia)
      })
        return response
    }).catch(()=>{
      return caches.match(e.request);
    })
    )
})