# BHAKRICHA THASKA — complete website

A React + Vite + TypeScript + Tailwind CSS site using the original supplied logo.

## Quick start

1. Extract the project archive.
2. Open the extracted `bhakricha-thaska` folder in VS Code.
3. Install Node 22.12 or newer (Node 22 LTS recommended for these dependencies).
4. In the project terminal run:

```sh
npm install
npm run dev
```

Open the URL printed by Vite. To test the production bundle:

```sh
npm run build
npm run preview
```

The build command first checks TypeScript, then creates `dist/`. Preview is for local checking, not production hosting.

## What is and is not implemented

Implemented: responsive layout, desktop and native mobile navigation, anchor links, menu category filtering, INR price formatting, native dialog lightbox with Escape/focus restoration, reduced-motion support, keyboard focus styles, image-error illustration fallback, labels, page metadata and an email-draft form.

Not implemented or claimed: online orders, checkout, payments, real product photography, a form submission backend, verified opening hours, address or phone, business history, live inventory, full accessibility certification, browser testing, or a completed production build in the authoring environment.

Menu concepts are explicitly samples, prices are unset, and all original food drawings are labelled illustrations. Real product photography is a pre-launch content task. No remote stock image service is required. Fonts load from Google Fonts; the site has system fallback fonts if unavailable. Self-host fonts if your privacy policy or network requirements call for it.

## Files

- `package.json`: install dependencies and run dev/build/preview.
- `index.html`: page title, description, language, font links and social tags.
- `vite.config.ts`: React and Tailwind Vite plugins.
- `tsconfig.json`: strict TypeScript configuration.
- `.nvmrc`: Node major version 22.
- `.gitignore`: excludes dependencies, builds and environment secrets.
- `src/main.tsx`: app entry.
- `src/config.ts`: all editable menu data, contact details, image paths and links.
- `src/Visuals.tsx`: original decorative heritage silhouette, food illustrations and image fallback.
- `src/App.tsx`: reusable sections, navigation, menu, gallery and contact form.
- `src/styles.css`: responsive brand design and Tailwind import.
- `public/images/brand-logo.jpg`: original uploaded image, unmodified.

The heritage silhouette is decorative, inspired by the supplied identity; it is not an accurate architectural drawing of a named monument.

## Edit content

Open `src/config.ts`. Prices are numbers, for example `price: 99`, or `null` when not supplied. 99 is an editing example, not a recommended or confirmed price. Set `sample: false` only after approving each actual product. Remove unused sample products. Adjust the sample notice text in App.tsx if only some prices remain unconfirmed.

Store actual product photos in `public/images/`. In configuration, use paths beginning `/images/`, not `public/images/`. Example:

```ts
heroImage: {
  src: '/images/hero-bhakri.webp',
  alt: 'Our crunchy bhakri topped with tomato, onion, sev and spicy masala',
  srcSet: '/images/hero-bhakri-640.webp 640w, /images/hero-bhakri.webp 1280w',
} as FoodImage | null,
```

Only add srcSet when both files exist. An ordinary single `src` works too. Product and gallery entries use the same image structure. When replacing gallery illustrations, update the `caption` to describe the actual photo rather than calling it an illustration. Descriptions and alt text must match what the photograph actually shows.

The original logo is already installed. To change it, edit `brand.logo` and the favicon URL in index.html. The story/footer retain the original square artwork; the header uses a compact circular crop without modifying the image file.

For contact information, fill `brand.contact`:

- `email`: your real public inbox; enables the form.
- `phoneE164`: international phone number beginning + and the country code, without spaces.
- `phoneDisplay`: human-readable version of the same number.
- `address`: your verified business address.
- `hours`: array of real opening-hour strings.
- `mapUrl`: a verified HTTPS map link for that address.

Add actual social profiles to `brand.socials` as `{ label: 'Instagram', url: 'YOUR_ACTUAL_HTTPS_PROFILE_URL' }`. Do not leave placeholder URLs in public configuration. Empty social arrays render no dead buttons.

The form creates a mailto draft and does not send/store data. The visitor must have an email handler configured and press Send in it. A visible direct email link offers a fallback for copying the address. Long messages may encounter email-handler URL limits. Use a server endpoint or an independently evaluated form provider if reliable web submissions are required; never put a private API key into client code.

## Deployment: Cloudflare Pages

Cloudflare Pages supports this static build. Its documented Free plan currently includes 500 builds per month, one concurrent build and a 20-minute build timeout. Review current terms/limits before launch. A pages.dev subdomain avoids domain-registration costs; custom domain registration normally costs extra. The email-draft contact form has no server-side execution requirement.

