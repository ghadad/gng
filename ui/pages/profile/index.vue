<template>
  <div>
    <h1>Profile page</h1>
    state:{{ $store.state }}
    <nuxt-link to="profile/me">me</nuxt-link>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("config/set");
  },
};
</script>
