<template>
  <div>
    <h1>greet page</h1>
    <v-row>
      <v-col>
        <nuxt-link to="/admin/greet">Greeting lines</nuxt-link>
        <nuxt-link to="/admin/gift">Gifts</nuxt-link>
        <nuxt-link to="/admin/users">Users</nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      line: null,
      lines: [],
      result: null,
    };
  },
  async asyncData({ $axios, $_, consola }) {
    const config = await $axios.$get("/config/get");
    const schema = config.greet.schema;
    const allProps = Object.values(config.greet.schema).reduce((a, i) => {
      a[i.prop] = false;
      return a;
    }, {});

    const groups = $_.groupBy(schema, "group");
    return { schema, groups, allProps };
  },
  watch: {
    props: function (newVal) {
      this.query();
    },
  },
  mounted() {},
  methods: {
    async query() {
      let self = this;
      this.lines = await self.$axios.$get("greet/query", {
        params: this.props,
      });
    },
    async del(item) {
      await this.$axios.$delete("line", { data: item });
    },
    async save() {
      let self = this;
      this.result = await self.$axios.$post("line", {
        line: self.line,
        ...self.$_.pickBy(self.allProps, (v) => v),
      });
    },
  },
  computed: {
    props: function () {
      return this.$_.pickBy(this.allProps, (v) => v);
    },
  },
};
</script>
