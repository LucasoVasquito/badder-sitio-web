# Prompt para Claude Code: BADDER v3 (iOS, jerarquía, shop, cuadros y transición tipográfica)

> Pegalo en Claude Code con `LucasoVasquito/badder-sitio-web` abierto. Este prompt **se suma** a `prompt-claude-code-badder-v2.md` y **no lo reemplaza**: la estética "flyer vivo" sigue igual (tokens, tipografías, texturas, grano, cursor, cintas). Acá solo se definen los cambios nuevos. Si este prompt y el v2 se contradicen, gana este.

---

Actuá como director de arte y desarrollador front-end senior. Stack: Vite + React 18 + TypeScript + Tailwind 3 + shadcn/ui + Framer Motion + Zustand, con deploy en Netlify.

## 0. Antes de tocar código

1. Releé `docs/rediseno/prompt-claude-code-badder-v2.md` y `docs/rediseno/BADDER-estetica-megaprompt.md`, y abrí la maqueta `docs/rediseno/BADDER Rediseño v2.dc.html`.
2. Revisá `Navigation.tsx`, `Home.tsx`, `src/components/home/*`, la página o componente de Shop, `src/data/products.ts` y `FontCycleTitle` (si ya existe).
3. Proponé un plan corto (archivos nuevos y modificados, en orden) y **esperá mi confirmación** antes de empezar.

## 1. Optimización para iOS (Safari y Chrome iOS)

Todo lo de esta sección es obligatorio. Probalo en Safari iOS real o en el simulador de Xcode, a 375, 390 y 430 px.

- **Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Respetá `env(safe-area-inset-*)` en el header fijo, el FloatingPlayer, el footer y cualquier barra fija.
- **Alto de pantalla:** reemplazá todo `100vh` por `100svh` (con `100vh` como fallback). El hero y las secciones de pantalla completa no pueden saltar cuando aparece o desaparece la barra de Safari.
- **Sin zoom al tocar inputs:** `font-size` de 16 px o más en todos los `input`, `select` y `textarea` (newsletter, búsqueda, cantidad).
- **Hover inexistente:** todo lo que hoy depende de `:hover` (fotos que se desenfocan, glitch de títulos, rotaciones) tiene que tener un equivalente táctil: al tocar se activa y al tocar otra cosa se desactiva. Envolvé los hover en `@media (hover:hover) and (pointer:fine)`.
- **Cursor custom:** desactivalo en dispositivos táctiles (`pointer:coarse`).
- **Áreas táctiles:** mínimo 44×44 px en links del menú, botones de play, ícono de shop y controles del perchero.
- **Rendimiento:**
  - Los filtros SVG pesados (`feTurbulence` animado, `feDisplacementMap`) en iOS se reemplazan por un PNG de ruido estático con `mix-blend-mode`. Guardalo en `public/img/noise.png`.
  - Animá solo `transform` y `opacity`. Usá `will-change` solo durante la animación.
  - Distorsión por scroll: limitala con `requestAnimationFrame` y bajá la intensidad en mobile.
  - Si el usuario tiene activado reducir movimiento (`prefers-reduced-motion`), se apagan las distorsiones, los marquees y el balanceo del perchero.
- **Scroll:** sin scroll horizontal accidental (`overflow-x: clip` en `html` y `body`). En carruseles horizontales usá `overscroll-behavior-x: contain` y `touch-action: pan-y` donde corresponda, para no romper el gesto de volver atrás de iOS.
- **Audio:** el reproductor solo arranca con un tap (iOS bloquea el autoplay). Agregá `playsinline` a los videos, y que los de fondo sean `muted` y `loop`.
- **Imágenes:** `loading="lazy"` y `decoding="async"` debajo del pliegue, con `srcset` en WebP. El hero va con `fetchpriority="high"`.
- **Menú mobile:** el menú desplegable bloquea el scroll del body de forma compatible con iOS (`position:fixed` en el body guardando el `scrollY`, no solo `overflow:hidden`).

## 2. Header: nueva jerarquía

Orden exacto de los ítems:

**Home · Culture · Shop · Studio · Music · Archive · Community**

- El **ícono de shop (carrito/bolsa) se queda como está**, a la derecha, con su contador.
- Community conserva el tratamiento de botón con borde (`↳ Community`) como último ítem.
- En mobile, todo se mueve a un menú de pantalla completa con el mismo orden, en tipografía display grande (Anton, 48–64 px), un ítem por línea, con leve rotación alternada (−2° / 1.5°). El ícono de shop sigue visible en la barra, fuera del menú.
- Actualizá rutas y anclas para que cada ítem lleve a su página o sección real.

