import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';
import './permission';
import '@/assets/scss/reset.scss';
import Axios from '@/assets/js/axios';

// 监控、测试、错误上报、埋点
// import '@/config/aegis';
import './core';
Vue.use(VueRouter);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
Vue.prototype.$axios = Axios;
app.$axios = Axios;
window.app = app;
