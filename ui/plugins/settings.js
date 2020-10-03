export default async ({ app, $axios, env }, inject) => {
  console.log(env);
  const conf = await $axios.$get("/config/get");
  inject("settings", { ...env, ...conf });
};
