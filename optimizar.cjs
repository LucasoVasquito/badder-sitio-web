const sharp = require('sharp');
const fs = require('fs');

// Acá le decimos en qué carpetas están las fotos crudas
const carpetas = [
  './public/capital',   
  './public/cuchate.esta',
  './public/drop1', 
  './public/drop2', 
  './public/drop3',
  './public/emergent',
  './public/flash',
  './public/flyers',
  './public/goro',
  './public/nahu',
  './public/rosset',
  './public/sesion',
  './public/sport1',
  './public/sport2',
  './public/tom',
  './public/verano2025', 
  './public/verano2026',
  './src/assets',
  './public/audio',
];

console.log("Arrancando la conversión a WebP... 🚀");

carpetas.forEach(carpeta => {
  // Verificamos que la carpeta exista para que no tire error
  if (fs.existsSync(carpeta)) {
    fs.readdirSync(carpeta).forEach(archivo => {
      // Filtramos para agarrar solo las imágenes originales
      if (archivo.match(/\.(png|jpg|jpeg|JPG|PNG)$/)) {
        const nombreSinExtension = archivo.split('.')[0];
        const rutaOriginal = `${carpeta}/${archivo}`;
        const rutaNueva = `${carpeta}/${nombreSinExtension}.webp`;

        // Magia: convierte a webp, baja el peso (calidad 80%) y guarda
        sharp(rutaOriginal)
          .rotate()
          .webp({ quality: 80 })
          .toFile(rutaNueva)
          .then(() => console.log(`✅ Listo: ${rutaNueva}`))
          .catch(err => console.error(`❌ Error en ${archivo}:`, err));
      }
    });
  }
});