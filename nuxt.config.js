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
  },
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],
  modules: [

  ],
}