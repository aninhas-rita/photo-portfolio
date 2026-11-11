# Photo Portfolio — Template

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

## Run it

Content and uploads are stored in **Vercel Blob**, not the local
filesystem — so even running locally needs a Blob store connected (this is
what makes the admin actually work once deployed to Vercel, where the
filesystem is read-only in production).

1. Push this to a GitHub repo and import it on vercel.com, **or** run
   `npx vercel link` locally to connect this folder to a Vercel project
   without deploying yet.
2. In the Vercel dashboard → your project → **Storage** tab → create a
   **Blob** store and connect it to the project. This sets
   `BLOB_READ_WRITE_TOKEN` automatically for the deployed app.
3. For local dev, pull that token down: `npx vercel env pull .env.local`
   (or copy it manually from the store's settings into `.env.local`).
4. Add `ADMIN_PASSWORD` to `.env.local` (and to the project's Environment
   Variables in the Vercel dashboard, for production).

```
npm install
npm run dev
```

Open http://localhost:3000 for the site, http://localhost:3000/admin for
the content manager. The very first page load seeds the Blob store with
the placeholder content, so the admin and the site start in sync.

### Deploying

Once the Blob store is connected and `ADMIN_PASSWORD` is set in the
project's environment variables, `git push` (if using the GitHub
integration) or `npx vercel --prod` deploys it. No further setup —
uploads and edits made through `/admin` persist in Blob storage and show
up immediately (pages are rendered dynamically, not statically cached).

(The production `npm run build` needs to fetch `Cormorant Garamond`, `Jost`,
and `Petit Formal Script` from Google Fonts at build time — that requires
normal internet access, which wasn't available in the sandbox this was
built in. `npm run dev` works the same way and will fetch them fine on
your machine.)

## Structure

```
app/
  layout.tsx              true root: fonts + globals only, no chrome
  (site)/                  the public site — has its own layout with
                            Navbar/Footer/PageTransition
    page.tsx                home — hero + attractions row + approach + testimonials
    about/page.tsx
    gallery/page.tsx         all folders
    gallery/[folder]/page.tsx   one folder's masonry grid + lightbox
  admin/                    the content manager (password-gated, not linked
                            anywhere public — reachable only by URL)
    login/page.tsx
    page.tsx                 folder list (create / delete)
    [slug]/page.tsx           one folder: edit details, upload, edit/delete
                              items, set cover
  api/admin/                 routes the admin pages call (auth, galleries,
                            items) — all write through lib/content.ts
components/
  Navbar, Footer, Hero, AttractionsRow, ApproachSection, Testimonials
  MasonryGrid, LazyMount, Lightbox, GalleryView, PlaceholderMedia
  admin/                    FolderList, GalleryEditor, LogoutButton
lib/
  types.ts                  Gallery / MediaItem shape
  content.ts                 the ONLY place that reads/writes the content Blob
  data.ts                     what public pages import (async, read-only)
  seed-data.ts                 placeholder content, written to
                              the content Blob the first time the site runs
middleware.ts                 gates /admin and /api/admin behind a password
(content and uploads live in Vercel Blob, not in this folder — see below)
```

## How the admin works

Everything she needs is at `/admin` (not linked from the public site —
that's the "hidden" entry point). It's a plain file-manager layout:

- `/admin` — list of folders. Create a new one, open one, or delete one.
- `/admin/<folder>` — inside a folder: edit its title/location/year/
  description, upload photos or videos (drag in multiple at once), edit
  each item's alt text and caption, mark one as the cover, or delete it.

It's protected by a single shared password (`ADMIN_PASSWORD` in `.env.local`,
defaults to `changeme` if unset — **change this before putting the site
anywhere public**). There's no per-user account system; it's one password
for whoever's managing the content.

Uploaded files are saved to Vercel Blob (`uploads/<folder>/...`) and immediately
served as real, optimized images via `next/image` (automatic WebP/AVIF,
responsive sizing) — nothing stays a placeholder once she's uploaded to
that slot. Image dimensions are read server-side on upload (via
`image-size`) so the layout never jumps around while loading.

### How storage works, and its one real limitation

All gallery metadata (titles, descriptions, captions, which items exist)
lives in a single JSON file stored as a Vercel Blob (`content/data.json`).
Every uploaded photo/video is its own Blob under `uploads/<folder>/`. This
is genuinely fine for a site this size and avoids standing up a database —
but it's worth knowing the trade-off:

- **No real concurrency control.** If the metadata JSON is edited from two
  admin tabs/devices at the same moment, the second write wins and the
  first is silently lost. For one person managing content, this is a
  non-issue in practice — it'd only bite with simultaneous edits.
- **Everything is public.** Blob URLs (`access: "public"`) are
  unguessable but not access-controlled — anyone with a direct link to a
  photo can view it, same as any other CDN-hosted image. The `/admin`
  routes themselves are still password-protected.

If the site grows to the point where either of those actually matters
(many editors, or content sensitive enough to need access control), the
metadata would move to a real database (Vercel Postgres/Neon). Because
every read/write already goes through the three functions in
`lib/content.ts`, that swap is contained to that one file plus the upload
route — nothing else in the app needs to change.

## Performance choices already in place

- `LazyMount` keeps offscreen gallery tiles out of the DOM until they're
  close to the viewport (good for up to a few hundred items per folder;
  flagged in the code for where to swap in a proper virtualizer like
  `react-virtuoso` once folders get larger than that).
- Fluid type via `clamp()` instead of breakpoint jumps.
- All animation is `opacity`/`transform`/`height` only (GPU-cheap), and
  `prefers-reduced-motion` is respected globally in `globals.css`.
- Masonry uses CSS `columns`, no JS layout calculation.
- Public pages are `dynamic = "force-dynamic"` so admin edits show up
  immediately without a rebuild.

## Still to build / decide

1. Real copy, photos and testimonials for Home/About once available.
2. A proper per-user login if more than one person will ever manage content.
3. If uploaded videos get long/large, consider a dedicated video host (Mux,
   Bunny Stream) for adaptive streaming — Blob serves the file as-is, with
   no transcoding or quality renditions.
