
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
      <template slot="buttons" v-if="[1, 3].includes($storage.getUser().id_rol)">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              text
              class="ml-3"
              v-on="on"
              @click.native.stop="form = {}; dialogAdd = true;"
              slot="activator"
            ><v-icon dark class="mr-2">add</v-icon>{{$t("botonAgregarLlamada")}} </v-btn>
          </template>
          <span> {{$t("botonAgregarLlamada")}} </span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr :class="items.items.Estado === 'X' ? 'fila-roja' : ''">
          <td>
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn :disabled="items.items.Estado === 'X'" icon v-on="on" @click="showForm(items)">
                  <v-icon color="success">phone</v-icon>
                </v-btn>
              </template>
              <span>{{$t("botonAtenderLlamada")}}</span>
            </v-tooltip>
            <v-tooltip bottom color="secondary" v-if="[1, 3].includes($storage.getUser().id_rol)">
              <template v-slot:activator="{ on }">
                <v-btn :disabled="items.items.Estado === 'X'" icon v-on="on" @click="asignCall(items)">
                  <v-icon color="secondary">person_search</v-icon>
                </v-btn>
              </template>
              <span>{{$t("botonAsignarLlamada")}}</span>
            </v-tooltip>
          </td>
          <td>{{ items.items.Celular }}</td>
          <td>{{ items.items.FechaLlamada }}</td>
          <td>{{ items.items.Tipo }}</td>
          <td>
            {{ items.items.Estado === 'P' ? 'Pendiente' : 'Bloqueado' }}
          </td>
        </tr>
      </template>
    </crud-table>
    <!-- Dialogo -->
    <v-dialog v-model="dialog" persistent width="620">
        <v-card>
          <v-card-title>
            <span class="headline">Número: {{ item.Celular }}, Tipo de contacto: {{ item.Tipo }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="sendData">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12">
                    <v-checkbox
                      v-model="form.noContesta"
                      color="primary"
                      label="¿No Contesto la llamada?"
                      outlined
                      hide-details
                      @change="marcarNoContesto"
                      dense
                      class="mb-2"
                      required></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="(item.NumeroIntentos || 1) + 1 === 3 && form.noContesta">
                    <v-textarea
                      v-model="form.ComentarioNoRespondio"
                      color="primary"
                      label="Comentarios"
                      placeholder="Ingrese las posibles razones por las que no puedo realizar la llamada"
                      outlined
                      hide-details
                      dense
                      class="mb-2"
                      :rules="[val => !!val || 'Este campo no puede estar vacio']"
                      required>
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.nombres"
                      color="primary"
                      label="Nombres"
                      outlined
                      hide-details
                      dense
                      :disabled="form.noContesta"
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.apellidos"
                      color="primary"
                      label="Apellidos"
                      outlined
                      hide-details
                      dense
                      :disabled="form.noContesta"
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.ciudad"
                      color="primary"
                      label="Ciudad"
                      outlined
                      hide-details
                      dense
                      :disabled="form.noContesta"
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.iglesiaCongregacion"
                      color="primary"
                      label="Iglesia o congregacion a la que asiste"
                      outlined
                      hide-details
                      dense
                      :disabled="form.noContesta"
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <span>Categoria de la llamada:</span>
                    <v-radio-group
                      v-model="form.categoriaLlamada"
                      color="primary"
                      :disabled="form.noContesta"
                      :rules="form.noContesta ? [] : [val => !!val || 'No puede estar vacio']"
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
                      :disabled="form.noContesta"
                      class="mb-2"
                      :rules="form.noContesta ? [] : [val => !!val || 'No puede estar vacio']"
                      dense
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      label="Notas de seguimiento *"
                      v-model="form.notasSeguimiento"
                      :rules="form.noContesta ? [] : [val => !!val || 'No puede estar vacio']"
                      hide-details
                      dense
                      :disabled="form.noContesta"
                      outlined
                      class="mb-2"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      v-model="form.recibirDios"
                      color="primary"
                      label="¿Acepta al Señor?"
                      hide-details
                      :disabled="form.noContesta"
                      dense
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="form.recibirDios">
                    <v-radio-group
                      v-model="form.recibirDiosOpcion"
                      color="primary"
                      :disabled="form.noContesta"
                      :rules="form.noContesta ? [] : [val => !!val || 'No puede estar vacio']"
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
                      :disabled="form.noContesta"
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
                          :disabled="form.noContesta"
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
                          :rules="form.noContesta ? [] : [val => !!val || 'No puede estar vacio']"
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
                      :disabled="form.noContesta"
                      class="ml-2 mb-2"
                      :rules="form.noContesta ? [] : [val => !!val || 'No puede estar vacio']"
                      hide-details
                      dense
                      v-model="form.horaSeguimiento"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="form.contactame">
                    <h4>Seguimiento: </h4>
                    <v-radio-group
                      v-model="form.seguimiento"
                      :disabled="form.noContesta"
                      :rules="form.noContesta ? [] : [val => !!val || 'No puede estar vacio']"
                    >
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
    <!-- Dialogo -->
    <v-dialog v-model="dialogAdd" persistent width="450">
        <v-card>
          <v-card-title>
            <span class="headline primary--text">{{$t('tituloAgregarNuevaLLamada')}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="formAdd" @submit.prevent="sendDataAdd">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.celular"
                      color="primary"
                      label="Celular *"
                      outlined
                      hide-details
                      dense
                      :rules="[val => !!val || $t('required')]"
                      class="mb-2"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-radio-group
                      v-model="form.tipo"
                      color="primary"
                      :rules="[val => !!val || $t('required')]"
                    >
                      <v-radio
                        label="Llamada"
                        value="LLAMADA"
                        color="primary"
                        hide-details
                        dense
                      ></v-radio>
                      <v-radio
                        label="Whatsapp"
                        value="WHATSAPP"
                        color="primary"
                        hide-details
                        dense
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <small class="red--text">* Todos los campos marcados son requeridos</small>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions class="mb-0 pb-0">
                      <v-spacer></v-spacer>
                      <v-btn text @click="dialogAdd = false">Cancelar</v-btn>
                      <v-btn type="submit" color="primary">Guardar</v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
    </v-dialog>
    <!-- Dialogo Asignar llamada -->
    <v-dialog v-model="dialogAsignCall" persistent width="450">
        <v-card>
          <v-card-title>
            <span class="headline primary--text">Asignar llamada</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="formAsignCall" @submit.prevent="sendDataAsignCall">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12">
                    <v-autocomplete
                      v-model="form.asignar"
                      label="Asignar a:"
                      item-text="Nombre"
                      item-value="id"
                      return-object
                      clearable
                      prepend-icon="account_circle"
                      :rules="[item => !!item || $t('required')]"
                      :items="aUsuariosDisponibles"
                      no-data-text="No existen usuarios"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <small class="red--text">* Todos los campos marcados son requeridos</small>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions class="mb-0 pb-0">
                      <v-spacer></v-spacer>
                      <v-btn text @click="dialogAsignCall = false">Cancelar</v-btn>
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
    interval: null,
    dialog: null,
    mCalendar: null,
    dialogAdd: null,
    dialogAsignCall: null,
    aUsuariosDisponibles: [],
    aMotivos: [],
    minDate: undefined,
    maxDate: undefined,
    url: 'unicall',
    item: {},
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS' },
      { text: 'Celular', align: 'center', value: 'Celular', sortable: false },
      { text: 'Fecha de la llamada', value: 'FechaLlamada', sortable: false },
      { text: 'Tipo', align: 'center', value: 'Tipo', sortable: false },
      { text: 'Estado', align: 'center', value: 'Estado', sortable: false }
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
    this.aUsuariosDisponibles = await this.$service.get('usuarios-disponibles');
    this.aMotivos = await this.$service.get('motivo-llamada');
    this.interval = setInterval(() => {
      this.updateList();
    }, 60000);
  },
  methods: {
    marcarNoContesto () {
      this.form = {
        ...this.form,
        ComentarioNoRespondio: null
      };
    },
    async sendDataAsignCall () {
      if (this.$refs.formAsignCall.validate()) {
        const data = {
          interno: this.form.asignar.Interno,
          idCall: this.item.idCall
        };
        const response = await this.$service.post('asignar-llamada', data);
        if (response.finalizado) {
          this.$message.success(response.mensaje);
          this.dialogAsignCall = null;
          this.form = {};
          this.updateList();
        }
      } else {
        this.$message.error('Faltan campos por llenar');
      }
    },
    asignCall ({ items }) {
      this.dialogAsignCall = true;
      this.item = items;
    },
    async sendData () {
      try {
        if (this.$refs.form.validate()) {
          const rg = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
          if (this.form.horaSeguimiento && !rg.test(this.form.horaSeguimiento)) {
            this.$message.error('Formato incorrecto de la hora de seguimiento, tiene que ser por ejemplo: 15:00');
            return;
          }
          if (this.form.motivoLlamada && this.form.notasSeguimiento) {
            this.form = {
              ...this.form,
              motivoLlamada: this.form.motivoLlamada.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '').replace(/['"]+/g, ''),
              notasSeguimiento: this.form.notasSeguimiento.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '').replace(/['"]+/g, '')
            };
          }
          this.$waiting(true, 'Espere unos segundos por favor...');
          const response = await this.$service.post('llamada-finalizada', {
            ...this.form,
            numeroIntentos: this.item.NumeroIntentos,
            idCall: this.item.idCall,
            interno: this.$storage.getUser().interno,
            celular: this.item.Celular,
            idUser: this.$storage.getUser().id
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
    async sendDataAdd () {
      try {
        if (this.$refs.formAdd.validate()) {
          this.$waiting(true, 'Espere unos segundos por favor...');
          const response = await this.$service.post('nueva-llamada', {
            ...this.form,
            OrigenRegistro: 'SISTEMA'
          });
          if (response.finalizado) {
            this.$message.success('Registro exitosamente actualizado');
          } else {
            this.$message.error(response.mensaje);
          }
          this.$waiting(false);
          this.dialogAdd = false;
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
  .fila-roja {
    background: lighten($color: $primary, $amount: 60) !important;
    &:hover {
      background: lighten($color: $primary, $amount: 60) !important;
    }
  }
</style>
