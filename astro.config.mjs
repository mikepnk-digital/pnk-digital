// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env / .env.production (VITE_-prefixed) the way the old Vite build did.
// Astro's client env prefix is PUBLIC_, so these must be injected via `define`.
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: 'https://pnk-digital.com',
  output: 'static',
  // No trailing slash, to match the site's existing indexed URLs (/about, not
  // /about/). `file` format emits /about.html; a CloudFront Function (Phase 5)
  // appends `.html` to extensionless request URIs.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    react(),
    // Keep noindex outreach pages (/audit/*, /landing/*) out of the sitemap.
    sitemap({ filter: (page) => !/\/(audit|landing)(\/|$)/.test(page) }),
  ],
  markdown: {
    // GFM is on by default. Replace the old (unthemed) rehype-highlight with
    // Astro's built-in Shiki: themed, build-time, no client-side JS.
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
  vite: {
    // Tailwind v4 runs through Vite, same as the current Vite build.
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || ''),
      'import.meta.env.VITE_ENVIRONMENT': JSON.stringify(env.VITE_ENVIRONMENT || 'dev'),
    },
  },
});
