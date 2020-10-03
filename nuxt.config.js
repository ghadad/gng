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
  modules: ["@nuxtjs/axios"],
  plugins: [
    { src: "~/plugins/vuex-persist", ssr: false },
    { src: "~/plugins/settings" },
    { src: "~/plugins/lodash" },
  ],
};
