# YOSSEUF AI Core Design System Migration

## Status

Migration wave 1 is active on `design-system/migration-v1`.

## Foundation source

- Repository: `Yosseuf3/yosseuf-design-system`
- Release: `v1.0.0`
- Canonical tokens: `packages/tokens/src/tokens.json`

## Implemented in wave 1

- Added a local semantic adapter in `app/brand.css`.
- Replaced the legacy violet-led identity layer with the approved restrained obsidian, ivory, and purposeful-gold language.
- Added Foundation aliases for color, radius, shadow, and motion.
- Added semantic roles for canvas, raised surfaces, text, borders, accents, and status colors.
- Added visible `:focus-visible` behavior.
- Added reduced-motion support.
- Added RTL-safe logical properties for key navigation behavior.
- Preserved temporary legacy aliases to keep the migration reversible while remaining screens are converted.

## Remaining work

- Remove raw product-facing colors from `app/globals.css` section by section.
- Convert component-specific states to semantic roles.
- Add automated validation against new raw color declarations.
- Run build, lint, tests, and responsive review.
- Remove temporary legacy aliases after the final consumer has migrated.

## Decision record

The Foundation release remains the source of truth. Product code may introduce local semantic roles, but it must not redefine the canonical palette or use raw palette values directly in components.
