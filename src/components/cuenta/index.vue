<template>
  <v-card
    class="mx-auto"
    elevation="0"
    width="100%"
  >
    <v-form
      v-model="valid"
      ref="form"
      lazy-validation
      @submit.prevent="changePassword"
    >
      <v-list-item>
        <v-list-item-avatar color="transparent">
          <v-icon size="50" color="black">account_circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ user ? user.nombre : '' }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user ? user.nombre : '' }}
            {{ user ? user.paterno : '' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-alert
          type="warning"
          color="error"
          text
          class="fs9"
        >
          Para cambiar la contraseña actual debe de llenar estos 2 campos de texto, una vez realizado el cambio usted tendrá que volver a autenticarse para ingresar al sistema.
        </v-alert>
        <v-card elevation="0">
          <v-text-field
            class="mt-4"
            outlined
            dense
            v-model="oldPassword"
            color="primary"
            label="Contraseña actual"
            :append-icon="oldPasswordShow ? 'remove_red_eye' : 'visibility_off'"
            :type="oldPasswordShow ? 'text' : 'password'"
            @click:append="oldPasswordShow = !oldPasswordShow"
            counter
            aria-required
            :rules="[val => !!val || 'El campo de la contraseña actual no puede estar vacío']"
          >
            <template v-slot:prepend>
              <v-tooltip
                bottom
                color="primary"
                max-width="200"
              >
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" v-on="on">info</v-icon>
                </template>
                En este campo usted tiene que colocar la contraseña actual.
              </v-tooltip>
            </template>
            <template v-slot:prepend>
              <v-tooltip
                bottom
                color="primary"
                max-width="200"
              >
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" v-on="on">info</v-icon>
                </template>
                En este campo usted tiene que colocar la contraseña actual.
              </v-tooltip>
            </template>
          </v-text-field>
           <v-alert
            type="info"
            color="info"
            text
            class="fs9"
          >
            La nueva contraseña debe tener como mínimo 8 caracteres y como máximo 15 caracteres.<br/>
            Debe de tener al menos una letra mayúscula<br/>
            Debe de tener al menos una letra minúscula<br/>
            Debe de tener al menos un número<br/>
            Debe de tener al menos un caracter especial como ser $ @ $ ! % * ? & . -<br/>
          </v-alert>
          <v-text-field
            outlined
            dense
            aria-required
            :append-icon="newPasswordShow ? 'remove_red_eye' : 'visibility_off'"
            :type="newPasswordShow ? 'text' : 'password'"
            @click:append="newPasswordShow = !newPasswordShow"
            counter
            v-model="newPassword"
            color="primary"
            label="Nueva contraseña"
            :rules="[val => !!val || 'El campo de la nueva contraseña no puede estar vacío']"
          >
            <template v-slot:prepend>
              <v-tooltip
                bottom
                color="primary"
                max-width="200"
              >
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" v-on="on">info</v-icon>
                </template>
                En este campo tiene que colocar la nueva contraseña, se recomienda que tenga caracteres especiales y que sea alfanumérico.
              </v-tooltip>
            </template>
          </v-text-field>
          <v-text-field
            outlined
            dense
            aria-required
            :append-icon="newPasswordRepeatShow ? 'remove_red_eye' : 'visibility_off'"
            :type="newPasswordRepeatShow ? 'text' : 'password'"
            @click:append="newPasswordRepeatShow = !newPasswordRepeatShow"
            v-model="newPasswordRepeat"
            counter
            color="primary"
            label="Vuelva a escribir la nueva contraseña"
            :rules="[val => !!val || 'El campo de la nueva contraseña no puede estar vacío']"
          >
            <template v-slot:prepend>
              <v-tooltip
                bottom
                color="primary"
                max-width="200"
              >
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" v-on="on">info</v-icon>
                </template>
                En este campo tiene que repetir la nueva contraseña.
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card>
      </v-card-text>
      <v-card-actions :class="['text-center mt-0 pt-0' ,breakpoints.includes($vuetify.breakpoint.name) ? 'd-flex flex-column align-center justify-center' : '']">
        <v-btn
          type="submit"
          color="primary"
          :block="breakpoints.includes($vuetify.breakpoint.name)"
        >
          cambiar contraseña
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import Auth from '../auth/mixins/auth';

export default {
  mixins: [Auth],
  data: () => ({
    user: {},
    valid: null,
    oldPassword: null,
    oldPasswordShow: null,
    newPassword: null,
    newPasswordShow: null,
    newPasswordRepeat: null,
    newPasswordRepeatShow: null,
    breakpoints: ['xs', 'sm']
  }),
  methods: {
    changePassword () {
      if (this.$refs.form.validate()) {
        if (this.newPassword !== this.newPasswordRepeat) {
          this.$message.error('La contraseña nueva y el campo de repetir la contraseña no coinciden');
          return;
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.-])([A-Za-z\d$@$!%*?&.-]|[^ ]){8,15}$/;
        if (!regex.test(this.newPassword)) {
          this.$message.error('La nueva contraseña no cumple con las reglas establecidas.');
          return;
        }
        this.$confirm('¿Está seguro de cambiar la contraseña?', async () => {
          const response = await this.$service.put('usuario/contrasena', {
            nuevaContrasena: this.newPassword,
            idUsuario: this.$storage.getUser().id
          });
          if (response && response.finalizado) {
            this.$message.success('Se cambió la contraseña exitosamente');
            this.logout();
          } else {
            this.$message.error(response && response.mensaje || 'Ocurrió un error al tratar de cambiar la contraseña');
          }
        }, null);
      } else {
        this.$message.error('Error los campos no pueden estar vacíos');
      }
    }
  },
  mounted () {
    this.user = this.$storage.getUser();
  }
};
</script>
<style lang="scss" scoped>

</style>
