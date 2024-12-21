<template>
  <v-app>
    <v-card class="pt-1" elevation="0">
      <h2 class="text-center py-12">Panel administrativo</h2>
      <div class="line"></div>
    </v-card>
    <v-row class="container-channel">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <v-row justify="start">
            <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0 text-start pt-6">
              <h2 class="">Usuarios</h2>
              <h4 class="mb-10">Canales inscritos {{ array_canales.length }}</h4>
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0 pt-6">
              <v-text-field label="Buscar categorias" v-model="buscar" outlined rounded prepend-icon="mdi-magnify" dense></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" v-for="(item, index) in array_canales" :key="index">
              <v-card class="my-3 px-6">
                <v-row>
                  <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="6">
                    <h4 class="pl-3">{{ item.channel.nameClient }}</h4>
                  </v-col>
                  <v-col cols="2" xs="6" sm="6" md="2" lg="2" xl="2" class="text-center">
                    <a style="font-size: 15px" class="icon--text" @click="consultarPostulaciones(item)">Ver postulaciones</a>
                  </v-col>
                  <v-col cols="2" xs="6" sm="6" md="2" lg="2" xl="2" class="text-center">
                    <a style="font-size: 15px" class="icon--text" @click="verDocumentos(item)">Ver Documentos</a>
                  </v-col>
                  <v-col cols="2" xs="6" sm="6" md="2" lg="2" xl="2" class="text-center">
                    <v-btn fab dark small color="boton" rounded class="botone">
                      <h3 class="black--text">
                        {{ item.totalPostulation }}
                      </h3>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirm()" :alert="alert" v-if="alert.estado" />
    </v-row>
  </v-app>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],

  data() {
    return {
      format_certificado: "",
      format_carta: "",
      format_logo: "",
      frames: {},
      id_categoria: "",
      validacion: true,
      estado: false,
      array_canales: [],
      array_canales_base: [],
      buscar: "",
      validar_buscar: false,
      form_uploads: {},
    };
  },
  watch: {
    buscar() {
      this.array_canales = this.array_canales_base;

      let filtro = this.array_canales.filter((canal) => canal.channel.nameClient.includes(this.buscar));
      this.array_canales = filtro;
      this.validar_buscar = this.array_canales.length == 0 ? true : false;
    },
  },
  mounted() {
    this.getAllCanales();
  },
  methods: {
    ...mapActions({
      _getCanales: "canales/_getCanales",
    }),
    consultarPostulaciones(item) {
      //   this.$router.push(`/admin/categorias/postulaciones/?id=${item.id}`);
      if (item.totalPostulation == 0) {
        this.ALT_("CTG-0", "info");
      } else {
        this.$router.push({
          path: "/admin/categorias/postulaciones",
          query: {
            id: item.channel.id,
            titulo: item.nameCategory,
            panel: "CANAL",
            postulations: JSON.stringify(item.postulations),
          },
        });
      }
    },

    verDocumentos(item) {
        this.$router.push({
          path: "/admin/categorias/docunmentos",
          query: {
            canal: JSON.stringify(item.channel),
          },
        });
    },

    async getAllCanales() {
      const usuarios = await this._getCanales();
      this.array_canales = usuarios.data.data;
      this.array_canales_base = JSON.parse(JSON.stringify(this.array_canales));
    },
    cancel() {
      this.ALTD_();
    },
  },
};
</script>

<style>
.container-channel {
  width: 75%;
  margin: auto;
  padding-top: 2rem;
}

.upload {
  border-style: dashed;
  border-color: rgba(102, 102, 102, 0.5);
}

.mdi-cloud-upload-outline::before {
  transform: scale(2);
}

/* Movil  */
@media (max-width: 600px) {
  .upload {
    border-style: dashed;
    border-color: rgba(102, 102, 102, 0.5);
  }

  .container-channel {
    width: 100%;
  }
}
</style>
