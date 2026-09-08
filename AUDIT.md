# Audit — Anatomy of a Webpage

Source file: `pea-lab/src/pages/learn/site-anatomy.astro` (2,854 lines).

**Correction to the build brief:** the source project is **Astro 5** (with React
islands and Tailwind 4 used elsewhere in the repo), not Next.js. This specific
page, however, uses none of that — no React, no Tailwind, no shared layout. It
is a fully self-contained `.astro` file: its own `<!DOCTYPE html>` document, its
own CSS reset and design tokens, and one plain vanilla-JS `<script>` block. It
does not import `BaseLayout.astro`, `ToolLayout.astro`, or
`src/styles/global.css`, and none of `src/components/*` (brandmark,
launch-quest, moodboard, type-pairer) are referenced. Confirmed by grep for
imports and by a full top-to-bottom read — treat this page as siloed reference
material, not a hub tied into the rest of pea-lab's design system.

Logo files (`wa-lockup-horizontal.svg`, `wa-favicon.svg`, reversed lockup)
referenced in the build brief do not exist anywhere in the workspace. Per your
direction, Phase 2 will generate a placeholder text/type-based wordmark using
the brand tokens, clearly flagged as a stand-in until you supply real files.

File map:
- Lines 1–78: Astro frontmatter — two JS data arrays, `sections` (6 entries)
  and `devTerms` (12 glossary entries), both rendered into the page via `.map()`.
- Lines 81–868: HTML body.
- Lines 870–1035: one `<script>` block — all interactivity, vanilla JS.
- Lines 1037–2854: one `<style>` block — all CSS, including 2 `@keyframes` and
  5 `@media` breakpoints.

---

## 1. Section inventory (document order)

| # | Anchor / element | Heading | Purpose | Current layout pattern | Lines |
|---|---|---|---|---|---|
| 1 | `#gridOverlay` | — | 12-col grid overlay, toggled by `G` key or nav button | Fixed 12-col CSS grid, hidden until toggled | 152–156 |
| 2 | `nav.top-nav` | logo "pea.lab" | Sticky top nav | Flex bar, logo left / links right / grid-toggle button | 158–175 |
| 3 | `header.hero` | "Anatomy of a **Webpage**" | Hero | Centered flex hero, caption + H1 + copy + 2 CTAs + fold indicator | 177–195 |
| 4 | `#anatomy` | "The Anatomy Revealed" | Labeled mock browser window, 5 hover tooltips | Mock browser chrome with 5 hover-triggered marker/tooltip pairs | 197–292 |
| 5 | *(no id)* `.principles-section` | (F-Pattern / Z-Pattern / 8pt Grid) | 3 design-principle callouts | 3-card grid | 294–312 |
| 6 | `#sections` | "The Essential Sections" | The 6 core sections, generated from `sections` array | Bento grid: 2 large cards + 4 medium cards | 314–337 (data: 2–63) |
| 7 | `#typography` | "Typography Scale" | Type scale demo, H1→Caption | Vertical stacked live-styled examples | 339–370 |
| 8 | `#spacing` | "Spacing System" | 8pt spacing scale demo | Row of sized boxes + pro-tip callout | 372–411 |
| 9 | `#buttons` | "Button States: The 4 Horsemen" | Button state demo | 4-card grid, each a simulated button state | 413–444 |
| 10 | `#zindex` | "Z-Index: The Layer Cake of Chaos" | Stacking-order demo | 4 stacked/offset bars at z: 1, 10, 100, 1000 | 446–473 |
| 11 | `#a11y` | "Accessibility (A11y): Design for Humans" | A11y principles + code sample | 4-card grid + static `<pre><code>` snippet | 475–513 |
| 12 | `#parallax` | "Parallax: The Depth Illusion" | CSS-only parallax section | Full-bleed fixed-background image + overlay text + tip | 515–529 |
| 13 | `#dictionary` | "Dev Dictionary" | 12-term glossary, generated from `devTerms` array | `dt`/`dd` pairs in a card grid (no enclosing `<dl>` — see §6) | 531–548 (data: 65–78) |
| 14 | `#lab` | "Learn by Exploring" | Entry points to the 2 modals | 2-card grid, each card a button opening a `<dialog>` | 550–578 |
| 15 | `dialog#glassModal` | "Glassmorphism Explained" | Modal: glassmorphism explainer + copyable CSS | Native `<dialog>`, live glass demo + code block + copy button | 580–613 |
| 16 | `dialog#homepageModal` | "Homepage Anatomy Blueprint" | Modal: 10-section homepage wireframe + PNG export | Native `<dialog class="modal-large">`, scrollable body, download button | 615–858 |
| 17 | `footer.page-footer` | — | Keyboard hint + copyright | Centered text | 860–865 |