## 3. Home: nueva jerarquía de secciones

Orden exacto:

1. **Drop 3** (reemplaza al hero actual como primera sección, con la remera de Drop 3 como protagonista y CTA al shop)
2. **Culture**
3. **Studio** *(sección nueva, ver abajo)*
4. **Latest Transmissions**
5. **From the Archive**
6. **Badder in Motion**
7. **Join the Frequency**
8. **About**

Mantené la estética de cada sección tal como está en v2. Solo cambia el orden. Que el fondo alterne entre negro, papel y acento sin repetir dos iguales seguidos. Si al reordenar quedan dos seguidas iguales, cambiale el fondo a una.

### 3.1 Sección nueva: Studio

Objetivo: presentar los servicios creativos de BADDER y llevar a `/studio`.

- **Título:** "Studio", con tipografía display rotable (FontCycleTitle). Por defecto, Microgramma o Akira.
- **Contenido:** una lista de servicios tipo "menú de flyer", cada uno con número mono (`01`, `02`…), nombre grande en Anton y una línea en Newsreader itálica. Servicios a mostrar: **[completar con los servicios reales: por ejemplo diseño gráfico/identidad, fotografía de eventos, motion/visuales, dirección de arte, producción de eventos]**. **No inventes servicios ni precios.** Si no están en `CONTENIDO.md` o `src/data`, dejá placeholders marcados con `TODO` y avisame.
- **Interacción:** al pasar el mouse por un servicio (o tocarlo, en mobile) aparece una imagen de trabajo de ese servicio pegada con cinta, rotada y siguiendo levemente al cursor. Usá imágenes existentes de `public/img/` y avisame cuáles faltan.
- **CTA:** botón grande "Studio →" que lleva a `/studio`. Tratamiento de sticker circular rojo (como el "DROP 3" de las publicaciones) o bloque lleno en `--a`, con sombra dura `6px 6px 0 #0A0A09`.
- **Fondo:** papel `#F2EFE6` con halftone en una esquina (salvo que choque con la regla de alternancia).

## 4. Shop: remeras en un perchero

**Decisión:** las remeras van en un **perchero interactivo**. Funciona mejor que el collage para un catálogo: deja ver cada prenda completa y de a una, se entiende al instante como "ropa colgada", y la estética de collage ya está en todo el resto del sitio, así que no hace falta repetirla acá. El collage se usa para los cuadros (sección 5).

Referencia del comportamiento: remeras colgadas en perchas sobre una barra. Al hacer click o arrastrar se van pasando una por una, como cuando buscás ropa en un perchero de tienda.

### Comportamiento

- **Barra:** una línea horizontal de 6–8 px en negro (o cromada con un degradé sutil de grises, solo en la barra), arriba del área.
- **Perchas:** cada remera cuelga de una percha (gancho dibujado en SVG simple o PNG), con la remera en PNG recortado y fondo transparente.
- **Activa vs. comprimidas:** las remeras están casi superpuestas, de canto o con perspectiva (`rotateY` de unos 70°, comprimidas en X). La activa queda de frente (`rotateY(0)`), más grande y adelante.
- **Pasar remeras:**
  - Desktop: click en la remera siguiente o anterior, flechas del teclado, rueda del mouse en horizontal y arrastre.
  - Mobile: swipe horizontal.
  - Cada cambio desliza las perchas a lo largo de la barra.
- **Física:** al pasar, la remera que se mueve **se balancea** sobre el gancho (rotación en Z con resorte amortiguado; Framer Motion `spring`, stiffness ≈ 120, damping ≈ 8). Las vecinas acompañan con un balanceo menor. Que se sienta peso de tela, no un slider.
- **Frente y espalda:** al tocar o hacer click en la remera activa, gira y muestra la espalda (`rotateY(180deg)` con dos caras).
- **Info de la remera activa** (en tipografía mono y Anton, al costado o debajo): nombre, drop, precio, talles (selector), botón "Agregar". Etiqueta colgante tipo tag de ropa con hilo, rotada, con el precio.
- **Fondo:** pared de papel con grano, una sombra dura de cada remera sobre la pared y el nombre del drop gigante detrás, en contorno.
- **Accesibilidad:** las perchas son botones navegables con teclado, con `aria-label` "Remera X, talle, precio". Si el usuario tiene activado reducir movimiento, se apaga el balanceo y el cambio es un fundido.
- **Datos:** sale de `src/data/products.ts`. Agregá campos `imageFront`, `imageBack` (PNG transparente) y `category: 'tee' | 'print'` si no existen. Si faltan PNG recortados, listámelos.

