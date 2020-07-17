import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./icons";

Vue.use(ElementUI, {
  size: "small"
});
import { _c } from "./config/config";
Vue.prototype.$c = _c;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
