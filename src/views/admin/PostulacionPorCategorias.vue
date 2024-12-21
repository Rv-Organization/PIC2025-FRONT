<template>
  <v-app>
    <v-container fluid class="bg-color">
      <v-card elevation="0" class="mt-6 mx-10">
        <h2 class="text-center bg-color py-12">Panel administrativo</h2>
        <div class="line"></div>
      </v-card>
      <v-row class="container-channel my-10">
        <v-col cols="12" class="mt-0 pt-0">
          <v-row justify="start">
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0 text-start">
              <v-row>
                <v-col cols="1" class="my-4 mr-3">
                  <v-btn fab color="boton" class="botone d-flex" x-small elevation="0" sm-d-none @click="retroceder"
                    ><v-icon color="white">mdi-arrow-left</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="10" class="my-4">
                  <h3 v-if="canal">{{ name_catetgory }}</h3>
                  <h3 v-else>Categoría: {{ name_catetgory }}</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0 pt6">
              <v-text-field label="Buscar Producción o Talento" v-model="buscar" outlined rounded prepend-icon="mdi-magnify" dense></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" v-for="(item, index) in array_categorias" :key="index">
              <v-card border-new>
                <v-container class="fill-height">
                  <v-col v-if="item.typePostulation==1" cols="12" xs="12" sm="12" md="7" lg="7" xl="7">
                    <h4 v-if="canal">{{ item.category }} - {{ item.nameProgram }}</h4>
                    <h4 v-else>{{ item.name }} - {{ item.nameProgram }} - {{ item.canal }}</h4>
                  </v-col>
                  <v-col v-else cols="12" xs="12" sm="12" md="7" lg="7" xl="7">
                    <h4 v-if="canal">{{ item.category }} - {{ item.nameProgram }}</h4>
                    <h4 v-else>{{ item.nameProgram }} - {{ item.canal }}</h4>
                  </v-col>
                  <v-col cols="8" xs="6" sm="6" md="3" lg="3" xl="3">
                    <v-btn color="boton" height="40" width="175" class="botone my-0 mr-3" rounded dark outlined @click="verPrograma(item)">
                      <h3 class="">ver detalles</h3>
                    </v-btn>
                  </v-col>
                  <v-col cols="4" xs="6" sm="6" md="2" lg="2" xl="2">
                    <v-btn icon>
                      <v-icon @click="editarPostulacion(item)" color="black"> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon @click="eliminarPostulacion(item)" color="black"> mdi-trash-can-outline </v-icon>
                    </v-btn>
                  </v-col>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirm()" :alert="alert" v-if="alert.estado" />
      </v-row>
    </v-container>
    <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirmar()" :alert="alert" v-if="alert.estado" />
  </v-app>
</template>

