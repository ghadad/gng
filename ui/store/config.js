export const state = () => ({
  config: { name: "abdaba", port: 1 },
});

export const mutations = {
  async set(state, o) {
    state.config = Object.assign({}, o, { ddd: 2 });
  },
  increment(state) {
    state.counter++;
  },
};
