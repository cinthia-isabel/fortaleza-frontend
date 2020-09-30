<template>
  <v-carousel
    height="calc(100vh - 80px)"
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
    >
    <v-carousel-item
      v-for="(item,i) in aVoces"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        v-if="item.src"
        :src="item.src"
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
      <video v-else width="100%" class="video--voces" controls>
        <source :src="item.video" type="video/mp4">
      </video>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      show: [],
      user: null,
      password: null,
      aVoces: []
    };
  },
  mounted () {
    this.aVoces = [
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        video: 'http://www.vocesfortaleza.com/assets/callCenter/WhatsApp%20Video%202020-08-30%20at%207.33.01%20PM.mp4',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        src: 'http://www.vocesfortaleza.com/assets/callCenter/arte%202.png',
        descripcion: 'La calidad de lo que consumimos se refleja en nuestra salud, en nuestro cuerpo. Lo mismo sucede en el interior, la elección que tomamos para nutrir nuestro espíritu es un alimento que se ve reflejado en las acciones cotidianas. Asegúrate de buscar luz, recuerda que lo que consumas será lo que tendrás para ofrecer a los demás, nadie puede dar lo que no tiene. El amor nutre, servir a otros trae significado de vida, tener fe, elegir con prudencia nuestras acciones, pensamientos y nutrir nuestro espíritu buscando palabras de sabiduría, trae bendición. Muchas puertas esperan ser abiertas por tus manos para derramar sobre ti abundancia y felicidad, si quieres encontrar la llave, asegúrate de elegir correctamente el alimento de tu espíritu, esa elección abrirá tus ojos para mostrarte un camino.'
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        src: 'http://www.vocesfortaleza.com/assets/callCenter/arte%204.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      },
      {
        title: 'La calidad de lo que consumimos se refleja en nuestra salud',
        src: 'http://www.vocesfortaleza.com/assets/callCenter/arte%205.png',
        descripcion: 'Im a thing. But, like most politicians, he promised more than he could deliver. '
      }
    ];
  }
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";
.video--voces {
  height: calc(100vh - 80px);
}
</style>
