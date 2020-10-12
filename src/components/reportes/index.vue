
<template>
  <v-card elevation="0">
    <v-row no-gutters>
      <v-col cols="6" xs="12">
        <v-menu
          v-model="menuDatepickerInicio"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="250px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fechaInicio"
              @change="handleSelectDate"
              @blur="isValidDate"
              @keypress.enter.prevent="isValidDate"
              label="Fecha Inicio"
              hint="DD/MM/YYYY"
              clearable
              persistent-hint
              outlined
              hide-details
              class="mt-2"
              dense
              prepend-icon="event"
              v-on="on"
              autocomplete="off"
            ></v-text-field>
          </template>
          <v-date-picker
            @click:date="handleSelectDate"
            locale="es-EN"
            color="primary"
            v-model="mCalendarInicio"
            no-title
            @input="menuDatepickerInicio = false"
            :min="undefined"
            :max="undefined"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6" xs="12">
        <v-menu
          v-model="menuDatepickerFin"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="250px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fechaFin"
              @change="handleSelectDate"
              @blur="isValidDate"
              @keypress.enter.prevent="isValidDate"
              label="Fecha Fin"
              hint="DD/MM/YYYY"
              clearable
              persistent-hint
              outlined
              hide-details
              class="mt-2"
              dense
              prepend-icon="event"
              v-on="on"
              autocomplete="off"
            ></v-text-field>
          </template>
          <v-date-picker
            @click:date="handleSelectDate"
            locale="es-EN"
            color="primary"
            v-model="mCalendarFin"
            no-title
            @input="menuDatepickerFin = false"
            :min="fechaInicioMin || undefined"
            :max="undefined"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-tabs
      v-model="tabs"
      background-color="transparent"
    >
      <v-tab
       v-for="(item, index) in items"
       :key="index"
      >
        <v-icon class="mr-1">{{ item.icon }}</v-icon>
        {{ item.titulo }}
      </v-tab>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <canvas id="reporte-dia" width="500" height="200"></canvas>
        </v-tab-item>
        <v-tab-item>
          <canvas id="reporte-mes" width="500" height="200"></canvas>
        </v-tab-item>
        <v-tab-item >
          <canvas id="estados" width="500" height="200"></canvas>
        </v-tab-item>
        <v-tab-item>
          <canvas id="tipo-categorias" width="500" height="200"></canvas>
        </v-tab-item>
        <v-tab-item>
          <crud-table
            :headers="headers"
            :url="url"
            :filters="[]"
            :widthModal="750"
            :order="order"
            :custom="true"
          >
            <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
            <template slot="items" slot-scope="items">
              <tr>
                <td>{{ items.items.Nombre }}</td>
                <td>{{ items.items.TOTALES }}</td>
              </tr>
            </template>
          </crud-table>
        </v-tab-item>
        <v-tab-item>
          <canvas id="horario" width="500" height="200"></canvas>
        </v-tab-item>
        <v-tab-item>
          <canvas id="origen-llamada" width="500" height="200"></canvas>
        </v-tab-item>
        <v-tab-item>
          <canvas id="tipo-contacto" width="500" height="200"></canvas>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>
<script>
import Chart from 'chart.js';
import CrudTable from '@/plugins/crud-table/CrudTable.vue';

