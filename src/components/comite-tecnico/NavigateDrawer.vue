<template>
  <v-navigation-drawer
    :width="is_open ? 400 : 300"
    app
    v-model="is_open"
    @input="lastEstado"
    disable-resize-watcher
  >
    <v-container fluid class="container-sidebar ma-0 pa-0 d-flex align-center flex-column mt-0">
      <img
        src="@/assets/image/logoPic40.png"
        alt="Logo_Premios_India_Catalina_39"
        class="logo py-4"
        contain
      />
      <!-- <h1 class="black--text mt-4">{{ usuario.name }}</h1>
      <p class="black--text">{{ usuario.email }}</p> -->
      <v-row>
        <v-container>
          <v-divider color="#E4CC8E" class="mb-10"></v-divider>
          <v-row class="pl-12 py-0 my-0">
            <v-col @click="$router.push('/comite-tecnico/panel-comite-tecnico')" cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${
                  $route.path == '/comite-tecnico/panel-comite-tecnico' ? 'primary--text' : ''
                }`"
                
                style="cursor: pointer"
              >
                <v-icon
                  :color="
                    $route.path == '/comite-tecnico/panel-comite-tecnico' ? 'primary' : 'accent'
                  "
                  class="mr-4"
                  size="30"
                  >mdi-shape-plus </v-icon
                >Categorias
              </h4>
            </v-col>
            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${$route.path == '/comite-tecnico/instrucciones' ? 'primary--text' : ''}`"
                @click="$router.push('/comite-tecnico/instrucciones')"
                style="cursor: pointer"
              >
                <v-icon
                  :color="$route.path == '/comite-tecnico/instrucciones' ? 'primary' : 'accent'"
                  @click="$router.push('/comite-tecnico/instrucciones')"
                  class="mr-4"
                  size="30"
                  >mdi-human-queue </v-icon
                >Instrucciones
              </h4>
            </v-col>
            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                @click="$router.push('/comite-tecnico/sugerencias')"
                :class="`${$route.path == '/comite-tecnico/sugerencias' ? 'primary--text' : ''}`"
                style="cursor: pointer"
              >
                <v-icon
                  @click="$router.push('/comite-tecnico/sugerencias')"
                  :color="$route.path == '/comite-tecnico/sugerencias' ? 'primary' : 'accent'"
                  class="mr-4"
                  size="30"
                  >mdi-book-edit </v-icon
                >Sugerencias
              </h4>
            </v-col>

            <v-col cols="12" class="pa-0 ml-16 my-1">
              <h4
                :class="`${$route.path == '/admin/pagos' ? 'primary--text' : ''}`"
                style="cursor: pointer"
                @click="usu.estado = true"
              >
                <v-icon
                  @click="$router.push('/admin/pagos')"
                  :color="$route.path == '/admin/pagos' ? 'primary' : 'accent'"
                  class="mr-4"
                  size="30"
                  >mdi-account </v-icon
                >Perfil
              </h4>
            </v-col>
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
                  <v-col cols="6" class="">
                    <h5 class="black--text pt-1">
                      ¿Necesitas ayuda?
                      <a
                        style="font-size: 15px"
                        class="icon--text"
                        href="mailto:coordinacion@premiosindiacatalina.com?Subject=Necesito%20ayuda"
                        >Contáctenos</a
                      >
                    </h5>
                  </v-col>
                  <v-col cols="6">
                    <h5 class="black--text pt-1">Todos lo derechos reservados</h5>
                  </v-col>
                </v-row>
                <v-row class="">
                  <v-col cols="6" class="pt-6">
                    <h5 class="black--text pt-1">Términos y condiciones</h5>
                  </v-col>
                  <v-col cols="6">
                    <v-container>
                      <v-row class="my-0">
                        <h5 class="black--text pt-1">Powered By</h5>
                      </v-row>
                      <v-row class="my-0 ml-0">
                        <img src="../../assets/image/logo-rv.svg" alt="" width="30" />
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
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
      is_open: this.drawer,
      is_mobil: null,
      estado: false,
      nav: null,
      logo: "",
      icons: [
        { icon: "mdi-facebook", url: "https://www.facebook.com/premiosindiacatalina" },
        { icon: "mdi-twitter", url: "https://twitter.com/premiosindia" },
        { icon: "mdi-instagram", url: "https://www.instagram.com/premiosindiacatalina" },
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
    this.usuario = CURRTET_USER;
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
    this.logo = res.data.data.logo;
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
