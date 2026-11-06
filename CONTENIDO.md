# BADDER — Cómo actualizar el contenido

Guía para sumar publicaciones, releases, proyectos de archivo y productos sin tocar componentes grandes.
Todo el contenido vive en `src/content/` (textos editoriales) y `src/data/` (datos estructurados).

Después de agregar imágenes nuevas, corré `npm run thumbs` para generar sus miniaturas.

---

## Culture (publicaciones)

Cada publicación es un archivo Markdown en `src/content/culture/`. Para publicar una nota nueva, creá un archivo nuevo (por ejemplo `post-04-mi-nota.md`):

```md
---
id: post-04
title: Título de la nota
subtitle: Bajada o introducción corta
date: 2026-11-06
category: SCENE
cover: /ruta/a/la/portada.webp
images:
  - /ruta/imagen-1.webp | Pie de foto opcional
  - /ruta/imagen-2.webp
references:
  - Nombre de la fuente | https://url-de-la-fuente
  - Fuente sin link
related:
  - post-02
---

Primer párrafo (se usa como bajada en los listados).

## Un subtítulo

Texto con **negrita**, *itálica* y [links](https://ejemplo.com).

1. Lista numerada
2. Segundo ítem

> Una cita destacada.

![Texto alternativo](/ruta/imagen.webp "Pie de foto")
```

- `category`: BADDER FILES, SCENE, SOUND, DESIGN, CULTURE o REFERENCES.
- `id` define la URL: `/culture/post-04`.
- `related` es opcional. Si queda vacío, se sugieren notas de la misma categoría.

## Music

`src/data/music.ts` contiene los releases, los DJ sets y las sesiones.

- **Release nuevo:** agregá un objeto a `releases` con título, artista, tipo, portada y tracks.
- **Audio en el reproductor:** si el track tiene audio, el archivo va en `public/audio/` y se suma también en `src/data/audio.ts`.
- **Links:** `links` acepta solo URLs reales (Bandcamp, Spotify, Beatport…).
- **Videos:** los DJ sets y las sesiones salen de `src/data/visuals.ts` (`videos`).

`src/data/people.ts` contiene artistas y crew: rol, presskit y links. No cargues links sin destino real.

## Archive

`src/data/projects.ts` agrupa el material por proyecto: fotos, flyers, video, lookbook y procesos.

- **Fotos:** las de un evento van en `public/<carpeta>/foto (1).webp`, `foto (2).webp`… y se registran en `src/data/archive.ts` (`photos`).
- **Flyers:** van en `src/data/archive.ts` (`flyers`).
- **Colecciones:** los lookbooks van en `src/data/collections.ts`. Los títulos con "concepto", "mockup", "beta" o "descartado" pasan solos a **Processes**.
- **Proyecto nuevo:** sumá un objeto en `projects` con su material. Relacioná solo piezas que pertenezcan de verdad al mismo proyecto.

## Shop

`src/data/products.ts` contiene el catálogo. Un producto **solo se puede comprar** si cumple todo esto:

- `verified: true`.
- `status: "AVAILABLE"`.
- `price` cargado.
- Stock mayor a 0: en `variants` (talle/color) o en `stock`.

Para cargar las remeras nuevas, completá la plantilla comentada al final del archivo con nombre, fotos, precio, materiales, estampado y stock por talle reales.

## Activar compras online

Hoy el checkout está **deshabilitado**. El carrito muestra "Compras online todavía no habilitadas" y ofrece consultar por Instagram o mail. Para activarlo:

1. **Receptor de pedidos:** crear un receptor real del lado del servidor, por ejemplo una Netlify Function o un servicio de formularios con verificación. Debe:
   - recibir `POST` JSON con `{ customer, items, total }`;
   - volver a validar precios y stock contra el catálogo (no confiar en el navegador);
   - guardar o reenviar el pedido (mail a BADDER, planilla, base de datos);
   - responder `2xx` con `{ "ok": true, "reference": "BDR-0001" }` solo si el pedido quedó registrado.
2. **Medio de pago:** definir el medio de pago real. Los datos bancarios (alias, CBU) no van en el código: se envían por mail al confirmar el pedido.
3. **Variables:** cargar `VITE_ORDER_ENDPOINT` y `VITE_CHECKOUT_ENABLED=true` (ver `.env.example`).
4. **Prueba:** probar un pedido real y un error (endpoint caído). Con error, el carrito no se vacía y no se muestra éxito.

No se suben comprobantes de transferencia desde la web hasta tener un sistema seguro para recibirlos.

## Formulario de contacto

Sin configuración, el formulario de `/contact` arma el mail en la aplicación de correo del usuario. Para recibirlo directamente, cargá `VITE_CONTACT_ENDPOINT` con un endpoint que responda `2xx` solo cuando el mensaje se recibió.

## Studio

`src/data/studio.ts` contiene los servicios por área (Sound, Visual Production, Design). Un servicio con `confirmed: false` no se muestra; pasalo a `true` cuando esté confirmado.
