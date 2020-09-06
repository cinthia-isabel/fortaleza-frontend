import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
  options: {
    customProperties: true,
  },
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#2d504e',
        secondary: '#407471',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      },
      dark: {
        primary: '#2d504e',
        secondary: '#407471',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      }
    }
  }
};

export default new Vuetify(opts);
