<template>
  <v-navigation-drawer
    :width="is_open ? 400 : 300"
    app
    v-model="is_open"
    @input="lastEstado"
    disable-resize-watcher
  >
    <v-container
      fluid
      class="container-sidebar ma-0 pa-0 d-flex align-center flex-column"
    >
      <v-img width="200" contain src="@/assets/image/logoPic41.png"></v-img>
      <h2 class="black--text mt-0">{{ usuario.name }}</h2>
      <p class="black--text">{{ usuario.email }}</p>
      <v-row>
        <v-container>
          <v-divider color="#E4CC8E" class="mb-10"></v-divider>
          <v-row class="pl-12 py-0 my-0">
            <v-col cols="12" class="pa-0 ml-10">
              <h4
                :class="`${
                  $route.path == '/postulantes/registro-canal'
                    ? 'primary--text'
                    : ''
                }`"
                @click="$router.push('/postulantes/registro-canal')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="inscripcion_productora ? 'success' : 'accent'"
                  @click="$router.push('/postulantes/registro-canal')"
                  class="mr-4"
                  size="30"
                  >mdi-check-circle-outline </v-icon
                >Registro
              </h4>
            </v-col>

            <div>
              <v-divider
                vertical
                class="ml-14"
                :color="registro_programa ? 'success' : 'accent'"
              ></v-divider>
            </div>
            <v-col cols="12" class="pa-0 ml-10">
              <h4
                :class="`${
                  $route.path == '/postulantes/registro-produccion'
                    ? 'primary--text'
                    : ''
                }`"
                @click="$router.push('/postulantes/registro-produccion')"
                style="cursor: pointer"
              >
                <v-icon
                  @click="$router.push('/postulantes/registro-produccion')"
                  :color="registro_programa ? 'success' : 'accent'"
                  class="mr-4"
                  size="30"
                  >mdi-check-circle-outline </v-icon
                >Inscripción de producciones
              </h4>
            </v-col>

            <div>
              <v-divider
                vertical
                class="ml-14"
                :color="resumen_inscripcion ? 'success' : 'accent'"
              ></v-divider>
            </div>
            <v-col cols="12" class="pa-0 ml-10">
              <h4
                :class="`${
                  $route.path == '/postulantes/resumen-produccion'
                    ? 'primary--text'
                    : ''
                }`"
                @click="$router.push('/postulantes/resumen-produccion')"
                style="cursor: pointer"
              >
                <v-icon
                  @click="$router.push('/postulantes/resumen-produccion')"
                  :color="resumen_inscripcion ? 'success' : 'accent'"
                  class="mr-4"
                  size="30"
                  >mdi-check-circle-outline </v-icon
                >Postulación
              </h4>
            </v-col>

            <div>
              <v-divider
                vertical
                class="ml-14"
                :color="pagos ? 'success' : 'accent'"
              ></v-divider>
            </div>
            <!-- click="$router.push('/postulantes/pagos')" -->
            <v-col cols="12" class="pa-0 ml-10">
              <h4
                :class="`${pago.estado ? 'primary--text' : ''}`"
                @click="pago.estado = true"
                style="cursor: pointer"
              >
                <v-icon
                  size="30"
                  class="mr-4"
                  :color="pago_exist ? 'success' : 'accent'"
                >
                  mdi-check-circle-outline</v-icon
                >Pago
              </h4>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <!-- <v-row class="mb-2">
        <v-img width="150" contain class="mx-auto pr-12" src="@/assets/image/logoPic41.png"></v-img>
      </v-row> -->
      <v-row justify="center">
        <v-col cols="12" class="py-0 my-0 text-center">
          <v-btn class="my-2 botone" @click="cerrarSesion()" color="icon" dark>
            <v-icon size="25" class="mr-2" color="botone"
              >mdi-exit-to-app
            </v-icon>
            Cerrar sesión
          </v-btn>
        </v-col>
        <v-col cols="12" class="py-0 my-0 text-center" v-if="!is_mobil">
          <v-btn icon @click="is_open = false" class="botone" color="accent">
            <v-icon size="30" class="mr-2" color="red">
              mdi-close-circle-outline</v-icon
            >
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
                      coordinacion@premiosindiacatalina.com
                    </h5>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" class="my-0">
                    <h5
                      class="black--text"
                      @click="$router.push('/postulantes/reglamento')"
                      style="cursor: pointer"
                    >
                      Reglamento
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
    <CONFIGUSU :usu="usu" v-if="usu.estado" />
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
      usuario: {},
      pago: {
        estado: false,
      },
      usu: {
        estado: false,
      },
      pago_exist: false,
      is_open: this.drawer,
      is_mobil: null,
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
        "/postulantes/registro-canal",
        "/postulantes/resumen-produccion",
        "/postulantes/registro-produccion",
        "/postulantes/pagos",
      ],
      rutas_produccion: [
        "/postulantes/registro-talento",
        "/postulantes/registro-postulacion",
      ],
    };
  },
  watch: {
    drawer: function (estado) {
      if (estado == this.estado) this.is_open = !estado;
      else this.is_open = estado;
    },
  },
  computed: {
    inscripcion_productora() {
      return this.rutas.includes(this.ruta) ? true : false;
    },
    resumen_inscripcion() {
      const ruta_part = this.rutas.slice(1, 2);
      const rutas_produccion = this.rutas_produccion;

      return ruta_part.includes(this.ruta) ||
        rutas_produccion.includes(this.ruta)
        ? true
        : false;
    },
    registro_programa() {
      return this.rutas.slice(1).includes(this.ruta) ? true : false;
    },
    pagos() {
      return this.pago.estado ? true : false;
    },
  },
  created() {
    this.usuario = CURRTET_USER;
    var $this = this;
    this.mobile(this.$vuetify.breakpoint.name);
    this.$watch("$vuetify.breakpoint.name", (e) => {
      $this.mobile(e);
    });
  },
  mounted() {
    this.ruta = this.$route.path;
    this.obtenerCanal();
    this.consultarPago();
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
      _getPagoExist: "postulacion/_getPagoExist",
    }),
    cerrarSesion() {
      this.ALT_("logout", "info", "p");
    },
    cancel() {
      this.ALTD_();
    },
    confirmar() {
      this._logout();
    },

    async obtenerCanal() {
      const id = CURRTET_USER.id;
      const res = await this._getCanal({ id });
      this.logo = res.data?.data?.logo;
    },
    async consultarPago() {
      const RES = await this._getPagoExist();
      this.pago_exist = RES.data.data;
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
</style>
