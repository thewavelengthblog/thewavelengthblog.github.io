import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every field is cleaned up before it is checked, so that a blank, odd or
// mistyped value in one post can never stop the whole site from publishing.
const blank = (v: unknown) => (v === '' || v === null || v === undefined ? undefined : v);

const text = z.preprocess((v) => {
  const value = blank(v);
  return value === undefined ? undefined : String(value).trim() || undefined;
}, z.string().optional());

const title = z.preprocess((v) => {
  const value = blank(v);
  return value === undefined ? 'Untitled' : String(value).trim() || 'Untitled';
}, z.string());

const section = z.preprocess((v) => {
  const value = String(blank(v) ?? '').trim().toLowerCase();
  return value === 'culture' ? 'culture' : 'movies';
}, z.enum(['movies', 'culture']));

const date = z.preprocess((v) => {
  const value = blank(v);
  if (value === undefined) return undefined;
  const parsed = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(parsed.valueOf()) ? undefined : parsed;
}, z.date().optional());

// Ratings are kept between 0.5 and 5 and rounded to the nearest half star.
const rating = z.preprocess((v) => {
  const value = blank(v);
  if (value === undefined) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return Math.round(Math.min(5, Math.max(0.5, n)) * 2) / 2;
}, z.number().optional());

const tags = z.preprocess((v) => {
  const value = blank(v);
  const list = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [];
  const seen = new Set<string>();
  return list
    .map((t) => String(t ?? '').trim())
    .filter((t) => {
      const key = t.toLowerCase();
      if (!t || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}, z.array(z.string()));

const flag = z.preprocess((v) => v === true || v === 'true', z.boolean());

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title,
    section,
    date,
    excerpt: text,
    cover: text,
    coverAlt: text,
    rating,
    filmTitle: text,
    year: text,
    director: text,
    runtime: text,
    watchedAt: text,
    verdict: text,
    tags,
    featured: flag,
    draft: flag,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title }),
});

export const collections = { posts, pages };
