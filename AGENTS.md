<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project instructions

This is a frontend-only Habix Music Group website built with Next.js 16 App Router and deployed to Cloudflare Workers through OpenNext. Site copy and presentation are local; no Sanity project or content API is required.

- Use `npm run dev` for local Next.js development. `npm run cf:build` creates the OpenNext output; `npm run cf:preview` previews it in the Workers runtime; `npm run cf:deploy` deploys the Worker and its custom domain.
- The Worker and `music.habixgroup.top` custom domain are configured in `wrangler.jsonc`. Deploy from a Cloudflare account where `habixgroup.top` is an active zone.
- Production images use Cloudflare `/cdn-cgi/image` transformations. Those transformations must be enabled for the domain; local development loads source images directly.
- The wallet UI connects to browser wallets and reads the HBX balance through Solana devnet RPC. Do not add wallet or RPC secrets to client-side environment variables.
- CI runs type-check, lint, OpenNext build, and the Playwright end-to-end suite. Run `npm run type-check`, `npm run lint`, `npm run cf:build`, and `npm run test:e2e` when validating changes.
- The `<!-- BEGIN:nextjs-agent-rules -->` block above is written/re-added by `next dev`; keep it in the repository.
