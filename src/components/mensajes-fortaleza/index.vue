<template>
  <div class="app-mensajes-fortaleza">
    <v-row no-gutters>
      <v-col cols="12" class="d-flex flex-row justify-space-around flex-wrap mt-2">
        <v-card
            v-for="(item, index) in aMensajes"
            :key="index"
            class="mb-2"
            max-width="280"
          >
            <v-img
              :src="item.src"
              height="200px"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-card-subtitle class="text-left">
              {{ item.title }}
             </v-card-subtitle>
             <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :color="!item.show ? 'orange' : 'error'"
                outlined
                style="text-transform: none"
                @click="item.show = !item.show"
              >
                {{ !item.show ? $t("botonVerMas") : $t("botonOcultar")}}
              </v-btn>

            </v-card-actions>

            <v-expand-transition>
              <div v-show="item.show">
                <v-card-text class="media--description mt-1">
                  {{ item.descripcion }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: [],
      user: null,
      password: null,
      aMensajes: []
    };
  },
  mounted () {
    this.aMensajes = [
      {
        title: this.$t("primerMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Arte%20frase.png',
        descripcion: this.$t("primerMensajeDescripcion")
      },
      {
        title: this.$t("segundoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-06-27%20a%20las%2014.00.42.png',
        descripcion: this.$t("segundoMensajeDescripcion")
      },
      {
        title: this.$t("tercerMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-23%20a%20las%2020.29.54.png',
        descripcion: this.$t("tercerMensajeDescripcion")
      },
      {
        title: this.$t("cuartoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-25%20a%20las%2022.18.09.png',
        descripcion: this.$t("cuartoMensajeDescripcion")
      },
      {
        title: this.$t("quintoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-28%20a%20las%2017.05.13.png',
        descripcion: this.$t("quintoMensajeDescripcion")
      },
      {
        title: this.$t("sextoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-28%20a%20las%2022.50.44.png',
        descripcion: this.$t("sextoMensajeDescripcion")
      },
      {
        title: this.$t("septimoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-08-03%20a%20las%2018.24.13.png',
        descripcion: this.$t("septimoMensajeDescripcion")
      },
      {
        title: this.$t("octavoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-08-06%20a%20las%2018.23.18.png',
        descripcion: this.$t("octavoMensajeDescripcion")
      },
      {
        title: this.$t("novenoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/arte%20alimentos.png',
        descripcion: this.$t("novenoMensajeDescripcion")
      },
      {
        title: this.$t("decimoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/arte%20cargar.png',
        descripcion: this.$t("decimoMensajeDescripcion")
      },
      {
        title: this.$t("onceavoMensajeFortaleza"),
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/arte%20guerrero.png',
        descripcion: this.$t("onceavoMensajeDescripcion")
      },
    ];
  }
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.app-mensajes-fortaleza {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 80px);
  margin: auto;
  text-align: center;
  overflow: auto;
  .media--description {
    position: absolute;
    z-index: 2;
    background: wheat;
  }
}
</style>
