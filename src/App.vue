<template>
  <v-app :class="{ 'app-login': !auth }">
    <app-sidenav v-if="auth"></app-sidenav>
    <app-navbar></app-navbar>
    <v-content>
      <div class="main">
        <div class="bot-whatsapp" v-if="!auth">
          <v-img src="img/EEUU.png" contain @click="() => changeLanguage('en')" height="50" width="50"/>
          <v-img src="img/ESPANA.png" contain @click="() => changeLanguage('es')" height="50" width="50"/>
          <v-img src="img/BRASIL.png" contain @click="() => changeLanguage('pr')" height="50" width="50"/>
          <v-img src="img/whatsapp.png" contain @click="chatWhatsapp" height="50" width="50"/>
        </div>
        <transition :name="transitionName" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </v-content>
    <app-footer v-if="auth && false"></app-footer>
    <app-confirm/>
    <app-alert/>
    <app-loading/>
    <app-progress/>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import AppSidenav from '@/layout/AppSidenav.vue';
import AppNavbar from '@/layout/AppNavbar.vue';
import AppFooter from '@/layout/AppFooter.vue';
import AppProgress from '@/plugins/progress-bar/AppProgress.vue';
import AppConfirm from '@/plugins/modal/AppConfirm.vue';
import AppAlert from '@/plugins/modal/AppAlert.vue';
import AppLoading from '@/plugins/loading/AppLoading.vue';
import Auth from '@/components/auth/mixins/auth';

// Páginas que no necesitan autenticación/token/sesión
const PageNoLogin = ['login', 'dashboard', 'quienes-somos', 'contactanos', 'mensajes-fortaleza', 'voces-fortaleza', 'entregas'];

export default {
  name: 'App',
  mixins: [Auth],
  components: {
    AppSidenav,
    AppNavbar,
    AppFooter,
    AppProgress,
    AppConfirm,
    AppAlert,
    AppLoading
  },
  created () {
    const error = this.$storage.get('error');
    if (error) {
      this.$message.error(error);
      this.$storage.remove('error');
    }
    if (this.$storage.existUser()) {
      this.$store.commit('setAuth', true);

      if (this.$storage.exist('sidenav')) {
        this.$store.commit('setSidenav', this.$storage.get('sidenav'));
      }

      if (this.$storage.exist('permissions')) {
        this.$store.commit('setPermissions', this.$storage.get('permissions'));
      }
    } else if (PageNoLogin.indexOf(this.$route.path.substring(1)) === -1 || this.$route.path === '/') {
      this.logout();
    }
  },
  data () {
    return {
      transitionName: ''
    };
  },
  computed: {
    ...mapState(['auth', 'sidenav', 'main'])
  },
  methods: {
    chatWhatsapp () {
      window.open('https://api.whatsapp.com/send?phone=59178999770&text=Hola Fortaleza', '_blank');
    },
    changeLanguage (lng) {
      this.$i18n.locale = lng;
      this.$storage.set('lang', lng);
    }
  },
  mounted () {
    this.$i18n.locale = this.$storage.get('lang') || 'es';
  },
  watch: {
    '$route' (to, from) {
      if (!this.$storage.existUser() && PageNoLogin.indexOf(to.path.substring(1)) === -1) {
        this.logout();
      }
      if (to.path !== '/login' && from.path !== '/login') {
        this.transitionName = 'fade';
      } else {
        this.transitionName = '';
      }
      if (to.path === '/login' && this.$storage.existUser()) {
        this.$router.push('dashboard');
      }
    }
  }
};
</script>

<style lang="scss">
  .bot-whatsapp {
    position: fixed;
    z-index: 10;
    bottom: 25px;
    right: 25px;
    cursor: pointer;
  }
</style>
