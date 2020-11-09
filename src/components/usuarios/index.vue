
<template>
  <div class="user--crud">
    <crud-table
      v-if="ready"
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
            >
              <v-icon dark class="mr-2">person_add</v-icon>{{$t("botonAgregarUsuario")}}
            </v-btn>
          </template>
          <span>{{$t("tituloAgregarUsuario")}}</span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr>
          <td>{{ items.items.Nombre }}</td>
          <td>{{ items.items.Paterno }}</td>
          <td>{{ items.items.Materno }}</td>
          <td>{{ items.items.Interno }}</td>
          <td>{{ items.items.WB }}</td>
          <td>{{ items.items.Ciudad }}</td>
          <td>{{ getRol(items) }}</td>
          <td>
            <v-tooltip bottom color="secondary">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="showForm(items)">
                  <v-icon color="secondary">edit</v-icon>
                </v-btn>
              </template>
              <span>{{$t('tituloEditarUsuario')}}</span>
            </v-tooltip>
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="deleteUser(items)">
                  <v-icon color="error">delete_forever</v-icon>
                </v-btn>
              </template>
              <span>{{$t("eliminarUsuarioTooltip")}}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </crud-table>
    <!-- Dialogo -->
    <v-dialog v-model="dialog" persistent width="450">
      <v-card>
        <v-card-title>
          <span class="headline">{{ itemSeleccionado ? this.$t("tituloEditarUsuario") : this.$t("tituloAgregarUsuario")}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" @submit.prevent="sendData">
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.Nombre"
                    color="primary"
                    :label="$t('campoNombres')"
                    outlined
                    hide-details
                    dense
                    class="mb-2"
                    :rules="[val => !!val || 'No puede estar vacio']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.Paterno"
                    color="primary"
                    :label="$t('campoApellidoPaterno')"
                    outlined
                    hide-details
                    dense
                    class="mb-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.Materno"
                    color="primary"
                    :label="$t('campoApellidoMaterno')"
                    outlined
                    hide-details
                    dense
                    class="mb-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.Interno"
                    color="primary"
                    :label="$t('campoInterno')"
                    outlined
                    hide-details
                    dense
                    class="mb-2"
                    :rules="[val => !!val || 'No puede estar vacio']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.WB"
                    color="primary"
                    :label="$t('campoCorporativo')"
                    outlined
                    hide-details
                    dense
                    :rules="[val => !!val || 'No puede estar vacio']"
                    class="mb-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :label="$t('campoTelefono')"
                    v-model="form.Celular"
                    :rules="[val => !!val || 'El campo no puede estar vacio']"
                    hide-details
                    dense
                    outlined
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :label="$t('campoCorreo')"
                    v-model="form.Correo"
                    hide-details
                    dense
                    outlined
                    :rules="[val => !!val || 'No puede estar vacio']"
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :label="$t('campoCiudad')"
                    v-model="form.Ciudad"
                    :rules="[val => !!val || 'El campo no puede estar vacio']"
                    hide-details
                    dense
                    outlined
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-autocomplete
                    :label="$t('campoRol')"
                    v-model="form.id_rol"
                    :rules="[val => !!val || 'El campo no puede estar vacio']"
                    hide-details
                    item-text="Rol"
                    item-value="id"
                    no-data-text="No existen registros"
                    :items="aRoles"
                    clearable
                    dense
                    outlined
                    class="mb-2"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <small class="red--text">* {{$t("camposRequeridosLabel")}}</small>
                </v-col>
                <v-col cols="12">
                  <v-card-actions class="mb-0 pb-0">
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false">{{$t("btnCancelarConfirm")}}</v-btn>
                    <v-btn type="submit" color="primary">{{$t("botonGuardar")}}</v-btn>
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
    url: 'usuarios',
    itemSeleccionado: null,
    order: ['createdAt', 'DESC'],
    headers: [],
    breakpoints: ['md', 'lg', 'xl'],
    menuDatepicker: null,
    form: {},
    filters: [],
    aRoles: [],
    ready: false,
  }),
  watch: {
    mCalendar(date) {
      this.form.fechaSeguimiento = this.formatDate(date);
    },
  },
  methods: {
    getRol ({ items }) {
      let rolName;
      const rol = this.aRoles.find(elem => elem.id === items.id_rol);
      if (rol) {
        rolName = rol.Rol;
      }
      return rolName;
    },
    deleteUser({ items }) {
      this.$confirm(this.$t("mensajeBorrarUsuario"), async () => {
        await this.$service.delete('usuario', {
          idUsuario: items.id
        });
        this.updateList();
        this.$message.success(this.$t("mensajeUsuarioEliminado"));
      });
    },
    createNewUser() {
      this.form = {};
      this.dialog = true;
    },
    async sendData() {
      try {
        if (this.$refs.form.validate()) {
          this.$waiting(true, 'Espere unos segundos por favor...');
          let response;
          if (this.itemSeleccionado) {
            const data = {
              ...this.form,
              idUsuario: this.itemSeleccionado.id
            };
            delete data.id;
            response = await this.$service.put('usuario', data);
          } else {
            response = await this.$service.post('usuario', {
              ...this.form
            });
          }
          if (response.finalizado) {
            this.$message.success(this.$t("successMessage"));
          } else {
            this.$message.error(response.mensaje);
          }
          this.$waiting(false);
          this.itemSeleccionado = null;
          this.dialog = false;
          setTimeout(() => {
            this.updateList();
          }, 100);
        } else {
          this.$waiting(false);
          this.$message.error(this.$t("errorCamposFaltantes"));
        }
      } catch (error) {
        this.$waiting(false);
      }
    },
    /**
     * @function formatDate
     * @description Funcion para formatear fechas
     */
    formatDate(date, character = '-') {
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
    async cancelCall() {
      await this.$service.put('estado-usuario', {
        idUser: this.$storage.getUser().id,
        libre: 1,
        conectado: 1,
      });
      this.dialog = false;
    },
    async showForm({ items }) {
      this.itemSeleccionado = items;
      this.form = this.itemSeleccionado;
      this.dialog = true;
    },
  },
  components: {
    CrudTable,
  },
  mounted () {
    this.headers = [
      { text: this.$t("columnaNombres"), align: 'center', value: 'Nombre' },
      { text: this.$t("columnaPaterno"), align: 'center', value: 'Paterno' },
      { text: this.$t("columnaMaterno"), align: 'center', value: 'Materno' },
      { text: this.$t("columnaInterno"), align: 'center', value: 'Interno', sortable: true },
      { text: this.$t("columnaCorporativo"), align: 'center', value: 'WB', sortable: true },
      { text: this.$t("columnaCiudad"), align: 'center', value: 'Ciudad' },
      { text: this.$t("columnaRol"), align: 'center', value: 'rol' },
      {
        text: this.$t("columnaAcciones"),
        divider: false,
        sortable: false,
        align: 'center',
        value: 'ACTIONS',
      },
    ];
    this.ready = true;
    this.$nextTick(async() => {
      this.aRoles = await this.$service.get('roles');
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables.scss";
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
