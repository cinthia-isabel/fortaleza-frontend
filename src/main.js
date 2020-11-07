import Vue from 'vue';
import VueI18n from 'vue-i18n';
// Plugins
import Message from '@/plugins/message/message';
import Storage from '@/plugins/storage';
import Service from '@/plugins/service';
import Datetime from '@/plugins/datetime';
import Progress from '@/plugins/progress-bar/progress';
import Loading from '@/plugins/loading/loading';
import Util from '@/plugins/util';
import Modal from '@/plugins/modal/modal';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import translation from './translation';
import './assets/fonts/index.scss';
import './scss/index.scss';

Vue.use(VueI18n);
Vue.use(Progress);
Vue.use(Message);
Vue.use(Storage);
Vue.use(Util);
Vue.use(Modal);
Vue.use(Loading);
Vue.use(Datetime);
Vue.use(Service, {
  apiUrl: process.env.VUE_APP_API_URL,
  baseServer: process.env.VUE_APP_BASE_SERVER,
  authToken: process.env.VUE_APP_AUTH_TOKEN,
  filterResponse: (response, Message) => {
    if (response.datos && response.finalizado) {
      return response.datos;
    }
    if ('finalizado' in response && !response.finalizado) {
      Message.error(response.message);
      return response.datos;
    }
    return response;
  },
  errorFormat: 'mensaje'
});

const i18n = new VueI18n({
  locale: 'es',
  messages: translation
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');
