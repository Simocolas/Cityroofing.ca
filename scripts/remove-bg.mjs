import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input  = path.join(__dirname, '../public/images/logo.png');
const output = path.join(__dirname, '../public/images/logo-transparent.png');

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

for (let i = 0; i < width * height; i++) {
  const r = buf[i * channels + 0];
  const g = buf[i * channels + 1];
  const b = buf[i * channels + 2];
  if (r < 30 && g < 30 && b < 30) {
    buf[i * channels + 3] = 0; // transparent
  }
}

await sharp(buf, { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log(`Done → ${output}`);
