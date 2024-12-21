<template>
  <v-container fluid class="bg-color container-channel">
    <v-row>
      <v-col>
        <h2 class="my-8">Panel de Votaciones</h2>
        <h3>
          En este panel podrá visualizar los votos a los nominados sugeridos para cada una de las 41 categorías concursantes de la 39° versión de los Premios India
          Catalina de la industria audiovisual colombiana.
        </h3>
        <v-divider class="my-8"></v-divider>
      </v-col>
    </v-row>
    <transition name="fade">
      <Categorias></Categorias>
    </transition>
  </v-container>
</template>
<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";

import Categorias from "./CategoriasComiteTecnico.vue";

export default {
  name: "PanelComiteTecnico",
  components: { Categorias },
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
  mounted() {
    this.iniciarConsultas();
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
    async iniciarConsultas() {
      await this.getAllCategorys();
      let id = this.$route.query?.id;
      this.name_catetgory = this.$route.query.titulo;
      await this.getAllPrgramas();
      await this.getUsuarios();
      if (this.$route.query?.panel === "CATEGORIA") {
        this.getPostulationsForCategory(id);
      } else {
        this.canal = true;
        this.name_catetgory = this.$route.query?.postulations[0].canal;
        this.getPostulationsForProgram(id);
      }
    },

    async getUsuarios() {
      this.canales = await this._getUsuariosAdmin();
    },
    async getPostulationsForCategory(id) {
      const postulaciones = await this._getPostulationsForCategory(id);
      this.array_categorias = postulaciones.data.data.postulations;
      this.buscarCanal();
    },
    async getPostulationsForProgram(id) {
      const postulaciones = this.$route.query?.postulations;
      this.array_categorias = this.$route.query?.postulations;
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

          if (nameProgram.nameProgram != undefined) {
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
