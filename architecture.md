# Architecture

## Technical Stack
- **Framework**: Astro (SSG - Static Site Generation)
- **Styling**: TailwindCSS
- **Data Format**: MDX + Frontmatter schema (optimized structure to prevent token overload)
- **Features**: PWA (offline support), Fuse.js (offline search), Chart.js (learning stats), Lucide Icons.

## Token Optimization Architecture
- **Schema-Driven Content**: Store only structured key-value pairs or concise explanations.
- **Component-Driven Rendering**: Keep raw HTML/JSX out of content files. Use standard Astro components that ingest structured MDX frontmatter.
