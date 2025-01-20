import { defineConfig } from 'astro/config';
import basicSsl from '@vitejs/plugin-basic-ssl';
import tailwind from "@astrojs/tailwind";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  site: 'https://localhost:4322',
  integrations: [tailwind(), lit()],
  output: "server",
  server: {
    port: 4322
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    },
    ssr: {
      noExternal: ['@strifeapp/strife']
    }
  },
});