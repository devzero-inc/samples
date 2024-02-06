// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  app: {
    head: {
      title: 'Todo List',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  buildModules: ['@nuxt/typescript-build'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: true,
}

export default config

// export default defineNuxtConfig({
//   devtools: { enabled: true }
// })
