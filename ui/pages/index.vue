<template>
  <div>
    <h1>Index</h1>
    state:{{ $store.state }}
    <nuxt-link to="profile">profile</nuxt-link>
  </div>
</template>
<script>
export default {
  fetch({ store }) {
    store.dispatch("reset");
  },

  async mounted() {
    this.$store.commit("config/get");
    await this.$store.commit("increment", 1222);
    await this.$store.dispatch("inc", 18);
  },
};
</script>
