export const state = () => ({
  counter: 0,
  error: "",
});

export const mutations = {
  increment(state, v = 3) {
    state.counter += v;
  },
  reset(state) {
    state.counter = 0;
  },
  setError(state, msg) {
    state.error = msg == null ? "" : msg;
  },
};

export const actions = {
  inc({ commit }, v = 10) {
    commit("increment", v);
  },
  reset({ commit }) {
    commit("reset");
  },
  setError({ commit }, msg) {
    commit("setEror", msg);
  },
};
