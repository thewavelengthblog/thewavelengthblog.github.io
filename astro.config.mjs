import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/site.config.mjs';

// Work out the site's address. If it has not been set in site.config.mjs yet
// and the site is being built by GitHub, use the free GitHub address.
let url = site.url;
const stillPlaceholder = /example\.com/.test(site.url);
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = (process.env.GITHUB_REPOSITORY || '').split('/')[1];

if (stillPlaceholder && owner && repo) {
  const expected = `${owner.toLowerCase()}.github.io`;
  if (repo.toLowerCase() !== expected) {
    throw new Error(
      `This repository is named "${repo}", but the site only works at the top of an address. ` +
        `Either rename the repository to "${expected}", or connect your own domain and put it ` +
        `in src/site.config.mjs as the "url".`
    );
  }
  url = `https://${expected}`;
}

export default defineConfig({
  site: url,
  integrations: [sitemap({ filter: (page) => !page.includes('/admin') })],
});
