# Changelog

## 1.2.2 — fix type safety for switchboard variants and clean unused imports
- Added explicit type unions (`HeroVariant`, `ProjectsVariant`, `CapabilitiesVariant`, etc.) and `ExperienceConfig` type annotation to `EXPERIENCE` in `src/config/experience.ts` to prevent TypeScript narrow-literal comparison errors in section switch wrappers.
- Removed unused `SITE` import from `src/components/global/Header.astro`.
- Removed unused `index` prop destructuring from `src/components/global/ProjectCard.astro`.
- Verified clean build and type check with `bun run check` and `bun run build`.

## 1.2.1 — hero sonic footnote alignment and labels
- Updated footnote in `HeroSonic.astro` to feature "UDAIPUR · INDIA" on the left and "COMPOSITION · PRODUCTION · SOUND · VIDEO" on the right.
- Removed the redundant bottom absolute strip in `HeroSonic.astro`.
- Expanded `.hero-footnote` max-width and spacing for clean alignment.

## 1.2.0 — editorial projects layout and grand cta
- Removed top-aligned "View all projects" link in `ProjectsEditorial.astro` and repositioned it centered beneath the featured work cards.
- Designed a grand pill button (`.button-grand`) with depth shadows, micro-meta subtitle, hover glow, and interactive arrow badge.
- Adjusted description text alignment and spacing in `.section-heading-side` for headings without inline links.

## 1.1.0 — credits UI and brand logo enhancements
- Added authentic vector SVG logos and metadata for all industry collaborators (Zee Music Company, Global Music Junction, Balaji Telefilms).
- Added publication logos, media classifications, and interactive outbound cards for all press outlets (The Statesman, ANI, Mid-Day, Yahoo News, Dailyhunt, IBTimes, UdaipurBlog, LatestLY).
- Upgraded `CreditsWall.astro` with collaborator brand logo marks, sector tags, verified studio credit indicators, and press outlet cards.
- Upgraded `CreditsTicker.astro` into a true logo marquee featuring seamless multi-loop playback, collaborator logos, and interactive press chips.
- Upgraded `CreditsEditorial.astro` with an official Baselard Studios seal badge, indexed collaborator rows with logo containers, and press chip links.
- Created `CreditLogo.astro` component to render accessible, scalable vector logos across credits variants.
- Integrated official Baselard Studios seal (`logo.jpg`) into `public/images/logo.jpg`.

## 1.0.0 — initial build
- Created Astro 7.4.5 project with Bun scripts and a vanilla Astro architecture.
- Added central variant switchboard and three alternatives for each major homepage section.
- Added homepage, work, services, studio, story, press and contact routes.
- Added public-source project names, service taxonomy, testimonials and press references.
- Added project filtering, mobile navigation, reduced-motion-aware reveal effects and contact mailto fallback.
- Added an optional local YouTube Data API discovery script with manual review guardrails.
- Added project map, agent rules and content-source notes.
