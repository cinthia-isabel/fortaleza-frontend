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
          this.$store.commit('setMain', true);
          this.$router.push('/unicall');
          this.reload();
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
        this.$storage.removeUser();
        this.$storage.remove('menu');
        this.$storage.remove('token');
        this.$storage.remove('sidenav');
        this.$storage.remove('permissions');
        this.cleanData(storevuex);
        router.push('login');
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    }
  }
};
