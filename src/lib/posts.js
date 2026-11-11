import { getCollection } from 'astro:content';

const time = (post) => (post.data.date ? post.data.date.valueOf() : 0);

// All published posts, newest first. Posts without a date go last.
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => time(b) - time(a) || a.id.localeCompare(b.id));
}

export function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Turns a tag into the last part of a web address. Works for any script,
// so tags in Hindi, Tamil, Japanese and so on are kept.
export function tagSlug(tag) {
  return String(tag)
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export const sectionLabel = { movies: 'Movies', culture: 'Culture' };
