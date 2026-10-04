import type { APIRoute } from 'astro';
import { generateOgImage } from '../../lib/og';

export const GET: APIRoute = async () => new Response(
  new Uint8Array(await generateOgImage('非公式・公開資料ベース', '検索で見かける話題を、元の情報まで遡って確認する。')),
  { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } }
);
