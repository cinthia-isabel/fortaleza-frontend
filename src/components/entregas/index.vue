<template>
  <div>
     <v-carousel
      height="100%"
      hide-delimiter-background
      show-arrows-on-hover
      hide-delimiters
     >
      <v-carousel-item
        v-for="(item,i) in aImages"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <lightbox :items="item.items" :cells="5" class="entregas"></lightbox>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import lightbox from '../../plugins/@morioh/v-lightbox/src/lightbox';
import '../../plugins/@morioh/v-lightbox/dist/lightbox.css';
export default {
  data() {
    return {
      show: false,
      user: null,
      password: null,
      aImages: []
    };
  },
  components: {
    lightbox
  },
  mounted () {
    this.aImages = [{
      items: [
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.12.33.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.13.41.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.15.51.png',
      ]
    }, {
      items: [
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.33.53.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.35.02.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.37.04.png',
      ]
    }, {
      items: [
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.57.37.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.58.54.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.59.48.png',
      ]
    }, {
      items: [
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-20%20a%20las%200.06.16.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-20%20a%20las%200.13.59.png',
        'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-20%20a%20las%2017.06.23.png'
      ]
    }];
  }
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.entregas > div {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 80px);
  margin: auto;
  text-align: center;
  overflow: auto;
}
</style>
