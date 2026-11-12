# Prompt para Claude Code — Rediseño visual de BADDER

> Pegá este prompt en Claude Code con el repositorio `LucasoVasquito/badder-sitio-web` clonado y abierto. Antes, guardá las 13 capturas del moodboard en `docs/moodboard/` dentro del repo para que Claude Code pueda verlas.

---

Actuá como director de arte y desarrollador front-end senior, especializado en diseño editorial, plataformas culturales independientes y sistemas visuales. Vas a trabajar directamente sobre este repositorio (Vite + React 18 + TypeScript + Tailwind 3 + shadcn/ui + Framer Motion + Zustand, deploy en Netlify).

El objetivo es **refinar la estética del sitio y aplicar una dirección visual concreta, navegable y responsive**, sin perder contenido, rutas ni funcionalidades. El resultado tiene que permitir evaluar cómo se vería y se sentiría realmente el sitio en `npm run dev`, en 1440 px y 390 px. Ya hay un análisis del moodboard: usalo como punto de partida para decidir, no como una conclusión para repetir.

## 0. Antes de tocar código

1. Leé `CONTENIDO.md`, `src/App.tsx`, `src/data/site.ts`, `tailwind.config.ts`, `src/index.css` y los componentes de `src/components/home/` y `src/components/site/`.
2. Corré `npm run dev` y recorré todas las rutas en 1440 px y 390 px. Anotá lo que veas renderizado. No presentes suposiciones como observaciones.
3. Mirá en conjunto las imágenes de `docs/moodboard/`. Si no podés abrirlas, decí exactamente cuáles no pudiste revisar y seguí con este brief.
4. Proponé un plan breve (archivos a modificar, orden de trabajo) y esperá confirmación antes de cambios grandes.

## 1. Contexto de BADDER

Espacio creativo multidisciplinario nacido alrededor de la música electrónica underground, en La Plata, Argentina (Est. 2024). Conecta música, cultura de club, diseño gráfico, fotografía, audiovisual, indumentaria y archivo cultural. Instagram: @badder.experience. Mail: contact@badderexperience.com.

Actividades que tienen que convivir:
- Producción musical, sesiones y colaboraciones.
- Publicaciones, referencias y documentación cultural.
- Indumentaria y experimentación gráfica.
- Proyectos creativos y servicios.

Se busca una identidad reconocible que sostenga esas actividades y pueda crecer con un equipo. La web tiene que comunicar criterio visual, personalidad y actividad real, y facilitar descubrir, leer, escuchar, explorar productos y contactar según el contenido.

**Distinción fundamental:** la identidad editorial del sitio es consistente; las gráficas de remeras, flyers y obras tienen mucha más libertad. El sitio aloja esa diversidad sin uniformarla (no teñir, no pasar todo a escala de grises, no recortar piezas cuyo encuadre importa).

Descriptor de marca: “Espacio creativo multidisciplinario”. Tono verbal: directo, sobrio, concreto. Sin manifiestos grandilocuentes ni frases genéricas sobre creatividad, innovación o romper límites.

**No inventes** proyectos publicados, productos disponibles, precios, fechas, clientes, testimonios ni estadísticas. Cuando falte material, marcá la sustitución visiblemente como “contenido de muestra” y listala en el resumen final.

## 2. Relevamiento del sitio actual (desde el repositorio)

### Arquitectura y rutas (conservar todas)
- `/` Home: Hero (logo con parallax), Latest Transmissions, Culture, From the Archive, Badder in Motion, Current Drop, Join the Frequency, About + Crew.
- `/culture`, `/culture/:postId`: notas en Markdown (`src/content/culture/*.md`, hoy 3), categorías BADDER FILES · SCENE · SOUND · DESIGN · CULTURE · REFERENCES, lightbox, referencias, relacionados, compartir.
- `/music`: Releases (6), DJ Sets (5 videos de YouTube), Sessions (1), Artists (Uriel Galeano y Anguis, con presskits).
- `/archive`, `/archive/:projectId`: ~20 proyectos (eventos, drops, series fotográficas, video, gráfica), filtros por categoría y año vía query string.
- `/shop`, `/shop/:productId`, `/cart`: 4 prendas listadas, todas `ARCHIVE` y `verified: false`; checkout deshabilitado.
- `/studio`: servicios por área (Sound, Visual Production, Design) + 3 casos.
- `/community`: 5 vías de participación (Instagram + mailto).
- `/contact`: formulario (mailto o `VITE_CONTACT_ENDPOINT`), bookings.
- Redirecciones a mantener: `/journal`, `/archivo`, `/services`, `/visuals`, `/colecciones`.

