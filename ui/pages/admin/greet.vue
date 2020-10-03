<template>
  <div>
    <h1>greet page</h1>
    <v-row>
      <v-col>
        <v-text-field v-model="line" :counter="10" label="שורה"></v-text-field>
        <v-btn @click="save">save</v-btn>
        <v-list-item v-for="item in lines.items" :key="$index">
          <v-list-item-content>
            {{ item.line }}
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="red red-1" @click="del(item)">mdi-delete</v-icon>
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-col>
      <v-col>
        <v-row align="center">
          <v-row v-if="allProps" justify="space-around">
            <v-card v-for="(gv, gk) in groups">
              <v-card-text>
                <h3>{{ gk }}</h3>
                <v-checkbox
                  v-for="(propV, propk) in gv"
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
