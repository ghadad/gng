<template>
  <v-app id="inspire">
    <v-main>
      <v-app-bar
        absolute
        color="#fcb69f"
        dark
        shrink-on-scroll
        src="http://lorempixel.com/1200/200/sports/GNG"
        scroll-target="#scrolling-techniques-2"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title
          ><v-btn text flat x-large to="/"
            ><h1>ברכה ומתנה</h1></v-btn
          ></v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-btn to="/gift/search" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn to="/profile" icon>
          <v-icon> mdi-account-circle-outline </v-icon>
        </v-btn>
        <v-btn to="/greet" icon>
          <v-icon> mdi-atom-variant </v-icon>
        </v-btn>

        <v-btn icon to="/admin">
          <v-icon>mdi-cog-box</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container id="main-container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <error-alert />
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
    this.$i18n.locale = "he";
    this.$vuetify.rtl = true;
  },
};
</script>
<style scope>
#main-container {
  margin-top: 120px;
}
</style>
