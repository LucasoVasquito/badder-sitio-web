# BADDER v2 "Flyer vivo" — réplica de la maqueta

Rama `redesign/flyer-vivo-exacto`. La Home porta el código del Apéndice A de `prompt-claude-code-badder-EXACTO.md` (guardado tal cual en `docs/rediseno/maqueta-v2.dc.html`). Capturas por sección en `docs/capturas/v2/` (`x-*` = 1440 px, `m-*` = 390 px) y de las demás pantallas en `docs/capturas/`. Referencia interna: `/sistema`.

## Cómo está armado

- **Tokens** (`index.css`): `--a`/`--b` y sus equivalentes hex `--a-c`/`--b-c` (los que usa el JSX de la maqueta), `--grain`, `--blur`. Tinta `#0A0A09`, papel `#F2EFE6`.
- **Tweaks** (`src/config/flyer.ts` + `src/store/flyerStore.ts`): paleta (4 pares), textura (grano 0–0.8, default .35), distorsión (warp on/off), difusas (blur 4px/0). Se aplican como variables CSS en `<html>` y se cambian en vivo en `/sistema`.
- **Lazo global** (`src/hooks/useFlyerLoop.ts`): un solo `requestAnimationFrame` con el `loop` de la maqueta: cursor (lerp .35), parallax `[data-depth]` (lerp .06), cintas `[data-marquee]` (aceleran con la velocidad de scroll), grano (salto cada 70 ms) y escala de `#warpMap` (`10 + sin(t/700)*6 + min(80, vel*3)`). DOM directo, sin setState por frame; se pausa con `document.hidden`.
- **`src/components/flyer/`**: `SvgDefs` (DEFS de la maqueta: `barbW/K`, `thornH/V`, `#warp`, `#bitmap`), `GrainOverlay`, `CursorDot` (solo `pointer: fine`), `Marquee`, `FontCycleTitle` y utilidades (`textures.tsx`, `media.tsx`) que usan las páginas interiores, y `TouchBlur` (en touch las `.fx-blur` se enfocan al entrar en viewport).
- **Home** (`src/components/HeroSection.tsx`, `home/*`, `AboutSection.tsx`): una sección por componente con los estilos de la maqueta (inline y clases `hv-*` / `fx-blur` en `index.css` para los `style-hover`). Las 7 rotaciones de fuente al click usan `FONTS`/`KEYS` de la maqueta (`home/useFontCycle.ts`).
- **Audio**: el sello PLAY y el lineup disparan el reproductor global (un solo `<audio>`); el orden es el de la maqueta (`ORDER` en `playerStore.ts`), el botón » avanza en ese orden y al terminar un track pasa al siguiente. El reproductor tiene el aspecto de la maqueta (46 px, mono en `--a`, Anton, ▶/II, »).
- **Enlaces**: `#top→/`, `#music→/music`, `#culture→/culture`, `#archive→/archive`, `#drop→/shop`, `#about→/studio`, `#join→/community`. Culture → `/culture/post-01|02|03`; Archive → `/archive/rosset|cuchate.esta|emergent|capital|levels|tom`; Motion → los videos de YouTube de `visuals.ts` (ids 3, 7, 12).

## Diferencias respecto de la maqueta (todas por funcionalidad que debía conservarse)

1. **Carrito en la nav** (ícono con contador): la maqueta no lo tiene, pero la ruta `/cart` debe seguir accesible.
2. **Footer**: se agregó el enlace "Contacto →" (`/contact`) y una línea con el crédito de desarrollo y el ancla a la crew. Sin eso `/contact` quedaría sin acceso.
3. **Nav móvil** (< 1024 px): se mantiene el menú de pantalla completa existente (Escape, cierre 44×44) en lugar del `flex-wrap` de la maqueta, como indica el brief.
4. En las tarjetas de Culture el enlace al artículo cubre toda la tarjeta (`::after`); visualmente es idéntico.
5. En páginas interiores se reserva un espaciador de 64 px bajo la nav fija.
6. El reproductor muestra el mensaje de error de audio (si lo hay) debajo del título; el orden de reproducción usa los 6 tracks de la maqueta.
7. `data-depth` y marquees se apagan con `prefers-reduced-motion`; el cursor solo existe con puntero fino.
8. Las páginas interiores (`PageHeader`, listados, artículo, tienda) usan el mismo lenguaje (fuentes display por ruta, semitono, alambre, stickers) pero **no son réplica de la maqueta** (la maqueta solo define la Home). Los artículos quedan sobre tinta (no sobre papel).

## No cumplido / no verificado

- **No se armó `maqueta-v2.html`** (la traducción a HTML/JS plano del §9) ni hay capturas comparativas maqueta vs. implementación: no se ejecutó la maqueta original. Las capturas son solo de la implementación. La comparación fue visual contra el código del apéndice.
- Los valores `--a`/`--b` en HSL (para shadcn) son aproximaciones de los hex; el JSX de la Home usa los hex exactos.
- No se midió Lighthouse ni se probó con lector de pantalla o dispositivos reales. 390 px se revisó a ojo solo en las secciones de la Home y no en todas las rutas interiores.
- Las imágenes `img/` ya estaban en `public/img`. Quedan sin uso `capital-2`, `capital-6`, `d2-extasys`, `d3-sancor`, `p-drop3` (como indica el apéndice).

## Propuestas (no aplicadas)

- Pasar las rutas interiores a papel para lectura larga (artículos).
- Sumar un estado visual en el lineup para el track que suena (hoy solo `aria-pressed` y la etiqueta Pausa en el sello).
- Borrar de `public/` las fuentes sin uso (Cyberpunks, Eurostile, Milk and Honey, Pure Energy, Righteous, Tenada) y `src/assets/badder_logo_original.webp` si ya no se usa.
