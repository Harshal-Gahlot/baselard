# Agent rules — Baselard Studios

## Non-negotiable architecture
- Build on Astro; use Bun commands in docs and scripts.
- `src/config/experience.ts` is the single source of truth for homepage component variants.
- Major section wrappers own the alternatives; pages must not import variant implementations directly.
- Keep content out of components: edit `src/data/*` or `src/config/site.ts`.
- Keep interactions in `src/scripts/site.ts`; ensure they are idempotent and re-initialize after Astro navigation.
- YouTube sync is a local discovery tool only; never promote synced uploads into studio credits without human review.
- Prefer Astro/HTML/CSS and small vanilla TypeScript over adding client frameworks.

## Quality rules
- Never fabricate project assets, endorsements, review text, metrics, release dates, equipment lists, or client relationships.
- Use exact verified URLs when available. A YouTube search URL is a discovery link, not a verified video.
- Preserve real testimonial wording and attribution; get approval before editing quotes.
- Avoid autoplaying audio. Respect reduced motion, keyboard navigation, focus visibility, alt text, and semantic headings.
- Keep images responsive with dimensions/aspect ratios and a sensible fallback background.
- Avoid shipping large animation libraries for effects CSS can handle.
- Do not introduce a dependency without explaining why and updating README/package files.

## Update protocol
1. Inspect `PROJECT_MAP.md`, `src/config/experience.ts`, and the specific files before editing.
2. Preserve local changes. If the user supplies changed files, reconcile against those versions before replacing anything.
3. Make the smallest complete change; list every added/modified/deleted path in the chat response.
4. Update `PROJECT_MAP.md` or `CHANGELOG.md` when architecture or ownership changes.
5. Run `bun run check` and `bun run build` when the environment permits. Report unrun checks honestly.
