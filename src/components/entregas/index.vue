<template>
  <div>
    <stack
      :column-min-width="300"
      :gutter-width="15"
      :gutter-height="15"
      monitor-images-loaded
      >
      <stack-item
        v-for="(image, i) in aImages"
        :key="i"
        style="transition: transform 300ms"
      >
        <img :src="image.href" :alt="'imagen'" />
    </stack-item>
  </stack>
  </div>
</template>

<script>
import { Stack, StackItem } from "vue-stack-grid";
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
    Stack, 
    StackItem
  },
  mounted () {
    this.aImages = [
      {title: 'Entrega número 1', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.12.33.png'},
      {title: 'Entrega número 2', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.13.41.png'},
      {title: 'Entrega número 3', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.15.51.png'},
      {title: 'Entrega número 4', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.33.53.png'},
      {title: 'Entrega número 5', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.35.02.png'},
      {title: 'Entrega número 6', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.37.04.png'},
      {title: 'Entrega número 7', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.57.37.png'},
      {title: 'Entrega número 8', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.58.54.png'},
      {title: 'Entrega número 9', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.59.48.png'},
      {title: 'Entrega número 10', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-20%20a%20las%200.06.16.png'},
      {title: 'Entrega número 11', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-20%20a%20las%200.13.59.png'},
      {title: 'Entrega número 12', href: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-20%20a%20las%2017.06.23.png'}
    ];
  }
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.entregas {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 80px);
  margin: auto;
  text-align: center;
  overflow: auto;
}
</style>
