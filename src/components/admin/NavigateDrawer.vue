<template>
  <v-navigation-drawer
    app
    v-model="is_open"
    :transition="true"
    @input="lastEstado"
    disable-resize-watcher
    :mini-variant-width="80"
    :width="is_open ? 400 : 300"
  >
    <v-container
      fluid
      class="container-sidebar d-flex align-center flex-column"
    >
      <v-row class="mt-4 mb-2">
        <v-img
          width="150"
          contain
          class="mx-auto pr-12"
          src="@/assets/image/logoPic41.png"
        ></v-img>
      </v-row>
      <v-row>
        <v-container>
          <v-divider color="#E4CC8E" class="mb-10"></v-divider>
          <v-row class="py-0 px-0 mx-0 my-0">
            <v-list class="mx-auto">
              <v-list-group
                :prepend-icon="item.icon"
                v-for="item in opciones"
                v-model="item.active"
                :key="item.title"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-if="!child.show.includes(usuario.email)"
                  v-for="child in item.items"
                  :key="child.title"
                  :to="child.to"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <h5>
                        <v-icon class="mr-2">{{ child.icon }}</v-icon
                        >{{ child.title }}
                      </h5>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-item to="/admin/excel" color="primary">
                <v-list-item-icon>
                  <v-icon>mdi-microsoft-excel</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Exportar excel</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-row>
        </v-container>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" class="py-0 my-0 text-center">
          <v-btn
            class="my-2 mr-16 botone"
            @click="cerrarSesion()"
            color="icon"
            small
            dark
            text
          >
            <v-icon size="30" class="mr-2" color="botone"
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
                  <v-col cols="6" class="">
                    <h5 class="black--text pt-1">
                      ¿Necesitas ayuda?
                      <a
                        style="font-size: 15px"
                        class="icon--text"
                        href="mailto:coordinacion@premiosindiacatalina.com?Subject=Necesito%20ayuda"
                        >Contactenos</a
                      >
                    </h5>
                  </v-col>
                  <v-col cols="6">
                    <h5 class="black--text pt-1">
                      Todos lo derechos reservados
                    </h5>
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
                        <img
                          src="../../assets/image/logo-rv.svg"
                          alt=""
                          width="30"
                        />
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
      opciones: [
        {
          icon: "mdi-multimedia",
          items: [
            {
              title: "Categorias",
              to: "/admin/categorias",
              icon: "mdi-shape-plus",
              show: [],
            },
            {
              title: "Usuarios",
              to: "/admin/usuarios",
              icon: "mdi-account-multiple",
              show: [],
            },
            {
              title: "Pagos",
              to: "/admin/pagos",
              icon: "mdi-account-credit-card",
              show: ["jhonbra@gmail.com"],
            },
          ],
          title: "Postulantes",
        },
        {
          icon: "mdi-account-multiple-check",
          items: [
            {
              title: "Miembros Acreditados",
              icon: "mdi-account-credit-card",
              show: ["jhonbra@gmail.com"],
              to: "/admin/miembros-votates",
            },
            {
              title: "Gestionar miembros actuales",
              icon: "mdi-account-plus-outline",
              show: ["jhonbra@gmail.com"],
              to: "/admin/miembros-votates-getion",
            },
            {
              title: "Categorias por usuario",
              icon: "mdi-shape",
              show: [],
              to: "/admin/miembros-categoria",
            },
          ],
          title: "Miembros Acreditados",
        },
      ],
      menu_postulantes: false,
      menu_miembros_votantes: false,
      menu_comite_tecnico: false,
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
  mounted() {
    this.ruta = this.$route.path;
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
    async obtenerCanal() {
      const id = CURRTET_USER.id;
      const res = await this._getCanal({ id });
      this.logo = res.data?.data?.logo;
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

h4 {
  color: black;
}

.v-list-item--active {
  background-color: #f4ecd7;
}
</style>
