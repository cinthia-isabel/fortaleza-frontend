
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
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr>
          <td>
            <v-tooltip bottom color="success lighten-1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="showForm(items)">
                  <v-icon color="success">timeline</v-icon>
                </v-btn>
              </template>
              <span>Realizar seguimiento</span>
            </v-tooltip>
          </td>
          <td>{{ items.items.Nombres }}</td>
          <td>{{ items.items.Apellidos }}</td>
          <td>{{ items.items.celular }}</td>
          <td>{{ items.items.FechaComp }}</td>
          <td>{{ items.items.HoraComp }}</td>
          <td>{{ items.items.TipoComp }}</td>
          <td>
            <v-icon color="primary">
               {{ items.items.AceptSenor === 'SI' ? 'done' : 'clear'}}
            </v-icon>
          </td>
        </tr>
      </template>
    </crud-table>
    <!-- Dialogo -->
    <v-dialog v-model="dialog" persistent width="620">
        <v-card>
          <v-card-title>
            <span class="headline">Número: {{ itemSeleccionado.celular }}, Tipo de contacto: {{ itemSeleccionado.TipoComp }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="sendData">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12">
                    <v-checkbox
                      v-model="form.contesto"
                      color="primary"
                      label="¿Contesto la llamada?"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      required></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.Nombres"
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
                      v-model="form.Apellidos"
                      color="primary"
                      label="Apellidos"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      v-model="form.motivoOracion"
                      color="primary"
                      label="Motivo de la oración"
                      outlined
                      hide-details
                      class="mb-2"
                      dense
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <span>Motivo de la llamada:</span>
                    <v-radio-group
                      v-model="form.motivoLlamada"
                      color="primary"
                      :rules="[val => !!val || 'No puede estar vacio']"
                    >
                      <v-radio
                        v-for="motivo in aMotivos"
                        :key="motivo.id_motivo"
                        :label="motivo.Descripcion"
                        :value="motivo.id_motivo"
                        color="primary"
                        hide-details
                        dense
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="mb-2">
                    <v-btn large block height="30" dense color="primary" @click="historialSeguimiento = true">
                      <v-icon class="mr-2">timeline</v-icon>
                      Ver historial del seguimiento
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      label="Notas de seguimiento *"
                      v-model="form.notasSeguimiento"
                      :rules="[val => !!val || 'El campo no puede estar vacio']"
                      hide-details
                      dense
                      outlined
                      class="mb-2"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      v-model="form.aceptSenor"
                      color="primary"
                      label="¿Acepta al Señor?"
                      hide-details
                      dense
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="form.aceptSenor">
                    <v-radio-group
                      v-model="form.aceptSenorOpcion"
                      color="primary"
                      :rules="[val => !!val || 'No puede estar vacio']"
                    >
                      <v-radio
                        label="Ya tiene al señor como su salvador"
                        value="SIEMPRE"
                        color="primary"
                        hide-details
                        dense
                      ></v-radio>
                      <v-radio
                        label="Acepto al señor durante la llamada"
                        value="LLAMADA"
                        color="primary"
                        hide-details
                        dense
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      v-model="form.contactame"
                      color="primary"
                      hide-details
                      class="mb-2"
                      dense
                      label="¿Quiere que se le contacte nuevamente?"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="7" md="7" v-if="form.contactame">
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
                          @change="handleSelectDate"
                          @blur="isValidDate"
                          @keypress.enter.prevent="isValidDate"
                          label="Fecha de seguimiento *"
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
                        @click:date="handleSelectDate"
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
                  <v-col cols="12" sm="5" md="5" v-if="form.contactame">
                    <v-text-field
                      label="Hora de seguimiento *"
                      placeholder="15:40"
                      outlined
                      class="ml-2 mb-2"
                      :rules="[val => !!val || 'El campo no puede estar vacio']"
                      hide-details
                      dense
                      v-model="form.horaSeguimiento"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="form.contactame">
                    <h4>Seguimiento: </h4>
                    <v-radio-group v-model="form.tipoSeguimiento" :rules="[val => !!val || 'Este campo no puede estar vacio']">
                      <v-radio
                        color="primary"
                        label="Llamada"
                        value="LLAMADA"
                      ></v-radio>
                      <v-radio
                        color="primary"
                        label="Whatsapp"
                        value="WHATSAPP"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <small class="red--text">* Todos los campos marcados son requeridos</small>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions class="mb-0 pb-0">
                      <v-spacer></v-spacer>
                      <v-btn text @click="cancelCall">Cancelar</v-btn>
                      <v-btn type="submit" color="primary">Guardar</v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
    </v-dialog>
    <!-- Dialogo seguimiento -->
    <v-dialog v-model="historialSeguimiento" persistent width="620">
        <v-card>
          <v-card-title>
            <span class="headline primary--text">Historial de seguimiento</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-expansion-panels accordion>
                <v-expansion-panel
                  v-for="(item,i) in aHistorial"
                  :key="i"
                >
                  <v-expansion-panel-header>{{ item.Fecha_reg }} - {{ item.Nombre }} {{ item.Paterno }} {{ item.Materno }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ item.Seguimiento}}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="historialSeguimiento = false">Cerrar seguimiento</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

