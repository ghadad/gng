<template>
  <div>
    <h1>Me</h1>
    settings : {{ $settings }} <br />
    state:{{ $store.state }} v: {{ v }}
  </div>
</template>
<script>
export default {
  fetch({ store, $config }) {
    store.dispatch("inc", -15000);
  },
  asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    let v = 500;
    return { v };
  },
  async mounted() {
    this.$store.commit("config/get");
    this.$axios.$get(this.$store.state.config.apiUrl + "/config/get");
    //   this.$store.dispatch('inc',21118);
  },
};
</script>
