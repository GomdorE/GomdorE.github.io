// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.igomdori.com',
	integrations: [mdx(), sitemap()],
	redirects: {
		'/blog/first-post': '/blog/reliable-product-review-checklist',
		'/blog/second-post': '/blog/paper-note-vs-memo-app',
		'/blog/third-post': '/blog/reduce-multitasking',
		'/blog/slow-game': '/blog/low-commitment-mobile-games',
	},
	markdown: {
		shikiConfig: {
			themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
		},
	},
});
