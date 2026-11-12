# Megaprompt para Claude Code — BADDER "Flyer vivo" (rediseño v2)

> Pegá esto en Claude Code con `LucasoVasquito/badder-sitio-web` clonado. Copiá también al repo, en `docs/rediseno/`: `BADDER Rediseño v2.dc.html` (maqueta de referencia, se abre en el navegador) y `BADDER-estetica-megaprompt.md` (guía de estética). **Este prompt reemplaza al anterior `prompt-claude-code-badder.md`** (dirección "editorial sobria"): esa dirección se descartó.

---

Actuá como director de arte y desarrollador front-end senior. Vas a implementar en este repo (Vite + React 18 + TypeScript + Tailwind 3 + shadcn/ui + Framer Motion + Zustand, deploy en Netlify) el rediseño **"flyer vivo"** de BADDER: la página se comporta como un flyer rave impreso que se mueve, reacciona al mouse y al scroll, y suena. Conservás todas las rutas, datos y funcionalidades; cambiás la piel y la composición.

## 0. Antes de tocar código

1. Abrí `docs/rediseno/BADDER Rediseño v2.dc.html` en el navegador y recorrelo en 1440 y 390 px. Es la referencia visual y de comportamiento: cuando este prompt y la maqueta difieran, gana la maqueta. Leé su código: los valores (colores, clamps, rotaciones, filtros SVG, patrones) se pueden copiar casi literalmente a React.
2. Leé `docs/rediseno/BADDER-estetica-megaprompt.md` completo.
3. Leé `CONTENIDO.md`, `src/App.tsx`, `src/index.css`, `tailwind.config.ts`, `src/data/*.ts`, `src/components/home/*`, `HeroSection.tsx`, `Navigation.tsx`, `FloatingPlayer.tsx`, `Footer`.
4. Corré `npm run dev` y recorré el sitio actual.
5. Proponé un plan corto (archivos nuevos, archivos a modificar, orden) y esperá confirmación.

## 1. Qué es BADDER (resumen)

Espacio creativo multidisciplinario de música electrónica underground. La Plata, Argentina, Est. 2024. Música, eventos (Badder Showcase), cultura de club, diseño, fotografía, motion, indumentaria (drops). Instagram @badder.experience · contact@badderexperience.com. Crew: Lucas Nicolas Bengochea, Juan Francisco Arias, Uriel Galeano, Francisco Anguis, Javier Almiron.

Cinco palabras: **impreso — crudo — irreverente — figurativo — ruidoso.** Si algo se ve prolijo, alineado o de plantilla, está mal. Pero menú, botones y texto de lectura siempre se entienden.

## 2. Tokens

En `src/index.css` (`:root`) y `tailwind.config.ts`:

```css
--ink:   #0A0A09;  /* fondo base */
--paper: #F2EFE6;  /* texto sobre negro, secciones papel */
--a:     #FF2B1C;  /* acento A (domina) */
--b:     #9BFF2E;  /* acento B */
--tape:  rgba(214,206,180,.85);
```

- Paletas A/B válidas: rojo/verde (default) · verde/rojo · `#FFE600`/`#3346FF` · `#3346FF`/rojo. Exponé un `data-palette` en `<html>` que cambie `--a`/`--b` (útil para campañas por ruta o drop).
- Acentos en **plano lleno** (bloques, tiras, stickers, fondos de sección). Máximo 2 por vista.
- Radio 0 en todo. Sin sombras suaves ni degradados "tech". Sombras duras permitidas: `6px 6px 0 var(--a)`.
- Mapeá las variables de shadcn (`background`, `foreground`, `primary`, `border`, `ring`…) a estos tokens para no romper `components/ui`.

## 3. Tipografía

Cargá en `index.html` (Google Fonts): Anton, Bowlby One, Doto (100–900), IBM Plex Mono (400/600), Newsreader (ital, opsz, 400–700), Pinyon Script, Pirata One, Rubik Wet Paint, Rye, UnifrakturMaguntia.