<script>
import Departamentos from "../../listas/Departamentos";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  data() {
    return {
      delete_programa: false,
      id_postulacion: 0,
      format_certificado: "",
      format_carta: "",
      format_logo: "",
      frames: {},
      validacion: true,
      estado: false,
      canal: false,
      canales: Object,
      programs: [],
      categorias: [],
      name_catetgory: "",
      array_categorias: [],
      array_categoria_base: [],
      validar_buscar: false,
      buscar: "",
      form_uploads: {},
    };
  },
  watch: {
    buscar() {
      this.array_categorias = this.array_categoria_base;
      let filtro = this.array_categorias.filter((categoria) => categoria.nameProgram.includes(this.buscar) || categoria.canal.includes(this.buscar));
      this.array_categorias = filtro;
      this.validar_buscar = this.array_categorias.length == 0 ? true : false;
    },
  },
  async mounted() {
    await this.getAllCategorys();
    let id = this.$route.query?.id;
    this.name_catetgory = this.$route.query.titulo;
    await this.getAllPrgramas();
    await this.getUsuarios();
    if (this.$route.query?.panel === "CATEGORIA") {
      await this.getPostulationsForCategory(id);
    } else {
      this.canal = true;
      this.name_catetgory = this.$route.query?.postulations[0].canal;
      this.getPostulationsForProgram(id);
    }
  },
  methods: {
    ...mapActions({
      _getPostulationsForCategory: "postulacion/_getPostulationsForCategory",
      _getPostulationsForProgram: "postulacion/_getPostulationsForProgram",
      _getUsuariosAdmin: "usuario/_getUsuariosAdmin",
      _getAllProgramas: "programas/_getAllProgramas",
      _deletePostulationAdmin: "postulacion/_deletePostulationAdmin",
      _getCatergoriasAdmin: "categorias/_getCatergoriasAdmin",
    }),

    async getUsuarios() {
      this.canales = await this._getUsuariosAdmin();
    },
    async getPostulationsForCategory(id) {
      const postulaciones = await this._getPostulationsForCategory(id);
      this.array_categorias = postulaciones.data.data.postulations;
      this.buscarCanal();
    },
    async getPostulationsForProgram(id) {
      const postulaciones = JSON.parse(this.$route.query?.postulations);
      this.array_categorias = JSON.parse(this.$route.query?.postulations);
      this.buscarCanal();
    },
    verPrograma(item) {
      this.$router
        .push({
          name: "admin/postulacion",
          query: {
            datos: btoa(JSON.stringify(item)),
            name_catetgory: this.name_catetgory,
          },
        })
        .catch((err) => {
          console.log(err);
        });
    },
    buscarCanal() {
      let canal;
      let nameProgram;
      let categoria;

      if (this.canal) {
        for (let i = 0; i < this.array_categorias.length; i++) {
          categoria = this.categorias.find((id) => id.id == this.array_categorias[i].categoryId);
          nameProgram = this.programs.find((id) => id.id == this.array_categorias[i].programId);
          if (categoria != undefined) {
            this.array_categorias[i].category = categoria.nameCategory;
          } else {
            this.array_categorias[i].category = "Error al encontrar categoria";
          }

          if (nameProgram != undefined) {
            this.array_categorias[i].nameProgram = nameProgram.nameProgram;
          } else {
            this.array_categorias[i].nameProgram = "ERROR";
          }
        }
      } else {
        for (let i = 0; i < this.array_categorias.length; i++) {
          canal = this.canales.data.data.find((id) => id.userId == this.array_categorias[i].userId);
          nameProgram = this.programs.find((id) => id.id == this.array_categorias[i].programId);

          if (canal != undefined) {
            this.array_categorias[i].canal = canal.nameClient;
          } else this.array_categorias[i].canal = "CANAL NO EXISTE";
          if (nameProgram?.nameProgram) {
            this.array_categorias[i].nameProgram = nameProgram.nameProgram;
          } else this.array_categorias[i].nameProgram = "PROGRAMA NO EXISTE";
        }
        this.array_categoria_base = JSON.parse(JSON.stringify(this.array_categorias));
      }
    },
    editarPostulacion(item) {
      this.$router.push({
        name: "admin/editar-postulacion",
        params: { data: { programa: item, postulacion: { nameCategory: this.name_catetgory }, id: item.id } },
      });
    },
    async getAllPrgramas() {
      const respuesta = await this._getAllProgramas();
      this.programs = respuesta.data.data;
    },
    async getAllCategorys() {
      const respuesta = await this._getCatergoriasAdmin();
      this.categorias = respuesta.data.data;
    },
    eliminarPostulacion(item) {
      this.id_postulacion = item.id;
      this.delete_postulacion = true;
      this.ALT_("deletePostulacion", "info", "p");
    },
    cancel() {
      this.ALTD_();
    },
    retroceder() {
      window.history.back();
    },
    async confirmar() {
      await this._deletePostulationAdmin(this.id_postulacion);
      this.ALTD_();
      location.reload();
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
