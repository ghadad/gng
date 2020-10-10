export default function ({ $axios, store, env, redirect }) {
  $axios.setBaseURL(env.apiUrl);

  $axios.onRequest((config) => {
    // config.withCredentials = true
    store.commit("setError", null);
    console.log("Store:", store.state.auth);
    if (store.state.auth.loginInfo.token) {
      config.headers.common.Authorization = `Bearer ${store.state.auth.loginInfo.token}`;
    }
  });

  $axios.onResponseError((error) => {
    if (error.response && error.response.status === 500) {
      return Promise.reject(error.response.data);
    }
  });
}