Del repo (`public/`, ya existen): `@font-face` para **Akira** (`Akira Expanded Demo.otf`), **Seagram** (`Seagram tfb.ttf`), **HitMePunk** (`Hit me, punk! 01.ttf`), **Microgramma** (`Microgramma D Extended Bold.otf`), **Ethnocentric** (`Ethnocentric-Regular.otf`), **DashEarly** (`DASH-Early.ttf`). Usá `font-display: swap` y precargá las que aparecen arriba del pliegue. Quitá los `@font-face` de las otras display que queden sin uso (no borres archivos sin confirmar).

Tres capas:
- **Display** (solo títulos/portadas/cintas): las 13 de arriba (6 del repo + Doto, Rubik Wet Paint, Rye, Anton, UnifrakturMaguntia, Pirata One, Bowlby One).
- **Lectura**: Newsreader, 20–34 px, itálica para frases destacadas. Nunca < 18 px.
- **Datos/etiquetas**: IBM Plex Mono 11–14 px, MAYÚSCULAS, tracking .1–.16em. Nunca < 11 px.
- **Acento caligráfico**: Pinyon Script ("experience", "current"), rotada, en `--a`, encimada sobre otro elemento.

Asignación por sección (default de la maqueta):
- Latest Transmissions → Doto 900 · Culture → Seagram · From the Archive → HitMePunk · Badder in Motion → Akira · Current Drop → Ethnocentric · Join the Frequency → Rubik Wet Paint · About → Microgramma · Crew → Anton · títulos de notas → Newsreader / UnifrakturMaguntia / Rye (una distinta por nota).

Reglas de título:
- `font-size: clamp(54px, 9–15vw, 160–250px)`, `line-height: .8–.9`.
- Dos líneas: la primera sólida, la segunda con `-webkit-text-stroke` y `color: transparent`, corrida con `padding-left`.
- Glitch RGB: `text-shadow: 4px 0 rgba(0,255,240,.35), -4px 0 rgba(255,0,90,.35)`; se abre al hover.
- Nunca deben cortarse ni desbordar en 390 px: usá `overflow-wrap:anywhere` solo como último recurso; preferí bajar el `clamp` mínimo. `overflow-x: clip` en `html, body`.
- **Click en un título → rota su tipografía** por el set display (componente `FontCycleTitle`). Guardá la elección en `localStorage` por id de título.

## 4. Texturas (componentes reutilizables)

Creá `src/components/flyer/` con:

1. **`SvgDefs`** — un `<svg width=0 height=0>` montado una vez en `App` con:
   - `#warp`: `feTurbulence` (fractalNoise, baseFrequency ~.012/.04, numOctaves 2) + `feDisplacementMap` (scale animada). Se aplica al logo y a títulos clave.
   - `#bitmap`: `feColorMatrix` desaturar → `feTurbulence` ruido → `feComposite operator="arithmetic"` → `feComponentTransfer` tipo `discrete tableValues="0 1"` (umbral 1-bit). Sobre un contenedor con `background: var(--a)` y la imagen con `mix-blend-mode: multiply` = duotono negro + acento.
   - Patrones `#thornH` / `#thornV` (línea con triángulos irregulares) y `#barbW` / `#barbK` (alambre de púas: dos ondas cruzadas con nudo en X, blanco y negro). Copialos de la maqueta.