Persistentes: `Navigation` (fija, `mix-blend-difference`, 6 secciones + botón “↳ Community”, menú móvil a pantalla completa), `FloatingPlayer` (audio global abajo a la izquierda + carrito abajo a la derecha), `Footer`.

### Reglas de datos que no se pueden romper
- Un producto solo es comprable si `verified`, `status: "AVAILABLE"`, `price` y stock > 0. Hoy no hay ninguno: las prendas se muestran como archivo, sin precio. No inventes una compra funcional.
- `unverifiedNotes` nunca se muestra.
- Servicios con `confirmed: false` no se muestran.
- `links` de releases y personas solo con URLs reales (hoy vacíos: no agregar botones de Spotify o Bandcamp).
- Mantener `usePageMeta`, `MotionConfig reducedMotion="user"`, foco visible, `aria-*`, cierre del menú con Escape y compatibilidad con `/archive?album=`.

### Sistema visual actual (a reemplazar)
- Fondo negro puro, texto blanco, acento cobalto `hsl(225 100% 55%)`, rojo y burdeos.
- Titulares en Playfair Display en mayúsculas; cuerpo en Helvetica; etiquetas en monospace de 10 px con tracking amplio (`.font-mono-tight`).
- Efectos globales: grano animado sobre toda la página (`body::before`), glitch, CRT scanlines, halftone por CSS, `plastic-wrap`, `wavy-grid`, marquesinas.
- Imágenes de archivo en escala de grises que recuperan color al hover.
- 12 fuentes display cargadas en `public/` e `index.css` (Akira, Ethnocentric, Microgramma, Eurostile, Cyberpunks, Hit Me Punk, etc.).
- Encabezados numerados “02 — Kicker / Título” repetidos en todos los módulos; casi todas las secciones resueltas como grillas de tarjetas.

### Diagnóstico
- El negro, el glitch, el CRT y las fuentes tecno empujan hacia lo futurista; la dirección nueva tiene su raíz en la gráfica impresa, la figura y la edición.
- El grano y el grayscale se aplican a todo, incluidos textos y obras: contradice “materialidad localizada” y “no teñir las obras”.
- Las etiquetas de 10 px en gris al 55 % sobre negro tienen tamaño y contraste insuficientes.
- El primer pantallazo no muestra actividad real, solo el logo.
- Hay copy en inglés con tono de manifiesto (“Latest Transmissions”, “Join the frequency”, “Nacido en la pista”) que choca con el tono pedido.
- Las etiquetas tipo “T—01”, “A—001” funcionan como códigos decorativos; el brief pide evitarlas salvo que ordenen algo real.

## 3. Moodboard

### Observaciones de las capturas (`docs/moodboard/`)
- **Ilustración figurativa en trama:** perro y tigre en punteado (“Comfort Kills Ambition”, “Consumed”), esqueletos, cráneo con cerebro (“A mind is possessed…”), parcas, ratas, ovejas, personajes de cómic. Casi siempre una figura central, en negro sobre blanco o blanco sobre negro.
- **Texto arriba / imagen / texto abajo:** grotescas condensadas pesadas en mayúsculas, ajustadas al ancho de la pieza.
- **Flyers con una tinta dominante:** rojo y negro (“Any Act Night”, line-up apilado), naranja (“Evlay — Berlín”), amarillo con negro (“Dimension Alterna”), rojo sobre foto con rata amarilla (“Monsieur Gonorrhée”), verde con blanco (“Earth Beat”), riso azul sobre rosa (“Retro Print Effect Variations”).
- **Remeras:** fotografiadas planas o puestas, con la estampa como protagonista (“The Return of Drexciya”, “deaf-ender”, Shamen, Dinosaur Jr., “Cops at Work”, “Don’t Talk to Me, I’m Raving”). Detalle de etiquetas de talle (“the art of size tags”).
- **Libros de archivo / fanzines:** “Rudeboys — Mascots from the early hardcore jungle rave scene”, “Logos of the early computer software scene”, “Record Label Logo Archive Vol. 1”, “Universe of Spies”. Portadas de color pleno (verde ácido, crema, amarillo) con serif clásica centrada y crédito “Collected by…”; interiores con márgenes amplios y una pieza por página.