### Direct upload

Run `npm run build` locally. In Cloudflare's Workers & Pages area create a Pages project using Direct Upload. Upload the CONTENTS of `dist/` (or a zip whose root contains index.html and assets), not this source project. The dashboard provides the live HTTPS URL.

### Git integration for ongoing changes

Alternatively create a Pages Git-integrated project, connect your repository and use:

- Framework preset: Vite (or none with the settings below)
- Build command: `npm run build`
- Output directory: `dist`
- Root: repository root, if package.json is at that root
- Node build environment: Node 22.12+ (for example a supported Node 22 release)

Commit the package-lock.json created by npm install for repeatable installs. Never commit node_modules. Choose Git integration from the outset if you want automatic deployments; Direct Upload projects cannot simply be converted to Git integration in place.

## SEO before launch

Edit the title/description if the final menu positioning changes. Once you know the real public URL, add an absolute canonical URL and og:url in index.html. Add an absolute og:image URL pointing to your approved share image (1200 by 630 is a useful target), and add its alt text. Do not publish a placeholder domain. A verified physical location is needed before adding LocalBusiness structured data; none is fabricated here. This is a client-rendered single-page site: metadata is static, but there is no server-rendered/prerendered page content.

## Image and asset checklist

Use your own photographs or images licensed for the intended commercial use. Keep originals and permission records. Unsplash's copyright license permits commercial use but does not automatically clear all personality, trademark or property rights. Stock photos should not be presented as photographs of your products. Original artwork supplied by the owner remains their reference asset; this project does not independently verify ownership rights.

Prefer WebP or AVIF, with JPEG fallback if needed. Export sensibly sized images (roughly 1200–1600 pixels wide for the hero and 700–1000 for cards). Keep image bytes low without degrading food detail. The app reserves image space, eagerly loads the hero, lazy-loads lower images, and supports optional srcSet. Test cropping on mobile. No automated image-conversion service is included.

## Troubleshooting

- ENOENT/package.json not found: open a terminal in the extracted project root.
- Unsupported engine: check node --version, install Node 22.12+, reopen terminal and run npm install again.
- tsc/vite not found: run npm install; ensure dev dependencies have not been omitted during the build.
- Tailwind styles missing: confirm @import "tailwindcss" in src/styles.css, its import in main.tsx, and tailwindcss() in vite.config.ts. This uses Tailwind v4; do not add v3 directives/configuration.
- TypeScript error after editing: ensure image objects include both src and alt, categories match the allowed union, and prices are numeric or null (not strings with currency signs).
- Photo fallback displayed: check path case and file extension; URLs start /images/, and files belong in public/images/. Linux hosting is case-sensitive.
- Blank page online: deploy dist contents, not src; inspect browser console and verify asset requests return JavaScript rather than an HTML error page. This setup expects a root-domain deployment, not a GitHub Pages project subpath.
- Port busy: use the new port printed by Vite or run npm run dev -- --port 5174.
- Form disabled: configure brand.contact.email. Form opens no app: configure your operating system email handler or copy the public email address.
- Fonts blocked: system fallback is expected. Consider self-hosting the chosen licensed fonts; never convert the Marathi text into decorative fake glyphs.
- Old deployment showing: check build logs, production branch and deployment URL; hard-refresh after confirming a successful build.

## Local acceptance checklist

Build with no errors; check mobile/tablet/desktop; Tab through navigation; test filters and all configured links; open and close gallery with keyboard/Escape; enable reduced-motion in system settings; test malformed email validation after setting a real inbox; confirm the form says draft rather than sent; check all public contact data, captions and prices; check console/network for missing assets; inspect metadata and run a browser accessibility audit.

## Official documentation

- Vite: https://vite.dev/guide/
- Vite static deployment: https://vite.dev/guide/static-deploy
- Tailwind Vite plugin: https://tailwindcss.com/docs/installation/using-vite
- React: https://react.dev/learn
- Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Direct Upload: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Unsplash terms: https://unsplash.com/terms
- Unsplash rights considerations: https://help.unsplash.com/en/articles/2612329-releases-and-trademarks

## Validation disclosure

The project was generated and inspected as text, and the supplied logo's SHA-256 was compared against the packaged copy to confirm exact preservation. The authoring sandbox did not have project dependencies installed and could not access the npm registry. Therefore npm install, TypeScript compilation, production build and browser tests have NOT been executed. Run the commands above before publishing. There are no API secrets, payment integrations or fake success messages.
