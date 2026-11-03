import type { APIRoute } from 'astro';
import { absoluteUrl } from '../config/site.mjs';
import { roomPhotos } from '../data/site';

export const prerender = true;

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&apos;');

// 1ページサイトのため、ページURLはルートだけ。アンカーは別ページ扱いにしない。
// 店舗の画像として掲載するのは提供された室内写真。生成した人物画像は含めない。
export const GET: APIRoute = () => {
  const images = roomPhotos.map(photo =>
    `    <image:image><image:loc>${escapeXml(absoluteUrl(photo.src))}</image:loc></image:image>`,
  ).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(absoluteUrl('/'))}</loc>
${images}
  </url>
</urlset>
`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
