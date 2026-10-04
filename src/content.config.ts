import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url()
});

const correctionSchema = z.object({
  date: z.coerce.date(),
  location: z.string(),
  reason: z.string()
});

const verificationSchema = z.object({
  topic: z.string(),
  result: z.string(),
  evidence: z.string()
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    slug: z.string(),
    person: z.string(),
    personSlug: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    checkedAt: z.coerce.date(),
    keyPoints: z.array(z.string()).min(2).max(5),
    verificationSummary: z.array(verificationSchema).min(1).max(6).optional(),
    sources: z.array(sourceSchema),
    relatedSlugs: z.array(z.string()).default([]),
    corrections: z.array(correctionSchema),
    featured: z.boolean().default(false),
    displayOrder: z.number().int().nonnegative().default(999),
    draft: z.boolean().default(false)
  })
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    slug: z.string()
  })
});

export const collections = { articles, people };
