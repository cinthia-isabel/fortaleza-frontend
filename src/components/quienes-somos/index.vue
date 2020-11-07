<template>
  <div class="app-quienes-somos">
    <div class="app-quienes-somos__background"></div>
    <div class="app-quienes-somos__container">
      <v-container fluid>
        {{ $t('primerTextoQuienesSomos' )}}
        <br />
        <br />
        <div class="primary--text">{{ $t('vision' )}}</div>
        {{ $t('segundoTextoQuienesSomos' )}}
        <br />
        <br />
        <div class="primary--text">{{ $t('mision' )}}</div>
        {{ $t('tercerTextoQuienesSomos' )}}
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
    };
  },
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.app-quienes-somos {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 150px);
  margin: auto;
  text-align: center;
  overflow: auto;
  .app-quienes-somos__background {
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
  .app-quienes-somos__container {
    position: relative;
    z-index: 3;
    margin: auto;
    padding: 0;
    margin-top: 5%;
    width: 70%;
    color: $white;
    user-select: none;
    font-size: 1.2rem;
    border-radius: 8px;
    overflow: auto;
  }
}
</style>
