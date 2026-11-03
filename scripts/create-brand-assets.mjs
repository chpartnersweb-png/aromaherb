import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// SVG原稿から配信用PNG・ICOを作成する形式変換処理。
export async function createBrandAssets(root, sharp) {
  const brand = path.join(root, 'public', 'assets', 'brand');
  await mkdir(brand, { recursive: true });
  const logo = await readFile(path.join(brand, 'logo.svg'));
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="25" fill="#FFF1F4"/><g transform="translate(7 7) scale(.86)" fill="#F77C90"><path id="p" d="M50 50C27 37 30 6 49 7C69 8 73 31 50 50Z"/><use href="#p" transform="rotate(72 50 50)"/><use href="#p" transform="rotate(144 50 50)"/><use href="#p" transform="rotate(216 50 50)"/><use href="#p" transform="rotate(288 50 50)"/><circle cx="50" cy="50" r="7" fill="#F2CC76"/></g></svg>`;
  await writeFile(path.join(root, 'public', 'favicon.svg'), faviconSvg);
  const favicon = Buffer.from(faviconSvg);
  await sharp(logo, { density: 192 }).resize({ width: 1040 }).png().toFile(path.join(brand, 'logo.png'));
  await sharp(favicon).resize(180, 180).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'));
  await sharp(favicon).resize(64, 64).png().toFile(path.join(root, 'public', 'favicon.png'));
  const sizes = [32, 64, 256];
  const images = await Promise.all(sizes.map(size => sharp(favicon).resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((size, index) => {
    const at = 6 + index * 16;
    header[at] = size === 256 ? 0 : size;
    header[at + 1] = size === 256 ? 0 : size;
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(images[index].length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += images[index].length;
  });
  await writeFile(path.join(root, 'public', 'favicon.ico'), Buffer.concat([header, ...images]));
  const logoData = logo.toString('base64');
  const ogp = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><radialGradient id="bg"><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFF1F4"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/><rect x="30" y="30" width="1140" height="570" rx="3" fill="none" stroke="#EBD7DC"/>
  <g fill="#F9CAD5" opacity=".7"><ellipse cx="65" cy="80" rx="80" ry="25" transform="rotate(-35 65 80)"/><ellipse cx="1120" cy="515" rx="95" ry="31" transform="rotate(-30 1120 515)"/><ellipse cx="1040" cy="105" rx="37" ry="14" transform="rotate(35 1040 105)"/><ellipse cx="135" cy="535" rx="40" ry="14" transform="rotate(25 135 535)"/></g>
  <text x="600" y="145" text-anchor="middle" fill="#AD4A64" font-family="sans-serif" font-size="19" letter-spacing="5">KUMAMOTO · SUIZENJI / HONJO</text>
  <image href="data:image/svg+xml;base64,${logoData}" x="240" y="177" width="720" height="197"/>
  <path d="M490 410h220" stroke="#EDC3CE"/>
  <text x="600" y="468" text-anchor="middle" fill="#86515E" font-family="'Yu Mincho','Noto Serif JP',serif" font-size="28" letter-spacing="5">心ほどける、やさしいひととき。</text>
  <text x="600" y="535" text-anchor="middle" fill="#7D6970" font-family="sans-serif" font-size="18" letter-spacing="2">オイルマッサージ  /  熊本・水前寺・本荘</text></svg>`;
  await writeFile(path.join(brand, 'ogp.svg'), ogp);
  await sharp(Buffer.from(ogp), { density: 96 }).resize(1200, 630).png().toFile(path.join(brand, 'ogp.png'));
}
