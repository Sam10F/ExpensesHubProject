// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vite-pwa/nuxt'],

  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],

  build: {
    transpile: ['primevue', 'chart.js']
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || '',
    mongodbDbName: process.env.MONGODB_DB_NAME || 'expenseshub_dev',
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
  },

  pwa: {
    manifest: {
      name: 'ExpensesHub',
      short_name: 'ExpensesHub',
      description: 'Personal expense and income tracking',
      theme_color: '#10B981',
      background_color: '#FAFAFA',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/.*\.mongodb\.net\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 300 }
          }
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: { maxEntries: 100, maxAgeSeconds: 2592000 }
          }
        }
      ]
    }
  },

  compatibilityDate: '2024-04-03'
})
