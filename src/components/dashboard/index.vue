<template>
  <v-card elevation="0" class="main-dashboard">
    <v-carousel
      hide-delimiter-background
      hide-delimiters
      continuous
      :show-arrows="false"
      cycle
      height="calc(100vh - 80px)"
      class="carrousel"
    >
      <v-carousel-item
        key="2"
        src="img/espiritu.jpeg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
      <v-carousel-item
        key="3"
        src="img/fuertes.jpeg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
      <v-carousel-item
        key="6"
        src="img/tres-manos.jpeg"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script>

export default {
  data () {
    return {
    };
  },
  methods: {
    showConfirmation () {
      this.$confirm('Modal demo para mostrar la confirmacion', () => {
        this.$message.success('Presionaste aceptar');
      }, () => {
        this.$message.warning('Presionaste cancelar');
      });
    },
    showAlert () {
      this.$alert('Modal demo para mostrar un alert');
    },
    showBlock () {
      this.$waiting(true, 'Modal demo para mostrar una pantalla bloqueante que se eliminar dentro de 5 segundos');
      setTimeout(() => {
        this.$waiting(false);
      }, 5000);
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$storage.removeUser();
      this.$storage.remove('menu');
      this.$storage.remove('token');
      this.$storage.remove('sidenav');
      this.$storage.remove('permissions');
      this.$store.commit('setAuth', false);
      this.$store.commit('setMain', false);
      this.$router.push('/');
    });
  }
};
</script>
<style lang="scss" scoped>
  .main-dashboard {
    height: calc(100vh - 80px);
    .carrosel {
      img {
        opacity: .5 !important;
      }
    }
  }
</style>
