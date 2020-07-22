import Vue from 'vue'
import App from './App.vue'
import router from './router'
import state from './vuex/state'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './assets/css/iconfont/iconfont.css';
import './assets/css/common.css'
import './components/common/directives';
import "babel-polyfill";

// billy 20190803
import _c from "./core/config";
Vue.prototype.$c = _c;

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});


new Vue({
    router,
    state,
    render: h => h(App)
}).$mount('#app')