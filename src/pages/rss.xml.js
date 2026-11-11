import rss from '@astrojs/rss';
import { site } from '../site.config.mjs';
import { getPosts } from '../lib/posts.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      ...(post.data.date ? { pubDate: post.data.date } : {}),
      description: post.data.excerpt ?? '',
      link: `/posts/${post.id}/`,
    })),
  });
}
