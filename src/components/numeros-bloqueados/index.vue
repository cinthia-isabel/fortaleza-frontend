
<template>
  <div>
    <crud-table
      :headers="headers"
      :url="url"
      :filters="filters"
      :widthModal="750"
      :order="order"
      :custom="true"
    >
      <!-- Boton agregar categorias -->
      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              text
              class="ml-3"
              v-on="on"
              @click.native.stop="createNewPhone"
              slot="activator"
            >
              <v-icon dark class="mr-2">list</v-icon>Agregar número
            </v-btn>
          </template>
          <span>Agregar número</span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr>
          <td>{{ items.items.Telefono }}</td>
          <td>{{ items.items.Obs }}</td>
          <td>
            <v-tooltip bottom color="secondary">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="showForm(items)">
                  <v-icon color="secondary">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar categoria</span>
            </v-tooltip>
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="deletePhone(items)">
                  <v-icon color="error">delete_forever</v-icon>
                </v-btn>
              </template>
              <span>Eliminar categoria</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </crud-table>
    <!-- Dialogo -->
    <v-dialog v-model="dialog" persistent width="450">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar número</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" @submit.prevent="sendData">
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.Telefono"
                    color="primary"
                    label="Teléfono"
                    outlined
                    hide-details
                    dense
                    class="mb-2"
                    required
                    :rules="[val => !!val || 'El teléfono no puede estar vacio']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="form.Obs"
                    color="primary"
                    label="Observación"
                    outlined
                    hide-details
                    dense
                    class="mb-2"
                    required
                    :rules="[val => !!val || 'La observación no puede estar vacio']"
                  ></v-textarea>
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
    url: 'numeros-bloqueados',
    itemSeleccionado: {},
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Telefono', align: 'center', value: 'Telefono' },
      { text: 'Observación', align: 'center', value: 'Obs' },
      {
        text: 'Acciones',
        divider: false,
        sortable: false,
        align: 'center',
        value: 'ACTIONS'
      },
    ],
    breakpoints: ['md', 'lg', 'xl'],
    menuDatepicker: null,
    form: {},
    filters: [],
  }),
  methods: {
    deletePhone({ items }) {
      this.$confirm('¿Desea eliminar el número telefónico?', async() => {
        await this.$service.delete('numero-bloqueado', { idNumero: items.id });
        this.$message.success('Número exitosamente eliminado');
        this.updateList();
      });
    },
    createNewPhone() {
      this.itemSeleccionado = null;
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
              idNumero: this.itemSeleccionado.id
            };
            delete data.id;
            response = await this.$service.put('numero-bloqueado', data);
            this.itemSeleccionado = null;
          } else {
            response = await this.$service.post('numero-bloqueado', {
              ...this.form
            });
          }
          if (response.finalizado) {
            this.$message.success(response.mensaje || this.$t("successMessage"));
          } else {
            this.$message.error(response.mensaje);
          }
          this.$waiting(false);
          this.form = {};
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
    async showForm({ items }) {
      this.itemSeleccionado = items;
      this.form = items;
      this.dialog = true;
    }
  },
  components: {
    CrudTable,
  },
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
