<template>
  <v-app>
    <v-btn @click="retroceder()" class="botone d-flex ml-4 mt-10" color="boton" elevation="0" sm-d-none x-small fab
      ><v-icon color="white">mdi-arrow-left</v-icon>
    </v-btn>
    <v-container class="bg-color container-channel mt-0 pt-0">
      <v-container class="bg-color">
        <v-row justify="start">
          <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0 text-start">
            <v-row class="my-3">
              <v-col cols="10" class="">
                <v-row>
                  <h2>{{ datos.nameProgram }}</h2>
                </v-row>
                <v-row>
                  <h4>Categoría: {{ name_catetgory }}</h4>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-5 pb-2"></v-divider>
      </v-container>
      <v-container class="">
        <v-row no-gutters>
          <v-col md="6">
            <v-card elevation="1" color="black">
              <v-responsive>
                <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="100%" object-fit="cover" :src="datos.photo"></v-img>
              </v-responsive>
            </v-card>
          </v-col>
          <v-col class="ml-5" md="4">
            <h2 class="mb-2">Datos de la Postulación</h2>
            <h4 class="my-2"><span style="font-weight: bold"> Canal: </span> {{ this.programa.channelProduct }}</h4>
            <h4 class="my-2">Fecha de publicacion: {{ this.programa.dateIssue }}</h4>
            <h4 class="my-2">Horario de emision: {{ this.programa.hourIssue }}</h4>
            <h4>Numero de capitulos: {{ this.programa.numberChapter }}</h4>
          </v-col>
        </v-row>
      </v-container>
      <v-container d-flex justify-center>
        <div class="iframe-container rounded-lg">
          <iframe
            class="player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            :src="datos.video"
            allowfullscreen
            frameborder="0"
            height="720"
            width="100%"
          ></iframe>
        </div>
      </v-container>
      <v-container class="mx-8">
        <h1 class="mb-4">Sinopsis</h1>
        <p class="mb-13 pr-15">{{ this.programa.sipnosis }}</p>
        <v-container class="text-center pb-12">
          <v-btn color="boton" class="botone" width="60%" min-height="60px" dark @click="abrirVotar()">
            <h2 class="">Votar</h2>
          </v-btn>
        </v-container>
      </v-container>
    </v-container>
    <MODAL_VOTACION :modal_votacion="modal_votacion" @votar="votar" v-if="modal_votacion.modalVotacion" @cambiarVoto="cambiarVoto" />

    <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirmar()" :alert="alert" v-if="alert.estado" />
  </v-app>
</template>

<script>
import MODAL_VOTACION from "../../components/comite-tecnico/VotacionModal.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";

export default {
  components: {
    MODAL_VOTACION,
  },
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  data() {
    return {
      modal_votacion: {
        modalVotacion: false,
        validar_voto: false,
      },

      cantidad_votos_: "",
      votado: false,

      frames: {},
      validacion: true,
      datos: this.$route.query,
      estado: false,
      programa: {},
      name_catetgory: "",
      array_categorias: [],
    };
  },
  watch: {},
  mounted() {
    this.traerConsultas();
  },
  methods: {
    ...mapActions({
      _getPostulationsForCategory: "postulacion/_getPostulationsForCategory",
      _getPrograma: "programas/_getPrograma",
      _addVote: "comiteTecnico/_addVote",
      _consultVote: "comiteTecnico/_consultVote",
    }),
    async traerConsultas() {
      let id = this.$route.query?.id;
      let a = this.$route.query.datos;
      this.datos = JSON.parse(atob(a));
      this.name_catetgory = this.$route.query?.name_catetgory;
      await this.getPostulationsForCategory(id);
      await this.getProgram();
    },
    async getPostulationsForCategory(id) {
      const postulaciones = await this._getPostulationsForCategory(id);
      this.array_categorias = postulaciones.data.data;
    },
    async getProgram() {
      const programa = await this._getPrograma(this.datos.programId);
      this.programa = programa.data.data;
    },
    async votar(rating) {
      const consultarVoto = await this._consultVote({
        userId: CURRTET_USER.id,
        categoryId: this.datos.categoryId,
        postulationId: this.datos.id,
        position: rating,
      });

      if (consultarVoto.data.data === null) {
        const res = await this._addVote({
          userId: CURRTET_USER.id,
          categoryId: this.datos.categoryId,
          postulationId: this.datos.id,
          position: rating,
        });
        if (res.data.data) this.ALT_("VOTO-01", "success", "", "", this.retroceder);
        this.modal_votacion.modalVotacion = false;
      } else {
        const buscar = this.array_categorias.postulations.find((e) => e.id == consultarVoto.data.data.postulationId);
        this.modal_votacion.postulado = buscar.name;
        this.modal_votacion.validar_voto = true;
      }
    },

    cancel() {
      this.ALTD_();
    },
    async cambiarVoto(rating) {
      const res = await this._addVote({
        userId: CURRTET_USER.id,
        categoryId: this.datos.categoryId,
        postulationId: this.datos.id,
        position: rating,
      });

      if (res.data.data) this.ALT_("VOTO-02", "success", "", "", this.retroceder);

      this.modal_votacion.modalVotacion = false;
    },
    retroceder() {
      window.history.back();
    },
    async abrirVotar() {
      this.modal_votacion.modalVotacion = true;
      this.modal_votacion.name_catetgory = this.name_catetgory;
      this.modal_votacion.nameProgram = this.datos.nameProgram;
      this.modal_votacion.cantidad_votos_ = this.$route.query?.cantidad_votos_;
      this.modal_votacion.validar_voto = false;
    },

    submitRating() {
      this.votado = true;
    },
  },
};
</script>

<style scoped>
.container-channel {
  width: 80%;
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

.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
.iframe-container {
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  overflow: hidden;
}

.player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.iframe-container .ytp-chrome-bottom {
  margin-bottom: 20px;
}

.iframe-container .ytp-chrome-controls {
  margin-left: 20px;
  margin-right: 20px;
}

.iframe-container .ytp-large-play-button {
  transform: translate(10px, 10px);
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
