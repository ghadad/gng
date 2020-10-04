<template>
  <v-row align="center" justify="center">
    {{ $store.state.auth }}
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>התחברות למערכת</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              v-model="email"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              v-model="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login">התחברו</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      email: "ghadad@gmail.com",
      password: "glida123",
    };
  },
  methods: {
    async login() {
      const result = await this.$axios.$post("/auth/login", {
        email: this.email,
        password: this.password,
      });
      if (result.token) this.$store.dispatch("auth/login", result);
    },
  },
};
</script>
