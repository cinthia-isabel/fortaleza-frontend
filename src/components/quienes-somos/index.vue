<template>
  <div class="app-quienes-somos">
    <div class="app-quienes-somos__background"></div>
    <div class="app-quienes-somos__container">
      <v-container fluid>
        hola
      </v-container>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      show: false,
      user: null,
      password: null
    };
  }
};
</script>

<style lang="scss">
@import '../../scss/variables.scss';

.app-quienes-somos {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden !important;
  .app-quienes-somos__background {
    width: 100%;
    background: url('../../../public/img/quienes-somos.jpeg') no-repeat;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 350px;
    padding: 0;
    background: $white;
    border-radius: 8px;
    .login-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: $primary;
      padding-top: 5px;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 15px;
      text-align: center;
    }
    .app-quienes-somos__boton {
      margin-top: 15px;
      font-size: 0.9rem;
      letter-spacing: -0.1px;
      border-radius: 40px;
      color: $white;
      border: 2px solid $secondary;
      width: 100%;
      line-height: 1.7 !important;
      font-weight: 500 !important;
      text-align: center;
      text-decoration: none;
      outline: none;
    }
  }
}
</style>
