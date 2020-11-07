<template>
  <div class="app-login">
    <div class="app-login__background"></div>
    <div class="app-login__container">
      <v-container fluid>
        <v-form @submit.prevent="login" ref="form">
          <v-row no-gutters>
            <v-col
              cols="12"
            >
              <div class="login-title">{{ $t('title')}}</div>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                autofocus
                :label="$t('user')"
                outlined
                dense
                v-model="user"
                color="primary"
                :rules="[val => !!val || $t('required')]"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                outlined
                dense
                v-model="password"
                color="primary"
                :rules="[val => !!val || $t('required')]"
                :label="$t('password')"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              class="pt-2 text-center"
            >
              <v-btn type="submit" color="primary">{{ $t('ingresar') }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
import Auth from './mixins/auth';

export default {
  mixins: [Auth],
  data () {
    return {
      show: false,
      user: null,
      password: null
    };
  },
  methods: {
    /**
     * @function login
     * @description Conectar con OpenID
     */
    login () {
      if (this.$refs.form.validate()) {
        this.loginWithCredentials(this.user.trim(), this.password.trim());
      } else {
        this.$message.error('Por favor revise los campos requeridos');
      }
    }
  }
};
</script>

<style lang="scss" src="./Login.scss"></style>
