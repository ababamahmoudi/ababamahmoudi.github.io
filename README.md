# Ali Babamahmoudi — personal portfolio

Live site: https://ababamahmoudi.github.io/

A responsive HTML/CSS/JavaScript portfolio. No build step or runtime dependencies.

## Content

- Cinematic hero with an animated network background.
- About and experience at Seneca Polytechnic and York University.
- Expandable skills, separate Education and Certifications sections, and contact links.
- A general invitation to talk tech and exchange ideas.
- No portrait, downloadable résumé, Arzon experience, or projects section.

## Files

- `index.html`: content and metadata.
- `styles.css`: layout, responsive rules, and reduced-motion styles.
- `script.js`: navigation, reveals, background motion, and copy email.
- `assets-config.js`: optional hero video and poster paths.
- `assets/`: self-hosted fonts and any future hero media.
- `licenses/`: font licenses.

## Local preview

Open `index.html`, or run `python3 -m http.server 8000` from this folder and visit http://localhost:8000.

## Publishing

GitHub Pages publishes the `main` branch from `/(root)`. Commit updates to that branch to trigger deployment. Check the Actions tab for deployment progress.

Preserve relative asset paths and the font licenses. Delete obsolete assets when they should no longer be served.

## Optional Higgsfield video

Generation was blocked by Higgsfield's plan requirement. The current network animation is a built-in placeholder. See `HIGGSFIELD-ASSETS.md` for prepared prompts. Add exported media under `assets/` and set its relative paths in `assets-config.js`.

## Accessibility and checks

Includes keyboard navigation, focus outlines, a skip link, native skill disclosures, motion controls, and reduced-motion support. JavaScript syntax, HTML structure, local links, and asset references were checked. An interactive browser audit was not available in the original static preview environment.
