export default {
  serverMiddleware:[
    // 'redirect-ssl',
    {path: "/api", handler: "~/api/index.js"},
  ],
  css: ['~/assets/css/tailwind.css'],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    transpile: [
      'axios',
    ],
  },
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],
  // plugins: [
  //   '~/plugins/axios',
  // ],
  modules: [
    // 'axios',
    '@nuxtjs/axios',
    'nuxt-clipboard2',
  ],
  axios: {
    baseURL: 'http://localhost:4000/api',
  },
}