# Xiaoya’s Desktop

My portfolio website, designed as a little macOS-style desktop. Open the apps to look around: my coding projects, resume, photos I’ve taken, live Toronto weather, and a Spotify playlist I’ve had on repeat.

Built with **React**, **TypeScript**, and **Vite**.

## Features

- **Terminal**: a quick, typed-out intro to the site
- **Projects**: a Finder-style folder of things I’ve built, with back/forward navigation
- **Photos**: a slideshow widget and a library of photos I took
- **Weather and Spotify**: live widgets you can drag around
- **Tech Stack dock**: the tools I work with
- **Phone-friendly**: on small screens it becomes an iOS-style home screen with glass widgets

## Run it locally

Requires Node.js 18 or newer.

```sh
npm install
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Preview the built site |
| `npm run deploy` | Publish to GitHub Pages |

## Updating content

Most content lives in `src/data/`:

- `siteData.ts`: name, bio, links, education, experience
- `projects.ts`: projects and their screenshots
- `gallery.ts`: photos
- `techStack.ts`: dock icons
- `spotify.ts`: the playlist

Images go in `public/assets/` (`projects/`, `photos/`, `icons/`, `tech/`, `wallpaper/`).

## Credits

Weather data from [Open-Meteo](https://open-meteo.com/). Tech logos from [Devicon](https://devicon.dev/) (MIT) and AI tool logos from [Simple Icons](https://simpleicons.org/); see the license files in `public/assets/tech/`.

© Xiaoya Zou. All rights reserved.
