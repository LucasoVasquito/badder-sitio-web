# Prompt para Claude Code: Shop v4 (remeras "Line-up" + cuadros "Wheatpaste")

> Pegalo en Claude Code con el repo abierto. **Reemplaza** las secciones 4 y 5 de `prompt-claude-code-badder-v3.md` y también `prompt-perchero-v2.md`. Se descarta el perchero y se descarta la pared de cuadros actual, junto con su vista "en ambiente".

---

Actuá como director de arte y desarrollador front-end senior. Rehacé las secciones **Remeras** y **Cuadros** de `/shop`.

## Regla de estética (aplica a todo)

Usá **exactamente** el lenguaje de la home v2 y de las publicaciones de Drop 3 (`docs/rediseno/BADDER Rediseño v2.dc.html` y `BADDER-reglas-publicaciones.md`):

- **Paleta:** `#0A0A09`, `#F2EFE6` y `#FF2B1C`. Nada más: no uses madera, verde de plantas, beige cálido ni ilustraciones de muebles.
- **Tipografías:** Anton o Seagram (títulos, con FontCycleTitle), IBM Plex Mono (datos), Newsreader itálica (bajadas) y Pinyon Script (una palabra por sección, como máximo).
- **Recursos:** cinta adhesiva, borde de picos, halftone, damero, scanlines, grano, aberración RGB y rotaciones de −6° a 6°.
- **PROHIBIDO:**
  - Ilustraciones vectoriales de objetos (sillones, plantas, perchas, prendas, ambientes).
  - Sombras suaves "de app".
  - Bordes redondeados.
  - Modales blancos genéricos.
  - Cartelas tipo post-it beige.
  - Fondos con desenfoque de fotos.
- Todo producto se muestra con su **foto o archivo real**. Si falta, mostrá un bloque negro con "FALTA ARCHIVO: <slug>" en mono rojo.

---

## 1. Remeras: "LINE-UP"

**Concepto:** el catálogo es el **line-up de una fiesta**, como en un flyer de club. Cada remera es un "artista" del cartel. Al pasar o tocar un nombre, la remera "sube al escenario".

### Layout (desktop)
- Fondo negro con scanlines y grano. Arriba va una cinta de texto que se repite: `BADDER SHOP / DROP 3 / LINE-UP / ...`, en Doto rojo sobre negro, rotada −2°.
- **Columna izquierda (60%):** lista de nombres de remeras, uno por línea.
  - El nombre va en Anton de 72 a 120 px, en MAYÚSCULA y crema.
  - Al costado de cada nombre, en mono pequeño, va el "horario de set": el drop y el precio (por ejemplo, `DROP 3 — $XX.XXX`).
  - La primera línea es la más grande, como el headliner de un cartel, y el tamaño va bajando. El orden lo define `products.ts` (`featured` primero).
  - Separadores: `/`, `★` o `×` en rojo entre nombres, y algunos nombres en contorno (`-webkit-text-stroke`), alternados.
- **Columna derecha (40%), sticky:** el "escenario". Se ve la foto real de la remera activa (PNG transparente), en un marco negro con borde de picos rojo arriba, rotada −2°, con cinta en una esquina y un sticker circular rojo con el precio.

### Interacción
- **Hover sobre un nombre** (en desktop): ese nombre pasa a rojo con aberración RGB, y los demás bajan a opacidad .35. En el escenario, la foto cambia con un efecto de **"fotocopia"**:
  1. Una barra de luz crema horizontal (de 6 px, con blur) barre la imagen de arriba hacia abajo en 350 ms.
  2. Detrás de la barra, la foto nueva aparece primero en **bitmap/halftone en blanco y negro**. Usá el `filter` de bitmap de la maqueta v2, o un canvas con umbral si es más liviano.
  3. Unos 200 ms después, la foto pasa a color con un fundido.
  4. Si el usuario tiene activado reducir movimiento, solo hay un fundido de 150 ms.
- **Click en un nombre o en la foto:** gira la remera para mostrar la espalda (`rotateY 180°`, con dos caras). Un segundo click abre el detalle del producto.
- **Teclado:** las flechas arriba y abajo recorren la lista, y Enter abre el producto.

### Mobile / iOS
- Los nombres van en una lista vertical, a 48–64 px.
- El escenario se pone **en línea**, debajo del nombre activo: se expande como un acordeón y repite el efecto fotocopia.
- Tocar un nombre lo activa (el toque reemplaza al hover), y tocarlo de nuevo abre el producto.
- Todas las áreas táctiles miden 44 px o más.

### Datos
`products.ts` (`category: 'tee'`): `name`, `drop`, `price`, `imageFront`, `imageBack`, `featured`.

---

## 2. Cuadros: "WHEATPASTE"

