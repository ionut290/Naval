# Varga Marine Offline

PWA browser app per navigazione marina offline.

- GPS reale con `navigator.geolocation`
- carta reale OpenStreetMap con salvataggio manuale della zona visibile
- cache delle mappe offline separata dagli aggiornamenti dell'app
- zoom e spostamento manuale mantenuti durante gli aggiornamenti GPS
- pulsante **Barca** per ricentrare senza cambiare lo zoom
- vento e raffiche da Open-Meteo Weather API
- onde e temperatura del mare da Open-Meteo Marine API, con ultimo dato disponibile offline
- traccia salvata in `localStorage`
- modalità demo
- installabile come PWA
- pubblicazione automatica con GitHub Pages

Prima di uscire dalla copertura Internet, inquadra la zona di navigazione e premi **Salva zona**. La PWA salva la vista corrente e i livelli di zoom vicini, fino a 900 tessere per volta.

Dopo il primo push, abilita **Settings → Pages → Source: GitHub Actions** se GitHub non lo attiva automaticamente.
