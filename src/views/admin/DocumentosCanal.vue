<template>
  <v-app>
    <v-container fluid class="bg-color">
      <v-card elevation="0" class="mt-6 mx-10">
        <h2 class="text-center bg-color py-12">
          Panel administrativo DOCUMENTOS
        </h2>
        <div class="line"></div>
      </v-card>
      <v-row class="container-channel my-10">
        <v-col cols="12" class="mt-0 pt-0">
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
                <v-col cols="1" class="my-4 mr-3">
                  <v-btn
                    fab
                    color="boton"
                    class="botone d-flex"
                    x-small
                    elevation="0"
                    sm-d-none
                    @click="retroceder"
                    ><v-icon color="white">mdi-arrow-left</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="10" class="my-4">
                  <h3>Canal: {{ canal.nameClient }}</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="my-4">
                  <h3>Certificado</h3>
            </v-col>
            <v-col cols="10" class="py-4">
              <iframe
                height="500px"
                width="500px"
                class="container"
                :src="canal.certifycc"
              ></iframe>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10" class="my-4">
                  <h3>Carta</h3>
            </v-col>
            <v-col cols="10" class="py-4">
              <iframe
                height="500px"
                width="500px"
                class="container"
                :src="canal.letter"
              ></iframe>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
      canal: Object,
    };
  },
  watch: {},
  async mounted() {
    this.canal = JSON.parse(this.$route.query.canal);
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
    retroceder() {
      window.history.back();
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
