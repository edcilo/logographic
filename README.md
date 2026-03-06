# Logographic Memory

A Next.js web application for memorizing logographic alphabets such as Japanese Hiragana. It displays characters in a grid, lets users select subsets, and quizzes them in random order with audio playback. Supports internationalization (English and Spanish) and light/dark themes.

## Tech Stack

| Technology | Version |
| --- | --- |
| Node.js | v22.18.0 |
| Next.js (App Router + Turbopack) | 16.1.6 |
| React | 19.2 |
| TypeScript | 5 (strict mode) |
| Mantine | 7.17 |
| Tailwind CSS | 3.4 |
| next-intl | 4.8 |
| ESLint (flat config) | 9 |

## Prerequisites

- **Node.js** v22.18.0 (see `.nvmrc`). If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project root.
- **npm** (ships with Node.js).

## Getting Started

```bash
git clone https://github.com/edcilo/edc_logographic.git
cd edc_logographic
npm install
npm run dev
```

The development server starts at `http://localhost:3000`.

> **Note:** If you encounter peer dependency errors during installation, run `npm install --legacy-peer-deps` or create a `.npmrc` file in the project root with the following content:
>
> ```
> legacy-peer-deps=true
> ```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the project |

## Project Structure

```
src/
  app/[locale]/         # App Router pages (i18n dynamic segment)
    layout.tsx           # Root layout with Mantine + NextIntl providers
    page.tsx             # Home page
    about/page.tsx       # About page
    globals.css          # Tailwind directives
  Components/            # Reusable presentational components
  Containers/            # Stateful feature components with business logic
  i18n/                  # Internationalization configuration
    messages/            # Translation files (en.json, es.json)
  layouts/               # Main AppShell layout
  proxy.ts               # next-intl proxy for locale routing
public/
  audio/                 # Audio files for character pronunciation
  images/                # Static images
```

## Internationalization

The app supports two locales through [next-intl](https://next-intl-docs.vercel.app/):

- **en** -- English (default)
- **es** -- Spanish

Translation files are located in `src/i18n/messages/`. All user-facing strings must be defined in both locale files to keep them in sync.

## Packages

| Package | Description |
| --- | --- |
| [Next.js](https://nextjs.org/) | React framework with App Router and Turbopack |
| [React](https://react.dev/) | UI library |
| [Mantine](https://mantine.dev/) | Component library and hooks |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [next-intl](https://next-intl-docs.vercel.app/) | Internationalization for Next.js |
| [Tabler Icons](https://tabler.io/docs/icons/react) | Icon set for React |
| [PostCSS](https://postcss.org/) | CSS processing (with `postcss-preset-mantine`) |
| [ESLint](https://eslint.org/) | Linting and code quality |
| [TypeScript](https://www.typescriptlang.org/) | Static type checking |
