<template>
  <v-app id="inspire" class="pa-0 ma-0">
    <v-container>
      <v-main class="pt-9 ma-0">
        <nuxt-link to="/profile">profile</nuxt-link>
        <nuxt-link to="/profile/me">me</nuxt-link>
        <nuxt-link to="/">home</nuxt-link>
        <Nuxt />
      </v-main>
    </v-container>
  </v-app>
</template>
<script>
export default {
  created() {
    this.$vuetify.rtl = true;
  },
};
</script>
