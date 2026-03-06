# AGENTS.md — edc_logographic

## Project Overview

Logographic Memory is a Next.js 16 web app for memorizing logographic alphabets (e.g., Japanese Hiragana). It presents characters in a grid, lets users select subsets, then quizzes them in random order with audio playback. Supports i18n (English/Spanish) and light/dark themes.

## Tech Stack

- **Runtime:** Node.js v22.18.0 (see `.nvmrc`)
- **Framework:** Next.js 16.1.6 with App Router and Turbopack (default bundler)
- **Language:** TypeScript 5 (strict mode enabled)
- **React:** 19.2
- **UI Library:** Mantine 7.17 (`@mantine/core`, `@mantine/hooks`)
- **Styling:** Tailwind CSS 3.4 + Mantine CSS modules (PostCSS with `postcss-preset-mantine`)
- **Icons:** Tabler Icons React (`@tabler/icons-react`)
- **i18n:** next-intl 4.8 (locales: `en`, `es`; default: `en`)
- **Linting:** ESLint 9 with flat config (`eslint.config.mjs`)
- **Package Manager:** npm (lockfile: `package-lock.json`)

## Build / Dev / Lint Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
```

> **Note:** Turbopack is the default bundler in Next.js 16 for both dev and build. No `--turbopack` flag needed.

## Testing

No test framework is currently configured. There are no test files or test scripts.
If adding tests, use the conventions:
- Place test files alongside source: `Component.test.tsx` or `__tests__/Component.test.tsx`
- Recommended stack: Vitest + React Testing Library
- Single test run: `npx vitest run src/path/to/file.test.tsx`

## Project Structure

```
src/
  app/[locale]/         # Next.js App Router pages (i18n dynamic segment)
    layout.tsx           # Root layout with Mantine + NextIntl providers
    page.tsx             # Home page
    about/page.tsx       # About page
    globals.css          # Tailwind directives
  Components/            # Reusable presentational components (PascalCase dirs)
    index.ts             # Barrel re-exports
    Header/index.tsx
    Footer/index.tsx
    Player/index.tsx
    Line/index.tsx
    LocaleControl/index.tsx
    ThemeControl/index.tsx
  Containers/            # Stateful feature components (PascalCase dirs)
    index.ts             # Barrel re-exports
    Logographic/
      index.tsx          # Main game logic
      alphabets.ts       # Character data
      styles.module.css  # CSS module
      styles.css         # Global overrides
  i18n/
    routing.ts           # Locale config and navigation wrappers
    request.ts           # Server-side locale resolution
    messages/en.json     # English translations
    messages/es.json     # Spanish translations
  layouts/
    index.tsx            # AppShell layout with Header/Footer
    styles.module.css
  proxy.ts              # next-intl proxy for locale routing (Next.js 16 convention)
public/
  audio/                 # Audio files for character pronunciation
  images/                # Static images (wave SVGs, etc.)
```

## Code Style Guidelines

### TypeScript

- **Strict mode** is enabled (`"strict": true` in `tsconfig.json`).
- Use explicit types for component props; define a `type Props = { ... }` above the component.
- Prefer `type` over `interface` for props (project convention).
- Use `Readonly<Props>` in component parameters.
- Path alias: use `@/*` to import from `src/*` (e.g., `@/Components`, `@/Containers`).

### Imports

- Order: external packages first, then internal modules, then relative imports, then styles.
- Mantine components: import from `@mantine/core` in a single destructured import.
- Icons: import individually from `@tabler/icons-react`.
- Use barrel files (`index.ts`) for Components and Containers directories.
- CSS modules: `import styles from './styles.module.css'`
- Global CSS: `import './styles.css'`

### Components

- **Components/** — Pure presentational/reusable components. PascalCase directory names.
- **Containers/** — Stateful feature components with business logic. PascalCase directory names.
- Each component lives in its own directory with an `index.tsx` entry file.
- Use function declarations (`export function ComponentName()`) not arrow functions for components (except trivial ones like `Line`).
- Mark client components with `"use client"` directive at the top of the file.
- Server components are the default (no directive needed).

### Naming Conventions

- **Directories:** PascalCase for Components and Containers; lowercase for everything else.
- **Files:** `index.tsx` for component entry points; `camelCase.ts` for utility/data files.
- **Variables/functions:** camelCase.
- **Types:** PascalCase.
- **Event handlers:** `verbHandler` pattern (e.g., `changeHandler`, `togglePlay`, `startClickHandler`).
- **Translation keys:** dot-separated, camelCase (e.g., `controls.alphabetSelectorLabel`).

### Styling

- Prefer Tailwind CSS via `@apply` inside CSS modules (`.module.css` files).
- Use Mantine CSS variables (`var(--mantine-color-*)`) for theme-aware colors.
- Dark mode: handled via Mantine's `data-mantine-color-scheme` selector (configured in `tailwind.config.ts`).
- Avoid inline styles; use CSS modules or Mantine component props (`c`, `size`, `variant`, etc.).
- Global Mantine overrides go in plain `.css` files alongside the component.

### Internationalization (i18n)

- All user-facing strings must be in translation files (`src/i18n/messages/{locale}.json`).
- Use `useTranslations()` hook in client components, `getMessages()` in server components.
- Keep both `en.json` and `es.json` in sync — same keys, translated values.
- Locale routing is handled by `next-intl/middleware` via `proxy.ts`; all pages live under `[locale]/`.
- For navigation, use `usePathname` and `useRouter` from `@/i18n/routing` (NOT from `next/navigation`).

### Mantine UI

- Use Mantine components (`Container`, `Card`, `Flex`, `Button`, `Text`, `Select`, etc.) over raw HTML.
- Color scheme switching is via `useMantineColorScheme()`.
- Layout uses `AppShell` with fixed header (60px) and footer (40px).
- Consistent color accent: `red.8` for primary actions.

### Error Handling

- No centralized error handling is established yet.
- When adding error handling: use try/catch for async operations, React Error Boundaries for UI.
- Validate user inputs at the component level before state updates.

### ESLint

- Config extends: `next/core-web-vitals` and `next/typescript`.
- Run `npm run lint` before committing; all warnings and errors must be resolved.
- ESLint 9 flat config is used (`eslint.config.mjs`); do NOT use legacy `.eslintrc.*` format.

### Git & Workflow

- No Prettier config — rely on ESLint for formatting enforcement.
- No CI/CD configuration currently present.
- Environment files (`.env*`) are gitignored; never commit secrets.

### Key Patterns to Follow

1. Wrap pages in `<Layout>` to get consistent AppShell with Header/Footer.
2. New alphabet data goes in `Containers/Logographic/alphabets.ts` as a new key.
3. New reusable components: create `src/Components/Name/index.tsx` and add to barrel.
4. New feature containers: create `src/Containers/Name/index.tsx` and add to barrel.
5. New pages: create `src/app/[locale]/route/page.tsx` (inherits i18n from layout).
6. Add new translation keys to both `en.json` and `es.json` simultaneously.
