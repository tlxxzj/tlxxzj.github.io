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
    },
    outline: "deep",
    editLink: {
      pattern: 'https://github.com/tlxxzj/tlxxzj.github.io/edit/main/contents/:path',
      text: 'Edit this page on GitHub'
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
