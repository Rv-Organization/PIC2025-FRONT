<template>
  <v-app>
    <v-container fluid class="bg-color">
      <v-card class="pt-1" elevation="0">
        <h2 class="text-center bg-color py-12">Panel administrativo</h2>
        <div class="line"></div>
      </v-card>
      <v-row class="container-channel my-10">
        <v-col cols="12" class="mt-0 pt-0">
          <v-container>
            <v-row justify="start">
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0 text-start pt-6">
                <h2 class="">Categorías</h2>
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0 pt-6">
                <v-text-field
                  prepend-icon="mdi-magnify"
                  label="Buscar categorias"
                  v-model="buscar"
                  outlined
                  rounded
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" v-for="(item, index) in array_categorias" :key="index">
                <v-card elevation="1">
                  <v-container class="fill-height border-new">
                    <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="7">
                      <h4>{{ item.nameCategory }}</h4>
                    </v-col>
                    <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3">
                      <a style="font-size: 15px" class="icon--text" @click="consultarPostulaciones(item)"
                        >Ver postulación</a
                      >
                    </v-col>
                    <v-col cols="6" xs="6" sm="6" md="2" lg="2" xl="2">
                      <v-btn fab dark small color="boton" rounded class="ml-16 botone" elevation="0">
                        <h3 class="black--text">
                          {{ item.total }}
                        </h3>
                      </v-btn>
                    </v-col>
                  </v-container>
                </v-card>
              </v-col>
              <h1>{{ validar_buscar ? "No se encontraron coincidencias" : "" }}</h1>
            </v-row>
          </v-container>
        </v-col>
        <ALT
          @exitEsc="cancel()"
          @cancel="cancel()"
          @cancelAlert="cancelAlert()"
          @confirm="confirm()"
          :alert="alert"
          v-if="alert.estado"
        />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import POSTULACIONXCATEGORIA from "../admin/PostulacionPorCategorias.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: { POSTULACIONXCATEGORIA },
  data() {
    return {
      format_certificado: "",
      format_carta: "",
      format_logo: "",
      frames: {},
      id_categoria: "",
      validacion: true,
      estado: false,
      array_categorias: [],
      array_categoria_base: [],
      validar_buscar: false,
      buscar: "",
    };
  },
  watch: {
    buscar() {
      this.array_categorias = this.array_categoria_base;
      let filtro = this.array_categorias.filter((categoria) =>
        categoria.nameCategory.toUpperCase().includes(this.buscar.toUpperCase())
      );
      this.array_categorias = filtro;
      this.validar_buscar = this.array_categorias.length == 0 ? true : false;
    },
  },
  mounted() {
    this.getAllCategories();
  },

  methods: {
    ...mapActions({
      _getCatergoriasAdmin: "categorias/_getCatergoriasAdmin",
    }),
    consultarPostulaciones(item) {
      if (!item.total) {
        this.ALT_("CTG-0", "info");
      } else {
        this.$router.push({
          path: "/admin/categorias/postulaciones",
          query: { id: item.id, titulo: item.nameCategory, panel: "CATEGORIA" },
        });
      }
    },
    cancel() {
      this.ALTD_();
    },

    async getAllCategories() {
      const categories = await this._getCatergoriasAdmin();
      this.array_categorias = categories.data.data;
      this.array_categoria_base = categories.data.data;
    },
  },
};
</script>

<style scoped>
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

.bg-color {
  background-color: #f9f9f9;
}
.line {
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid #d9d9d9;
  width: 75%;
  margin: auto;
}

.v-input {
  border-radius: 100px;
}
.border-new {
  border: 1px solid #d9d9d9;
  border-radius: 10px;
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
