<template>
  <v-app-bar
    app
    :clipped-left="clipped"
    fixed
    :height="auth ? 40 : 80"
    class="fortaleza--navbar"
    :class="['app-navbar', !breakpoints.includes($vuetify.breakpoint.name) && !auth ? 'break-option' : '']"
    flat
  >
    <v-app-bar-nav-icon v-if="auth" class="btn-mini-variant" @click="handleMiniVariant"></v-app-bar-nav-icon>
    <v-toolbar-title class="title-fortaleza" @click="!auth ? $router.push('/') : ''"></v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Seccion botones -->
    <v-card elevation="0" class="enlaces" v-if="!auth">
      <template v-if="breakpoints.includes($vuetify.breakpoint.name)">
        <v-btn
          text
          color="primary"
          outlined
          :class="['ml-1', menuActivo === 'quienes-somos' ? 'activado': '']"
          @click="pushRouter('quienes-somos')"
        >{{ $t('quienesSomos')}}</v-btn>
        <v-btn
          text
          color="primary"
          outlined
          :class="['ml-1', menuActivo === 'contactanos' ? 'activado': '']"
          @click="pushRouter('contactanos')"
        >{{ $t('contactanos')}}</v-btn>
        <v-btn
          text
          color="primary"
          outlined
          :class="['ml-1', menuActivo === 'mensajes-fortaleza' ? 'activado': '']"
          @click="pushRouter('mensajes-fortaleza')"
        >{{ $t('mensajesFortaleza')}}</v-btn>
        <v-btn
          text
          color="primary"
          outlined
          :class="['ml-1', menuActivo === 'voces-fortaleza' ? 'activado': '']"
          @click="pushRouter('voces-fortaleza')"
        >{{ $t('vocesFortaleza')}}</v-btn>
        <v-btn
          text
          color="primary"
          outlined
          :class="['ml-1', menuActivo === 'entregas' ? 'activado': '']"
          @click="pushRouter('entregas')"
        >{{ $t('entregas')}}</v-btn>
        <v-btn
          class="ml-1"
          v-if="!auth"
          text
          color="primary"
          outlined
          :class="['ml-1', menuActivo === 'login' ? 'activado': '']"
          @click="pushRouter('login')"
        >{{ $t('login')}}</v-btn>
      </template>
      <template v-else>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              text
              color="primary"
              outlined
              v-bind="attrs"
              v-on="on"
              :class="['ml-1', menuActivo === 'quienes-somos' ? 'activado': '']"
              @click="pushRouter('quienes-somos')"
            >
              <v-icon dark>account_circle</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('quienesSomos')}}</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              text
              color="primary"
              outlined
              v-bind="attrs"
              v-on="on"
              :class="['ml-1', menuActivo === 'contactanos' ? 'activado': '']"
              @click="pushRouter('contactanos')"
            >
              <v-icon dark>account_balance</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('contactanos')}}</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-1"
              icon
              text
              color="primary"
              outlined
              v-bind="attrs"
              v-on="on"
               :class="['ml-1', menuActivo === 'mensajes-fortaleza' ? 'activado': '']"
              @click="pushRouter('mensajes-fortaleza')"
            >
              <v-icon dark>campaign</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('mensajesFortaleza')}}</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              text
              color="primary"
              outlined
              v-bind="attrs"
              v-on="on"
              :class="['ml-1', menuActivo === 'voces-fortaleza' ? 'activado': '']"
              @click="pushRouter('voces-fortaleza')"
            >
              <v-icon dark>support_agent</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('vocesFortaleza')}}</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              text
              color="primary"
              outlined
              v-bind="attrs"
              v-on="on"
              :class="['ml-1', menuActivo === 'entregas' ? 'activado': '']"
              @click="pushRouter('entregas')"
            >
              <v-icon dark>store</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('entregas')}}</span>
        </v-tooltip>
        <v-tooltip bottom color="primary" v-if="!auth">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-1"
              icon
              text
              color="primary"
              outlined
              v-bind="attrs"
              v-on="on"
              :class="['ml-1', menuActivo === 'login' ? 'activado': '']"
              @click="pushRouter('login')"
            >
              <v-icon dark>security</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('login')}}</span>
        </v-tooltip>
      </template>
    </v-card>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import Auth from "@/components/auth/mixins/auth";

export default {
  mixins: [Auth],
  data: () => ({
    clipped: false,
    breakpoints: ["md", "lg", "xl"],
  }),
  methods: {
    pushRouter (ruta) {
      this.$store.commit('setMenuActivo', ruta);
      this.$router.push(ruta);
    },
    handleMiniVariant() {
      this.$store.commit("layout/toggleMiniVariant");
      this.$store.commit("layout/toggleExpandOnHover");
    },
    goToCiudadania(url) {
      window.open(url, "_black");
    },
    redirect(key) {
      const findService = this.servicios.find(
        (service) => service.label === key
      );
      if (findService) {
        window.open(findService.url, "_blank");
      }
    },
  },
  computed: {
    ...mapState(["auth", "menuActivo"]),
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
$bgNabvar: rgba(
  $color: darken($primary, 35%),
  $alpha: 0.75,
);
.view--init {
  background: rgba($color: $white, $alpha: 0.5) !important;
  border-bottom: 1px solid rgba($color: $white, $alpha: 0.35) !important;
}

.app-navbar {
  width: auto;
  border-bottom: 1px solid rgba($color: $black, $alpha: 0.2) !important;
  .v-app-bar__content {
    padding: 0 15px;
  }

  .btn-mini-variant {
    display: inline-block;
  }
  .btn-drawer {
    display: none;
  }
  .activado {
    background: $primary;
    span {
      color: $white !important;
    }
  }
}

.break-option {
  .v-toolbar__content {
    display: flex;
    flex-direction: column;
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
    cursor: pointer !important;
    color: $primary;
    font-weight: 500;
    line-height: 50px;
    background: url("../../public/img/logo-fortaleza.jpg") no-repeat;
    background-position: center;
    background-size: contain;
    height: 80px;
    width: 150px;
    user-select: none;
  }
  .fortaleza--navbar__details {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .borderWhite {
      border-left: 1px solid rgba($color: $white, $alpha: 0.25);
    }
    .borderBlack {
      border-left: 1px solid rgba($color: $black, $alpha: 0.25);
    }
    button {
      font-family: $fontFamilySansation;
      font-weight: 300;
      cursor: pointer;
      font-size: 0.875rem;
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
