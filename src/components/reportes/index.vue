
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
      <v-col cols="12" class="text-center">
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              outlined
              color="primary"
              class="mt-2 mb-2"
              @click="viewReports"
            >
              <v-icon color="primary" class="mr-3">
                pie_chart
              </v-icon>
              Generar reportes con filtro de fecha inicio y fin
            </v-btn>
          </template>
          <span>Selecciona la fecha inicio y la fecha fin para ver los reportes</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" xs="12">
         <v-skeleton-loader
            :loading="loading"
            class="ml-2"
            transition="fade-transition"
            type="image"
          >
            <canvas id="hora-dia" width="500" height="200"></canvas>
         </v-skeleton-loader>
      </v-col>
      <v-col cols="6" xs="12">
        <v-skeleton-loader
            :loading="loading"
            class="ml-2"
            transition="fade-transition"
            type="image"
          >
            <canvas id="estados" width="500" height="200"></canvas>
         </v-skeleton-loader>
      </v-col>
      <v-col cols="6" xs="12">
        <v-skeleton-loader
            :loading="loading"
            class="ml-2 mt-2"
            transition="fade-transition"
            type="image"
          >
            <canvas id="tipo-registros" width="500" height="200"></canvas>
         </v-skeleton-loader>
      </v-col>
      <v-col cols="6" xs="12">
        <v-skeleton-loader
            :loading="loading"
            class="ml-2 mt-2"
            transition="fade-transition"
            type="image"
          >
            <canvas id="tipo-llamadas" width="500" height="200"></canvas>
         </v-skeleton-loader>
      </v-col>
      <v-col cols="6" xs="12">
        <v-skeleton-loader
            :loading="loading"
            class="ml-2 mt-2"
            transition="fade-transition"
            type="image"
          >
            <canvas id="tipo-categorias" width="500" height="200"></canvas>
         </v-skeleton-loader>
      </v-col>
      <v-col cols="6" xs="12">
        <v-skeleton-loader
            :loading="loading"
            class="ml-2 mt-2"
            transition="fade-transition"
            type="image"
          >
            <canvas id="reporte-usuarios" width="500" height="200"></canvas>
         </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Chart from 'chart.js';

export default {
  data: () => ({
    menuDatepickerInicio: null,
    menuDatepickerFin: null,
    mCalendarInicio: null,
    mCalendarFin: null,
    fechaInicio: null,
    fechaFin: null,
    fechaInicioMin: null,
    loading: true
  }),
   watch: {
    mCalendarInicio (date) {
      this.fechaInicio = this.formatDate(date);
      this.fechaInicioMin = date;
    },
    mCalendarFin (date) {
      this.fechaFin = this.formatDate(date);
    }
  },
  methods: {
    async viewReports () {
      if (this.fechaInicio && this.fechaFin) {
        this.loading = true;
        await this.reporteHoraDia();
        await this.reporteEstados();
        await this.reporteTipoRegistros();
        await this.reporteTipoLlamadas();
        await this.reporteTipoCategorias();
        await this.reporteUsuarios();
      } else {
        this.$message.error('Por favor seleccione la fecha inicio y la fecha fin');
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
        const date = this.fechaInicio ? this.fechaInicio.split('/') : [];
        if (date.length < 2) {
          this.fechaInicio = null;
        }
      }, 100);
    },
    async reporteHoraDia () {
      try {
        const response = await this.$service.post('hora-dia', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        this.loading = false;
        const labels = response.map(estado => estado.HORA_DIA);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('hora-dia'), {
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
    async reporteEstados () {
      try {
        const response = await this.$service.post('estados', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        this.loading = false;
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
    async reporteTipoRegistros () {
      try {
        const response = await this.$service.post('tipo-registros', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        this.loading = false;
        const labels = response.map(estado => estado.TIPO_REGISTRO);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('tipo-registros'), {
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
    async reporteTipoLlamadas () {
      try {
        const response = await this.$service.post('tipo-llamadas', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        this.loading = false;
        const labels = response.map(estado => estado.TIPO_LLAMADA);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('tipo-llamadas'), {
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
        this.loading = false;
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
    async reporteUsuarios () {
      try {
        const response = await this.$service.post('reporte-usuarios', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        this.loading = false;
        const labels = response.map(estado => estado.Nombre);
        const data = response.map(total => total.TOTALES);
        setTimeout(() => {
          new Chart(document.getElementById('reporte-usuarios'), {
            type: 'pie',
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
    }
  },
  components: {
  },
  mounted () {
    this.$nextTick(async () => {
      this.loading = false;
      await this.reporteHoraDia();
      await this.reporteEstados();
      await this.reporteTipoRegistros();
      await this.reporteTipoLlamadas();
      await this.reporteTipoCategorias();
      await this.reporteUsuarios();
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables.scss";
</style>