2. **`GrainOverlay`** — capa `position:fixed`, 200% del viewport, `feTurbulence` baseFrequency ~.85, `mix-blend-mode: overlay`, opacidad .2–.5, se traslada a un offset aleatorio cada ~70 ms (rAF con throttle, sin re-render). `pointer-events:none`, z-index sobre el contenido y bajo nav/cursor.
3. **`Halftone`** — `radial-gradient(color 1.1px, transparent 1.7px)` `background-size: 6–8px`, con `mask-image` radial para desvanecer.
4. **`Checker`** — `repeating-conic-gradient(#141413 0 25%, #1f1f1d 0 50%)` 64–120 px.
5. **`OpArt`** — `repeating-radial-gradient(circle, var(--a) 0 9px, var(--ink) 9px 22px)` enmascarado.
6. **`Scanlines`** — `repeating-linear-gradient(0deg, rgba(0,0,0,.45) 0 2px, transparent 2px 4px)`.
7. **`ThornFrame`** — wrapper con `padding:22px` y 4 `<svg>` absolutos (arriba, abajo `scaleY(-1)`, izquierda, derecha `scaleX(-1)`) rellenos con `#thornH/#thornV`.
8. **`BarbedWire`** — tira de 30 px de alto, 110% de ancho, rotada (±3–5°), atraviesa secciones; variante `light` / `dark`.
9. **`Tape`** — rectángulo `var(--tape)` ~90–100×26 px rotado, absoluto sobre el borde superior de tarjetas.
10. **`Sticker`** — etiqueta mono en `--a`, `--b`, papel o negro, rotada ±3–6°, encimada al borde de imágenes. Variante circular ("PLAY", 128 px, botón real).
11. **`BlurImage`** — `filter: blur(var(--blur,4px))`, se enfoca (`filter:none`) al hover/focus. En touch se enfoca al entrar en viewport (no depender del hover).
12. **`Marquee`** — cinta de texto Doto/Akira, sobre acento o con bordes de acento, ligeramente rotada; velocidad base + **aceleración con la velocidad de scroll**.

## 5. Movimiento e interacción

Hooks en `src/hooks/`:
- `useScrollVelocity()` — velocidad de scroll suavizada (lerp), en un ref. La consumen `Marquee` (acelera) y el `#warp` (la `scale` del `feDisplacementMap` oscila con el tiempo y sube con la velocidad).
- `useMouseParallax()` — elementos con `data-depth` (positivos y negativos, p. ej. 10, 22, 34, -46) se trasladan según el mouse con lerp.
- `CursorDot` — círculo de `--a` con `mix-blend-mode: difference`, se agranda sobre `a`, `button`, `img` y títulos. Solo en `pointer: fine`; ocultar el cursor nativo solo ahí.

Todo con `requestAnimationFrame` y refs: **nada de setState por frame**. Con `prefers-reduced-motion: reduce` (y el `MotionConfig reducedMotion="user"` existente): apagar warp animado, parallax, marquees y grano en movimiento (grano estático sí).

Hovers: tarjetas se enderezan (`rotate(0) scale(1.02–1.04)`) y suben de z-index; fotos se enfocan; títulos abren glitch o cambian color de sombra; botones invierten color.

## 6. Audio

Rediseñá `FloatingPlayer` (estado en el store de Zustand existente):
- Bloque rectangular negro abajo a la izquierda, borde de `--a`, portada cuadrada, artista (mono) + título (Newsreader), play/pausa y siguiente (44×44 mínimo). No tapar footer ni CTA en móvil (dejar `padding-bottom` en `main`).
- El sello PLAY de "Latest Transmissions" y cada ítem del lineup reproducen su track real desde `src/data/music.ts` (audios en `/audio/…`). Estado activo visible en el ítem que suena.
- El carrito existente se mantiene accesible (puede pasar a la nav).

## 7. Home — sección por sección (orden actual, conservar)

Ritmo de fondos: negro → negro/cinta → papel → damero → foto a sangre → op-art → acento B → papel → negro.

