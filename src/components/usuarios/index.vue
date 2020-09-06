
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
      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              text
              style="text-transform: none"
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
        <tr v-for="({ persona, roles }) in items" :key="persona.id">
          <td class="text-center">
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.stop="editUser(Object.assign({}, items))">
                  <v-icon color="success">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar registro</span>
            </v-tooltip>
            <v-tooltip bottom color="error" v-if="items.items.id !== 1">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.prevent="itemDelete(Object.assign({}, items))">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar registro</span>
            </v-tooltip>
          </td>
          <td>{{ `${persona.numeroDocumento}${!!persona.complemento ? `-${persona.complemento}` : ''}` }} </td>
          <td>{{ roles.length ? roles[0].nombre : '' }}</td>
          <td>{{ items.items.nivel }}</td>
          <td>{{ persona.nombres }}</td>
          <td>{{ persona.primerApellido }}</td>
          <td>{{ persona.segundoApellido }}</td>
          <td>{{ $datetime.format(persona.fechaNacimiento, 'dd/MM/YYYY') }}</td>
          <td>{{ persona.correoElectronico }}</td>
          <td>{{ $datetime.format(persona.fechaCreacion, 'dd/MM/YYYY') }}</td>
        </tr>
      </template>
    </crud-table>
    <!-- DIALOG CREAR UN NUEVO USUARIO -->
    <v-dialog
      persistent
      v-model="dialog"
      width="800"
    >
      <v-form
        ref="formularioUsuario"
        @submit.prevent="saveUser"
        lazy-validation
      >
      <v-card class="pa-0 ma-0">
        <v-card-title class="headline--modal white--text ma-0">
          <v-icon class="mr-2" color="white">{{ editMode ? 'person' : 'person_add' }}</v-icon>
          {{ editMode ? 'Editar usuario' : 'Crear un nuevo usuario' }}
        </v-card-title>
        <v-card-text class="pt-0 pl-2 pr-2 pb-2 card--text_asignaciones">
          <v-card elevation="0">
              <v-row no-gutters>
                <v-col cols="12" class="pa-0 ma-0 mb-3">
                  <v-alert type="info" color="secondary" text class="pa-3 ma-0 fs9">Datos personales</v-alert>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4">
                  <v-autocomplete
                    label="Tipo de documento"
                    no-data-text="No existen items"
                    v-model="form.parIdTipoDocumento"
                    class="ml-3 mr-3"
                    :items="aTipoDocumento"
                    :rules="[val => !!val || 'El campo Tipo de documento no puede estar vacío']"
                    item-text="nombre"
                    item-value="id"
                    outlined
                    dense
                    :disabled="editMode"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4">
                  <v-text-field
                    label="Número de documento"
                    :rules="[val => !!val || 'El campo Número de documento no puede estar vacío']"
                    v-model="form.numeroDocumento"
                    class="ml-3 mr-3"
                    outlined
                    dense
                    :disabled="editMode"
                  >
                    <template v-slot:prepend>
                      <v-tooltip
                        bottom
                        color="primary"
                        max-width="200"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" v-on="on">info</v-icon>
                        </template>
                        En esta seccion tiene que colocar el número de carnet
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4">
                  <v-text-field
                    label="Complemento"
                    v-model="form.complemento"
                    class="ml-3 mr-3"
                    @keyup="convertToUppercase('complemento')"
                    outlined
                    dense
                    :disabled="editMode"
                  >
                    <template v-slot:prepend>
                      <v-tooltip
                        bottom
                        color="primary"
                        max-width="200"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" v-on="on">info</v-icon>
                        </template>
                        En esta seccion solo se tiene que llenar si existe problemas de duplicidad
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4">
                  <v-menu
                    v-model="datepickerMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="250px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="form.fechaNacimiento"
                        label="Fecha de nacimiento - DD/MM/YYYY"
                        :rules="[val => (!!val && /^(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})$/.test(val)) || 'El campo Fecha de nacimiento no puede estar vacío']"
                        @keypress="validDate(form.fechaNacimiento)"
                        persistent-hint
                        clearable
                        class="ml-3 mr-3"
                        prepend-icon="event"
                        v-on="on"
                        outlined
                        dense
                        :disabled="editMode"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="es-EN"
                      color="primary"
                      v-model="datepicker"
                      no-title
                      :max="fechaNacimientoMaxDate"
                      @input="datepickerMenu = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4">
                  <v-text-field
                    label="Nombres"
                    :rules="[val => !!val || 'El campo Nombres no puede estar vacío']"
                    v-model="form.nombres"
                    class="ml-3 mr-3"
                    @keyup="convertToUppercase('nombres')"
                    outlined
                    dense
                    :disabled="editMode"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4">
                  <v-text-field
                    label="Primer Apellido"
                    v-model="form.primerApellido"
                    class="ml-3 mr-3"
                    @keyup="convertToUppercase('primerApellido')"
                    outlined
                    dense
                    :disabled="editMode"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4">
                  <v-text-field
                    label="Segundo Apellido"
                    v-model="form.segundoApellido"
                    class="ml-3 mr-3"
                    outlined
                    @keyup="convertToUppercase('segundoApellido')"
                    dense
                    :disabled="editMode"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4" class="pb-0">
                  <v-text-field
                    label="Teléfono"
                    v-model="form.telefono"
                    outlined
                    class="ml-3 mr-3"
                    dense
                    type="tel"
                    maxlength="10"
                    @keyup="validateNumber('telefono')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4" class="pb-0">
                  <v-text-field
                    label="Celular"
                    v-model="form.celular"
                    class="ml-3 mr-3"
                    outlined
                    dense
                    type="tel"
                    maxlength="8"
                    @keyup="validateNumber('celular')"
                    @blur="validateCel('celular')"
                    :rules="rules.formatoCelular"
                    :hint="rules.formatoCelular.length ? rules.formatoCelular[0] : ''"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4" class="py-0">
                  <v-text-field
                    label="Correo Electrónico"
                    v-model="form.correoElectronico"
                    :rules="rulesCorreo"
                    class="ml-3 mr-3"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" xs="12" lg="4" class="pt-0">
                  <v-text-field
                    label="Dirección resumida"
                    v-model="form.direccionResumida"
                    class="ml-3 mr-3"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pa-0 ma-0">
                  <v-alert type="info" color="secondary" text class="pa-3 ma-0 fs9">Rol del usuario</v-alert>
                </v-col>
                <v-col cols="12" sm="12" md="8" xs="12" lg="8">
                  <v-radio-group v-model="form.idRol" :row="breakpoints.includes($vuetify.breakpoint.name)" :rules="[val => !!val || 'El campo Rol no puede estar vacío']">
                    <v-radio
                      v-for="item in aRoles"
                      :key="item.id"
                      class="ml-3 mr-3"
                      :label="item.nombre"
                      :value="item.id"
                      color="primary"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" class="pa-0 ma-0 mt-2">
                  <v-alert type="info" color="secondary" text class="pa-3 ma-0 fs9">Nivel del usuario</v-alert>
                </v-col>
                <v-col cols="12" sm="12" md="12" xs="12" lg="12">
                  <v-radio-group v-model="form.idNiveles" :row="breakpoints.includes($vuetify.breakpoint.name)" :rules="[val => !!val || 'El campo Nivel no puede estar vacío']">
                    <v-radio
                      v-for="item in aNiveles"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                      class="ml-3 mr-3"
                      :disabled="seccionDisabled.includes(item.value)"
                      color="primary"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters>
                    <v-col cols="12" sm="12" md="6" xs="12" lg="6" v-if="visibleForms.sedes">
                      <v-autocomplete
                        label="Sedes"
                        :items="items.aSedes"
                        v-model="form.idSedes"
                        class="ml-3 mr-3"
                        item-text="nombre"
                        item-value="id"
                        @change="selectItem('departamento')"
                        no-data-text="No se encontraron registros"
                        :rules="[val => !!val || 'El campo Sedes no puede estar vacío']"
                        outlined
                        dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" xs="12" lg="6" v-if="visibleForms.red">
                      <v-autocomplete
                        label="Red"
                        :items="items.aRedes"
                        v-model="form.idRedes"
                        item-text="nombre"
                        class="ml-3 mr-3"
                        item-value="id"
                        @change="selectItem('red')"
                        no-data-text="No se encontraron registros"
                        :rules="[val => !!val || 'El campo Red no puede estar vacío']"
                        outlined
                        dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" xs="12" lg="6" v-if="visibleForms.municipal">
                      <v-autocomplete
                        label="Municipal"
                        :items="items.aMunicipio"
                        v-model="form.idMunicipio"
                        @change="selectItem('municipio')"
                        class="ml-3 mr-3"
                        item-text="nombre"
                        item-value="id"
                        no-data-text="No se encontraron registros"
                        :rules="[val => !!val || 'El campo Municipio no puede estar vacío']"
                        outlined
                        dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" xs="12" lg="6" v-if="visibleForms.establecimiento">
                      <v-autocomplete
                        label="Establecimiento"
                        :items="items.aEstablecimiento"
                        v-model="form.idEstablecimiento"
                        item-text="nombre"
                        item-value="id"
                        class="ml-3 mr-3"
                        no-data-text="No se encontraron registros"
                        :rules="[val => !!val || 'El campo Establecimiento no puede estar vacío']"
                        outlined
                        dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" xs="12" lg="6" v-if="visibleForms.laboratorio">
                      <v-autocomplete
                        label="Laboratorios"
                        :items="items.aLaboratorios"
                        v-model="form.idCentroLaboratorio"
                        :rules="[val => !!val || 'El campo Laboratorio no puede estar vacío']"
                        class="ml-3 mr-3"
                        item-text="nombre"
                        item-value="id"
                        no-data-text="No se encontraron registros"
                        outlined
                        dense
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
          </v-card>

        </v-card-text>

        <v-divider></v-divider>
          <v-row no-gutters class="pb-3 pt-1 pl-3 pr-3">
            <v-col
              cols="12"
              class="mt-2 text-right"
            >
              <v-btn
                color="default"
                :block="!breakpoints.includes($vuetify.breakpoint.name)"
                @click="closeDialog(false)"
              >
                <v-icon>clear</v-icon>
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :class="!breakpoints.includes($vuetify.breakpoint.name) ? 'mt-2' : ''"
                :block="!breakpoints.includes($vuetify.breakpoint.name)"
              >
                <v-icon>done</v-icon>
                guardar usuario
              </v-btn>
            </v-col>
          </v-row>
      </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    dialog: false,
    datepicker: null,
    datepickerMenu: null,
    url: 'usuario',
    order: ['createdAt', 'DESC'],
    idUser: null,
    idRow: null,
    aTipoDocumento: [],
    aLaboratorios: [],
    listaDepartamento: [],
    menuFechaNacimiento: false,
    aNiveles: [],
    visibleForms: {
      sedes: false,
      municipal: false,
      red: false,
      establecimiento: false,
      laboratorio: false
    },
    seccionDisabled: [],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS' },
      { text: 'CI', align: 'center', value: 'numeroDocumento', sortable: true },
      { text: 'Rol', value: 'rol', sortable: true },
      { text: 'Nivel', value: 'nivel' },
      { text: 'Nombres', value: 'nombres', sortable: true },
      { text: 'Primer apellido', value: 'primerApellido', sortable: true },
      { text: 'Segundo apellido', value: 'segundoApellido', sortable: true },
      { text: 'Fecha de Nacimiento', value: 'fechaNacimiento', sortable: true },
      { text: 'Correo Electrónico', value: 'correoElectronico' },
      { text: 'Fecha de creación', value: 'fechaCreacion', sortable: true },
    ],
    form: {},
    items: {},
    breakpoints: ['md', 'lg', 'xl'],
    filters: [
      {
        field: 'nombres',
        label: 'Nombres',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'primerApellido',
        label: 'Primer Apellido',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'segundoApellido',
        label: 'Segundo Apellido',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'celular',
        label: 'Celular',
        type: 'text',
        typeG: 'String'
      }
    ],
    aRoles: [],
    itemSelected: null,
    editMode: false,
    fechActutal: new Date(),
    fechaNacimientoMaxDate: undefined,
    rules: {
      formatoCelular: [],
    },
    user: null,
    tiposDocumento: []
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
