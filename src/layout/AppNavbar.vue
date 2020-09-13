<template>
  <v-app-bar
    app
    :clipped-left="clipped"
    fixed
    :height="auth ? 40 : 80"
    class="fortaleza--navbar"
    :class="['app-navbar', 'view--init', $store.state.layout.miniVariant ? 'isMiniVariant' : auth ? 'normalMiniVariant' : '']"
    flat
  >
    <v-app-bar-nav-icon v-if="auth" class="btn-mini-variant" @click="handleMiniVariant"></v-app-bar-nav-icon>
    <v-toolbar-title class="title-fortaleza"></v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Seccion botones -->
    <v-card elevation="0" class="enlaces" v-if="!auth">
      <template v-if="breakpoints.includes($vuetify.breakpoint.name)">
        <v-btn class="ml-1" text color="primary" outlined @click="$router.push('quienes-somos')">
          ¿ Quienes Somos ?
        </v-btn>
        <v-btn class="ml-1" text color="primary" outlined>
          Contáctanos
        </v-btn>
        <v-btn class="ml-1" v-if="!auth" text color="primary" outlined @click.native="$router.push('login')">
          Ingresar
        </v-btn>
      </template>
      <template v-else>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-1" icon text color="primary" outlined v-bind="attrs" v-on="on" @click="$router.push('quienes-somos')">
              <v-icon dark>account_circle</v-icon>
            </v-btn>
          </template>
          <span> ¿ Quienes Somos ? </span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-1" icon text color="primary" outlined v-bind="attrs" v-on="on">
              <v-icon dark>account_balance</v-icon>
            </v-btn>
          </template>
          <span> Contáctanos </span>
        </v-tooltip>
        <v-tooltip bottom color="primary" v-if="!auth">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-1" icon text color="primary" outlined v-bind="attrs" v-on="on" @click.native="$router.push('login')">
              <v-icon dark>security</v-icon>
            </v-btn>
          </template>
          <span> Ingresar al sistema </span>
        </v-tooltip>
      </template>
    </v-card>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import Auth from '@/components/auth/mixins/auth';

export default {
  mixins: [Auth],
  data: () => ({
    clipped: false,
    breakpoints: ['md', 'lg', 'xl']
  }),
  methods: {
    handleMiniVariant () {
      this.$store.commit('layout/toggleMiniVariant');
      this.$store.commit('layout/toggleExpandOnHover');
    },
    goToCiudadania (url) {
      window.open(url, '_black');
    },
    redirect (key) {
      const findService = this.servicios.find(service => service.label === key);
      if (findService) {
        window.open(findService.url, '_blank');
      }
    }
  },
  computed: {
    ...mapState(['auth'])
  }
};
</script>

<style lang="scss">
@import '../scss/variables.scss';
$bgNabvar: rgba($color: darken($primary, 35%), $alpha: .75);
.view--init {
  background: rgba($color: $white, $alpha: .5 ) !important;
  border-bottom: 1px solid rgba($color: $white, $alpha: .35) !important;
}

.app-navbar {
  width: auto;
  border-bottom: 1px solid rgba($color: $black, $alpha: .2) !important;
  .v-app-bar__content {
    padding: 0 15px;
  }

  .btn-mini-variant {
    display: inline-block;
  }
  .btn-drawer {
    display: none;
  }
}

.btn-fullscreen {
  .v-icon:last-child {
    display: none;
  }
}

body.fullscreen {
  .btn-fullscreen {
    .v-icon:first-child {
      display: none;
    }
    .v-icon:last-child {
      display: inline-block;
    }
  }
}

.fortaleza--navbar {
    width: 100%;
    padding: 0;
    margin: 0;
    .enlaces--devices {
      display: block;
    }
    .title-fortaleza {
      color: $primary;
      font-weight: 500;
      line-height: 50px;
      background: url('../../public/img/logo-fortaleza.jpg') no-repeat;
      background-position: center;
      background-size: contain;
      height: 80px;
      width: 200px;
      user-select: none;
    }
    .fortaleza--navbar__details {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .borderWhite {
        border-left: 1px solid rgba($color: $white, $alpha: .25)
      }
      .borderBlack {
        border-left: 1px solid rgba($color: $black, $alpha: .25)
      }
      button {
        font-family: $fontFamilySansation;
        font-weight: 300;
        cursor: pointer;
        font-size: .875rem;
        &:nth-child(6) {
          height: 50px;
          margin-right: auto;
        }
      }

    }
  }
  .isMiniVariant {
    width: calc(100vw);
  }
  .normalMiniVariant {
    width: calc(100vw);
  }
</style>
