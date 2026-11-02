# Habix Music Group

The HMG marketing site is a static-first Next.js 16 App Router application. Wallet connection and HBX devnet balance lookup run in the browser; the site does not require a content API or private environment variables.

## Local development

```sh
npm install
npm run dev
```

## Cloudflare Workers

The site uses [OpenNext for Cloudflare](https://opennext.js.org/cloudflare) and Wrangler. `wrangler.jsonc` configures the Worker and attaches the `music.habixgroup.top` custom domain at deployment. Since the site has no runtime content revalidation, `open-next.config.ts` uses the read-only Workers Static Assets cache; no R2 bucket or queue is required.

1. Make sure `habixgroup.top` is an active zone in the Cloudflare account you will deploy from.
2. Enable Cloudflare Image Transformations for the zone. The Next.js image loader uses `/cdn-cgi/image` in production and serves source files directly during local development.
3. Install dependencies and authenticate Wrangler:

   ```sh
   npm install
   npx wrangler login
   ```

4. Preview in the Workers runtime, then deploy:

   ```sh
   npm run cf:build
   npm run cf:preview
   npm run cf:deploy
   ```

Wrangler will create the custom-domain DNS record and certificate for `music.habixgroup.top`; remove any conflicting A, AAAA, or CNAME record first.

The HBX balance reads the devnet token account from Solana's public devnet RPC. Do not put private RPC credentials or other secrets in `NEXT_PUBLIC_*` variables.

## Validation

```sh
npm run type-check
npm run lint
npm run cf:build
npm run test:e2e
```
