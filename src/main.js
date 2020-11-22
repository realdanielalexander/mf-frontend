import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Buefy from "buefy";
import Axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueAxios, Axios);

Vue.prototype.$axios = Axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
