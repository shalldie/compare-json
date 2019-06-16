import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueCodemirror from 'vue-codemirror';

import 'normalize.css';

import 'element-ui/lib/theme-chalk/index.css';
import 'codemirror/lib/codemirror.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCodemirror);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
