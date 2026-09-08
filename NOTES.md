# Notes — Anatomy of a Webpage (Eleventy rebuild)

## Stack

Eleventy v3, Nunjucks, plain CSS, vanilla JS, `html2canvas` as the one real
npm dependency (bundled locally, not CDN-loaded). Fonts (Fredoka, Nunito,
Space Mono) are loaded from Google Fonts CDN rather than self-hosted, per
your request while you may still change them — swapping to self-hosted later
just means downloading the woff2 files and adding `@font-face` rules,
nothing structural changes. No build step beyond Eleventy. `npm start` runs
`eleventy --serve`.

## Direction history — read this first

The build went through two visual directions before landing here:

1. **First pass: editorial.** Narrow reading column, margin annotations,
   hairline rules. Built per the original brief. You reviewed it and said
   the cream background made content "blend in" and asked for something
   brighter and more fun — editorial wasn't the right fit for this subject.
2. **Comparison round.** I mocked up three bright directions as a separate
   artifact so you could compare real content in each: **Inspector Mode**
   (DevTools element-inspector color language), **Sticker Sheet** (rounded,
   rotated, colorful cards), **Terminal Arcade** (dark neon). You picked
   Sticker Sheet, then asked for a combo of Sticker Sheet and Inspector Mode.
3. **What actually got built** (current state): Sticker Sheet is the base —
   Fredoka display type, rounded pill buttons, thick-outlined rotated color
   cards in coral/pink/teal/sun. Inspector Mode contributes the monospace
   `tag-chip` badges (the small dark pills showing real HTML tags like
   `<header>`, `<nav>`) and the literal box-model/layer color-coding used in
   the z-index demo.

If you want to see the three original options again, they're still live at
the artifact link from that round of the conversation.

## Colors — verified, not guessed

The sticker palette (coral `#FF6B5B`, pink `#FF3D9A`, teal `#00BFA5`, sun
`#FFD23F`) is **fixed** — it does not change between light and dark mode.
This was a deliberate finding, not a style choice: I calculated relative
luminance for text-on-fill combinations before picking a rule, and the
mockup's own approach (white text on coral) only clears **2.8:1** contrast —
well under the 4.5:1 WCAG AA needs. Dark ink text (`--fixed-ink`, `#22182B`)
on every one of the four sticker colors clears 5.1–11.8:1, so that's the
rule used everywhere: **bright fills always pair with dark ink text and
borders, in both themes.**

Page chrome (background, body text, neutral card surfaces) uses separate
theme-swapping tokens (`--paper`, `--ink`, `--surface`, `--rule`) that do
invert normally for dark mode. Inline accent text/links use yet another set
(`--accent-pink/-teal/-coral`) — darker, text-safe variants of the sticker
hues, because the bright fill colors themselves fail 4.5:1 as small text on
the cream page background (pink-on-cream is only 3.14:1, teal-on-cream is
2.23:1). Three color "roles" sounds like a lot, but each solves a contrast
problem the other two can't.

## Bugs found and fixed along the way

- **`<dialog>` centering** (carried over from the editorial build, still
  relevant): the CSS reset's `* { margin: 0 }` wipes out `<dialog>`'s native
  auto-margin centering, pinning modals to the top-left corner and breaking
  backdrop-click-to-close. Fixed with explicit
  `position: fixed; top/left: 50%; transform: translate(-50%,-50%)`.
- **Editorial breakout-grid containment bug**: a nested `{% set %}`/macro
  block put a `.demo--full` element three DOM levels deep inside non-grid
  ancestors, so its `grid-column` had no effect. This whole class of bug is
  why the current layout uses one plain `.container { max-width; margin:
  auto }` instead of a breakout grid — there's no clever column-line system
  left to accidentally escape.
- **Dictionary panel two-column layout**: `.dict-panel > div` didn't match
  because the term/definition `<div>`s are children of a `<dl>`, not direct
  children of `.dict-panel` — the grid columns silently never applied and
  terms stacked vertically instead of sitting beside their definitions.
  Fixed the selector to `.dict-panel dl > div`.
- **Parallax gradient**: tried a coral→pink→teal gradient two different ways
  (plain RGB blend, then `oklch` hue interpolation) and both produced an
  unwanted result — RGB blending muddied to gray-purple in the middle, and
  `oklch`'s shortest hue path from pink to teal detours through blue instead
  of through coral. Settled on a flat pink fill, which also just suits the
  flat "sticker" aesthetic better than a gradient would.
- **Glassmorphism demo was invisible**: `backdrop-filter: blur()` needs
  something visually busy behind it to actually read as glass — sitting on
  a plain modal background, the blur had nothing to blur. Added a colorful
  radial-gradient pattern behind the glass card specifically so the effect
  is visible.

## Content additions beyond the original audit

- **Quiz** (`#quiz`, end of page): six multiple-choice questions pulled
  directly from the page's own content (contrast ratios, z-index values,
  nav item limits, CTA definition, the 8pt grid, `<dialog>`'s native
  behavior). Answering a question locks it, shows correct/incorrect
  instantly (teal/coral), reveals a one-line explanation, and updates a
  running score badge. A "Try Again" button resets everything. Built with
  native `<fieldset>`/`<legend>`/radio inputs so it's keyboard- and
  screen-reader-accessible without extra ARIA scaffolding.
- **Real HTML tags on the Essential Sections cards**: each of the six
  section cards (Hero, Navigation, etc.) carries a small tag-chip showing
  the actual semantic element it maps to (`<header>`, `<nav>`, `<footer>`,
  etc.) — a direct, low-cost reinforcement of the "Semantic HTML" glossary
  entry, and the main place the Inspector Mode half of the combo shows up
  outside the z-index demo.
- **Wireframe blueprint now has varied block shapes**, per your explicit
  request — the hero block is tall and centered with a gradient tint, the
  Problem section is three small equal cards, testimonials are two wider
  cards with an avatar circle and star rating, pricing is three columns with
  the middle tier raised and badged, results are big stat numbers, FAQ is
  short list rows. Previously every block used the same uniform box style
  regardless of what it represented.

## What's carried over unchanged

Every interactive mechanic from the audit still works exactly as before —
only the CSS classes changed, not the JavaScript logic: native `<dialog>`
modals (open/close/Escape/backdrop-click/focus-return), the grid overlay
toggle (`G` key or nav button, now with `aria-pressed`), dark mode toggle
(new, since the source never had one, but the brief requires it), scroll
progress bar (also new, same reasoning), copy-to-clipboard for the glass CSS
snippet, and the PNG export via a locally-bundled `html2canvas` (not the
source's CDN-lazy-load pattern).

**Copy-to-clipboard note carried over from testing**: driving the page with
real browser automation, `navigator.clipboard.writeText()` consistently
fails with a permission error in both headless and headful automated Chrome,
even with permissions explicitly granted — this reproduces regardless of
automation mode, pointing to a Chrome DevTools Protocol restriction rather
than a code defect. Manually clicking "Copy" in a normal browser tab should
just work; I wasn't able to verify that last mile through automation.

## Open items

- **Real logo files**: placeholder wordmark/favicon SVGs (in sticker
  colors now) are in `src/assets/img/logo/`, clearly commented as
  stand-ins, ready to swap when you have real files.
- **Fonts on CDN**: intentional per your note that you might change them —
  revisit self-hosting once they're final.
- **Content suggestions from the original audit** (forms/input states, a
  live contrast checker, a tab-order visualizer, a breakpoint/responsive
  demo, more glossary terms) are still open — the quiz was the one addition
  you asked for directly; the rest are still just proposals.