**Concepto:** los cuadros se muestran como **afiches pegados en una pared de la calle**, igual que se pegan los flyers de una fiesta.

### Layout (desktop)
- **Pared:** fondo `#F2EFE6` (papel), con un collage de restos de afiches viejos arrancados detrás. Los restos son las mismas imágenes de los cuadros, recortadas en fragmentos en bitmap a opacidad .12, con bordes rotos (`clip-path` irregular). Encima van el damero en una franja inferior y el halftone en una esquina. **No uses fondos negros con desenfoque.**
- **Título** de la sección en Seagram rojo, rotado −4°, montado sobre el primer cuadro (como "The Showcase" en el post 1a).
- **Cuadros:**
  - Van pegados en grilla rota: tamaños proporcionales a la medida real (50×70 > A3 > A4), rotados entre −4° y 4°, superpuestos un 5–10% entre vecinos.
  - Cada uno lleva **marco negro de 14 px y borde de picos**, como la foto principal del post 1a, con 1 o 2 cintas en las esquinas.
  - Sin passepartout beige y sin marcos de madera.
- **Cartela de cada cuadro:** no es un post-it. Es una **franja negra** pegada debajo o al costado del cuadro, rotada al revés que el cuadro, con este contenido:
  - El nombre en Anton crema de 28–36 px.
  - Debajo, en mono crema de 12 px: `SS25 · SERIGRAFÍA · A3 29.7×42`.
  - El precio en un sticker rojo pequeño.

### Interacción
- **Hover o tap** sobre un cuadro: se endereza a 0°, sube un poco y gana una **sombra dura** (`10px 10px 0 #0A0A09`). Los demás cuadros pasan a bitmap en blanco y negro (`filter` de la maqueta).
- **Mouse:** parallax leve (±8 px) según la profundidad.
- **Click: vista de detalle "FICHA"**, a pantalla completa con fondo negro. Sin ambiente ilustrado:
  - **Izquierda:** el cuadro grande, con el marco elegido, y una **lupa** que sigue al cursor (un círculo de 180 px con borde rojo de 3 px que muestra la imagen a 2.5×). Sirve para ver el detalle de impresión. En mobile se activa con pinch-zoom.
  - **Derecha:** una ficha técnica, como un flyer:
    - Título en Anton grande, con FontCycleTitle.
    - Datos en mono, separados por líneas de 2 px crema.
    - Bajada en Newsreader itálica.
  - **Selectores:**
    - **Marco:** `NEGRO / BLANCO / SIN MARCO`. Botones rectangulares con borde de 2 px crema. El activo se ve relleno de rojo y con sombra dura.
    - **Medida:** `A4 / A3 / 50×70`. Al cambiar de medida, la vista muestra **la comparación de escala**: los tres rectángulos en contorno mono, a escala real entre sí, con el elegido relleno de rojo. Agregá la silueta de un vinilo de 12" (31 cm), en contorno, como referencia de tamaño. Es un objeto de la cultura BADDER, y reemplaza al sillón.
    - El precio se actualiza en Anton rojo grande, y el botón de agregar queda en un bloque rojo de ancho completo.
  - **Para cerrar:** una `×` mono arriba a la derecha, o la tecla Escape. La ficha entra con un barrido de fotocopia (el mismo efecto de las remeras) y sale con un fundido.
- **"Visto en la pared":** solo si existe una **foto real** del cuadro colgado (`imageInSitu` en los datos), aparece una pestaña con esa foto en bitmap a color. Si no existe, la pestaña no se muestra. **No generes ambientes.**

### Mobile / iOS
- Los cuadros van en una columna, uno por pantalla, manteniendo la rotación, la cinta y la cartela. La pared sigue de fondo.
- La ficha va en pantalla completa con scroll: primero el cuadro, después los datos. La lupa se reemplaza por pinch-zoom.

### Datos
`products.ts` (`category: 'print'`): `name`, `season`, `technique`, `sizes` ({A4, A3, 50×70}: precio), `frames`, `image`, `imageInSitu?`.

---

## 3. Checklist

1. No queda ningún elemento ilustrado (perchas, sillones, plantas, ambientes) ni ningún post-it beige.
2. Solo se usa la paleta de tres colores, sin bordes redondeados ni sombras suaves.
3. El efecto fotocopia funciona en las remeras y al abrir la ficha.
4. El line-up se recorre con mouse, teclado y toque.
5. La comparación de escala es correcta (las proporciones reales de A4, A3, 50×70 y el vinilo de 31 cm).
6. En iOS real, a 390 px: el acordeón funciona, el pinch-zoom funciona y no hay scroll horizontal.
7. Con reducir movimiento activado, solo hay fundidos.
8. Al terminar, pasame capturas a 1440 px y 390 px, y la lista de archivos faltantes.

Antes de escribir código, mostrame el plan y esperá mi confirmación.