### Diagnóstico (del brief)
Atributos rectores: **impreso — crudo — irreverente — figurativo — editorial.**

- **Imagen protagonista:** caras, animales, personajes, manos, objetos, siluetas reconocibles. Dar espacio real a fotografías, portadas y gráficas; la personalidad se construye con material visual significativo.
- **Base neutra y pocas tintas:** blanco y negro, con acentos intensos por pieza (verde, rojo/naranja y otras). Estructura neutra y un acento dominante por composición; las obras y fotos conservan su color.
- **Contraste entre impacto y lectura:** flyers y estampas con titulares pesados e imágenes ásperas; libros de archivo con márgenes, serifas y jerarquías pausadas. Combinar portadas expresivas con índices y páginas de lectura bien resueltos.
- **Materialidad localizada:** trama, fotocopia, tinta irregular, negros empastados. Concentrarla en imágenes, reproducciones y piezas; textos, controles y navegación nítidos.
- **Estructuras simples con carácter:** imagen central, texto arriba o abajo, bloques rectangulares, columnas, tres niveles de jerarquía. Pocas estructuras reconocibles; variar escala, proporción y densidad.

**Dirección central: orden editorial + expresividad de flyers y estampas.** No convertir la relación con la música electrónica en una interfaz futurista.

Lectura útil para decidir: el sistema del sitio debería comportarse como **los libros de archivo** (papel, serif, márgenes, índice, crédito) y dejar que **las piezas** (flyers, estampas, fotos) aporten la tinta y la irreverencia. No copies ninguna pieza del moodboard.

## 4. Sistema a implementar (hipótesis de trabajo)

Ajustá los valores si el resultado mejora y justificá cada cambio en una línea.

### Color — reemplazar las variables de `:root` en `src/index.css`
- Fondo principal `#F0EDE3`: archivo, lectura, superficies editoriales.
- Fondo oscuro `#181917`: música, destacados, bloques de contraste.
- Texto principal `#181917` sobre claro; texto invertido `#F0EDE3` sobre oscuro.
- Acento principal `#83CC16`: estados activos y énfasis puntual.
- Acento alternativo `#EF432B`: campañas y aperturas específicas.

Criterios: el claro se siente papel de publicación, no artesanal ni nostálgico. El negro genera contraste estructural. Un acento dominante por página o composición (p. ej. `data-accent` en `<main>` por ruta); no repartir verde y rojo arbitrariamente; no teñir el contenido. Verificá contraste AA: `#83CC16` sobre papel no sirve para texto, usalo como fondo con texto `#181917` o en filetes e indicadores. Mapeá las variables de shadcn (`background`, `foreground`, `border`, `muted`, `ring`…) a estos tokens para no romper `components/ui`.

### Tipografía — Archivo + PT Serif (Google Fonts)
- **Archivo:** titulares de impacto (700–900, mayúsculas en títulos breves), navegación, interfaz, categorías y datos (400–600). Probá el eje de ancho (Archivo Condensed / `font-stretch`) para titulares, en la línea de las grotescas condensadas del moodboard.
- **PT Serif:** títulos de artículos, introducciones, lectura editorial. Usala con intención, para dar otra cadencia (como las portadas de los libros de archivo).
- Reemplazá `.font-mono-tight` por una etiqueta en Archivo de 12–14 px, peso 500–600, mayúsculas, tracking moderado y contraste suficiente.
- Escalas: H1 de portada 80–112 px desktop / 44–56 px móvil; H1 editorial 56–72 / 36–44; H2 32–44 / 26–32; cuerpo 18 px; etiquetas y créditos 12–14 px; lectura de 60–70 caracteres. Usá `clamp()`. Sin cortes de palabra y sin titulares que empujen lo relevante fuera del primer pantallazo.
- Podés proponer otra pareja si mejora claramente el resultado; mostrá la diferencia aplicada y no agregues familias por variedad.
- Los letterings de obras y campañas (las fuentes display de `public/`) no se usan en la interfaz. Quitá sus `@font-face` del CSS global si quedan sin uso; no borres los archivos sin confirmar.

