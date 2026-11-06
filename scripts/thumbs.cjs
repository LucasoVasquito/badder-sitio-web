// Genera miniaturas livianas para las grillas del sitio.
// Uso: npm run thumbs
// - Lee las carpetas de imágenes de /public y src/assets.
// - Escribe en /public/_thumbs/<misma ruta> (src/assets → /public/_thumbs/assets/).
// - No modifica ni borra los originales. Si la miniatura ya existe y es más nueva, la saltea.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "_thumbs");
const WIDTH = 720;
const QUALITY = 70;

const sources = [
  ...["capital", "cuchate.esta", "drop1", "drop2", "drop3", "emergent", "flash", "flyers", "goro", "nahu", "presskits", "rosset", "sesion", "sport1", "sport2", "tom", "verano2025", "verano2026"].map((d) => ({
    dir: path.join(ROOT, "public", d),
    out: path.join(OUT, d),
  })),
  { dir: path.join(ROOT, "src", "assets"), out: path.join(OUT, "assets") },
];

const isImage = (f) => /\.(webp|png|jpe?g)$/i.test(f);

(async () => {
  let made = 0;
  let skipped = 0;
  const failed = [];
  for (const { dir, out } of sources) {
    if (!fs.existsSync(dir)) continue;
    fs.mkdirSync(out, { recursive: true });
    for (const file of fs.readdirSync(dir).filter(isImage)) {
      const src = path.join(dir, file);
      // Se conserva el nombre (incluida la extensión) para que la ruta sea la misma que el original
      const dest = path.join(out, file);
      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) {
        skipped++;
        continue;
      }
      try {
        const img = sharp(src).rotate().resize({ width: WIDTH, withoutEnlargement: true });
        const ext = path.extname(file).toLowerCase();
        if (ext === ".png") await img.png({ quality: QUALITY, compressionLevel: 9, palette: true }).toFile(dest);
        else if (ext === ".jpg" || ext === ".jpeg") await img.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(dest);
        else await img.webp({ quality: QUALITY }).toFile(dest);
        made++;
      } catch (e) {
        // Archivo dañado o ilegible: el sitio usa el original (SmartImage hace fallback)
        failed.push(`${path.relative(ROOT, src)} (${e.message})`);
      }
    }
  }
  console.log(`Miniaturas: ${made} generadas, ${skipped} ya estaban al día → public/_thumbs`);
  if (failed.length) console.log(`No se pudieron procesar ${failed.length}:\n  ${failed.join("\n  ")}`);
})();
