# RO-FISH backend server

## Structură

- `components` - funcționalități și servicii generale ale serverului
- `configurations` - configurări extra ale serverului
- `controllers` - răspunsuri la cereri HTTP
- `models` - reprezentări pentru stocare în bază de date
- `repositories` - interacțiuni cu baza de date
- `views` - obiecte folosite pentru cereri

## Inițializare bază de date

### Credențiale

- Stochează datele de conectare în fișierul `.env` din rădăcina proiectului. Formatul fișierului este:

```env
ROFISH_DB_USER=...
ROFISH_DB_PASSWORD=...
ROFISH_DB=...
```

- Serverul are nevoie de aceleași credențiale pentru a se conecta. Setează "run-configuration-ul" în IntelliJ să
  citească `.env`-ul în categoria "Environment variables".

### Container

- Rulează `docker compose up [-d]` pentru a porni containerul \[în fundal].
- Poți rula `docker compose down [-v]` pentru a opri containerul \[și a șterge volumul bazei de date].