### Formas y superficies
- Radio 0. Filetes de 1 px para separar información. Bordes de 2 px en controles con énfasis. Superficies planas, sin sombras ni blur.
- Espaciado: 8, 16, 24, 32, 48, 64, 96 px.
- Texturas solo dentro de piezas concretas, con intensidad controlada.
- Eliminá del CSS global: grano animado de `body::before`, `glitch`, `crt-scanlines`, `halftone` por hover, `plastic-wrap`, `wavy-grid`, scrollbar negra. Quitá el grayscale por defecto de las imágenes.

### Composición
- 12 columnas en escritorio, 4 en móvil; calles de ~24 y 16 px; márgenes de 48 y 20 px; ancho máximo ~1440 px (hoy `max-w-6xl` = 1152 px). Creá un `Container` o utilidades para no repetir `px-6 md:px-16 max-w-6xl`.
- Asimetría con alineaciones claras. Explorá una apertura de 8 columnas para contenido principal + 4 para índice secundario.
- Alterná densidades: la portada puede tener tensión visual; un listado debe permitir comparar; un artículo, leer.
- No conviertas todas las secciones en la misma grilla de tarjetas. Formato según función:
  - Archivo: índice o listado editorial.
  - Música: portada, título, información y acción de escucha.
  - Indumentaria: fotografía legible, nombre y acceso al detalle.
  - Proyectos: imágenes y contexto del trabajo.

## 5. Navegación

- Revisá la arquitectura antes de definir el menú. Si proponés reagrupar (p. ej. Community dentro de Studio o Contacto, quitar “Home” porque el logo ya lleva al inicio), explicá cómo se conserva el acceso y mantené las rutas o redirecciones.
- Cabecera compacta sobre papel, sin `mix-blend-difference`: marca, secciones, Community y carrito. Estado activo claro (subrayado de 2 px o fondo de acento con texto oscuro).
- Menú móvil legible y fácil de cerrar: lista con filetes, Archivo en peso alto, botón de cierre de 44 × 44 px.
- `FloatingPlayer`: rediseñalo como barra o bloque rectangular oscuro con portada, artista — título, play/pausa y siguiente. Que no tape contenido ni el footer en móvil. El carrito puede pasar a la cabecera.

## 6. Pantallas

Desarrollá una dirección principal coherente y aplicala como mínimo a estas vistas, con contenido real del repo. Aplicá el mismo sistema, con menos profundidad, a Music, Studio, Community, Contact, Cart y 404.

### A. Home (`src/pages/Home.tsx`, `components/home/*`)
Debe mostrar actividad concreta de BADDER.
- Cabecera compacta con marca y navegación.
- Una publicación, sesión o producción como protagonista en el primer pantallazo (p. ej. “Not Rules EP” de Uriel Galeano con acción de escucha, o el proyecto de archivo más reciente). Reemplaza al hero de logo + parallax.
- Un índice de contenidos recientes.
- Bloques diferenciados para música, indumentaria y proyectos según el material disponible.
- Footer con navegación y contacto.
- El primer pantallazo establece identidad, muestra algo relevante y ofrece un recorrido claro.
- Reescribí kickers y títulos en español sobrio (“Último lanzamiento”, “Notas”, “Archivo”, “Indumentaria”, “Participar”) y dejá el About concreto y breve.

### B. Archivo / índice editorial (`Archivo.tsx`, `Journal.tsx`)
- Jerarquía entre destacados y entradas (un destacado + índice tipo lista con fecha, tipo, lugar, título y cantidad de material).
- Categorías y fechas cuando existan.
- Títulos de distintas longitudes sin romper la grilla.
- Filtros solo si ayudan a explorar el volumen real: hoy hay ~20 proyectos, así que conservá categoría y año con controles nítidos y estado activo de 2 px.
- Reproducciones completas (`object-contain` sobre papel) cuando el encuadre original importa (flyers, estampas).

### C. Artículo / ficha de contenido (`CultureArticle.tsx`, `ArchiveProject.tsx`)
- Título (PT Serif), introducción y créditos.
- Texto a 18 px y ~66 caracteres; estilos de Markdown (`components/site/Markdown`) para h2, listas, citas e imágenes.
- Imágenes completas y detalles ampliados (lightbox existente).
- Pies de imagen y fuentes cuando correspondan.
- Continuidad hacia otros contenidos (relacionados, anterior / siguiente).
- La ficha de proyecto muestra créditos reales (`credits`), sets de fotos, gráficas, videos, diseños y procesos.

