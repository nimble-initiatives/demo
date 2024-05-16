import { defineConfig } from 'astro/config';
import basicSsl from '@vitejs/plugin-basic-ssl';
import tailwind from "@astrojs/tailwind";
// import sitemap from "@astrojs/sitemap";
import lit from "@astrojs/lit";
// import sentry from '@sentry/astro';
// import spotlightjs from '@spotlightjs/astro';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // markdown: {
  //   drafts: true,
  //   shikiConfig: {
  //     theme: "css-variables"
  //   }
  // },
  // shikiConfig: {
  //   wrap: true,
  //   skipInline: false,
  //   drafts: true
  // },
  site: 'https://sgf.strife.site',
  integrations: [
  //   sentry({
  //   dsn: "https://eb16c95c7baebd840c800befde6799bb@o429298.ingest.us.sentry.io/4507209574318080",
  //   sourceMapsUploadOptions: {
  //     project: "sgf",
  //     authToken: process.env.SENTRY_AUTH_TOKEN
  //   }
  // }),
   //spotlightjs(),
  tailwind(), lit()],
  output: "server",
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    },
    ssr: {
      noExternal: ['@strifeapp/strife', '@strifeapp/image']
    }
  },
  adapter: vercel()
});