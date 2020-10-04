<template>
  <div>
    <h1>greet page</h1>
    <v-row>
      <v-col>
        <v-btn @click="generate">Generate</v-btn>
        <v-list-item v-for="item in greet.lines" :key="$index">
          <v-list-item-content>
            {{ item.line }}
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="red red-1">mdi-chevron-down</v-icon>
              <v-icon color="primary">mdi-refresh</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-col>
      <v-col>
        <v-row align="center">
          <v-row v-if="allProps" justify="space-around">
            <v-card v-for="(gv, gk) in groups" :key="gk">
              <v-card-text>
                <h3>{{ gk }}</h3>
                <v-checkbox
                  v-for="(propV, propk) in gv"
                  :key="propV.prop"
                  :label="propV.prop"
                  v-model="allProps[propV.prop]"
                ></v-checkbox>
              </v-card-text>
            </v-card>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "default",
  data() {
    return {
      line: null,
      greet: {},
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

  mounted() {},
  methods: {
    async generate() {
      let self = this;
      this.greet = await self.$axios.$get("greet/generate", {
        params: this.props,
      });
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