## 5. Cuadros con los diseños: "pared de galería"

Los cuadros se muestran como una **pared de galería tipo flyer/collage**, que es la estética que veníamos usando.

- **Pared:** fondo oscuro con textura (damero sutil o pared de papel pegado con afiches viejos desenfocados). Los cuadros van colgados en distintos tamaños según el formato real (A4, A3, 50×70), sin grilla: alturas y separaciones irregulares, rotaciones entre −3° y 3°.
- **Cada cuadro:** marco (negro, madera clara o blanco, según la variante) con passepartout, sombra realista de cuadro colgado y un clavo o cinta arriba. Al lado, cartela tipo museo en mono: título, año, técnica, medida, precio.
- **Interacción:**
  - Hover o tap: el cuadro se endereza (0°), se acerca un poco y la sombra se alarga. Los demás se oscurecen.
  - Click: abre una vista "en ambiente". El cuadro aparece colgado en una pared de living o estudio (foto de mockup), con selector de marco y medida que se actualiza en vivo.
  - Mouse: leve parallax de los cuadros según la profundidad.
- **Mobile:** la pared pasa a ser un scroll vertical de cuadros grandes, uno por pantalla, manteniendo rotación leve, cartela y marco. Nada de grilla de miniaturas.
- **Datos:** usá `category: 'print'` en `products.ts`, con los campos `sizes`, `frames` y `mockupRoom`. Si no hay cuadros cargados todavía, armá la sección con 3 o 4 diseños existentes de `public/img/` marcados como `TODO` y avisame.

## 6. Transición al cambiar tipografía de títulos

El click que rota la tipografía (`FontCycleTitle`) se mantiene, pero el cambio deja de ser instantáneo. Implementá esta transición, de unos 450 ms en total:

1. **Salida (≈180 ms):** el título se "imprime mal". Se aplica `filter: blur(6px)`, sube el glitch RGB (`text-shadow` de 4 px a 14 px) y el texto se desplaza en X ±6 px con 2 o 3 saltos (steps).
2. **Cambio:** en el punto de máximo blur se cambia la `font-family`. Antes de mostrarla, esperá a que la fuente nueva esté cargada (`document.fonts.load()`) para que no aparezca la fuente de reemplazo del navegador.
3. **Entrada (≈270 ms):** el blur vuelve a 0, el glitch se cierra y el texto se asienta con una leve sobreescala (1.04 → 1) más un rebote mínimo de rotación (±1°).
4. **Extra opcional:** durante la transición, cada letra se reemplaza 1 o 2 veces por un carácter aleatorio en la fuente nueva (scramble) antes de mostrar la definitiva. Hacelo solo si no afecta la legibilidad ni el layout.

Reglas:
- **Sin saltos de layout:** antes del cambio, fijá el alto del contenedor con `min-height` y animalo con suavidad al nuevo alto si cambia.
- **Clicks seguidos:** si llegan clicks rápidos, se encolan o se ignora el click que llega durante la animación. La animación no se rompe.
- Si el usuario tiene activado reducir movimiento, el cambio es un fundido de 150 ms.
- Seguí guardando la elección en `localStorage` por id de título.
- En mobile también funciona con un tap.

## 7. Checklist final (comprobalo antes de dar por terminado)

1. El header tiene el orden Home · Culture · Shop · Studio · Music · Archive · Community, con el ícono de shop intacto.
2. La home tiene el orden Drop 3 · Culture · Studio · Latest Transmissions · From the Archive · Badder in Motion · Join the Frequency · About.
3. La sección Studio tiene servicios reales (o TODO marcados) y el botón "Studio →" funciona.
4. El perchero funciona con click, teclado, arrastre y swipe; tiene balanceo y giro frente/espalda; y "Agregar" funciona.
5. La pared de cuadros funciona en desktop y mobile, y la vista en ambiente cambia marco y medida.
6. La transición tipográfica no genera saltos de layout ni muestra la fuente de reemplazo del navegador.
7. En iOS real: no hay saltos de `100vh`, se respeta la zona segura (`safe-area`), no hay zoom en inputs, no hay scroll horizontal, el audio arranca con tap y todo lo hover tiene versión táctil.
8. Con reducir movimiento activado, no queda nada animado de más.
9. Lighthouse mobile: Performance ≥ 80, Accessibility ≥ 95.
10. No se borró ningún archivo ni dato sin mi confirmación.

Al terminar, pasame:
- La lista de archivos modificados.
- Lo que quedó como `TODO`: servicios, PNG de remeras y cuadros, y mockups de ambiente.
- Capturas en 390 px y 1440 px de la home, el shop y la pared de cuadros.