export default {
  data: () => ({
    menuDatepickerInicio: null,
    menuDatepickerFin: null,
    mCalendarInicio: null,
    mCalendarFin: null,
    fechaInicio: null,
    fechaFin: null,
    fechaInicioMin: null,
    items: [],
    tabs: null,
    url: 'reporte-usuarios',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Nombres', align: 'center', value: 'NOMBRE' },
      { text: 'Cantidad', align: 'center', value: 'TOTAL' },
    ]
  }),
  watch: {
    async tabs (value) {
      if (value === 0) await this.reporteDia();
      if (value === 1) await this.reporteMes();
      if (value === 2) await this.reporteEstados();
      if (value === 3) await this.reporteTipoCategorias();
      if (value === 5) await this.reporteHorario();
      if (value === 6) await this.reporteOrigenLlamada();
      if (value === 7) await this.reporteTipoContacto();
    },
    mCalendarInicio (date) {
      this.fechaInicio = this.formatDate(date);
      this.fechaInicioMin = date;
    },
    mCalendarFin (date) {
      this.fechaFin = this.formatDate(date);
    }
  },
  methods: {
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
    /**
     * @function handleSelectDate
     * @description Evento para obtener el valor seleccionado
     */
    handleSelectDate () {
      this.isValidDate();
      setTimeout(async() => {
        if (this.tabs === 0) await this.reporteDia();
        if (this.tabs === 1) await this.reporteMes();
        if (this.tabs === 2) await this.reporteEstados();
        if (this.tabs === 3) await this.reporteTipoCategorias();
        if (this.tabs === 5) await this.reporteHorario();
        if (this.tabs === 6) await this.reporteOrigenLlamada();
        if (this.tabs === 7) await this.reporteTipoContacto();
      }, 200);
    },
    /**
     * @function isValidDate
     * @description Esta funcion es para validar la fecha seleccionada
     */
    isValidDate () {
      setTimeout(() => {
        const date = this.fechaInicio ? this.fechaInicio.split('/') : [];
        if (date.length < 2) {
          this.fechaInicio = null;
        }
      }, 100);
    },
    async reporteHorario () {
      try {
        const response = await this.$service.post('horario', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        const labels = response.map(estado => estado.HORA_DIA);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('horario'), {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  label: 'HORA - DIA',
                  borderColor: 'rgba(154, 17, 38, 0.5)',
                  backgroundColor: 'rgba(154, 17, 38, 0.1)',
                  data
                }
              ]
            }
          });
        }, 100);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async reporteMes () {
      try {
        const response = await this.$service.post('reporte-mes', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        const labels = response.map(estado => estado.DIA);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('reporte-mes'), {
            type: 'line',
            data: {
              labels,
              datasets: [
                {
                  label: 'Reporte por mes',
                  borderColor: 'rgba(154, 17, 38, 0.5)',
                  backgroundColor: 'rgba(154, 17, 38, 0.1)',
                  data
                }
              ]
            }
          });
        }, 100);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async reporteDia () {
      try {
        const response = await this.$service.post('reporte-dia', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        const labels = response.map(estado => estado.HORA);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('reporte-dia'), {
            type: 'line',
            data: {
              labels,
              datasets: [
                {
                  label: 'Reporte por dia',
                  borderColor: 'rgba(154, 17, 38, 0.5)',
                  backgroundColor: 'rgba(154, 17, 38, 0.1)',
                  data
                }
              ]
            }
          });
        }, 100);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async reporteEstados () {
      try {
        const response = await this.$service.post('estados', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        const labels = response.map(estado => estado.ESTADOS);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('estados'), {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  label: 'Estados',
                  borderColor: 'rgba(154, 17, 38, 0.5)',
                  backgroundColor: 'rgba(154, 17, 38, 0.1)',
                  data
                }
              ]
            }
          });
        }, 100);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async reporteOrigenLlamada () {
      try {
        const response = await this.$service.post('origen-llamada', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        const labels = response.map(estado => estado.TIPO_REGISTRO);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('origen-llamada'), {
            type: 'pie',
            data: {
              labels,
              datasets: [
                {
                  label: 'Tipo de registros',
                  borderColor: 'rgba(154, 17, 38, 0.5)',
                  backgroundColor: 'rgba(154, 17, 38, 0.1)',
                  data
                }
              ]
            }
          });
        }, 100);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async reporteTipoContacto () {
      try {
        const response = await this.$service.post('tipo-contacto', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        const labels = response.map(estado => estado.TIPO_LLAMADA);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('tipo-contacto'), {
            type: 'pie',
            data: {
              labels,
              datasets: [
                {
                  label: 'Tipo de llamadas',
                  borderColor: 'rgba(154, 17, 38, 0.5)',
                  backgroundColor: 'rgba(154, 17, 38, 0.1)',
                  data
                }
              ]
            }
          });
        }, 100);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async reporteTipoCategorias () {
      try {
        const response = await this.$service.post('tipo-categorias', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        const labels = response.map(estado => estado.CATEGORIA);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('tipo-categorias'), {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  label: 'Tipo de categorias',
                  borderColor: 'rgba(154, 17, 38, 0.5)',
                  backgroundColor: 'rgba(154, 17, 38, 0.1)',
                  data
                }
              ]
            }
          });
        }, 100);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    tabsHeaders () {
      this.items = [
        {
          titulo: 'Por dia',
          icon: 'phone'
        }, {
          titulo: 'Por mes',
          icon: 'phone'
        }, {
          titulo: 'Por estado',
          icon: 'phone'
        }, {
          titulo: 'Por categoria',
          icon: 'phone'
        }, {
          titulo: 'Por operador',
          icon: 'phone'
        }, {
          titulo: 'Por horario',
          icon: 'phone'
        }, {
          titulo: 'Por origen',
          icon: 'phone'
        }, {
          titulo: 'Por tipo contacto',
          icon: 'phone'
        }
      ];
    }
  },
  components: {
    CrudTable
  },
  mounted () {
    this.$nextTick(async () => {
      const anio = new Date().getFullYear();
      let mes = new Date().getMonth();
      let day = new Date().getDate();
      if (mes < 10) mes += 1;
      if (day < 10) day = `0${day}`;
      this.fechaInicio = `${day}/${mes}/${anio}`;
      this.fechaFin = `${day}/${mes}/${anio}`;
      this.tabsHeaders();
      this.tabs = 0;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables.scss";
</style>
