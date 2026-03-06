# Changelog

## [Unreleased] - 2026-03-06

### Solicitud
Agregar un checkbox "Aleatorio" que controle si el orden de las tarjetas en el modal de practicas es aleatorio o secuencial (en el orden de seleccion).

### Plan Ejecutado
1. Nuevo estado `randomOrder` (`useState<boolean>(true)`) — por defecto activado, preservando el comportamiento original.
2. Nuevo handler `randomChangeHandler` para controlar el checkbox.
3. Renombrada funcion `getRandomChar` a `getNextChar` ya que ahora maneja ambos modos.
4. Nuevo parametro `random: boolean` en `getNextChar`: cuando es `true` elige aleatoriamente, cuando es `false` usa busqueda circular desde la posicion actual para avanzar al siguiente caracter no memorizado en el orden de seleccion.
5. Corregida logica de `skip` para no agregar el caracter actual a `newMemorized` cuando `skip=true`.
6. Agregado early return cuando `remaining.length === 0` para señalar estado "done".
7. `startClickHandler` y `restartClickHandler` en modo secuencial asignan directamente `selected[0]` como primer caracter.
8. Agregado componente `Checkbox` de Mantine entre la tabla de caracteres y los botones de accion.
9. Actualizados los 4 call sites para pasar `randomOrder`.
10. Agregadas claves de traduccion `controls.randomOrder` en ambos idiomas.

### Resultado
- Build y lint pasan sin errores.
- Checkbox "Random order" / "Orden aleatorio" controla el modo de presentacion en la practica.
- Modo secuencial: los caracteres avanzan en el orden en que fueron seleccionados, skip avanza al siguiente sin memorizar, y al llegar al final hace wrap-around sobre los no memorizados.

### Archivos Modificados
- `src/Containers/Logographic/index.tsx` - Estado, handler, checkbox, logica dual en `getNextChar`
- `src/i18n/messages/en.json` - Clave `randomOrder` agregada
- `src/i18n/messages/es.json` - Clave `randomOrder` agregada

---

## [Unreleased] - 2026-03-06 (anterior)

### Solicitud
Agregar un boton que al darle clic deseleccione todos los caracteres seleccionados.

### Plan Ejecutado
1. Agregada funcion `deselectClickHandler` que resetea el estado `selected` a un array vacio.
2. Los componentes `Chip` se convirtieron de no-controlados a controlados (`checked={selected.includes(char)}`) para que se desmarquen visualmente al limpiar el estado.
3. Se envolvieron los botones "Deselect All" y "Start" en un `Flex` con `gap="sm"` y `justify="space-between"`.
4. El boton usa `variant="outline"`, `color="red.8"`, icono `IconDeselect`, y se deshabilita cuando no hay caracteres seleccionados.
5. Se agregaron las claves de traduccion `dictionary.deselectAll` en ambos idiomas.

### Resultado
- Build y lint pasan sin errores.
- El boton "Deselect All" / "Deseleccionar todo" aparece junto al boton "Start" y limpia toda la seleccion de caracteres.

### Archivos Modificados
- `src/Containers/Logographic/index.tsx` - Boton de deseleccionar, Chips controlados, Flex wrapper
- `src/i18n/messages/en.json` - Clave `deselectAll` agregada
- `src/i18n/messages/es.json` - Clave `deselectAll` agregada

---

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
