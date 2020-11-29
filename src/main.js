import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Buefy from 'buefy';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import 'buefy/dist/buefy.css';

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
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
Vue.use(VueAxios, Axios);

Vue.prototype.$axios = Axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