1. **Nav** fija, `mix-blend-mode: difference`, logo + Home, Music, Culture, Archive, Shop, Studio + botón "↳ Community". Mono 13 px MAYÚSCULAS. Menú móvil a pantalla completa con Escape y botón de cierre 44×44 (mantener).
2. **Hero** (`HeroSection.tsx`, reemplaza logo+parallax actual): cinta superior de `--a`; logo Badder `min(84vw,1040px)` con `#warp` + "experience" en Pinyon Script rotado −8° abajo a la derecha; collage con `data-depth`: DJ azul (Drop 3) en bitmap duotono sobre `--a` rotado −7° arriba-izquierda, foto Rosset difusa rotada 5° arriba-derecha con sticker, galgo/Clifford rojo abajo (`depth -46`, encima del logo); alambre de púas blanco en diagonal (−4°) al 64% de alto; semitono; damero inferior; datos mono en esquinas (La Plata, Est. 2024, @badder.experience).
3. **Latest Transmissions**: título Doto en dos líneas (sólida + contorno). Portada Not Rules EP en `ThornFrame` rotada −2.5° con sello PLAY circular. Lineup escalonado tipo flyer: cada release en bloque de color con desplazamiento horizontal distinto, etiqueta `[EP]`/`[PREVIEW]`, botón de escucha.
4. **Culture**: sección papel con semitono; título Seagram rojo rotado; notas como recortes con `Tape`, rotaciones −2.5° / 1.8° / −1°, `margin-top` escalonados, fondo negro/papel alternado; imagen superior 4:3 (una en bitmap, una duotono sobre `--a`, una a color saturado); etiqueta de categoría en sticker; título de nota con fuente distinta cada una. Datos desde `src/content/culture/*.md`.
5. **From the Archive**: `Marquee` Akira + fondo `Checker`; flyers y fotos rotados (−3°, 2°, −1.5°, 3°) con `BlurImage`, uno en `ThornFrame`, stickers de año/título; `margin-top` escalonados; "Ver archivo completo →". Datos desde `src/data/projects.ts`.
6. **Badder in Motion**: foto a sangre muy difusa + `Scanlines`; título Akira con `mix-blend-mode: difference` + `#warp`; tarjetas de video (thumbnails de YouTube reales de `music.ts`).
7. **Current Drop (Drop 3, SS25)**: `OpArt` detrás; gráfica perrito con cadena en `ThornFrame` + galgo azul superpuesto; "current" en Pinyon + "DROP 3" en Ethnocentric; miniaturas Bunker 001, Noise for the Dancefloor, The Showcase, Blue Clifford Knit; estado **Archivo** (sin precio). "Ver colección →".
8. **Join the Frequency**: bloque `--b` a sangre, título Rubik Wet Paint, `BarbedWire` negro, foto en bitmap, CTA Instagram y mail.
9. **About + Crew**: papel, Newsreader grande, título Microgramma; lista de crew en Anton con hover de `--a`.
10. **Footer** negro con logo en `#warp` y contacto.

Kickers en inglés como hoy; texto de lectura en español rioplatense, directo ("Mandanos tu música…", "Escribinos").

## 8. Resto de rutas (mismo lenguaje, menos ruido)

Conservar: `/music`, `/culture`, `/culture/:postId`, `/archive`, `/archive/:projectId` (+ `?album=`, filtros por categoría/año en query), `/shop`, `/shop/:productId`, `/cart`, `/studio`, `/community`, `/contact`, 404 y redirecciones `/journal`, `/archivo`, `/services`, `/visuals`, `/colecciones`.

- Cada página abre como flyer: título display gigante (fuente propia por ruta), una textura de fondo, una cinta o alambre, un sticker.
- **Lectura** (`CultureArticle`, `ArchiveProject`): cuerpo calmo en Newsreader 20 px sobre papel, ~66 caracteres, sin ruido sobre el texto. Estilos de Markdown (h2, listas, citas, imágenes) en `components/site/Markdown`. Lightbox existente.
- **Listados** (Archive, Culture, Music): collage con rotaciones y escalonados, pero ordenado por fecha y comparable; filtros en botones mono con estado activo en `--a` lleno.
- **Shop / Drop**: las gráficas conservan su color; la UI aporta stickers de estado y créditos tipo etiqueta de talle. Sin compra funcional.
- Studio, Community, Contact, Cart: misma piel, formularios nítidos (inputs con borde 2 px, foco visible en `--a`).

