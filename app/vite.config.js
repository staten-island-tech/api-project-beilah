import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/hsr': {
        target: 'https://hsr-api.vercel.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/hsr/, ''),
      }
    }
  }
})

