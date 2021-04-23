import Vue from "vue";
import Vuetify from "vuetify";
import vuetify from "./plugins/vuetify";
import App from './App.vue';
import router from './router';
import Buefy from 'buefy';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import LoadScript from 'vue-plugin-load-script';
import "./plugins/base";

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

library.add(fas, fab);
Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'lg',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x',
      },
      iconPrefix: '',
    },
  },
});
Vue.use(Vuetify);
Vue.use(VueAxios, Axios);
Vue.use(LoadScript);

Vue.prototype.$axios = Axios;
Vue.axios.defaults.baseURL = `http://localhost:8080`;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
