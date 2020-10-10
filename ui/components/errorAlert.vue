<i18n>
{
  "en": {
    "body.passwordConfirm should NOT be shorter than 8 characters": "passwordConfirm should NOT be shorter than 8 characters!",
    "body.password should NOT be shorter than 8 characters" :"password should NOT be shorter than 8 characters"
  },
  "he": {
    "body.passwordConfirm should NOT be shorter than 8 characters": "סיסמא שניה קצרה מדי",
    "body.password should NOT be shorter than 8 characters":"סיסמה קצרה מדי"
    
  }
}
</i18n>
<template>
  <v-alert prominent type="error" v-show="$store.state.error">
    <v-row align="center">
      <v-col class="grow">{{ $t($store.state.error.message) }}</v-col>
      <v-col class="shrink">
        <v-btn @click="close">סגור</v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>
<script>
export default {
  name: "errorAlert",
  methods: {
    close() {
      this.$store.commit("setError", null);
    },
  },
};
</script>
