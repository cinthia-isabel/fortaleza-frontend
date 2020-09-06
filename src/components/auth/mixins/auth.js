import axios from 'axios';

export default {
  methods: {
    async loginWithCredentials (user, pass) {
      const url = process.env.VUE_APP_BASE_SERVER;
      try {
        const request = {
          method: 'post',
          data: {
            user,
            pass
          },
          url: `${url}login`,
          responseType: 'json'
        };
        const response = await axios(request);
        const data = response.data;
        if (data.finalizado) {
          this.$storage.set('token', data.data.token);
          this.$storage.setUser(data.data.user);
          this.$message.success('Usuario exitosamente autenticado');
          this.$storage.set('menu', [
            {
              url: 'logout',
              label: 'Cerrar sesión',
              icon: 'power_settings_new'
            },
            {
              url: 'unicall',
              label: 'Llamadas entrantes',
              icon: 'phone'
            },
          ]);
          this.$nextTick(() => {
            this.$store.commit('setAuth', true);
            this.$store.commit('setMain', true);
          });
          this.$router.push('/unicall');
        } else {
          this.$message.error(data.mensaje);
        }
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    },
    reload() {
      this.$store.commit('setMain', false);
      this.$nextTick(() => {
        this.$store.commit('setMain', true);
      });
    },
    cleanData (store) {
      store.commit('setDefault');
    },
    async logout (router) {
      try {
        const storevuex = this.$store;
        router = router || this.$router;
        if (this.$storage.getUser()) {
          await this.$service.put('estado-usuario', { idUser: this.$storage.getUser().id, libre: 0, conectado: 0 });
        }
        this.$storage.removeUser();
        this.$storage.remove('menu');
        this.$storage.remove('token');
        this.$storage.remove('sidenav');
        this.$storage.remove('permissions');
        this.cleanData(storevuex);
        router.push('/');
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    }
  }
};
