<template>
  <div class="app-quienes-somos">
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
                {{ !item.show ? 'Ver mas...' : 'Ocultar'}}
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
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Arte%20frase.png',
        descripcion: 'La calidad de lo que consumimos se refleja en nuestra salud, en nuestro cuerpo. Lo mismo sucede en el interior, la elección que tomamos para nutrir nuestro espíritu es un alimento que se ve reflejado en las acciones cotidianas. Asegúrate de buscar luz, recuerda que lo que consumas será lo que tendrás para ofrecer a los demás, nadie puede dar lo que no tiene. El amor nutre, servir a otros trae significado de vida, tener fe, elegir con prudencia nuestras acciones, pensamientos y nutrir nuestro espíritu buscando palabras de sabiduría, trae bendición. Muchas puertas esperan ser abiertas por tus manos para derramar sobre ti abundancia y felicidad, si quieres encontrar la llave, asegúrate de elegir correctamente el alimento de tu espíritu, esa elección abrirá tus ojos para mostrarte un camino.'
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-06-27%20a%20las%2014.00.42.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-23%20a%20las%2020.29.54.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-25%20a%20las%2022.18.09.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-28%20a%20las%2017.05.13.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-07-28%20a%20las%2022.50.44.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-08-03%20a%20las%2018.24.13.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/Captura%20de%20pantalla%202020-08-06%20a%20las%2018.23.18.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        show: false,
        src: 'http://www.vocesfortaleza.com/assets/mensajes/arte%20alimentos.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
    ];
  }
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.app-quienes-somos {
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
