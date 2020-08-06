import Vue from 'vue';
import { Toast, Lazyload } from 'vant';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './vuex';
import { showVconsole } from './utils/vconsole';
import './icons';
import './assets/global.less';
import 'amfe-flexible';
import c from './config/config';

Vue.prototype.$c = c;
Vue.prototype.$toast = Toast;
Vue.use(Lazyload);

Vue.config.productionTip = false;
showVconsole(false);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
