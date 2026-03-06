# Changelog

## [Unreleased] - 2026-03-05

### Solicitud
Actualizar Next.js de la version 15.0.3 a la ultima version estable disponible (16.1.6), incluyendo todas las dependencias relacionadas.

### Plan Ejecutado
1. **Fase 1 - Core:** Actualizado Next.js 15.0.3 -> 16.1.6, React 18.3 -> 19.2.4, tipos TypeScript actualizados. Corregido tipo de `params` en layout a `Promise<{ locale: string }>`. Agregado `images.remotePatterns` en `next.config.ts`.
2. **Fase 2 - ESLint:** Migrado ESLint 8 -> 9 con flat config. Eliminado `.eslintrc.json`, creado `eslint.config.mjs`. Cambiado script lint de `next lint` a `eslint .`.
3. **Fase 3 - next-intl:** Migrado next-intl 3.25 -> 4.8. Renombrado `middleware.ts` -> `proxy.ts` con export named `proxy()` (convencion Next.js 16).
4. **Fase 4 - Dependencias:** Actualizado Mantine 7.14 -> 7.17.8, Tailwind CSS 3.4.1 -> 3.4.19, Tabler Icons 3.22 -> 3.39.
5. **Fase 5 - QA Fixes:** Corregido `LocaleControl` para usar imports de `@/i18n/routing` en vez de `next/navigation`. Agregado manejo de Promise en `Player.togglePlay()`. Agregada directiva `"use client"` a `LocaleControl` y `ThemeControl`. Actualizado metadata description.

### Resultado
- Build exitoso con Next.js 16.1.6 (Turbopack)
- Lint limpio sin errores ni warnings
- 3 CVEs de seguridad criticos parcheados (CVE-2025-66478, CVE-2025-55184, CVE-2025-55183)
- AGENTS.md actualizado para reflejar el nuevo stack

### Archivos Modificados
- `package.json` - Versiones actualizadas, scripts cambiados
- `next.config.ts` - Agregado `images.remotePatterns`
- `tsconfig.json` - Auto-modificado por Next.js 16 (`jsx: "react-jsx"`)
- `eslint.config.mjs` - Nuevo (reemplaza `.eslintrc.json`)
- `src/proxy.ts` - Nuevo (reemplaza `src/middleware.ts`)
- `src/app/[locale]/layout.tsx` - Tipo de params async, metadata description
- `src/Components/LocaleControl/index.tsx` - Imports corregidos, directiva `"use client"`
- `src/Components/ThemeControl/index.tsx` - Directiva `"use client"`
- `src/Components/Player/index.tsx` - Refactorizado con `useRef` + manejo de errores
- `AGENTS.md` - Actualizado con nuevo stack
- `README.md` - Reescrito con documentacion completa del proyecto (tech stack, getting started, estructura, i18n, paquetes)
