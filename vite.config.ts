import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
console.log('------')
console.log(process.env.NODE_ENV)
// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/blog/',
  build: {
    outDir: 'docs',
  },
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // host: 'mm-admin.com',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选：重写路径，去掉 /api 前缀
        // headers: {
        //   authority: 'http://localhost:3000/',
        //   'x-forwarded-host': 'http://localhost:3000/',
        //   Referer: 'http://localhost:3000/',
        // },
      },
    },
  },
})
