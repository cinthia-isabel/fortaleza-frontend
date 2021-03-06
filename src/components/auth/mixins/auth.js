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
        const { data } = response;
        if (data.finalizado) {
          this.$storage.set('token', data.data.token);
          this.$storage.setUser(data.data.user);
          this.$message.success(this.$t("mensajeUsuarioAutenticado"));
          let menus = [
            {
              url: 'llamadas',
              label: this.$t('menuNuevasLlamadas'),
              icon: 'phone'
            },
            {
              url: 'seguimiento-llamadas',
              label: this.$t('menuSeguimientoLlamadas'),
              icon: 'contact_phone'
            },
          ];
          if ([1, 3].includes(data.data.user.id_rol)) {
            menus = menus.concat([
              {
                url: 'categorias-llamada',
                label: this.$t('menuCategoriasLlamada'),
                icon: 'list'
              },
              {
                url: 'usuarios',
                label: this.$t('menuUsuarios'),
                icon: 'supervised_user_circle'
              },
              {
                url: 'numeros-bloqueados',
                label: this.$t('menuNumerosBloqueados'),
                icon: 'phonelink_erase'
              },
              {
                url: 'reportes',
                label: this.$t('menuReportes'),
                icon: 'pie_chart'
              }
            ]);
          }
          menus = menus.concat([
            {
              url: 'cuenta',
              label: this.$t('menuCuenta'),
              icon: 'security'
            }, {
              url: 'logout',
              label: this.$t('menuCerrarSesion'),
              icon: 'power_settings_new'
            }
          ]);
          this.$storage.set('menu', menus);
          this.$router.push('/llamadas');
          this.$nextTick(() => {
            this.$store.commit('setAuth', true);
            this.$store.commit('setMain', true);
          });
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
        if (router.path !== '/') router.push('/');
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    }
  }
};
