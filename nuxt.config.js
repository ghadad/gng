module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    apiUrl: process.env.API_URL,
  },
  telemetry: false,
  srcDir: "ui",
  router: {
    base: process.env.NODE_ENV == "development" ? "/dev/gng/" : "/gng",
  },
  buildModules: ["@nuxtjs/vuetify"],
  modules: [
    "@nuxtjs/axios",
    [
      "nuxt-i18n",
      {
        strategy: "no_prefix",
        locales: ["he", "en"],
        defaultLocale: "he",
        vueI18n: {},
        vueI18nLoader: true,
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "i18n_redirected",
          alwaysRedirect: false,
        },
      },
    ],
  ],
  plugins: [
    { src: "~/plugins/vuex-persist", ssr: false },
    { src: "~/plugins/settings" },
    { src: "~/plugins/lodash" },
    { src: "~/plugins/axios" },
  ],
};
