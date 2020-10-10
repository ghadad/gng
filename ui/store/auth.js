import cookies from "js-cookie";

export const state = () => ({
  loginInfo: {},
});

export const mutations = {
  login(state, loginInfo) {
    state.loginInfo = loginInfo;
    cookies.set("token", loginInfo.token, { expires: 14 });
    this.$router.push("/profile/me");
  },
};

export const actions = {
  login({ commit }, loginInfo) {
    commit("login", loginInfo);
  },
};
