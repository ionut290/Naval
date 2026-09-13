# Varga Marine Offline

PWA browser app per navigazione marina offline.

- GPS reale con `navigator.geolocation`
- carta reale OpenStreetMap con salvataggio manuale della zona visibile
- cache delle mappe offline separata dagli aggiornamenti dell'app
- traccia salvata in `localStorage`
- modalità demo
- installabile come PWA
- pubblicazione automatica con GitHub Pages

Prima di uscire dalla copertura Internet, inquadra la zona di navigazione e premi **Salva zona**. La PWA salva la vista corrente e i livelli di zoom vicini, fino a 900 tessere per volta.

Dopo il primo push, abilita **Settings → Pages → Source: GitHub Actions** se GitHub non lo attiva automaticamente.
