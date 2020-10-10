export default async ({ app, $axios, env }, inject) => {
  const conf = await $axios.$get("/config/get");
  inject("settings", { ...env, ...conf });
};
