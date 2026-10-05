# Ali Babamahmoudi — personal portfolio

A portable, responsive HTML/CSS/JavaScript website. No build step, framework runtime, analytics, database, or contact-form backend.

## This version

- Cinematic dark hero with an abstract animated network placeholder.
- About, professional experience, expandable skills, credentials, and contact.
- Existing professional portrait and résumé, email, LinkedIn, and GitHub.
- Projects and troubleshooting sections are intentionally omitted.
- Higgsfield returned **“Requires basic plan or higher.”** No generation job completed. Full prompts and settings are in HIGGSFIELD-ASSETS.md.

## Files

- dist/index.html: content and metadata.
- dist/styles.css: design, responsive rules, and reduced motion.
- dist/script.js: navigation, reveals, motion, video loading, copy email.
- dist/assets-config.js: optional hero video and poster paths.
- dist/assets/: optimized portrait, local fonts, existing résumé.
- licenses/: font licenses.

## Preview locally

Open dist/index.html, or run:

~~~sh
python3 -m http.server 8000 --directory dist
~~~

Visit http://localhost:8000. Copy email appears in secure contexts supporting the Clipboard API. The email link always works. Without JavaScript, content, navigation, résumé, and native skill disclosures remain available.

## Deploy with Netlify

1. Unzip the source package.
2. Open https://app.netlify.com/drop.
3. Drop the **dist folder** into the deploy area.
4. Follow Netlify's prompts to retain/manage the site and configure its domain.

Alternatively, commit the whole project to a Git repository and import it into Netlify. Leave the build command blank and set the publish directory to **dist**; netlify.toml supplies that setting.

Official guide: https://docs.netlify.com/deploy/create-deploys/

## Deploy with GitHub Pages

1. Create a GitHub repository for the portfolio.
2. Copy the **contents of dist**, including .nojekyll, to its root.
3. Commit to the main branch.
4. In **Settings → Pages**, select **Deploy from a branch**, **main**, and **/(root)**, then save.
5. Use the URL GitHub reports after deployment.

All asset paths are relative, so repository-based Pages URLs work. Retain the licenses directory when moving the fonts.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Add the Higgsfield hero

Follow HIGGSFIELD-ASSETS.md. Put the files in dist/assets and edit dist/assets-config.js:

~~~js
window.PORTFOLIO_ASSETS = {
  hero: {
    mp4: 'assets/hero-loop.mp4',
    webm: '',
    poster: 'assets/hero-poster.webp'
  }
};
~~~

Empty paths make no video requests. Configured video loads only when motion is enabled and the hero is visible. It pauses offscreen and when the tab is hidden. Reduced-motion and data-saving preferences default to a static network background. A failed video falls back to the network graphic.

Example compression using FFmpeg, from dist:

~~~sh
ffmpeg -i hero-original.mp4 -an -vf "scale=-2:720,fps=24" -c:v libx264 -crf 28 -preset slow -movflags +faststart assets/hero-loop.mp4
ffmpeg -i hero-original.mp4 -frames:v 1 -vf "scale=1280:-2" assets/hero-poster.webp
~~~

Aim for 1–3 MB for the eight-second clip. Inspect the seam and legibility before swapping it in; AI generation does not guarantee a perfect loop.

## Accessibility and performance

Includes semantic sections, skip link, keyboard focus, native disclosures, mobile menu state, Escape-to-close, alt text, descriptive links, and copy feedback. Motion can be paused with a saved device preference. Reduced motion disables CSS reveals and smooth scrolling. Canvas runs at about 30 FPS with a capped pixel ratio and stops offscreen. Portrait is WebP and lazy-loaded. Fonts are local with swap fallbacks.

No visitor tracking or remote font requests. Email opens the visitor's email application and does not submit data to a server.

## Content

The existing Professional Office Portrait.png was converted to WebP. The résumé is the existing Ali_Babamahmoudi_Resume_Interware_Systems.pdf, unchanged. It retains its original contact details and project experience even though the website has no projects section. Review the PDF before public deployment.

Copy is based on Ali's résumé and established context. No invented clients, employment dates, metrics, or certifications were added. Update content in dist/index.html.

## Validation

JavaScript syntax, local links/assets, font sources, palette contrast, responsive rules, and reduced-motion paths were checked. An interactive browser audit was not available for this static-site preview environment. Review the delivered private site on a phone and desktop before making it public.
