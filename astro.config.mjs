// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkConfirm } from './plugins/remark-confirm.mjs';

// URL de production : surchargeable via PUBLIC_SITE_URL (voir .env.example).
const site = process.env.PUBLIC_SITE_URL || 'https://clean2go.fr';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  markdown: { processor: unified({ remarkPlugins: [remarkConfirm] }) },
  integrations: [
    sitemap({
      filter: (page) => !/\/(merci|404)\/?$/.test(page),
      serialize(item) {
        const u = new URL(item.url).pathname;
        item.lastmod = new Date().toISOString().slice(0, 10);
        if (u === '/') item.priority = 1.0;
        else if (/^\/(prestations|tarifs|contact|nettoyage-auto-bordeaux-metropole|nettoyage-auto-bassin-arcachon)/.test(u)) item.priority = 0.9;
        else if (/^\/nettoyage-auto-/.test(u)) item.priority = 0.8;
        else if (/^\/blog\//.test(u)) item.priority = 0.6;
        else item.priority = 0.5;
        return item;
      },
    }),
  ],
});
