import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

console.log(process.env.VUE_APP_MY_API);
Vue.prototype.$api = process.env.VUE_APP_MY_API || "https://localhost:5001/api";
Vue.prototype.$axios = axios;
console.log(process.env.VUE_APP_MY_API);
console.log(Vue.prototype.$api);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
