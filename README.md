# MegaETH Analytics Bot

Twitter bot publikujący metryki MegaETH (testnet): TPS (okno 10s), numer bloku, gas/base fee.

## Stack
- Node.js + TypeScript
- Ethers v6
- Twitter/X API v2 (App-only)
- node-cron

## Konfiguracja
1. Sklonuj repo lub użyj Codespaces.
2. Skopiuj `.env.example` do `.env` i uzupełnij:
   - `RPC_URL` – publiczny RPC MegaETH (np. carrot)
   - `X_BEARER` – Twitter App-only Bearer Token
   - `X_USERNAME` – np. @TwojNick
   - `TWEET_CRON` – crontab (domyślnie co godzinę)
3. `npm i`
4. `npm run dev` (jednorazowy tweet + uruchomienie crona)
5. Produkcyjnie: `npm run build` i `npm start`.

> **Uwaga:** Nie commituj pliku `.env` do repo.
