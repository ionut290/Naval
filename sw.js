const APP_CACHE='varga-marine-app-v6';
const TILE_CACHE='varga-marine-tiles-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./sw.js'];
const CDN=[
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(APP_CACHE);
  await cache.addAll(CORE);
  await Promise.allSettled(CDN.map(url=>cache.add(url)));
  await self.skipWaiting();
})()));

self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('varga-marine-app-')&&key!==APP_CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  const navigation=event.request.mode==='navigate'||url.pathname.endsWith('/index.html');
  if(navigation){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{
      const copy=response.clone();
      caches.open(APP_CACHE).then(cache=>cache.put('./index.html',copy));
      return response;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  if(url.hostname==='tile.openstreetmap.org'){
    event.respondWith(caches.open(TILE_CACHE).then(cache=>cache.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
      if(response.ok)cache.put(event.request,response.clone());
      return response;
    }))));
    return;
  }
  if(url.hostname==='unpkg.com'){
    event.respondWith(caches.open(APP_CACHE).then(cache=>cache.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
      if(response.ok)cache.put(event.request,response.clone());
      return response;
    }))));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).catch(()=>caches.match('./index.html'))));
});
