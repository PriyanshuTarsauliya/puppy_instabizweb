# TeddyPups U.A.E. — Website Clone

Premium teacup puppies in Dubai — Website Clone.

## 🚀 Deploying to Vercel

### Option 1: Vercel CLI
Run the following command from the project root:
```bash
npx vercel
```
For production deployment:
```bash
npx vercel --prod
```

### Option 2: Git Repository (GitHub / GitLab / Bitbucket)
1. Push this folder to your Git repository.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository.
4. Leave settings as default (`vercel.json` automatically configures output directory, rewrites, and headers).
5. Click **Deploy**.

---

## 🛠 Project Structure
- `public/` — Static site assets:
  - `index.html` — Homepage
  - `_next/` — Bundles, CSS, and fonts
  - `media/` — Puppy photos and gallery assets
  - `brand/` — Logo
  - `cursor/` — Custom SVG paw cursors
- `api/image.js` — Serverless function handling `/_next/image?url=...` image requests with 1-year immutable caching
- `vercel.json` — Vercel deployment configuration
- `package.json` — Node.js project configuration
- `server.js` — Local preview server (`npm start`)
