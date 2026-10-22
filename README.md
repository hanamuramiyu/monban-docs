# monban documentation

The public documentation site for [monban](https://monban.miyu.pw/), built with Astro and Starlight.

## Local development

Use Node.js 22.20 or newer:

```bash
npm install
npm run dev
```

The development server prints its local URL. To verify the production build:

```bash
npm run build
npm run preview
```

## Writing conventions

- Explain the access model before listing commands.
- Keep one canonical explanation and link to it instead of repeating it.
- Describe behavior supported by the current monban release; do not present planned features as available.
- Keep examples consistent with the generated files and command grammar.
- Prefer operator outcomes and verification steps over implementation details.

The content lives under `src/content/docs/`. Navigation and site configuration are in `astro.config.mjs`.
