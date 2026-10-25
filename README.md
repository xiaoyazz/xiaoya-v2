# Xiaoya Portfolio

Personal portfolio built with React, TypeScript/TSX, and Tailwind CSS.

## Run locally

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

## Where to update content

Most portfolio content is now separated from the UI components.

### Work experience, About text, skills, and social links
Edit:

`src/data/siteData.ts`

- `siteConfig`: name, LinkedIn, GitHub
- `about.description`: About Me paragraph
- `about.technologies`: technology list
- `experiences`: add, remove, or update work experience

To add a job, add another object to the `experiences` array. The website will render it automatically.

### Projects
Edit:

`src/data/projects.ts`

Each project contains its title, description, images, links, tags, and whether it appears on the home page (`featured: true`).

Project media stays in:

`src/assets/`

Import a new image at the top of `src/data/projects.ts`, then assign it to `coverImage` and/or `images`.

### Hero text
Edit:

`src/components/home/LandingSection.tsx`

### Visual styling
The existing design and layout are intentionally preserved. Most styling remains as Tailwind utility classes directly in the components. Global background, font, dark-mode background, and animation styles are in:

`src/index.css`

### Routes / pages
Edit:

`src/App.tsx`

## Structure

```text
src/
  assets/              # Existing media/images
  components/
    home/               # Homepage sections
    layout/             # Navbar/Footer
    projects/           # Reusable project cards
    ui/                 # Shared UI components
  data/
    projects.ts         # All project content
    siteData.ts         # About, skills, experience, social links
  hooks/
  pages/
  types/
```
