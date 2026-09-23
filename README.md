# niamhking.github.io

Personal site and portfolio. Static, built with [Astro](https://astro.build), React islands,
TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # typecheck + content validation + static build to dist/
npm run preview  # serve the built output
```

## Why it is built this way

**Astro over a React SPA.** This is a content site. Astro renders it to static HTML at build time
and ships no JavaScript for anything that does not need it, so the page is readable without JS,
indexable, and fast on a phone. React is still used — as islands — where interactivity actually
earns its bundle.

**Exactly one React island.** `src/components/Gallery.tsx` handles the screenshot lightbox. It is
mounted with `client:visible`, so its bundle is not requested until a gallery scrolls into view.
Everything else — navigation, mobile menu, theme toggle — is HTML, CSS, or a handful of lines of
inline script. The mobile menu is a native `<details>` disclosure and the lightbox is a native
`<dialog>` opened with `showModal()`, which means focus trapping, page inertness and
Escape-to-close come from the platform rather than from hand-written key handling.

**Content is validated at build time.** Projects live as Markdown in `src/content/projects/`, with
their frontmatter checked against a Zod schema in `src/content.config.ts`. A mistyped category, a
missing summary or a screenshot path that does not resolve fails `npm run build` rather than
shipping a broken card. `npm run build` runs `astro check` first, so the same is true of type
errors.

**One set of theme tokens.** Semantic CSS custom properties are defined once on `:root`, overridden
under `[data-theme='dark']`, and mapped onto Tailwind's colour utilities with `@theme inline`. So
`bg-surface` is correct in both themes and there is no `dark:` variant duplicated at the call site.
The theme is resolved by a small inline script before first paint, so there is no flash of the
wrong theme.

**Responsive by construction rather than by breakpoint.** The type scale is fluid (`clamp()`
between a 360px and a 1280px viewport), horizontal rhythm comes from a single `.shell` class, and
the layouts are single-column by default with columns added upward. Verified at 375px, 768px and
1440px.

**Images.** Originals live in `src/assets/` and go through Astro's build pipeline — resized,
converted to WebP, and emitted with `srcset` and explicit dimensions so nothing shifts as the page
loads. The gallery island receives already-optimised URLs as plain data; it never touches image
processing, and no unoptimised original is ever requested.

## Structure

| Path | What |
| --- | --- |
| `src/data/site.ts` | Everything that appears in more than one place: metadata, nav, experience, skills, education |
| `src/content/projects/*.md` | One file per project — schema-validated frontmatter plus the write-up |
| `src/content.config.ts` | The Zod schema those files are checked against |
| `src/components/Gallery.tsx` | The only React island: screenshot strip and lightbox |
| `src/styles/global.css` | Theme tokens, fluid type scale, base and component layers |
| `src/layouts/Base.astro` | Document shell, meta and Open Graph tags, JSON-LD, theme script |

## Accessibility and SEO

- Skip link, semantic landmarks, one `<h1>`, and a heading hierarchy that does not skip levels.
- A single visible focus ring via `:focus-visible`, and 44px minimum hit targets on touch pointers.
- `prefers-reduced-motion` honoured, including for smooth scrolling and view transitions.
- Every image has a real `alt`; decorative layers are `aria-hidden` and `pointer-events-none`.
- Canonical URL, Open Graph and Twitter card tags, `Person` JSON-LD, a generated sitemap and
  `robots.txt`.

## Deployment

No CI. `npm run build` writes the finished site into `docs/`, and GitHub Pages serves that
directory straight from the branch:

```bash
npm run build     # typechecks, validates content, writes docs/
git add -A && git commit -m "Rebuild site" && git push
```

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
branch**, then pick **main** and the **/docs** folder.

Two things that matter if you move this around:

- `docs/` is deliberately **not** in `.gitignore` — it is the published site, so it has to be
  committed.
- `public/.nojekyll` exists because GitHub Pages runs Jekyll by default, and Jekyll silently
  ignores directories beginning with an underscore. Without it, every file in `docs/_astro/`
  (all the CSS, JS and images) would 404.

Because `npm run build` typechecks and validates content first, a broken build never produces a
publishable `docs/`.
