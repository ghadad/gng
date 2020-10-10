<template>
  <div>
    <h1>Index</h1>
    <nuxt-link to="profile">profile</nuxt-link>
    <nuxt-link to="/admin/">Admin panel</nuxt-link>
    state:{{ $store.state }}
  </div>
</template>
<script>
export default {
  async fetch({ store, env }) {
    store.dispatch("reset");
    store.commit("config/set", env);
  },
  async asyncData({ $axios, store, env }) {
    console.log("env2", env, store);
    const appSetting = await $axios.$get(env.apiUrl + "/config/get");
    return { appSetting, env };
  },
  async mounted() {
    let cfg = await this.$axios.$get(this.env.apiUrl + "/config/get");
  },
};
</script>
