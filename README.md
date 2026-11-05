# Baselard Studios — Astro build

A design-first, multi-page Astro rebuild with a **single component-variant switchboard**. The project uses real project names, service categories, testimonials, press references, and studio photography found on Baselard's public website. Where a project-specific image, audio file, or video URL could not be verified, the design uses typographic artwork and links to a search/release listing instead of pretending an asset exists.

## Run locally

Requirements: Node.js `>=22.22.0` and Bun. `.nvmrc` selects Node 24 (recommended).

```bash
bun install
bun dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`). `bun dev` binds to `0.0.0.0`, so another device on the same network can open the laptop's local IP and port `4321`.

## Build and preview

```bash
bun run check
bun run build
bun preview
```

## Change component versions

Open **`src/config/experience.ts`**. Each major homepage section has one selected variant. Change only the string value to switch the design; no page edits are needed.

```ts
export const EXPERIENCE = {
  hero: 'sonic',          // sonic | type | console
  projects: 'editorial',  // editorial | index | rail
  credits: 'wall',         // wall | ticker | editorial
  capabilities: 'index',  // index | grid | accordion
  studio: 'split',        // split | stack | manifesto
  testimonials: 'feature',// feature | grid | list
  contact: 'statement',   // statement | split | card
} as const;
```

Every major section currently has up to **three implementations**. The selected wrapper imports all alternatives and renders the configured one. Keep the switchboard as the only place where homepage variants are selected.

## Content editing

- `src/data/projects.ts` — work archive; edit title, category, services, summary, featured flag, and external lookup URL.
- `src/data/studio.ts` — studio details, capabilities, testimonials, press outlets, collaborators, founder information.
- `src/config/site.ts` — title, description, contact details, social URLs.
- `src/config/experience.ts` — visual variants.

## Optional YouTube release discovery

The project includes a local sync script for discovering public uploads. It does **not** assume every upload is a Baselard project: synced entries are labelled `YouTube discovery` until reviewed. The public founder page links to `@aikarth`; confirm that this is the correct channel for the studio’s project feed before enabling the sync.

1. Copy `.env.example` to `.env`.
2. Add a YouTube Data API v3 key and the channel handle or ID (`YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL`). The official founder page currently links to `@aikarth`; verify that this is the intended uploads feed before syncing. Keep the key local; never expose it in frontend code.
3. Run `bun run sync:youtube`.
4. Review `src/data/generated/youtube-releases.ts` and confirm which uploads are genuinely studio projects. Add exact credits/categories to `src/data/projects.ts` as needed.

With a non-empty feed, the homepage's selected-project area uses the three newest discovered uploads, and the work archive includes a separate `New uploads` filter. Without a feed, the homepage falls back to the three projects currently featured on the public Baselard homepage.

## Important content / integration notes

- The current live site publicly lists projects such as *Mera Dil Pahadon Me*, *Chhore Rajasthan Ke*, *The Sabarmati Report — Raja Ram (Teaser Version)*, *Tum Prem Ho*, *Naina Milaike*, and other originals. Those names and the service credits have been carried into the editable archive.
- Public studio photography is referenced from the existing Baselard website. Replace those remote URLs with locally licensed/owned optimized files in `public/images/` before launch if desired.
- Project cards link to YouTube search results rather than invented video IDs. Replace each `watchUrl` with an exact official release URL after confirming it.
- The public pages expose testimonials from Vishal Malviya, Lokesh Paliwal, Yogendra Purohit and Shipra Majumdar. Their wording is preserved as presented by the source site.
- Contact form currently uses a `mailto:` fallback and WhatsApp link. A real CRM/backend submission needs a server endpoint or form provider.
- No audio master files were available from the public source review. The site does not fake audio playback. Add an authorized `audioSrc` when the studio supplies one.
- Metrics, trademark data, equipment inventory and some extended credits from the planning brief are intentionally not hard-coded as public proof unless separately verified.

## Routes

- `/` — homepage
- `/work/` — searchable and filterable project archive
- `/services/` — service/capability breakdown
- `/studio/` — spaces and facilities
- `/story/` — founder / studio story
- `/press/` — press features and recognition
- `/contact/` — enquiry and contact details

## Architecture

Astro static pages + `.astro` components + TypeScript data + one small client-side script. There is no React runtime, no heavy animation dependency, and no database requirement for this v1. See `PROJECT_MAP.md` and `AGENTS.md` before making structural changes.
