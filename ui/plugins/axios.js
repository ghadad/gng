export default function ({ $axios, store, env }) {
  $axios.setBaseURL(env.apiUrl);
  $axios.onRequest((config) => {
    // config.withCredentials = true
    if (store.state.api.auth.token) {
      config.headers.common.Authorization = `Bearer ${store.state.api.auth.token}`;
      // config.headers.common.crossDomain = true
      // config.header.common['Content-Type'] = 'application/json'
    }
  });
}
