<template>
  <div class="entregas">
    <div class="entregas__container">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="d-flex flex-row justify-space-between align-center flex-wrap">
            <v-img
              v-for="(image, idx) in aImages"
              :key="idx"
              width="400"
              :src="image.src"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      user: null,
      password: null,
      aImages: []
    };
  },
  mounted () {
    this.aImages = [{
      src: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.12.33.png',
    }, {
      src: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.13.41.png',
    }, {
      src: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.15.51.png'
    }, {
      src: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.33.53.png',
    }, {
      src: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.35.02.png',
    }, {
      src: 'http://www.vocesfortaleza.com/assets/entregas/Captura%20de%20pantalla%202020-06-19%20a%20las%2023.37.04.png'
    }];
  }
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.entregas {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 150px);
  margin: auto;
  text-align: center;
  overflow: auto;
  .entregas__container {
    position: relative;
    margin: auto;
    padding: 0;
    color: $white;
    user-select: none;
    overflow: auto;
  }
}
</style>
