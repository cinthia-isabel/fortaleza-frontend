
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
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr>
          <td>
            <v-tooltip bottom color="info lighten-1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="showHistory(items)">
                  <v-icon color="info">list_alt</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('verHistorial')}}</span>
            </v-tooltip>
            <v-tooltip bottom color="success lighten-1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="showForm(items)">
                  <v-icon color="success">timeline</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('realizarSeguimiento') }}</span>
            </v-tooltip>
          </td>
          <td>{{ items.items.Nombres }}</td>
          <td>{{ items.items.Apellidos }}</td>
          <td>{{ items.items.Ciudad }}</td>
          <td>{{ items.items.celular }}</td>
          <td>{{ items.items.FechaComp }}</td>
          <td>{{ items.items.HoraComp }}</td>
          <td>{{ items.items.TipoComp }}</td>
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
                    <v-text-field
                      v-model="form.Ciudad"
                      color="primary"
                      label="Ciudad"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.IglesiaCongregacion"
                      color="primary"
                      label="Iglesia o congregacion a la que asiste"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <span>Categoria de la llamada:</span>
                    <v-radio-group
                      v-model="form.categoriaLlamada"
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
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      v-model="form.motivoLlamada"
                      color="primary"
                      label="Motivo de la llamada *"
                      outlined
                      hide-details
                      class="mb-2"
                      :rules="[val => !!val || 'No puede estar vacio']"
                      dense
                    ></v-textarea>
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
                    <small class="red--text">* {{$t("camposRequeridosLabel")}}</small>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions class="mb-0 pb-0">
                      <v-spacer></v-spacer>
                      <v-btn text @click="cancelCall">{{$t("btnCancelarConfirm")}}</v-btn>
                      <v-btn type="submit" color="primary">{{$t("botonGuardar")}}</v-btn>
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
            <span class="headline primary--text">{{this.$t("tituloHistorialSeguimiento")}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-expansion-panels accordion>
                <v-expansion-panel
                  v-for="(item,i) in aHistorial"
                  :key="i"
                  :disabled="$storage.getUser().id_rol !== 3"
                >
                  <v-expansion-panel-header>{{ item.Fecha_reg }} - {{ item.MotivoLlamada }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ item.Seguimiento}}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="historialSeguimiento = false">{{this.$t("botonCerrarSeguimiento")}}</v-btn>
          </v-card-actions>
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
    headers: [],
    breakpoints: ['md', 'lg', 'xl'],
    menuDatepicker: null,
    form: {},
    filters: [],
    ready: false
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
    this.headers = [
      { text: this.$t("columnaAcciones"), divider: false, sortable: false, align: 'center', value: 'ACTIONS' },
      { text: this.$t("columnaNombres"), align: 'center', value: 'Nombres', sortable: true },
      { text: this.$t("columnaApellidos"), align: 'center', value: 'Apellidos' },
      { text: this.$t("columnaCiudad"), align: 'center', value: 'Ciudad' },
      { text: this.$t("columnaCelular"), align: 'center', value: 'celular' },
      { text: this.$t("columnaFechaSeguimiento"), align: 'center', value: 'FechaComp' },
      { text: this.$t("columnaHoraSeguimiento"), align: 'center', value: 'HoraComp' },
      { text: this.$t("columnaTipo"), align: 'center', value: 'Tipo' },
    ];
    this.ready = true;
    this.aMotivos = await this.$service.get('motivo-llamada');
    this.interval = setInterval(() => {
      this.updateList();
    }, 60000);
  },
  methods: {
    async sendData () {
      try {
        if (this.$refs.form.validate()) {
          const rg = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
          if (this.form.horaSeguimiento && !rg.test(this.form.horaSeguimiento)) {
            this.$message.error('Formato incorrecto de la hora de seguimiento, tiene que ser por ejemplo: 15:00');
            return;
          }
          this.form = {
            ...this.form,
            motivoLlamada: this.form.motivoLlamada.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '').replace(/['"]+/g, ''),
            notasSeguimiento: this.form.notasSeguimiento.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '').replace(/['"]+/g, '')
          };
          this.$waiting(true, 'Espere unos segundos por favor...');
          const response = await this.$service.post('seguimiento-finalizado', {
            ...this.form,
            idReg: this.itemSeleccionado.id_reg,
            idSeg: this.itemSeleccionado.id_seg
          });
          if (response.finalizado) {
            this.$message.success(this.$t("successMessage"));
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
      this.form.motivoLlamada = info.registrosTbSeg[0].MotivoLLamada;
      this.form.categoriaLlamada = info.registrosTbSeg[0].CategoriaLlamada;
      this.form = {
        ...this.form,
        aceptSenor: info.registrosTbRegTel[0].AceptSenor === 'SI',
        aceptSenorOpcion: info.registrosTbRegTel[0].AceptSenorOpcion
      };
      this.aHistorial = info.registrosHistorial;

      await this.$service.put('estado-usuario', { idUser: this.$storage.getUser().id, libre: 0, conectado: 1 });
      delete this.form.fechaSeguimiento;
      this.dialog = true;
    },
    async showHistory ({ items }) {
      this.historialSeguimiento = true;
      this.itemSeleccionado = items;
      this.form = items;
      const info = await this.$service.get(`info-seguimiento/${items.id_reg}`);
      this.aHistorial = info.registrosHistorial;
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
        if (date.length < 2) {
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
