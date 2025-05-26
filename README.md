# Ro-fish infrastructure

## Structură

- `server` - back-end-ul: aplicație Spring Boot
  - `components` - funcționalități și servicii generale ale serverului, precum 
    inițializarea bazei de date, gestionarea autentificării prin cookie-uri etc.
  - `configurations` - configurări extra ale serverului: autentificare
  - `api` - entități ale serverului
    - `...`
      - `controllers` - endpoint-uri API
      - `dtos` - obiecte folosite pentru transferul de date de-a lungul 
        cererilor
      - `models` - reprezentări pentru stocare în bază de date
      - `repositories` - interacțiuni cu baza de date
- `web` - front-end-ul: aplicație React + Next.js
  - `src`
    - `app` - paginile aplicației
      - `...`
        - `...`
          - `page.tsx` - o pagină de-a aplicației
    - `middleware.ts` - logică pentru gestionarea accesului când se schimbă 
    paginile
    - `components` - componente reutilizabile
    - `lib` - funcții ajutătoare
    - `types` - definirea tipurilor de date

## Configurații

Se citesc din variabile de mediu, cel mai ușor setate cu ajutorul unui fișier 
`.env`:

```env
ROFISH_DB_USER=...      # userul pentru conectarea la baza de date
ROFISH_DB_PASSWORD=...  # parola userului de baza de date
ROFISH_DB=...           # schema bazei de date

ROFISH_SERVER_HOST=...  # adresa/hostname-ul backendului
ROFISH_SERVER_PORT=...  # portul pe care asculta backendul
```

## Inițializare bază de date

- Serverul are nevoie de aceleași credențiale pentru a se conecta. Setează 
"run-configuration-ul" în IntelliJ să
  citească `.env`-ul în categoria "Environment variables".

### Container

- Rulează `docker compose up [-d]` pentru a porni containerul \[în fundal].
- Poți rula `docker compose down [-v]` pentru a opri containerul \[și a șterge 
volumul bazei de date].
