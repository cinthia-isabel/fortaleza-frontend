import Vue from 'vue';
import Vuex from 'vuex';

import layout from '../layout/modules/layout';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    main: true,
    auth: false,
    menuActivo: '',
    menu: {},
    user: {},
    notifications: {
      show: false
    },
    progress: {
      active: false
    },
    date: {},
    permissions: {},
    sidenav: false,
    navbar: false,
    state403: false,
    modal: false,
    action: null,
    selected: null,
    alert: {
      show: false,
      title: 'Alerta',
      text: '',
      callback: null
    },
    waiting: {
      show: false,
      message: ''
    },
    form: {},
    confirm: {
      show: false,
      text: '',
      width: 360,
      callbackOk: null,
      callbackCancel: null,
      textOk: '',
      textCancel: ''
    }
  },
  mutations: {
    setActive(state, value) {
      state.sidenav = value;
      state.navbar = value;
    },
    setMenuActivo(state, value) {
      state.menuActivo = value;
    },
    setMain(state, value) {
      state.main = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setMenu(state, value) {
      state.menu = value;
    },
    setAuth(state, value) {
      state.auth = value;
    },
    setSidenav(state, value) {
      state.sidenav = value;
      state.navbar = value;
    },
    setPermissions(state, value) {
      state.permissions = value;
    },
    setForm(state, value) {
      state.form = value;
    },
    setAction(state, value) {
      if (value && value.sleep) {
        setTimeout(() => {
          state.action = value.action;
          console.log('Exec action', value.action, 'in', value.sleep);
        }, value.sleep);
      } else {
        state.action = value;
      }
    },
    openModal(state, id = '') {
      state[`modal${id}`] = true;
    },
    closeModal(state, id = '') {
      state[`modal${id}`] = false;
    },
    setDate(state, value) {
      if (state.date === undefined) {
        state.date = {};
      }
      if (value) {
        const keys = Object.keys(value);
        if (keys.length) {
          state.date[keys[0]] = value[keys[0]];
        } else {
          state.date = value;
        }
      } else {
        state.date = value;
      }
    },
    setState403(state, value) {
      state.state403 = value;
    },
    setDefault(state) {
      state.auth = false;
      state.menu = {};
      state.user = {};
      state.notifications = {};
      state.date = {};
      state.permissions = {};
      state.layout.breadcrumbs = {};
      state.modal = false;
      state.state403 = false;
      state.alert.show = false;
      state.confirm.show = false;
    },
    CLOSE_ALERT(state) {
      state.alert.show = false;
    },
    CLOSE_CONFIRM(state) {
      state.confirm.show = false;
    },
    CLOSE_NOTIFICATIONS(state) {
      state.notifications.show = false;
    },
    CLOSE_PROGRESS(state) {
      state.progress.active = false;
    }
  },
  modules: {
    layout
  }
});
