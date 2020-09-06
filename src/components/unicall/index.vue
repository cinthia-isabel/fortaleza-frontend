
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
            <v-tooltip bottom color="info lighten-1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon color="info">phone</v-icon>
                </v-btn>
              </template>
              <span>Atender llamada</span>
            </v-tooltip>
          </td>
          <td>{{ items.items.Celular }}</td>
          <td>{{ items.items.FechaLlamada }}</td>
          <td>{{ items.items.Tipo }}</td>
        </tr>
      </template>
    </crud-table>
  </div>
</template>
<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    url: 'unicall',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS' },
      { text: 'Celular', align: 'center', value: 'Celular', sortable: true },
      { text: 'Fecha de la llamada', value: 'FechaLlamada', sortable: true },
      { text: 'Tipo', align: 'center', value: 'Tipo' },
    ],
    breakpoints: ['md', 'lg', 'xl'],
    filters: [
      {
        field: 'nombres',
        label: 'Nombres',
        type: 'text',
        typeG: 'String'
      }
    ],
  }),
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
