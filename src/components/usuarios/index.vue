
<template>
  <div class="user--crud">
    <crud-table
      :headers="headers"
      :url="url"
      :filters="filters"
      :widthModal="750"
      :order="order"
      :custom="true"
    >
      <!-- Boton agregar usuarios -->
      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              text
              class="ml-3"
              v-on="on"
              @click.native.stop="createNewUser"
              slot="activator"
            ><v-icon dark class="mr-2">person_add</v-icon>Agregar Usuario </v-btn>
          </template>
          <span> Agregar usuario </span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr>
          <td>{{ items.items.Celular }}</td>
          <td>{{ items.items.FechaLlamada }}</td>
          <td>{{ items.items.Tipo }}</td>
          <td>
            <v-tooltip bottom color="info lighten-1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="showForm(items)">
                  <v-icon color="info">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar usuario</span>
            </v-tooltip>
            <v-tooltip bottom color="error lighten-1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="deleteUser(items)">
                  <v-icon color="error">delete_forever</v-icon>
                </v-btn>
              </template>
              <span>Eliminar usuario</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </crud-table>
    <!-- Dialogo -->
    <v-dialog v-model="dialog" persistent width="450">
        <v-card>
          <v-card-title>
            <span class="headline">Agregar usuario</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="sendData">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.nombres"
                      color="primary"
                      label="Nombres"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.apellidoPaterno"
                      color="primary"
                      label="Apellido Paterno"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.apellidoMaterno"
                      color="primary"
                      label="Apellido Materno"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-menu
                      v-model="menuDatepicker"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="250px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="form.fechaSeguimiento"
                          label="Fecha de Nacimiento *"
                          hint="DD/MM/YYYY"
                          clearable
                          persistent-hint
                          outlined
                          hide-details
                          class="mb-2"
                          dense
                          prepend-icon="event"
                          v-on="on"
                          autocomplete="off"
                          :rules="[val => !!val || 'La fecha no puede estar vacio']"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-EN"
                        color="primary"
                        v-model="mCalendar"
                        no-title
                        @input="menuDatepicker = false"
                        :min="minDate || undefined "
                        :max="maxDate || undefined "
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Telefono/Celular"
                      v-model="form.celular"
                      :rules="[val => !!val || 'El campo no puede estar vacio']"
                      hide-details
                      dense
                      outlined
                      class="mb-2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Correo electrónico"
                      v-model="form.correoElectronico"
                      :rules="[val => !!val || 'El campo no puede estar vacio']"
                      hide-details
                      dense
                      outlined
                      class="mb-2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <small class="red--text">* Todos los campos marcados son requeridos</small>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions class="mb-0 pb-0">
                      <v-spacer></v-spacer>
                      <v-btn text @click="dialog = false">Cancelar</v-btn>
                      <v-btn type="submit" color="primary">Guardar</v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    dialog: null,
    mCalendar: null,
    minDate: undefined,
    maxDate: undefined,
    url: 'unicall',
    item: {},
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Celular', align: 'center', value: 'Celular', sortable: true },
      { text: 'Fecha de la llamada', value: 'FechaLlamada', sortable: true },
      { text: 'Tipo', align: 'center', value: 'Tipo' },
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS' }
    ],
    breakpoints: ['md', 'lg', 'xl'],
    menuDatepicker: null,
    form: {},
    filters: [],
  }),
  watch: {
    mCalendar (date) {
      this.form.fechaSeguimiento = this.formatDate(date);
    }
  },
  methods: {
    deleteUser () {
      this.$confirm('¿Desea eliminar el usuario?', () => {
        this.$message.success('usuario exitosamente eliminado');
      });
    },
    createNewUser () {
      this.dialog = true;
    },
    async sendData () {
      try {
        if (this.$refs.form.validate()) {
          this.$waiting(true, 'Espere unos segundos por favor...');
          const response = await this.$service.post('usuario', {
            ...this.form
          });
          if (response.finalizado) {
            this.$message.success('Registro exitosamente actualizado');
          } else {
            this.$message.error(response.mensaje);
          }
          this.$waiting(false);
          this.dialog = false;
          setTimeout(() => {
            this.updateList();
          }, 100);
        } else {
          this.$waiting(false);
          this.$message.error('Faltan campos por llenar');
        }
      } catch (error) {
        this.$waiting(false);
      }
    },
    /**
     * @function formatDate
     * @description Funcion para formatear fechas
     */
    formatDate (date, character = '-') {
      let dateFormatted;
      if (!date) return null;
      if (character === '-') {
        const [year, month, day] = date.split(character);
        dateFormatted = `${day}/${month}/${year}`;
      } else {
        const [day, month, year] = date.split(character);
        dateFormatted = `${year}-${month}-${day}`;
      }
      return dateFormatted;
    },
    async cancelCall () {
      await this.$service.put('estado-usuario', { idUser: this.$storage.getUser().id, libre: 1, conectado: 1 });
      this.dialog = false;
    },
    async showForm ({ items }) {
      this.item = items;
      this.form = {};
      await this.$service.put('estado-usuario', { idUser: this.$storage.getUser().id, libre: 0, conectado: 1 });
      this.dialog = true;
    }
  },
  components: {
    CrudTable
  }
};
</script>
<style lang="scss" scoped>
  @import '../../scss/variables.scss';
  .user--selected {
    border-radius: 50% !important;
    width: 75px;
    height: 75px;
    z-index: 2;
    border: 2px solid $black;
    background: $white;
    div {
      border-radius: 50%;
    }
  }
</style>
