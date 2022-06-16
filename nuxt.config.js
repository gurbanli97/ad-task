import { resolve } from 'path'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ad-task',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/scss/style.scss",
  ],

  alias: {
    'images': resolve(__dirname, './assets/images'),
    'icons': resolve(__dirname, './assets/images/icons'),
    'style': resolve(__dirname, './assets/styles'),
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/treeselect.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],


  axios: {
    baseURL: 'https://private-anon-0e2b22d582-adcashdsp.apiary-mock.com'
  },

  toast: {
    position: "top-right",
    keepOnHover: true,
    duration: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
