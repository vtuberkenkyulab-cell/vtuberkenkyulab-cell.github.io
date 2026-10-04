import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { generateOgImage } from '../../lib/og';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((article) => ({ params: { slug: article.data.slug }, props: { article } }));
}

export const GET: APIRoute = async ({ props }) => {
  const article = props.article as CollectionEntry<'articles'>;
  return new Response(
    new Uint8Array(await generateOgImage(article.data.person, article.data.seoTitle ?? article.data.title)),
    { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } }
  );
};
