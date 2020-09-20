export const state = () => ({
  config: { name: "abdaba" },
});

export const mutations = {
  async get(state) {
    state.config = { name: "golan" };
  },
  increment(state) {
    state.counter++;
  },
};
