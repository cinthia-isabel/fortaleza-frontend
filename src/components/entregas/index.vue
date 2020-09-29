<template>
  <div class="entregas">
    <div class="entregas__background"></div>
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
      src: 'img/fuertes.jpeg',
    }, {
      src: 'img/espiritu.jpeg',
    }, {
      src: 'img/Call_center.png'
    }, {
      src: 'img/fuertes.jpeg',
    }, {
      src: 'img/espiritu.jpeg',
    }, {
      src: 'img/Call_center.png'
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
  .entregas__background {
    width: 100%;
    background: #0f0f0f;
    position: fixed;
    background-size: cover;
    background-position: center;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .entregas__container {
    position: relative;
    margin: auto;
    padding: 0;
    color: $white;
    user-select: none;
  }
}
</style>
