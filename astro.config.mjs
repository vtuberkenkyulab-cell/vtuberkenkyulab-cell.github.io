import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const [owner = 'vtuberkenkyulab-cell', repository = 'vtuberkenkyulab-cell.github.io'] = (process.env.GITHUB_REPOSITORY ?? 'vtuberkenkyulab-cell/vtuberkenkyulab-cell.github.io').split('/');
const isUserSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const site = process.env.PUBLIC_SITE_URL ?? `https://${owner}.github.io`;
const base = process.env.PUBLIC_BASE_PATH ?? (isUserSite ? '/' : `/${repository}`);

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !pathname.endsWith('/404/') && !/\/people\/[^/]+\/$/.test(pathname);
      }
    })
  ],
  markdown: {
    shikiConfig: { theme: 'github-light' }
  }
});
