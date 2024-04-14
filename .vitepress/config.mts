import path from 'path'

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: " ",
  description: " ",
  srcDir: 'contents',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    }
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('.', '')
      }
    }
  }
})
