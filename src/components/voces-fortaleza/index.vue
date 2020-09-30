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
        video: 'http://www.vocesfortaleza.com/assets/callCenter/WhatsApp%20Video%202020-08-30%20at%207.33.01%20PM.mp4',
      },
      {
        src: 'http://www.vocesfortaleza.com/assets/callCenter/arte%202.png',
      },
      {
        src: 'http://www.vocesfortaleza.com/assets/callCenter/arte%204.png',
      },
      {
        src: 'http://www.vocesfortaleza.com/assets/callCenter/arte%205.png',
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