dayjs.extend(isBetween);

export default {
  mixins: [actions],
  data: () => ({
    interval: null,
    dialog: null,
    mCalendar: null,
    dialogAdd: null,
    aMotivos: [],
    aHistorial: [],
    minDate: undefined,
    maxDate: undefined,
    historialSeguimiento: null,
    url: 'seguimiento-llamadas',
    itemSeleccionado: {},
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS' },
      { text: 'Nombres', align: 'center', value: 'Nombres', sortable: true },
      { text: 'Apellidos', align: 'center', value: 'Apellidos' },
      { text: 'Celular', align: 'center', value: 'celular' },
      { text: 'Fecha de seguimiento', align: 'center', value: 'FechaComp' },
      { text: 'Hora de seguimiento', align: 'center', value: 'HoraComp' },
      { text: 'Tipo', align: 'center', value: 'Tipo' },
      { text: 'Acepta al señor', align: 'center', value: 'AcepSenor' },
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
  destroyed() {
    clearInterval(this.interval);
  },
  async mounted () {
    this.aMotivos = await this.$service.get('motivo-llamada');
    this.interval = setInterval(() => {
      this.updateList();
    }, 60000);
  },
  methods: {
    async sendData () {
      try {
        if (this.$refs.form.validate()) {
          this.$waiting(true, 'Espere unos segundos por favor...');
          const response = await this.$service.post('seguimiento-finalizado', {
            ...this.form,
            idReg: this.itemSeleccionado.id_reg,
            idSeg: this.itemSeleccionado.id_seg
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
      this.itemSeleccionado = items;
      this.form = items;
      delete this.form.AceptSenor;
      const info = await this.$service.get(`info-seguimiento/${items.id_reg}`);
      this.form.motivoOracion = info.registrosTbSeg[0].MotivoOracion;
      this.form.motivoLlamada = info.registrosTbSeg[0].MotivoLlamada;
      this.form = {
        ...this.form,
        aceptSenor: info.registrosTbRegTel[0].AceptSenor === 'SI',
        aceptSenorOpcion: info.registrosTbRegTel[0].AceptSenorOpcion
      };
      this.aHistorial = info.registrosHistorial;

      await this.$service.put('estado-usuario', { idUser: this.$storage.getUser().id, libre: 0, conectado: 1 });
      this.dialog = true;
    },
    /**
     * @function handleSelectDate
     * @description Evento para obtener el valor seleccionado
     */
    handleSelectDate () {
      this.isValidDate();
    },
    /**
     * @function isValidDate
     * @description Esta funcion es para validar la fecha seleccionada
     */
    isValidDate () {
      setTimeout(() => {
        const date = this.form.fechaSeguimiento ? this.form.fechaSeguimiento.split('/') : [];
        if (date.length > 2) {
          const isValid = dayjs(new Date(date[2], date[1], date[0])).isValid();
          if (!isValid) {
            this.form.fechaSeguimiento = null;
          }
        } else {
          this.form.fechaSeguimiento = null;
        }
      }, 100);
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
