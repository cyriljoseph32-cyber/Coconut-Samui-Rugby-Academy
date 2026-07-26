# bot-trading-US — Signal Bot Actifs US

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-07-20.
> Dépôt : `cyriljoseph32-cyber/bot-trading-US` (branche par défaut `main`).

## Identité

- Bot de signaux de trading sur actifs US (SPY, QQQ, DIA, IWM + 16 grandes valeurs),
  stratégie **retour à la moyenne RSI-2** : entrée si cours > MM200 et RSI(2) < 10 ;
  sortie sur clôture > MM5, stop à 2,5 × ATR(14), ou 10 séances max. Backtest intégré.
- Dashboard : `/trading.html`. Second moteur : **bot global multi-actifs temps réel**
  (`bot/`, flux WebSocket Twelve Data, paper trading) — `npm run bot:paper`.

## Stack & déploiement

- React 19 + Vite + TypeScript, Vitest ; package `signal-bot-us` v0.1.0. Déployé sur Vercel.
- Cron Vercel `/api/cron` chaque jour de bourse à 21h35 UTC : analyse de la watchlist,
  email récap (Resend), ordres automatiques optionnels chez Alpaca (`AUTOTRADE`).
- `api/market.ts` = proxy Yahoo Finance (en dev local : proxy Vite).

## Fichiers clés & conventions

- `README.md` — stratégie, durcissements sécurité, tableau complet des variables
  d'environnement (Resend, Alpaca, risque). `bot/README.md` — bot global temps réel.
- Commandes : `npm run dev` · `build` · `typecheck` · `lint` · `test:run` ·
  `bot:paper` · `bot:backtest`.

## Équipe d'agents (créée le 2026-07-20)

`.claude/agents/` du dépôt : `trading-ops` (exploitation — `/trading`), `quant` (stratégie
& backtests — `/backtest`), `dev-trading` (code — `/bot-dev`). Garde-fous communs : jamais
de conseil en investissement, jamais `ALPACA_LIVE`/`AUTOTRADE` sans décision explicite de
Cyril.

## État & prochaines étapes (2026-07-20)

- Dernier merge : PR #2 le 17/07. Le README documente les durcissements en place : token
  dashboard obligatoire, ordres d'achat à cours limité, plafond d'exposition brute,
  données figées ignorées.
- Mise en route conseillée (README) : emails seuls → Alpaca paper + `AUTOTRADE` → réel
  seulement si le paper confirme, et petit.
- État réel du déploiement et du compte Alpaca de Cyril : `[À COMPLÉTER PAR CYRIL]`.

## Pièges connus

- **Paper trading par défaut** ; le réel exige `ALPACA_LIVE=true` — ne jamais l'activer sans
  décision explicite de Cyril.
- `/api/positions` et `/api/chat` exigent `DASHBOARD_TOKEN` (sinon 401/503) ; l'assistant
  consomme la clé Anthropic — ne jamais l'exposer sans token.
- `MAX_DAILY_LOSS_PCT` est un filtre d'entrée (le cron tourne 1×/jour), pas une protection
  intra-day — la vraie protection est le stop attaché géré par Alpaca.
- Jamais de promesse de performance : les taux affichés sont historiques, nets de frais,
  sans garantie — l'avertissement doit rester visible.
