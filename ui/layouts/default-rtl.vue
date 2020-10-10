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
import errorAlert from "../components/errorAlert.vue";
export default {
  components: { errorAlert },
  errorCaptured: function (err, component, details) {
    this.$store.commit("setError", err);
  },

  created() {
    this.$vuetify.rtl = true;
  },
};
</script>