---

## 2. Content extraction (verbatim)

### Head
- Title: `Anatomy of a Webpage | pea.lab`
- Meta description: `An interactive guide to webpage anatomy and design principles`
- (Separate, and different, copy exists on `index.astro`'s tool-card listing for this page: "Interactive guide to webpage structure. Learn the essential building blocks: hero, navigation, typography, spacing, and more." — worth preserving somewhere if a similar index/landing card is ever built for the new site.)

### Nav
- Logo: `pea.lab` (links to `/`)
- Links: `Anatomy` `#anatomy`, `Sections` `#sections`, `Buttons` `#buttons`, `A11y` `#a11y`, `Dictionary` `#dictionary`
- Grid-toggle button: no visible label, `title="Toggle grid (G)"`, inline 4-square SVG icon

### Hero
- Caption: `Interactive Guide`
- H1: `Anatomy of a **Webpage**` (span-accented word: "Webpage")
- Body: `Every great website follows the same fundamental structure. Learn the building blocks that make sites work.`
- CTAs: `See the Blueprint` (→ `#anatomy`), `Learn the Sections` (→ `#sections`)
- Fold indicator: `The Fold — Scroll to explore` + a `v` glyph (`aria-hidden="true"`)

### "The Anatomy Revealed" (mock browser + 5 hover tooltips)
- Caption: `Visual Blueprint` · H2: `The Anatomy Revealed`
- Body: `Hover over each section to learn what it does and why it matters.`
- Mock URL bar: `https://creativepea.com`
- Mock nav content: `Brand`, `Home`, `About`, `Services`, `Contact`
- Tooltip 1 — **Navigation**: "The wayfinding system. Logo left, links right. Keep it under 7 items."
- Mock hero content: `Your Main Headline Here`, `Supporting text that explains your value proposition`, `Get Started`
- Tooltip 2 — **Hero Section**: "Your value proposition in 6-8 words. One CTA. Make it count."
- Mock fold label: `-- The Fold --`
- Tooltip 3 — **The Fold**: "Everything above here is seen without scrolling. Put your best content here."
- Mock content section title: `Features` (3 empty mock cards)
- Tooltip 4 — **Content Sections**: "Features, benefits, social proof. Use clear headings and whitespace."
- Mock footer content: `About`, `Privacy`, `Terms`, `Contact`
- Tooltip 5 — **Footer**: "Contact info, social links, legal pages. Where skeptics look for trust."

### Principles (3 callouts, no section heading of its own)
- **F-Pattern Reading** (icon `F`): "Users scan in an F-shape: top-left to right, then down the left side. Place important content along this path."
- **Z-Pattern for Landing** (icon `Z`): "On image-heavy pages, eyes move in a Z: top-left, top-right, diagonal down, bottom-left to right."
- **8pt Grid System** (icon `8`): "All spacing uses multiples of 8px. This creates visual rhythm and makes responsive design predictable."

### The Essential Sections
- Caption: `Building Blocks` · H2: `The Essential Sections`
- Body: `Master these six elements and you will understand 90% of web design.`
- Cards (title / description / tips), from the `sections` data array, verbatim:

  1. **The Hero** — "The first thing visitors see. Makes or breaks the first impression."
     - Keep copy concise - aim for 6-8 words in the headline
     - Use one clear call-to-action, not five
     - Hero images should support, not distract from the message
  2. **Navigation** — "The roadmap to your content. Should be invisible until needed."
     - Maximum 7 items in primary navigation
     - Logo always links home
     - Current page should be visually distinct
  3. **The Fold** — "The visible area before scrolling. Still matters in 2026."
     - Core value proposition must be above the fold
     - Include a scroll indicator if content continues
     - Don't cram everything - tease what's below
  4. **Typography Hierarchy** — "Visual hierarchy through type creates scannable content."
     - Limit to 2-3 font families maximum
     - Use consistent heading sizes (H1 > H2 > H3)
     - Body text: 16-18px for screens
  5. **Whitespace** — "The breathing room that makes content digestible."
     - More whitespace = more premium feel
     - Use consistent spacing units (8px base)
     - Let important elements breathe
  6. **Footer** — "The last impression. Where skeptical visitors look for legitimacy."
     - Include contact info and social links
     - Secondary navigation for SEO
     - Copyright and legal links belong here

  (Cards 1–2 render as the large bento tiles, 3–6 as medium — a distinction
  that can simply become reading order in the editorial layout.)

### Typography Scale
- Caption: `Type System` · H2: `Typography Scale`
- Body: `Consistent type sizes create hierarchy and make content scannable.`
- `H1 — 48-80px` / "Main Headlines"
- `H2 — 32-48px` / "Section Headers"
- `H3 — 24px` / "Subsection Headers"
- `Body — 16-18px` / "Regular paragraph text for reading. Line height should be 1.5-1.7 for comfortable reading."
- `Caption — 12-14px` / "LABELS, METADATA, AND SMALL PRINT"

### Spacing System
- Caption: `8pt Grid` · H2: `Spacing System`
- Body: `Consistent spacing creates visual rhythm. All values are multiples of 8.`
- Boxes: `8` "Tight", `16` "Default", `24` "Relaxed", `32` "Loose", `48` "Section", `64` "Major"
- Pro tip: "**Pro tip:** Use 8px for inline elements, 16px for related items, 24-32px between groups, and 48-96px between major sections."

### Button States
- Caption: `Interaction Design` · H2: `Button States: The 4 Horsemen`
- Body: `Every button has 4 states. Miss one, and users think your site is broken.`
- Default — button text "Default" / "Resting state"
- Hover — button text "Hover Me" / "I'm clickable!"
- Active — button text "Press Me" / "The click feedback"
- Disabled — button text "Disabled" (real `disabled` attribute) / "Can't touch this"

### Z-Index
- Caption: `Stacking Context` · H2: `Z-Index: The Layer Cake of Chaos`
- Body: `Z-index controls stacking order. Modal at 1000, navbar at 100, content at 1. It's not random—it's an org chart.`
- Layers: `z-index: 1` "Base Content Layer", `z-index: 10` "Dropdowns & Tooltips", `z-index: 100` "Sticky Navigation", `z-index: 1000` "Modals & Overlays"

### Accessibility
- Caption: `Inclusive Design` · H2: `Accessibility (A11y): Design for Humans`
- Body: `Build for everyone. Not everyone uses a mouse. Not everyone can see your colors.`
- **Alt-Text** (`ALT`): `Describe images for screen readers. "Woman smiling at laptop" beats "IMG_4829.jpg"`
- **Contrast** (`4.5:1`): "4.5:1 minimum ratio. Use tools like WebAIM's checker. No one should squint to read."
- **Keyboard Navigation** (`TAB`): "Tab through your site. If you can't reach something without a mouse, it's broken."
- **ARIA Labels** (`ARIA`): "Help screen readers understand interactive elements."
- Static code sample (illustrative text, not live markup):
  ```html
  <button aria-label="Close modal">X</button>
  <img src="hero.jpg" alt="Team collaborating at a whiteboard">
  ```

### Parallax
- Caption: `Scroll Effects` · H2: `Parallax: The Depth Illusion`
- Body: `Notice how the background moves slower than this text as you scroll? That's parallax—creating depth on a flat screen.`
- Callout — **The Hot Sauce Rule**: "A little parallax goes a long way. Overdo it and users get motion sick. Use it for hero sections, not every scroll."

### Dev Dictionary
- Caption: `Reference` · H2: `Dev Dictionary`
- Body: `Essential terminology for speaking the language of web design.`
- All 12 entries, verbatim (→ `_data/glossary.json` per the build brief):

  1. **Above the fold** — Content visible without scrolling
  2. **CTA** — Call to Action - the button you want people to click
  3. **Hero** — The large banner section at the top of a page
  4. **Viewport** — The visible area of a web page in the browser
  5. **Responsive** — Design that adapts to different screen sizes
  6. **Breakpoint** — Screen width where layout changes (e.g., 768px)
  7. **Grid system** — 12-column layout framework for alignment
  8. **Z-index** — Stacking order of overlapping elements
  9. **Semantic HTML** — Using meaningful tags like nav, main, article
  10. **Accessibility** — Making content usable for people with disabilities
  11. **Mobile-first** — Designing for small screens first, then scaling up
  12. **White space** — Empty space that gives content room to breathe

### Learn by Exploring
- Caption: `Interactive Lab` · H2: `Learn by Exploring`
- Body: `Click to open interactive demos and downloadable resources.`
- Card 1 — **Glassmorphism**: "The frosted-glass effect explained with live CSS code you can copy." CTA: `Open Lab`
- Card 2 — **Homepage Blueprint**: "Complete 10-section homepage wireframe with tips. Download as PNG." CTA: `View Blueprint`

### Modal — Glassmorphism Explained
- Close glyph: `x`
- Demo caption: `This card uses glassmorphism`
- Body: "**Glassmorphism** is that frosted-glass effect you see everywhere now (thanks, Apple). It uses backdrop-filter: blur() to blur whatever is behind an element."
- Subheading: `The CSS Magic:`
- Copy button: `Copy` (→ `Copied!` for 2s, see §3.4)
- Code block (verbatim):
  ```css
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
  }
  ```
- "**Why it works:** Transparency + blur = visual hierarchy without blocking content."
- "**When to use:** Modals, navigation overlays, tooltips."
- "**Browser support:** Works in all modern browsers. Safari needs `-webkit-backdrop-filter`."
- Dismiss button: `Got It!`

### Modal — Homepage Anatomy Blueprint (full wireframe copy)

| Section | Headline copy | Note (verbatim) |
|---|---|---|
| 01 — The Hero | H1 "Transform Your Business in 30 Days" / body "We help ambitious founders scale without burning out." / CTA "Primary CTA" | "**Hook visitors in 3 seconds.** Answer 'What is in it for me?' Your H1 should make them say 'Yes! That is exactly what I need!'" |
| 02 — The Problem | H2 "Tired of Working 60-Hour Weeks?" (3 pain-point placeholders, no copy) | "**Show empathy first.** List 3-4 problems your audience faces. Make them feel understood before pitching solutions." |
| 03 — Your Solution | H2 "Our Simple 3-Step Process" — steps "1 Discovery" › "2 Execution" › "3 Results" | "**Make it simple.** Break your process into 3 steps." |
| 04 — Social Proof | H2 "Trusted By 500+ Companies" (2 testimonial placeholders, star rating `*****`) | "**Trust = conversion.** 2-3 testimonials with real names + photos." |
| 05 — Features | H2 "Why 10,000+ Businesses Choose Us" (3 placeholders, no copy) | "**Outcomes over features.** Focus on results." |
| 06 — Pricing | H2 "Flexible Plans for Every Stage" — tiers "STARTER"/"$XX"/"Select", "PRO"/"$XX"/"Select" (badge "POPULAR"), "ENTERPRISE"/"Custom"/"Contact" | "**Good/Better/Best.** Highlight the middle tier." |
| 07 — Results | H2 "Real Results, Real Numbers" — stats "+250%" "Revenue Increase", "10x" "ROI" | "**Show, do not tell.** Concrete numbers beat vague claims." |
| 08 — Lead Magnet | H2 "Download Our Free Growth Guide" — box "Free PDF / Checklist" — button "Get It Free" | "**Capture emails.** Offer value in exchange." |
| 09 — FAQ | H2 "Frequently Asked Questions" (3 placeholder rows with non-functional `+` glyphs, no question text) | "**Kill objections early.** Answer the top 5-7 questions." |
| 10 — Final CTA | H2 "Ready to Scale Your Business?" — CTA "Start Now" | "**Last chance to convert.** Make it about them." |
| Footer | 4 empty column placeholders + 1 copyright placeholder, no literal text | — |

- Credit block: `Homepage Anatomy` / `by creativepea`
- Download button: `Download as PNG` (→ `Generating PNG...` during export)
- Footer note: `Save this blueprint for reference`

### Page footer
- `Press G to toggle the 12-column grid overlay`
- `© 2026 Creative Pea Lab. Built for designers who code.`

---

## 3. Interactive behaviour catalogue

All behaviour lives in one vanilla-JS `<script>` block (lines 870–1035). No
React is used on this page despite React being installed for other tools in
the repo.

**3.1 Grid overlay toggle**
- Trigger: click on `#gridToggle`, or `keydown` on `document` for `g`/`G` (guarded against firing while an `<input>`/`<textarea>` is focused — a defensive no-op here since the page has no text fields).
- State: module-scoped `gridVisible` boolean.
- DOM touched: `classList.toggle('visible', gridVisible)` on `#gridOverlay`; `classList.toggle('active', gridVisible)` on `#gridToggle`.
- A11y gap: no `aria-pressed` on the toggle button reflecting on/off state; overlay has no `aria-hidden`.

**3.2 Anatomy hover tooltips** (5 markers in the mock browser window)
- Pure CSS `:hover` — no JS. `.anatomy-label:hover .label-marker` / `.anatomy-label:hover .label-tooltip { opacity:1; visibility:visible; pointer-events:auto; }`.
- A11y gap: markers are plain `<div>`s — no `tabindex`, no keyboard equivalent, no `aria-describedby`. Entirely mouse-only. Notable given the page teaches "if you can't reach something without a mouse, it's broken." **This should be fixed, not faithfully reproduced, in the rebuild** given the accessibility bar set by the brief.
- Markers pulse continuously (`pulse-marker` keyframe) until hovered, when the animation stops.

**3.3 Modal dialogs** (Glassmorphism + Homepage Blueprint)
- Both use the native `<dialog>` element and its `.showModal()` / `.close()` API — this is what supplies focus trapping and Escape-to-close, not custom JS.
- Open: click `#openGlassModal` → `glassModal.showModal()`; click `#openHomepageModal` → `homepageModal.showModal()`.
- Close: dedicated close buttons (`#closeGlassModal`, `#dismissGlassModal`/"Got It!", `#closeHomepageModal`) each call `.close()`; clicking the dialog backdrop itself (`e.target === dialogEl`) also closes it.
- No manual `cancel`/Escape handler — relies entirely on native `<dialog>` behavior.
- No explicit `aria-modal`/`aria-labelledby`/initial-focus management — relies on native `<dialog>` implied semantics and UA default focus.
- **Rebuild note:** a real `<dialog>` element (per the brief's instruction) gets this native trapping/Escape/backdrop-click behavior for free — no need to hand-roll a focus trap.

**3.4 Copy-to-clipboard** (glass CSS snippet)
- Click `#copyGlassCode` → `navigator.clipboard.writeText(code)` with a **hardcoded JS string**, not read from the DOM.
- On success: button text `Copy` → `Copied!`, `.copied` class added, both revert after 2000ms via `setTimeout`.
- No `.catch()` — a rejected clipboard promise fails silently.
- No dedicated `.copy-btn.copied` CSS rule found beyond `.copy-btn:hover` — the "copied" state change may be text-only with no distinct visual style currently. Worth deciding deliberately in the rebuild rather than carrying over what looks like an incomplete style hook.
- No `aria-live` region announcing "Copied!" to screen readers — a gap worth closing given the accessibility bar.

**3.5 Smooth scroll** — pure CSS, `html { scroll-behavior: smooth; }`. Applies to all in-page anchor links (nav, hero CTAs). Must be gated behind `prefers-reduced-motion` per the brief (source does not gate it).

**3.6 Sticky nav** — pure CSS `position: fixed`, no scroll listener, no shrink/hide-on-scroll behavior.

**3.7 Parallax** — pure CSS `background-attachment: fixed` with a gradient `::after` overlay; no JS/IntersectionObserver. `@supports (-webkit-touch-callout: none)` and a `max-width: 900px` media query both force `background-attachment: scroll` as an iOS/mobile fallback (fixed backgrounds perform poorly there regardless of motion preference). Must additionally be gated behind `prefers-reduced-motion` per the brief.

**3.8 Button-state demo** — not real interaction: "Hover" and "Active" states are permanently-applied CSS classes (`.demo-hover`, `.demo-active`) simulating those states for illustration. Only "Disabled" is a genuinely inert native `disabled` button.

**Confirmed absent** (do not appear anywhere in the file — no dark mode toggle, no scroll-progress bar, no accordion/tabs, no sticky-nav-shrink). The `+` glyphs in the wireframe modal's FAQ section look like accordion controls but bind to nothing (`.faq-toggle` has no click handler) — decorative only, part of the wireframe illustration, not a real feature to port as "functional."

---

## 4. Download feature — exact mechanism

Single feature: **"Download as PNG"** button (`#downloadWireframe`) inside the Homepage Blueprint modal.

- **Output:** a PNG raster snapshot of `#homepageWireframe`, downloaded as `homepage-anatomy-by-creativepea.png`.
- **Built at runtime**, client-side, on click — not a pre-generated static file.
- **Library:** `html2canvas` v1.4.1. Notably, `html2canvas` **is already an npm dependency** in `pea-lab/package.json`, but this page does not import it — it lazy-loads the same version from `cdnjs.cloudflare.com` at click-time instead, checking `typeof html2canvas !== 'undefined'` first to avoid double-loading if already present on the page. **For the Eleventy rebuild, install `html2canvas` as a real dependency and bundle/serve it locally** rather than reproducing the CDN-fetch pattern — there's no reason to keep the runtime dependency on cdnjs being reachable.
- **Mechanism, step by step:**
  1. Button text → `Generating PNG...`, disabled.
  2. Load `html2canvas` if not already present (`<script>` injection + `onload`/`onerror`; `onerror` alerts "Failed to load image library. Please try again." and resets the button).
  3. Clone `#homepageWireframe` (`cloneNode(true)`), give the clone `id="wireframe-clone"`, position it off-screen (`position:fixed; left:-9999px; ...; width:800px; background:#FDFAF6; padding:48px; z-index:-1;`), append to `<body>`.
  4. After a 200ms `setTimeout` (comment: "Small delay for DOM to settle"), call `html2canvas(clone, { scale: 2, backgroundColor: '#FDFAF6', logging: false, useCORS: true, width: 800, height: clone.scrollHeight })`.
  5. On success: remove the clone; build a temporary `<a download="homepage-anatomy-by-creativepea.png" href="{canvas.toDataURL('image/png')}">`, append, `.click()`, remove; reset button text/state.
  6. On error: remove the clone if still present, `console.error`, `alert('Download failed: ' + error.message)`, reset button.
- No progress indicator beyond the button-text change; no cancel option once started.

---

## 5. Asset list

| Asset | Type | Source | Used in |
|---|---|---|---|
| Parallax photo | Raster JPEG | Hotlinked: `images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?...&w=1920` | `.parallax-bg` CSS background (§ Parallax section) — **flagged as open decision per the brief** |
| Grid-toggle icon | Inline SVG (4-square glyph) | Authored inline in the markup, no library | Nav grid-toggle button |
| DM Sans | Google Font | `fonts.googleapis.com` CSS2 API, weights 400/500/600/700 | Body font (`--font-body`) |
| Instrument Serif | Google Font | Same stylesheet, italic 0/1 | Display font (`--font-display`) — **note:** brief specifies Fraunces for display; Instrument Serif is the source's current choice and will be replaced |
| JetBrains Mono | Google Font | Same stylesheet, weights 400/500/600 | Mono/annotation font (`--font-mono`) — matches the brief's choice, just needs self-hosting |
| html2canvas 1.4.1 | External script | Lazy-loaded from `cdnjs.cloudflare.com` on first PNG-download click | Homepage Blueprint modal export only |
| Favicon | — | `public/favicon.ico` / `public/favicon.svg` exist in the repo but **this page links neither** — no `<link rel="icon">` in its `<head>` at all | n/a |

All other "icons" on the page (bento numbers `01`–`06`, principle glyphs `F`/`Z`/`8`, a11y labels `ALT`/`4.5:1`/`TAB`/`ARIA`, modal glyphs `x`/`+`/`>`/`v`/`*****`) are plain styled text characters, not image or icon-font assets — nothing to extract as a file.

---

## 6. Unresolved / flagged items

1. **Framework mismatch with the brief:** source is Astro, not Next.js (see top of this document). No functional impact on the port — the page has no framework-specific behavior to translate — but I wanted the record straight.
2. **Missing brand SVGs:** `wa-lockup-horizontal.svg`, `wa-favicon.svg`, reversed lockup — not present anywhere in the workspace. Per your direction, Phase 2 will build a placeholder wordmark and flag it for swap-out.
3. **Keyboard-inaccessible hover tooltips** in the anatomy demo (§3.2) — the source itself violates the accessibility principles it teaches. Recommend fixing this in the port (add `tabindex`/focus-visible equivalents) rather than reproducing the gap faithfully, since the brief requires the rebuilt page to actually pass accessibility.
4. **Copy-to-clipboard has no clear "copied" visual state** beyond the text swap — decide deliberately in the rebuild (e.g. a real success color) rather than guessing at what was intended.
5. **`html2canvas` is an unused local dependency** in the source — installed via npm but fetched again from a CDN at runtime. The rebuild should just install and bundle it properly.
6. **No favicon `<link>` on the source page** despite favicon files existing in the repo's `public/` folder — can't tell if this was intentional or an oversight; the rebuild will use `wa-favicon.svg` (or its placeholder) per the brief regardless.
7. **Loose `<dt>`/`<dd>` markup** in the source's Dev Dictionary — pairs exist without an enclosing `<dl>`. Not a content-loss issue (all copy is captured above), just invalid HTML that the rebuild's real `<dl>` will fix by construction.
8. **Two different descriptions exist for this page**: its own `<meta name="description">` versus the blurb used on `pea-lab`'s homepage tool-card listing (§2, Head). Both are captured above in case either is useful; the rebuild only needs one meta description.
9. **Nothing else was dead code, broken, or unresolved.** No TODOs/FIXMEs/commented-out blocks exist in the source file. No dark mode, scroll-progress bar, accordion, or sticky-nav-shrink features exist to port — confirmed absent, not overlooked.

---

Stopping here per Phase 1. Waiting for review before starting the Eleventy scaffold.
