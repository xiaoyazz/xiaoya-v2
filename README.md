# Xiaoya Portfolio — Editorial Layout Update

This version keeps Xiaoya's existing pink/green identity, dotted background, dark mode, avatar, project media, routes, TypeScript, React, and Tailwind. The homepage layout is updated toward a cleaner editorial portfolio style.

## What changed

- Fixed desktop sidebar navigation with `/ section` links
- Compact mobile navigation
- Open, narrow main content column instead of large section cards
- Large editorial `/ about`, `/ experience`, and `/ selected work` headings
- Experience converted to vertical tabs on desktop and horizontal tabs on mobile
- Featured projects shown as large image/text spotlights
- Smaller project cards remain on the Projects page
- Text hover treatment: accent color, subtle horizontal movement, and animated underline for links
- IntersectionObserver fade-in sections
- Existing subtle scroll-driven gleam retained only on featured project imagery
- Reduced-motion accessibility support
- Existing project data and work-experience data remain centralized

## Where to edit content

### Work experience, About text, skills, links

`src/data/siteData.ts`

### Projects

`src/data/projects.ts`

Set `featured: true` on a project to make it eligible for the homepage. The homepage displays the first 3 featured projects from the existing sorted list.

### Main layout components

- `src/components/layout/Navbar.tsx` — sidebar + mobile navigation
- `src/components/home/LandingSection.tsx` — hero
- `src/components/home/AboutSection.tsx` — About
- `src/components/home/ExperienceSection.tsx` — tabbed work history
- `src/components/home/FeaturedProjects.tsx` — selected work
- `src/components/projects/FeaturedProjectCard.tsx` — large featured project layout

### Styling and hover effects

`src/index.css`

Search for these sections:

- `Editorial section headings`
- `Text hover language`
- `Experience tabs`
- `Featured work`
- `Enter-once fade animation`
- `Subtle scroll-reactive shine`

The main text-hover classes are:

- `.text-hover`
- `.text-link`
- `.icon-hover`

## Running locally

```bash
npm install
npm start
```

Production build:

```bash
npm run build
```

Deploy to GitHub Pages with the existing setup:

```bash
npm run deploy
```

## Note about very recent local edits

If you added projects or media locally after the previous shared copy (for example LunaCare), keep your current `src/data/projects.ts` and asset files when applying the layout patch. The layout components read the same `Project` data structure, so your newer project entries will continue to work.
