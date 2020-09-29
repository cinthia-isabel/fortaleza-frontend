
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
              @click.native.stop="createNewCategory"
              slot="activator"
            >
              <v-icon dark class="mr-2">list</v-icon>Agregar Categoria
            </v-btn>
          </template>
          <span>Agregar Categoria</span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr>
          <td>{{ items.items.Descripcion }}</td>
          <td>
            <v-chip
              outlined
              small
              :color="items.items.Estado === 'ACTIVO' ? 'info' : 'error'"
              class="ma-2"
            >
              {{items.items.Estado}}
            </v-chip>
          </td>
          <td>
            <v-tooltip bottom color="secondary">
              <template v-slot:activator="{ on }">
                <v-btn :disabled="items.items.id_motivo === 4" icon v-on="on" @click="showForm(items)">
                  <v-icon color="secondary">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar categoria</span>
            </v-tooltip>
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn :disabled="items.items.id_motivo === 4" icon v-on="on" @click="deleteCategory(items)">
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
          <span class="headline">Agregar categoria</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" @submit.prevent="sendData">
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.Descripcion"
                    color="primary"
                    label="Categoria"
                    outlined
                    hide-details
                    dense
                    class="mb-2"
                    required
                    :rules="[val => !!val || 'La categoria no puede estar vacio']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" v-if="item">
                  <v-switch
                    v-model="form.Estado"
                    color="primary"
                    label="Estado"
                    hide-details
                    dense
                    class="mb-2"
                  ></v-switch>
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
    url: 'categorias-llamada',
    item: {},
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Descripcion', align: 'center', value: 'Descripcion' },
      { text: 'Estado', align: 'center', value: 'Estado' },
      {
        text: 'Acciones',
        divider: false,
        sortable: false,
        align: 'center',
        value: 'ACTIONS',
      },
    ],
    breakpoints: ['md', 'lg', 'xl'],
    menuDatepicker: null,
    form: {},
    filters: [],
  }),
  watch: {
    mCalendar(date) {
      this.form.fechaSeguimiento = this.formatDate(date);
    },
  },
  methods: {
    deleteCategory({ items }) {
      this.$confirm('¿Desea eliminar el categoria?', async() => {
        await this.$service.delete('categoria', { idMotivo: items.id_motivo });
        this.$message.success('Categoria exitosamente eliminado');
        this.updateList();
      });
    },
    createNewCategory() {
      this.item = null;
      this.form = {};
      this.dialog = true;
    },
    async sendData() {
      try {
        if (this.$refs.form.validate()) {
          this.$waiting(true, 'Espere unos segundos por favor...');
          let response;
          if (this.item) {
            response = await this.$service.put('categoria', {
              ...this.form,
              idMotivo: this.item.id_motivo
            });
            this.item = null;
          } else {
            response = await this.$service.post('categoria', {
              ...this.form,
            });
          }
          if (response.finalizado) {
            this.$message.success('Registro exitosamente actualizado');
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
      await this.$service.put('estado-categoria', {
        idUser: this.$storage.getUser().id,
        libre: 1,
        conectado: 1,
      });
      this.dialog = false;
    },
    async showForm({ items }) {
      this.item = items;
      this.form = items;
      this.form = {
        ...this.form,
        Estado: this.form.Estado === 'ACTIVO'
      };
      this.dialog = true;
    },
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
