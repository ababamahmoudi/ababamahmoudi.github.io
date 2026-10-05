# Higgsfield asset plan

Generation was attempted but blocked: **“Requires basic plan or higher.”** No jobs were created. The site uses a JavaScript network placeholder, not a Higgsfield output.

Projects are omitted, so no project cover assets are needed.

## Consistent style

Near-black #080A0C, graphite, silver-white, restrained ice blue #8FBFD0. Fine optical threads, quiet depth, broad horizontal composition, dark space for real HTML text. Keep all typography and UI in the website.

| Asset | Aspect ratio | Duration | Placement |
| --- | --- | --- | --- |
| Hero still / poster | 16:9 | Still | Hero fallback; first and last video frame |
| Hero motion | 16:9 | 8 seconds | Full-width opening, muted and looping |
| Optional ambient transition | 16:9 | 6 seconds | Optional strip before Contact; not generated or included |

Keep the upper 55% quiet and key details near the horizontal center for mobile cropping.

## 1. Hero still / poster

Verified model settings: gpt_image_2_5; 16:9; 2k; quality=high; background=opaque; one output.
Preflight estimate at this attempt: 2.75 credits, subject to change.

Ready-to-paste prompt:

~~~text
Create one original cinematic editorial website hero background, landscape 16:9, for an IT, network and software specialist. A physically beautiful abstract sculpture of extremely fine horizontal optical fibers and silvery threads, hundreds of elegantly spaced hairline strands flowing left-to-right in a low topographic wave. The sculpture stays in the bottom 40 percent, with a quiet low crest just right of center and wisps fading into darkness at both edges. Keep the top 55 percent and central title area almost empty, very dark and spacious, for large white HTML typography added later. Near-black #080A0C, graphite shadows, delicate silver-white reflective edges and restrained pale ice blue #8FBFD0 highlights. Sparse pinpoint reflections suggest data pulses, not glowing balls. Sharp refined foreground lines, soft atmospheric depth and subtly defocused threads behind. Restrained photographic lighting, luxurious sculptural minimalism, matte environment, smooth gradients without banding, no strong horizon. Natural elegance and broad horizontal rhythm, not a literal device or cable bundle. No text, letters, numbers, logos, watermarks, icons, fake UI, labels, hardware, people, stock business imagery, neon cyberpunk, saturated cyan, purple, large glowing blobs or lens flares. This still becomes the first and last frame of a subtle ambient loop. Full-bleed, opaque background.
~~~

## 2. Hero video

Verified model settings: seedance_2_5; mode=omni_reference; 16:9; 1080p; duration=8; generate_audio=false; one output. Use the completed still as both start_image and end_image.
Preflight estimate at this attempt: 96 credits, subject to change.

Ready-to-paste prompt:

~~~text
Animate the identical supplied start and end image as a seamless eight-second ambient website hero loop. Preserve composition, palette, brightness and fine-line quality exactly: a low wave of hair-thin optical fibers at the bottom of a near-black frame, with the upper and central title area empty and dark. Locked camera, no pan, tilt, zoom, rotation, cuts or reframing. Threads breathe with an almost imperceptible smooth periodic rise and fall, returning precisely to the initial geometry at the last frame. A few tiny silver-white and pale ice-blue pulses drift slowly along individual filaments, fading and reappearing cyclically without flashes. Graceful continuous motion, no pause or sudden change at the loop boundary. Keep every fiber coherent, without morphing, tangling or multiplication. Calm enough behind large white HTML typography. Near-black #080A0C, graphite, silver-white and sparse #8FBFD0 only. Soft atmospheric depth and restrained lighting; no brightening of the upper or central area. No text, logos, UI, labels, objects, people, lens flares, neon, large glowing blobs, particles filling the frame, camera movement or scene changes. Silent, with no speech, music or sound effects.
~~~

## 3. Optional ambient transition

16:9, six seconds, muted. Optional and not submitted. The current site uses whitespace and a tonal section change. A restrained crop of the hero can be reused instead of generating another clip.

Ready-to-paste prompt:

~~~text
Create a silent six-second ambient loop for a shallow horizontal website transition. In near-black #080A0C, a small number of hair-thin silver optical filaments extend across the middle. Sparse #8FBFD0 pulses move slowly along them, receding gently into graphite darkness. Minimal horizontal composition, cropping cleanly into a wide strip. Locked camera, extremely restrained brightness, soft depth, seamless cyclic movement, matching a quiet editorial technology portfolio. No text, numbers, logos, UI, people, devices, neon, flashing, cuts, lens flares, or large luminous particles.
~~~

## Integration

Export without audio. Inspect the seam, compress to web formats, and set paths in dist/assets-config.js. README.md contains compression and deployment instructions. Use a static background for reduced motion and data saving.
