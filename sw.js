const CACHE = "v2";

self.addEventListener("install",(e)=>{
  e.waitUntil(
    caches.open(CACHE).then(cache=>{
      return cache.addAll([
        "./",
        "./logica.js",
        "./style.css",
        "./manifest.json",
        "./icon-1200.png",
        "./icon-900.png",
        "./game.js"
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
