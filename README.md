# accessibility Studio 1021

A polished local-first accessibility workbench for product teams. It turns an overwhelming audit into a prioritised, human-centred path from discovery to verified fixes.

## Features

- Realistic checkout-flow audit with severity filtering and completion controls
- “Viewing lenses” for high contrast, larger text, and reduced-motion contexts
- Keyboard-visible focus styling, skip link, semantic regions, live audit feedback, and responsive layouts
- No accounts, network services, or API keys required. The app is a convincing local demo by design.

## Setup

Requires Node 20+.

```bash
npm install
npm run dev
```

Run `npm test` for the lightweight validation suite, or `npm run build` for a production build. Duplicate `.env.example` only if you later add an optional integration; no environment values are needed today.

## Architecture

This is a React + Vite single-page app. `src/main.jsx` contains the small interactive audit model and UI; `src/styles.css` contains the responsive visual system and accessibility modes. All content is deliberate demo data, so it presents immediately after deployment.

## Screenshot / representation guidance

For a strong project image, use the desktop overview at approximately 1440px wide. It shows the score cards, audit journey, viewing lens, and priority queue in a single frame. Capture after selecting “Serious” to show the working filter, or enable Calm view to demonstrate the inclusive experience controls.

## Deployment notes

Build with `npm run build` and host the generated `dist/` directory on any static host. No server routes, secrets, or paid services are required.
