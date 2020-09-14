<template>
  <div class="app-quienes-somos">
    <div class="app-quienes-somos__background"></div>
    <div class="app-quienes-somos__container">
      <v-container fluid>
        Somos un Movimiento Ciudadano conformado por bolivianos que buscan manifestar amor al prójimo apoyando a través de distintas acciones a los más afectados de la crisis en la sociedad boliviana. No representamos a ningún partido político, institución o iglesia.
        <br/>
        <br/>
        <div class="primary--text">VISIÓN</div>
        Ser un instrumento ciudadano sin fines lucrativos ni de interés político, conformado por voluntari@s con fe en Dios, cuyo objetivo es traer luz y esperanza en medio de la oscuridad, impactando positivamente a través de acciones que aportan al desarrollo y bien estar de la sociedad boliviana.

        <br/>
        <br/>
        <div class="primary--text">MISIÓN</div>
        Ser un canalizador de ayuda para las personas que conforman la primera línea en la lucha contra la pandemia COVID-19, llevando material de bioseguridad, palabras de aliento, apoyo y esperanza.

        Establecer un Centro de llamadas gratuito que atienda de forma continua a personas necesitadas de escucha empática y contención, para brindarles una voz de amor, aliento y apoyo.
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
    background: #0F0F0F;
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
    padding: 0;
    width: 70%;
    color: $white;
    user-select: none;
    font-size: 1.2rem;
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
