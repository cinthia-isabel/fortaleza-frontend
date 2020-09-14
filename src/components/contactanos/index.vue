<template>
  <div class="app-contactanos">
    <div class="app-contactanos__background"></div>
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

.app-contactanos {
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden !important;
  .app-contactanos__background {
    width: 100%;
    background: #0F0F0F url('../../../public/img/llamanos.jpeg') no-repeat;
    position: fixed;
    background-size: contain;
    background-position: center;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .app-contactanos__container {
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
    .app-contactanos__boton {
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
