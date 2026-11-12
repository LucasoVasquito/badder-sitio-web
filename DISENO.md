# BADDER — "Flyer vivo" (rediseño v2)

Rama `redesign/flyer-vivo` (reemplaza la dirección editorial de `redesign/editorial`). Referencia viva: ruta interna `/sistema` (no enlazada). Capturas en `docs/capturas/` (1440 y 390 px).

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0A0A09` | Fondo base |
| `--paper` | `#F2EFE6` | Texto sobre tinta, secciones papel |
| `--a` | `#FF2B1C` | Acento A (domina) |
| `--b` | `#9BFF2E` | Acento B |
| `--tape` | `rgba(214,206,180,.85)` | Cinta adhesiva |

- `data-palette` en `<html>`: `vr` (verde/rojo), `ya` (`#FFE600`/`#3346FF`), `ar` (`#3346FF`/rojo). `--a-fg` y `--b-fg` cambian el color de texto sobre el acento (papel sobre azul, para mantener contraste).
- Variables de shadcn mapeadas a estos tokens. Superficies: `.surface-paper`, `.surface-dark`, `.surface-tint`, `.surface-b`. Radio 0; solo sombra dura `6px 6px 0 var(--a)` (`.shadow-hard`).

## Tipografía

Tres capas: display (13 fuentes, solo títulos y cintas), lectura (Newsreader, 20 px) y datos (IBM Plex Mono 12 px, mayúsculas, tracking .12em), más Pinyon Script como acento. Las 13 display: Doto, Seagram, HitMePunk, Akira, Ethnocentric, Rubik Wet Paint, Microgramma, Anton, Rye, UnifrakturMaguntia, Pirata One, Bowlby One y DASH Early (clases `f-*` en `index.css`). Google Fonts en `index.html`; Akira y Microgramma se precargan. Fuentes del repo con `@font-face` y `font-display: swap`. **Click en un título = rota su tipografía** (`FontCycleTitle`, guardado en `localStorage` por id).

## Componentes (`src/components/flyer/`) y hooks (`src/hooks/motion.ts`)

`SvgDefs` (filtros `#warp`, `#bitmap`; patrones `#thornH/V`, `#barbW/K`), `GrainOverlay`, `CursorDot`, `Marquee` (acelera con el scroll), `FontCycleTitle`, `BlurImage` (se enfoca al entrar en viewport en touch), `Duotone` (bitmap / duo sobre `--a`), `Halftone`, `Checker`, `OpArt`, `Scanlines`, `ThornFrame`, `BarbedWire`, `Tape`, `Sticker` (con `onClick` es el sello circular PLAY). Hooks: `useScrollVelocity` (lazo compartido, lerp), `useMouseParallax` (`data-depth`, usa la propiedad `translate` para no pisar rotaciones). Todo va por `requestAnimationFrame` y refs, sin setState por frame; se pausa con la pestaña oculta y fuera de viewport (Marquee). Con `prefers-reduced-motion`: sin warp animado, parallax, marquees ni grano en movimiento (grano estático).

## Qué se implementó

Home completa en el orden del brief (Hero, Latest Transmissions con lineup reproducible, Culture, From the Archive, Badder in Motion, Current Drop, Join the Frequency, About + Crew, Footer), navegación con `mix-blend-mode: difference`, reproductor con borde `--a`, y todas las páginas interiores con el nuevo `PageHeader` (display propio por ruta, semitono, alambre y sticker). Rutas, redirecciones, `usePageMeta`, `MotionConfig`, foco, `aria` y las reglas de datos no cambiaron: ningún producto se presenta comprable sin `verified`, `AVAILABLE`, precio y stock; `unverifiedNotes` no se muestra; servicios `confirmed: false` ocultos; links vacíos siguen vacíos.

## Desvíos respecto del brief y por qué

- **No existía `docs/rediseno/`** (la maqueta `.dc.html` ni la guía de estética): se trabajó solo desde el texto del prompt. Valores de rotación, filtros y patrones son interpretaciones propias.
- Se mantuvo el tema oscuro como base (pedido anterior): la lectura (artículo, proyecto) queda sobre tinta con Newsreader 20 px, no sobre papel. Culture y About sí usan papel.
- No se hizo la etapa de propuesta y confirmación del paso 0.5 (se pidió aplicar todo).
- Las imágenes del hero y de Drop se eligieron por el título de cada archivo en `collections.ts` (DJ azul = Drop 3 nº 35, Clifford rojo = nº 16, perrito = nº 10, Blue Clifford = nº 27); no se verificó que el perrito tenga cadena ni que todas tengan fondo transparente.
- El selector de paleta de `/sistema` cambia `data-palette` en vivo; el reproductor global no se duplica en `/sistema`, se ve abajo en cualquier página.
- `Archivo` (Akira, Ethnocentric, etc.) en títulos largos baja el `clamp` mínimo; verificado en 390 px en Home y Archivo, no en todas las rutas.
- No se midió Lighthouse ni se probó con lector de pantalla o dispositivos reales. Las capturas móviles usan un iframe de 390 px dentro de una ventana de 500 px.
- No se borraron archivos de fuentes sin uso de `public/` (Cyberpunks, Eurostile, Milk and Honey, Pure Energy, Righteous, Tenada).

## Material pendiente

Maqueta y guía de estética en `docs/rediseno/`; fotos de producto de remeras nuevas; links reales de releases y personas; fechas completas de proyectos de archivo.
