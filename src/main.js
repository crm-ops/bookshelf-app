import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import vReadMoreBox from 'v-read-more-box';
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.component("v-read-more-box", vReadMoreBox);


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
