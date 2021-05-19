import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { createStore } from './store';
import httpClient from '@/api/httpClient/httpClient';
import createApi from '@/api/index.api';
import ElementUI from 'element-ui';

// styles
import '@/assets/styles/normalize.css';
import '@/assets/styles/app.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

const api = createApi(httpClient);
const store = createStore(api);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