## 9. Reglas de datos (no romper)

- Producto comprable solo si `verified`, `status: "AVAILABLE"`, `price` y stock > 0. Hoy ninguno: mostrar **Archivo**, sin precio; mantener aviso de compras deshabilitadas.
- `unverifiedNotes` nunca se muestra. Servicios `confirmed: false` no se muestran. Links de releases/personas solo si son reales (hoy vacíos).
- Mantener `usePageMeta`, `MotionConfig reducedMotion="user"`, foco visible, `aria-*`, `SmartImage` y thumbs.
- No inventar fechas, precios, eventos, clientes ni estadísticas. No dibujar ilustraciones nuevas: intervenir las existentes (bitmap, blur, duotono, recorte, rotación).

## 10. Imágenes

Usá las del repo (ubicá las rutas reales en `public/` / `src/assets`): gráficas Drop 3 (perrito con cadena azul, galgo/Clifford rojo y azul, mono DJ azul, The Showcase, Bunker 001, Noise for the Dancefloor, Sancor), flyers (Emergent x Badder, Showcase Soulbeat/Rosset, Levels/Pøllini), fotos (Rosset, Emergent, Tom, Capital, Cuchate.esta, Ediciones Flash, Verano 2025, Sesión Drop 3, lookbook Drop 2), 6 portadas de releases, logo crema. Gráficas con fondo transparente para las que se superponen (galgo, perrito). `loading="lazy"` salvo hero.

## 11. Responsive y accesibilidad

- 390 px: el collage del hero se reduce (2–3 piezas, sin solapar el logo de forma ilegible), títulos con `clamp` mínimo que entren sin corte, rotaciones más suaves (±2°), escalonados a 0, grillas `repeat(auto-fit, minmax(min(100%,250px),1fr))`.
- Áreas táctiles ≥ 44×44. Contraste AA en texto de lectura, menú y botones (texto negro sobre `--a`/`--b`, papel sobre negro).
- Nada esencial depende del hover. Navegación por teclado completa.
- Rendimiento: filtros SVG caros (`#warp`, `#bitmap`) solo en pocos elementos; pausar rAF cuando la pestaña no está visible y con `IntersectionObserver` fuera de viewport. Lighthouse Performance ≥ 80 en móvil.

## 12. Entregables

1. Rama `redesign/flyer-vivo`, commits por etapa: tokens + fuentes → `components/flyer` + hooks → nav + player + cursor → Home sección por sección → listados → lectura → shop/drop → resto → limpieza de CSS viejo (glitch, CRT, plastic-wrap, wavy-grid, grayscale global que ya no se use).
2. `npm run build`, `npm run lint`, `npm run test` sin errores.
3. Capturas de Home, Archive, Artículo, Drop/Producto en 1440 y 390 px en `docs/capturas/`.
4. Ruta interna `/sistema` (no enlazada) con todas las texturas, stickers, marcos, títulos con sus 13 fuentes, botones, tarjetas y player con sus estados, más un selector de paleta.
5. `DISENO.md` corto: tokens finales, componentes de `flyer/`, desvíos respecto de la maqueta y por qué, material faltante.

## 13. Checklist antes de entregar

- ¿Parece un flyer de club y no una web corporativa?
- ¿≥ 3 texturas visibles por pantalla? ¿Cada sección cambia de fondo/ritmo?
- ¿Algo se mueve con el mouse y con el scroll? ¿Suena el audio desde el PLAY y el lineup?
- ¿Los títulos usan displays y cambian de fuente al click? ¿La lectura es serif limpia?
- ¿Acentos en plano lleno, máximo 2 por vista?
- ¿390 px sin títulos cortados ni scroll horizontal?
- ¿Reduced motion apaga el movimiento?
- ¿Todo el contenido es real y se respetan las reglas de datos?

Tomá decisiones concretas, avanzá con supuestos razonables en detalles menores y listá los que afecten el resultado.
