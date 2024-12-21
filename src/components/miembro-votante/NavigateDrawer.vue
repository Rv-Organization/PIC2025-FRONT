<template>
  <v-navigation-drawer
    :width="is_open ? 400 : 300"
    app
    v-model="is_open"
    @input="lastEstado"
    disable-resize-watcher
  >
    <v-container fluid class="container-sidebar ma-0 pa-0 d-flex align-center flex-column mt-0">
      <!-- <img src="@/assets/image/logoPic40.png" alt="Logo_Premios_India_Catalina_39" contain class="logo py-4" /> -->
      <img
        src="@/assets/image/logoPic40.png"
        alt="Logo_Premios_India_Catalina_39"
        contain
        class="logo py-4"
      />
      <v-row>
        <v-container>
          <v-divider color="#E4CC8E" class="mb-10"></v-divider>
          <v-row class="pl-12 py-0 my-0">
            <v-col cols="12" class="pa-0 ml-16 my-1" v-if="estado_registro">
              <h4
                :class="`${$route.path == '/miembro-votante/votar' ? 'primary--text' : ''}`"
                @click="$router.push('/publico-general/votar')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="$route.path == '/miembro-votante/votar' ? 'primary' : 'accent'"
                  @click="$router.push('/publico-general/votar')"
                  class="mr-4"
                  size="30"
                  >mdi-vote-outline </v-icon
                >Inicio
              </h4>
            </v-col>
            <v-col cols="12" class="pa-0 ml-16 my-1" v-if="usuario.roleId != 1 && !estado_registro">
              <h4
                :class="`${$route.path == '/miembro-votante/registro' ? 'primary--text' : ''}`"
                @click="$router.push('/publico-general/votar')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="$route.path == '/miembro-votante/registro' ? 'primary' : 'accent'"
                  @click="$router.push('/publico-general/votar')"
                  class="mr-4"
                  size="30"
                  >mdi-shape-plus </v-icon
                >Inicio
              </h4>
            </v-col>
            <!-- <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${
                  $route.path == '/miembro-votante/instruccionesM' ? 'primary--text' : ''
                }`"
                @click="$router.push('/miembro-votante/instruccionesM')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="$route.path == '/miembro-votante/instruccionesM' ? 'primary' : 'accent'"
                  @click="$router.push('/miembro-votante/instruccionesM')"
                  class="mr-4"
                  size="30"
                  >mdi-human-queue </v-icon
                >Instrucciones
              </h4>
            </v-col> -->
            <!-- <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                @click="$router.push('/miembro-votante/sugerencia')"
                :class="`${$route.path == '/miembro-votante/sugerencia' ? 'primary--text' : ''}`"
                style="cursor: pointer"
              >
                <v-icon
                  @click="$router.push('/miembro-votante/sugerencia')"
                  :color="$route.path == '/miembro-votante/sugerencia' ? 'primary' : 'accent'"
                  class="mr-4"
                  size="30"
                  >mdi-book-edit </v-icon
                >Sugerencias
              </h4>
            </v-col> -->
            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${usuario.estado ? 'primary--text' : ''}`"
                @click="usuario.estado = true"
                style="cursor: pointer"
              >
                <v-icon
                  :color="usuario.estado ? 'primary' : 'accent'"
                  @click="usuario.estado = true"
                  class="mr-4"
                  size="30"
                  >mdi-cog </v-icon
                >Cambiar contraseña
              </h4>
            </v-col>

            <!-- <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${$route.path == '/miembro-votante/registro' ? 'primary--text' : ''}`"
                @click="$router.push('/miembro-votante/registro')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="$route.path == '/miembro-votante/reglamento' ? 'primary' : 'accent'"
                  @click="$router.push('/miembro-votante/reglamento')"
                  class="mr-4"
                  size="30"
                  >mdi-shape-plus </v-icon
                >Reglamento
              </h4>
            </v-col>
            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${$route.path == '/miembro-votante/votar' ? 'primary--text' : ''}`"
                @click="$router.push('/miembro-votante/votar')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="$route.path == '/miembro-votante/votar' ? 'primary' : 'accent'"
                  @click="$router.push('/miembro-votante/votar')"
                  class="mr-4"
                  size="30"
                  >mdi-shape-plus </v-icon
                >Votar
              </h4>
            </v-col>
            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${$route.path == '/miembro-votante/instrucciones' ? 'primary--text' : ''}`"
                @click="$router.push('/miembro-votante/instrucciones')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="$route.path == '/miembro-votante/instrucciones' ? 'primary' : 'accent'"
                  @click="$router.push('/miembro-votante/instrucciones')"
                  class="mr-4"
                  size="30"
                  >mdi-human-queue </v-icon
                >Instrucciones
              </h4>
            </v-col>
            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                @click="$router.push('/miembro-votante/sugerencia')"
                :class="`${$route.path == '/miembro-votante/sugerencia' ? 'primary--text' : ''}`"
                style="cursor: pointer"
              >
                <v-icon
                  @click="$router.push('/miembro-votante/sugerencia')"
                  :color="$route.path == '/miembro-votante/sugerencia' ? 'primary' : 'accent'"
                  class="mr-4"
                  size="30"
                  >mdi-book-edit </v-icon
                >Sugerencias
              </h4>
            </v-col>

            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4 :class="`${$route.path == '/admin/pagos' ? 'primary--text' : ''}`" style="cursor: pointer" @click="usu.estado = true">
                <v-icon @click="$router.push('/admin/pagos')" :color="$route.path == '/admin/pagos' ? 'primary' : 'accent'" class="mr-4" size="30"
                  >mdi-account </v-icon
                >Perfil
              </h4>
            </v-col> -->
          </v-row>
        </v-container>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="py-0 my-0 text-center">
          <v-btn class="my-2 mr-16 botone" @click="cerrarSesion()" color="icon" small dark text>
            <v-icon size="30" class="mr-2" color="botone">mdi-exit-to-app </v-icon>
            Cerrar sesión
          </v-btn>
        </v-col>
        <v-col cols="12" class="py-0 my-0 text-center" v-if="!is_mobil">
          <v-btn icon @click="is_open = false" class="botone" color="accent">
            <v-icon size="30" class="mr-2" color="red"> mdi-close-circle-outline</v-icon>
            minimizar
          </v-btn>
        </v-col>
        <v-footer color="primary">
          <v-container>
            <v-row>
              <v-col cols="2" xs="2" sm="2" md="2" lg="2" xl="2" class="py-0">
                <v-btn
                  v-for="icon in icons"
                  :key="icon.icon"
                  fab
                  dark
                  small
                  color="icon"
                  class="my-2"
                  rounded
                  elevation="0"
                  :href="icon.url"
                  target="_blank"
                >
                  <v-icon size="24px" color="white" action>
                    {{ icon.icon }}
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="9" xs="10" sm="10" md="10" lg="10" xl="10">
                <v-row>
                  <v-col cols="12" class="">
                    <h5 class="black--text pt-1">
                      ¿Necesitas ayuda?
                      <br />
                      direccioncreativa@premiosindiacatalina.com
                    </h5>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" class="my-0">
                    <h5 class="black--text" style="cursor: pointer">
                      <!-- @click="$router.push('/postulantes/reglamento')" -->
                      <a
                        href="https://premiosindiacatalina.com/wp-content/uploads/2023/12/PIC-2024-REGLAMENTO-MIEMBROS-ACREDITADOS-DE-LA-INDUSTRIA-VF.pdf"
                        class="black--text"
                        target="_blank"
                        >Reglamento</a
                      >
                    </h5>
                  </v-col>
                  <v-col cols="6" justify="center">
                    <h5 class="black--text">Powered By</h5>
                    <img
                      class="text-center"
                      src="../../assets/image/logo-rv.svg"
                      alt=""
                      width="50"
                    />
                    <v-col cols="12"> </v-col>
                  </v-col>
                </v-row>

                <v-row class=""> </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </v-row>
    </v-container>
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
    <ResumenPago :pago="pago" v-if="pago.estado" />
    <CONFIGUSU :usu="usuario" v-if="usuario.estado" />
  </v-navigation-drawer>
</template>
<script>
import ResumenPago from "../../components/postulantes/ResumenPago.vue";
import CONFIGUSU from "../../components/usuario/ConfigUsuario.vue";
import { ALERTA } from "../../mixins/alerta";
import FOOTER from "../global/Footer.vue";
import { CURRTET_USER } from "../../global";
import { mapActions, mapMutations } from "vuex";

export default {
  mixins: [ALERTA],
  components: { FOOTER, ResumenPago, CONFIGUSU },
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      usuario: {
        estado: false,
      },
      pago: {
        estado: false,
      },

      is_open: this.drawer,
      is_mobil: null,
      estado_registro: false,
      estado: false,
      nav: null,
      logo: "",
      icons: [
        {
          icon: "mdi-facebook",
          url: "https://www.facebook.com/premiosindiacatalina",
        },
        { icon: "mdi-twitter", url: "https://twitter.com/premiosindia" },
        {
          icon: "mdi-instagram",
          url: "https://www.instagram.com/premiosindiacatalina",
        },
      ],
      ruta: "",
      rutas: [
        "/admin/categorias",
        "/admin/usuarios",
        "/admin/pagos",
        "/admin/excel",
        "/admin/miembros-votates",
      ],
    };
  },
  watch: {
    drawer: function (estado) {
      if (estado == this.estado) this.is_open = !estado;
      else this.is_open = estado;
    },
  },
  computed: {},
  created() {
    this.usuario = Object.assign(this.usuario, CURRTET_USER);

    var $this = this;
    this.mobile(this.$vuetify.breakpoint.name);
    this.$watch("$vuetify.breakpoint.name", (e) => {
      $this.mobile(e);
    });
  },
  async mounted() {
    this.ruta = this.$route.path;
    const id = CURRTET_USER.id;
    const res = await this._getCanal({ id });
    this.obtenerVotantes();
    this.logo = res.data?.data?.logo;
  },
  updated() {
    this.ruta = this.$route.path;
  },
  methods: {
    ...mapMutations({
      _logout: "usuario/_logout",
    }),
    ...mapActions({
      _getCanal: "canales/_getCanal",
      _getMiembroVotante: "miembro_votante/_getMiembroVotante",
    }),
    async obtenerVotantes() {
      const RES = await this._getMiembroVotante();
      RES.data?.data?.isValidate && (this.estado_registro = RES.data.data.isValidate);
    },
    cerrarSesion() {
      this.ALT_("logout", "info", "p");
    },
    cancel() {
      this.ALTD_();
    },
    confirmar() {
      this._logout();
    },
    mobile(data) {
      switch (data) {
        case "md":
        case "xs":
          this.is_open = false;
          this.is_mobil = false;
          break;
        case "cols":
        case "sm":
        case "lg":
        case "xl":
          this.is_open = true;
          this.is_mobil = true;
          break;
      }
    },
    lastEstado(data) {
      this.estado = data;
    },
  },
};
</script>

<style>
.container-sidebar {
  height: 100vh;
  overflow: hidden;
}

.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
}
.logo {
  width: 180px;
}
</style>
