# Production Deployment

TrueVine Quiz & Assessments is a Next.js app deployed to Vercel at `quiz.tvcsydney.com`.

## Predeploy Gate

Run this from the project root before pushing deployment changes:

```bash
npm run predeploy
```

This runs:

```bash
npm run test
npm run typecheck
npm run build
```

For a production dependency audit, use HTTPS for the npm registry if your local npm config still points to `http://registry.npmjs.org`:

```bash
npm_config_registry=https://registry.npmjs.org npm audit --omit=dev
```

## Vercel Settings

The app is configured by `vercel.json`:

```json
{
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run build"
}
```

## Environment Variables

Optional:

- `HOLOCARE_API_URL` - upstream HoloCare backend origin. Defaults to `https://api.holocare.app`.

The browser should call the same-origin proxy route:

```text
/api/assessment-campaigns/...
```

The proxy forwards to:

```text
${HOLOCARE_API_URL}/api/assessment-campaigns/...
```

## Deployment Checklist

- Commit all source, config, lockfile, and `public/` assets.
- Run `npm run predeploy` successfully.
- Run `npm_config_registry=https://registry.npmjs.org npm audit --omit=dev` and confirm `0 vulnerabilities`.
- Confirm Vercel project domain points to `quiz.tvcsydney.com`.
- Confirm anonymous assessment campaign flows still use the same-origin proxy.