### D. Indumentaria o proyecto (`Shop.tsx`, `ProductDetail.tsx`, `/archive/drop-*`)
- Demostrar cómo el sistema aloja una gráfica muy expresiva sin perder coherencia (p. ej. DROP 3: BLUE CLIFFORD, BUNKER 001, Noise for the Dancefloor, con sus colores).
- Las fotografías y diseños conservan protagonismo; la interfaz aporta orden, información (nombre, colección, temporada, diseño por) y acceso a la acción correspondiente.
- No inventes una compra funcional: estados “Archivo”, “Próximamente”, “Agotado” sin precio cuando no hay datos verificados; mantené el aviso de compras deshabilitadas y las vías de consulta.
- Idea a evaluar: tratar los créditos de la prenda como una etiqueta (en la línea de las etiquetas de talle del moodboard), sin que se convierta en decoración.

## 7. Interacción y responsive

- Botones rectangulares con acciones específicas: “Escuchar sesión”, “Leer artículo”, “Ver colección”.
- Áreas táctiles de al menos 44 × 44 px.
- Estados claros de hover, foco y selección. Navegación por teclado.
- Menú móvil legible y fácil de cerrar.
- Ninguna información esencial dependiente de hover.
- Animaciones breves y discretas, respetando movimiento reducido. Sin parallax de mouse ni animaciones infinitas.
- Imágenes optimizadas y carga diferida cuando corresponda (aprovechá `SmartImage` y los thumbs existentes).
- Sin videos pesados en autoplay como condición para que la portada funcione.
- Diseñá realmente la versión móvil: reordená contenidos, ajustá el ritmo y verificá la lectura. No te limites a apilar la versión de escritorio.

## 8. Límites de la dirección

Evitá:
- Apariencia de plantilla corporativa o dashboard.
- Grillas interminables de tarjetas idénticas.
- Bordes redondeados y sombras por defecto.
- Degradados, glassmorphism o brillos sin relación con las referencias.
- Ruido aplicado sobre toda la interfaz.
- Códigos, coordenadas, etiquetas técnicas o advertencias ficticias como decoración.
- Recursos rave genéricos para “comunicar underground”.
- Textos excesivamente pequeños para producir densidad.
- Repetir una composición idéntica en todas las páginas.

La irreverencia puede aparecer en la imagen, la escala y las relaciones entre elementos. La navegación sigue siendo clara.

## 9. Entregables

1. Código en una rama nueva (`redesign/editorial`), con commits por etapa: tokens y tipografía → layout y navegación → Home → Archivo/Culture → Artículo/Ficha → Shop/Drop → resto de páginas → limpieza de CSS.
2. `npm run build`, `npm run lint` y `npm run test` sin errores.
3. Capturas de Home, Archivo, Artículo y Drop/Producto en 1440 px y 390 px, en `docs/capturas/`.
4. Una ruta interna `/sistema` (no enlazada desde el menú) con el sistema compacto de componentes: cabecera, navegación, botones, entrada de archivo, bloque musical, ficha de producto/proyecto y footer, con sus estados.
5. Un `DISENO.md` corto con:
   - Síntesis de dirección de arte: decisiones tomadas y los tres recursos que más identidad aportan.
   - Tokens finales: colores, tipografías, escala de espacios, bordes y estados.
   - Ajustes al brief, separando decisiones visuales de limitaciones de acceso o contenido.
   - Supuestos que afecten el resultado.
   - Contenido de muestra usado y material que falta pedir al equipo (fotos de producto de remeras nuevas, links reales de releases, etc.).
6. Si una decisión estética queda realmente abierta, mostrala como una variación puntual dentro de la misma pantalla (p. ej. un toggle en `/sistema`), no como otra dirección completa.

## 10. Revisión antes de entregar

- ¿La identidad se sostiene también en un listado y en una página de lectura?
- ¿Se reconoce la relación con el moodboard sin copiar una pieza?
- ¿Las obras pueden variar sin romper la coherencia del sitio?
- ¿Los títulos largos y los contenidos reales entran correctamente?
- ¿La versión móvil conserva carácter y legibilidad?
- ¿Cada recurso gráfico tiene una función?
- ¿Se entiende qué produce BADDER y cómo explorar sus distintas actividades?

Tomá decisiones concretas y avanzá con supuestos razonables cuando falten detalles menores. Señalá los supuestos que afecten el resultado.
