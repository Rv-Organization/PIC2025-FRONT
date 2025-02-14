<template>
  <v-app>
    <v-container class="bg-color">
      <v-card class="pt-1" elevation="0">
        <h2 class="text-center bg-color py-12">Panel administrativo</h2>
        <div class="line"></div>
      </v-card>
      <v-container class="container-channel mt-10 bg-color">
        <v-row justify="start">
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="6"
            lg="6"
            xl="6"
            class="py-0 text-start"
          >
            <v-row>
              <v-col cols="1" class=" ">
                <v-btn
                  fab
                  color="boton"
                  class="botone d-flex"
                  x-small
                  elevation="0"
                  sm-d-none
                  @click="retroceder()"
                  ><v-icon color="white">mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10" class="ml-4">
                <v-row>
                  <h2>{{ datos.nameProgram }}</h2>
                </v-row>
                <v-row>
                  <h4>Categoría: {{ datos.titulo }}</h4>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="container-channel my-10">
        <v-row no-gutters>
          <v-col md="6">
            <v-card elevation="1" color="black">
              <v-responsive v-if="datos.typePostulation == 1">
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-width="550px"
                  contain
                  :src="datos.photo"
                ></v-img>
              </v-responsive>
              <v-responsive v-else>
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-width="550"
                  contain
                  :src="programa.poster"
                ></v-img>
              </v-responsive>
            </v-card>
          </v-col>
          <v-col class="ml-5 mt-3" md="5">
            <h2 class="my-2">Datos del programa</h2>
            <span v-if="datos.typePostulation == 1"
              >Nombre del talento: {{ datos.name }}</span
            >
            <h4 class="my-2">
              Canal plataforma: {{ this.programa.channelProduct }}
            </h4>
            <h4 class="my-2">
              Canal de emisión: {{ this.programa.channelIssue }}
            </h4>
            <h4 class="my-2">
              Fecha de publicacion: {{ this.programa.dateIssue }}
            </h4>
            <h4 class="my-2">
              Horario de emision: {{ this.programa.hourIssue }}
            </h4>
            <h4>Numero de capitulos: {{ this.programa.numberChapter }}</h4>
            <h4>Numero de temporadas: {{ this.programa.numberSeason }}</h4>
            <h4>Link a la promo: {{ this.programa.webpage }}</h4>
            <h4 v-if="this.datos.link">
              Link al proyecto: {{ this.datos.link }}
            </h4>
          </v-col>
        </v-row>
        <v-row v-if="datos.libretto" class="pt-15">
          <h2 class="mb-4">Libreto</h2>

          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            :src="datos.libretto"
            allowfullscreen
            frameborder="0"
            height="500PX"
            width="98%"
          ></iframe>
        </v-row>
        <v-row class="pt-15">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            :src="datos.video"
            allowfullscreen
            frameborder="0"
            height="500PX"
            width="98%"
          ></iframe>
        </v-row>
        <v-row class="pt-15">
          <h2 class="mb-4">Sinopsis</h2>
        </v-row>
        <h4 class="mb-13">{{ this.programa.sipnosis }}</h4>
        <v-row class="pt-10">
          <h2>Certificado de emisión</h2>
          <iframe
            :src="programa.letter"
            frameborder="0"
            allowfullscreen
            height="680PX"
            width="98%"
          ></iframe>
        </v-row>
        <v-row class="pt-10" v-if="programa.certifyKantar">
          <h2>Certificado Kantar</h2>
          <iframe
            :src="programa.certifyKantar"
            frameborder="0"
            allowfullscreen
            height="680PX"
            width="98%"
          ></iframe>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  data() {
    return {
      format_certificado: "",
      format_carta: "",
      format_logo: "",
      frames: {},
      validacion: true,
      datos: this.$route.query,
      estado: false,
      programa: {},
      name_catetgory: "",
      array_categorias: [],
      form: {
        buscar: {
          value: "",
          id: "buscar",
          label: "Buscar produccion o talento",
          maxlength: "100",
        },
      },
      form_uploads: {},
    };
  },
  watch: {},
  mounted() {
    this.obtenerPostulacion();
  },
  methods: {
    ...mapActions({
      _getPostulationsForCategory: "postulacion/_getPostulationsForCategory",
      _getPrograma: "programas/_getPrograma",
    }),

    async obtenerPostulacion() {
      let id = this.$route.query?.id;
      let a = this.$route.query.datos;

      this.datos = JSON.parse(atob(a));
      this.getPostulationsForCategory(id);
      this.getProgram();
    },
    async getPostulationsForCategory(id) {
      //Lineas comentadas por CRISTIAN S.
      const postulaciones = await this._getPostulationsForCategory(
        this.datos.categoryId
      );
      this.array_categorias = postulaciones?.data?.data;
    },
    async getProgram() {
      const programa = await this._getPrograma(this.datos.programId);
      this.programa = programa.data.data;
    },
    retroceder() {
      window.history.back(); //para devolver esta molestando Pendiente por revisar
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
