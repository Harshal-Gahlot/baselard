/**
 * HOMEPAGE VARIANT SWITCHBOARD
 * Change these values to compare designs. Do not edit page markup for a variant swap.
 * Available values are documented in PROJECT_MAP.md and README.md.
 */
export type HeroVariant = 'sonic' | 'type' | 'console';
export type ProjectsVariant = 'editorial' | 'index' | 'rail';
export type CreditsVariant = 'wall' | 'ticker' | 'editorial';
export type CapabilitiesVariant = 'index' | 'grid' | 'accordion';
export type StudioVariant = 'split' | 'stack' | 'manifesto';
export type TestimonialsVariant = 'feature' | 'grid' | 'list';
export type ContactVariant = 'statement' | 'split' | 'card';

export interface ExperienceConfig {
  hero: HeroVariant;
  projects: ProjectsVariant;
  credits: CreditsVariant;
  capabilities: CapabilitiesVariant;
  studio: StudioVariant;
  testimonials: TestimonialsVariant;
  contact: ContactVariant;
}

export const EXPERIENCE: ExperienceConfig = {
  hero: 'sonic',           // sonic | type | console
  projects: 'editorial',   // editorial | index | rail
  credits: 'ticker',         // wall | ticker | editorial
  capabilities: 'accordion',   // index | grid | accordion
  studio: 'split',         // split | stack | manifesto
  testimonials: 'feature',// feature | grid | list
  contact: 'split',    // statement | split | card
};
