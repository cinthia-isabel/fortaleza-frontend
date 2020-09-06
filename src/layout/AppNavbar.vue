<template>
  <v-app-bar
    app
    :clipped-left="clipped"
    fixed
    :height="auth ? 40 : 80"
    class="fortaleza--navbar"
    :class="[auth ? 'app-navbar' : 'view--init', $store.state.layout.miniVariant ? 'isMiniVariant' : auth ? 'normalMiniVariant' : '']"
    flat
  >
    <v-app-bar-nav-icon v-if="auth" class="btn-mini-variant" @click="handleMiniVariant"></v-app-bar-nav-icon>
    <v-toolbar-title class="title-fortaleza">VOCES DE FORTALEZA </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Seccion botones -->
    <v-card elevation="0" class="enlaces">
      <template v-if="!auth">
        <v-btn class="ml-1" text color="success" outlined>
          ¿ Quienes Somos ? 
        </v-btn>
        <v-btn class="ml-1" text color="success" outlined>
          Contáctanos
        </v-btn>
        <v-btn class="ml-1" text color="success" outlined>
          Noticias
        </v-btn>
      </template>
      <template v-if="!auth">
        <v-btn class="ml-1" text color="success" outlined @click.native="$router.push('login')">
          Ingresar
        </v-btn>
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
    clipped: false
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
    .title-fortaleza {
      color: $success;
      font-weight: 500;
      text-transform: uppercase;
      font-family: $fontFamilyTitilliumWeb;
      line-height: 50px;
      font-size: 1.5rem;
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
