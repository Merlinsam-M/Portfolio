# Portfolio + AI Recruiter

Original responsive burgundy portfolio starter with an inline SVG robot, accessible modal chat, and a server-side OpenAI integration. No personal credentials, projects, employment, or qualifications have been invented. Edit `public/index.html` for your public introduction and project cards; add matching verified facts to `data/portfolio.json` for the assistant. No video is included because none was supplied.

## Run locally

Requires Node.js 22 or newer (validated on Node 24).

```sh
npm ci
cp .env.example .env
# Edit .env locally; never commit or share your real key.
npm start
```

Open the server on port 5000. `npm run dev` restarts on changes; `npm test` runs the backend suite. No frontend build is needed.

Set `OPENAI_API_KEY` on the server only. `OPENAI_MODEL` defaults to `gpt-4.1-mini`; choose a model your account supports. API billing is separate from a ChatGPT subscription. `APP_ORIGIN` must exactly match the browser origin (scheme, host, port). `PORT` defaults to 5000. Never put the key in frontend files or public-prefixed variables. Missing credentials produce an explicit configuration error, not a simulated AI answer.

## Production

Deploy this Node application to a host that supports a persistent Node service. Use `npm ci` as installation and `npm start` as startup. Configure `OPENAI_API_KEY`, `OPENAI_MODEL`, `APP_ORIGIN=https://your-real-domain`, and the host's assigned `PORT` using its secure environment settings. Enable HTTPS and provider billing alerts/budgets. Check `/api/health` then submit a chat question and a follow-up in the UI. Confirm answers against your verified facts. Do not enable permissive CORS.

The in-memory rate limiter permits 20 requests per minute per IP. For multiple replicas, use a shared limiter store. Behind a reverse proxy, configure Express trust proxy for the exact trusted infrastructure before relying on per-client IP limits; do not blindly trust arbitrary forwarded headers. Current default is conservative and may share a rate limit across proxied visitors. Public AI endpoints can incur charges; enforce provider budget controls and consider authentication before broad promotion.

## Checks

`npm test` covers static delivery, health, missing credentials, private-file protection, invalid input/history, oversized payloads, disallowed origins, rate limiting, provider errors, and provider request/history composition. Provider success/failure tests use an injected mock and do not establish live API access. Browser rendering and real API responses require separate validation. The UI supports small screens, keyboard controls, reduced motion, escaped text rendering, loading, and retry.

## Files

- `server.js`: static server, protected chat endpoint, request limits and provider integration.
- `data/portfolio.json`: server-only authoritative portfolio facts.
- `public/`: original site, inline SVG mascot, chat UI.
- `test/server.test.js`: backend integration tests.
- `.env.example`: safe configuration template.

## Repository

Source is prepared in the connected `Merlinsam-M/Portfolio` checkout. This delivery does not imply a GitHub push or public deployment. The ZIP includes source and lockfile, excludes dependencies, credentials, and Git metadata.

## Vercel

Import this repository into Vercel. `vercel.json` serves `public/` and routes API requests to the Express serverless function. No frontend build command is required. Set `APP_ORIGIN` to the exact final site origin, and set `OPENAI_API_KEY` securely before enabling live AI. The current deployment hostname is accepted by default when APP_ORIGIN is absent. Preview or alias domains require the corresponding APP_ORIGIN setting. Redeploy after changing variables. Rate limits are per serverless instance; configure a shared rate-limit store or Vercel firewall rate limits before enabling a public paid AI endpoint. Without an API key, the public portfolio works and chat reports that configuration is required.
