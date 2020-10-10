<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>רישום</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="אימייל"
              name="login"
              v-model="info.email"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              id="firstName"
              label="שם פרטי"
              name="firstName"
              v-model="info.firstName"
              prepend-icon="mdi-lock"
              type="text"
            ></v-text-field>
            <v-text-field
              id="password"
              label="שם משפחה"
              name="lastName"
              v-model="info.lastName"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              id="password"
              label="סיסמה"
              name="password"
              v-model="info.password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              id="password"
              label="אימות סיסמה"
              name="password"
              v-model="info.passwordConfirm"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="register">התחברו</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      info: {
        email: "ghadad@gmail.com",
        password: "glida123",
        passwordConfirm: null,
        firstName: null,
        lastName: null,
      },
    };
  },
  methods: {
    async register() {
      const result = await this.$axios.$post("/auth/register", this.info);
    },
  },
};
</script>
