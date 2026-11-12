# BADDER — Dirección de arte y sistema visual

Rama `redesign/editorial`. Referencia viva de los componentes: ruta interna `/sistema` (no enlazada desde el menú). Capturas en `docs/capturas/`.

## 1. Síntesis de dirección

El sitio se comporta como **un libro de archivo** (papel, serif, márgenes, índice, crédito) y deja que **las piezas** (flyers, estampas, fotos) aporten la tinta y la irreverencia. No hay efectos globales: la materialidad vive en las imágenes.

Decisiones:

- Fondo papel `#F0EDE3` para lectura y archivo; bloques en tinta `#181917` para música, el footer y el reproductor. Los bloques oscuros invierten los tokens con la clase `surface-dark`.
- Un acento dominante por pantalla, vía `data-accent` en `<main>`: lima por defecto; rojo en Participar, Carrito y 404.
- Cada sección tiene el formato que le corresponde: Archivo = destacado + índice con año/tipo/lugar/material; Notas = nota principal + índice de lectura; Música = portada + título + acción de escucha; Indumentaria = fotografía + etiqueta de prenda.
- Las obras se muestran completas (`object-contain`) sobre tinta o papel y nunca se tiñen. Las gráficas crema sobre transparente (p. ej. BUNKER 001) se montan sobre tinta, como fueron pensadas.

**Los tres recursos que más identidad aportan**

1. Titular condensado pesado en mayúsculas (Archivo, eje de ancho), con filetes de 2 px: la voz de los flyers y estampas dentro de un sistema editorial.
2. Alternancia papel / tinta: el contraste estructural separa lectura de escucha.
3. La **etiqueta de prenda** en la ficha de producto (Colección · Temporada · Diseño): los créditos tratados como las etiquetas de talle del moodboard, con función informativa.

## 2. Tokens finales

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#F0EDE3` | Fondo de lectura y archivo |
| `--ink` | `#181917` | Texto; superficies oscuras |
| `--lime` | `#83CC16` | Acento principal: estados activos, fondo de acciones |
| `--red` | `#EF432B` | Acento alternativo por pantalla |
| `--muted-foreground` | `hsl(80 3% 34%)` | Texto secundario (≈ 6:1 sobre papel) |
| `--secondary` | `hsl(46 22% 86%)` | Superficie de apoyo (`surface-tint`) |
| `--destructive` | `hsl(7 86% 42%)` | Texto de error con contraste AA |

Las variables de shadcn (`background`, `foreground`, `border`, `muted`, `ring`, `accent`…) se mapean a estos tokens para no romper `components/ui`. **El lima no se usa como texto sobre papel** (no pasa AA): va como fondo con texto tinta, o en filetes e indicadores.

**Tipografía** (Google Fonts): Archivo 100–900 con eje de ancho; PT Serif 400/700.

- `.font-display`: Archivo, `font-stretch: 72%`, 800, mayúsculas. Tamaños con `clamp()`: `.text-hero` (44–112 px), `.text-title` (36–72 px), `.text-h2` (26–44 px).
- `.label`: Archivo 13 px, 600, mayúsculas, tracking 0,06 em (reemplaza a `.font-mono-tight`, que queda como alias).
- `.reading`: 18 px, interlínea 1,65, máx. 66 caracteres. PT Serif en títulos de notas, introducciones y el bloque "Quiénes somos".

**Espaciado** 8 / 16 / 24 / 32 / 48 / 64 / 96 px. Márgenes 20 px (móvil) y 48 px (escritorio); ancho máximo 1440 px (utilidad `.wrap` = 1344 px de contenido). **Bordes** radio 0, filetes de 1 px, 2 px en controles y énfasis; sin sombras ni blur. **Estados:** hover = fondo de acento con texto tinta; activo = subrayado de 2 px o fondo de acento; foco = contorno de 2 px; áreas táctiles ≥ 44 px.

## 3. Ajustes al brief

Decisiones visuales:

- **Navegación sin "Home"**: el logo lleva al inicio y el footer conserva el acceso. Etiquetas en español: Notas, Música, Archivo, Indumentaria, Estudio, Participar. Las rutas (`/culture`, `/music`, `/archive`, `/shop`, `/studio`, `/community`) y todas las redirecciones se mantienen.
- **Carrito en la cabecera** (antes flotante). El reproductor es una barra oscura abajo (portada, artista — título, play/pausa, siguiente); el footer reserva su altura.
- Se eliminó la numeración decorativa de encabezados ("02 — …") y los códigos "T—01", "A—001".
- Se quitaron grano, glitch, CRT, halftone, `plastic-wrap`, `wavy-grid`, scrollbar negra, grayscale por defecto y el parallax de mouse. Se removieron las 12 `@font-face` de display; **los archivos de fuentes siguen en `public/`** (no se borraron sin confirmación).
- Se borró código sin ruta ni uso: `pages/Index`, `ExtendedHero`, `QuickAccess`, `Visuals` y las secciones heredadas que solo ellos importaban. Queda en el historial de git.
- En Home, el hero de logo con parallax se reemplazó por el último lanzamiento (Not Rules EP) con acción de escucha, más un índice "Reciente".

Limitaciones de acceso o contenido:

- **No existía `docs/moodboard/`** en el proyecto, así que no se revisaron las 13 capturas. La dirección sale del texto del brief.
- El repositorio no tenía git: se creó uno local y la rama `redesign/editorial` (commit inicial "Estado inicial antes del rediseño").
- Las capturas se hicieron con Edge headless. El móvil se renderizó dentro de un iframe de 390 px (el navegador no baja de ~500 px de ventana), por lo que el lienzo del PNG móvil mide 500 px con el sitio a 390 px.
- No se probó con lector de pantalla ni en dispositivos reales.

## 4. Supuestos que afectan el resultado

- El destacado de la Home es "Not Rules EP": es el primer release del catálogo y tiene audio completo cargado.
- El destacado de Archivo en Home es DROP 3 (gráfica y colores más expresivos).
- Los contenidos recientes se ordenan por tipo (el archivo solo tiene año, no fecha completa).
- Las reglas de datos no cambiaron: ningún producto es comprable sin `verified`, `AVAILABLE`, precio y stock; `unverifiedNotes` no se muestra; servicios con `confirmed: false` no se muestran; los `links` de releases y personas siguen vacíos y no se agregaron botones de Spotify o Bandcamp.
- La trama (`.trama`) quedó disponible como utilidad pero no se aplica a ninguna pantalla: se usará solo dentro de piezas concretas cuando haya material.

## 5. Contenido de muestra y material pendiente

No se inventó contenido nuevo: todo sale de `src/data/` y `src/content/`. Textos reescritos en español sobrio (kickers, títulos de módulo, "Quiénes somos", "Participar").

Material que conviene pedir al equipo:

- Fotos de producto de remeras nuevas (hoy las 4 prendas son `ARCHIVE`, sin precio ni stock verificado).
- Links reales de releases (Bandcamp, Spotify, Beatport) y de personas.
- Fechas completas de los proyectos de archivo (hoy solo año) para ordenar el índice reciente.
- Las 13 imágenes del moodboard en `docs/moodboard/` para contrastar la dirección.
