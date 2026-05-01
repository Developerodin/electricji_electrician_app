/**
 * Figma MCP may write SVG/XML into files named "*.png".
 * RN <Image /> cannot decode those; rasterize to real PNG with sharp.
 *
 * Use a high SVG density so 24–37pt icons become ~200–300px+ bitmaps (crisp on 3× screens).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'assets');

/** ~10× default 72 DPI → 24×24 SVG ≈ 240px, 37×26 logo ≈ 370×260px */
const SVG_DENSITY = 720;

/** Upscale vector output if the longest side is still small (safety net). */
const MIN_LONGEST_VECTOR_PX = 192;

function sanitizeSvg(xml) {
  return xml
    .replace(/fill="var\([^,]+,\s*([^)]+)\)"/gi, 'fill="$1"')
    .replace(/stroke="var\([^,]+,\s*([^)]+)\)"/gi, 'stroke="$1"');
}

async function rasterizeSvgXml(xml) {
  const buf = Buffer.from(xml, 'utf8');
  const base = sharp(buf, { density: SVG_DENSITY });
  const meta = await base.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const longest = Math.max(w, h);
  let pipeline = base;
  if (longest > 0 && longest < MIN_LONGEST_VECTOR_PX) {
    const f = MIN_LONGEST_VECTOR_PX / longest;
    pipeline = base.resize(
      Math.max(1, Math.round(w * f)),
      Math.max(1, Math.round(h * f)),
      { kernel: sharp.kernel.lanczos3 },
    );
  }
  return pipeline.png({ compressionLevel: 8 }).toBuffer();
}

async function processFile(absPath) {
  const buf = fs.readFileSync(absPath);
  const head = buf.slice(0, 800).toString('utf8').trimStart();
  if (!head.startsWith('<svg') && !head.startsWith('<?xml')) return false;
  let xml = buf.toString('utf8');
  xml = sanitizeSvg(xml);
  try {
    const out = await rasterizeSvgXml(xml);
    fs.writeFileSync(absPath, out);
    const { width, height } = await sharp(out).metadata();
    console.log(
      `OK ${path.relative(assetsDir, absPath)} → ${width}×${height}, ${out.length} bytes`,
    );
    return true;
  } catch (e) {
    console.error(`FAIL ${absPath}`, e.message);
    return false;
  }
}

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.png')) out.push(full);
  }
  return out;
}

const files = walk(assetsDir);
let n = 0;
for (const f of files) {
  const done = await processFile(f);
  if (done) n++;
}
console.log(`Rasterized ${n} / ${files.length} png files (SVG→PNG @ density ${SVG_DENSITY})`);
