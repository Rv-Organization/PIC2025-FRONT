<template>
  <v-dialog
    v-model="estado_modal"
    persistent
    width="800"
    class="rounded-0 border-card"
  >
    <v-card width="800" class="mx-auto border-card section">
      <v-footer color="white" class="mb-0 pb-0" height="80">
        <h3 class="mx-auto py-6">
          Así es como los evaluadores y votantes verán tu contenido.
        </h3>
        <v-btn icon @click="cerrar" class="text-end">
          <v-icon size="30" color="accent">mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-footer>
      <v-divider color="#E4CC8E" class="mb-10"></v-divider>
      <v-container class="px-8">
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
            <v-row class="my-3">
              <v-col cols="10" class="">
                <v-row>
                  <h2>{{ datos.postulacion.nameProgram }}</h2>
                </v-row>
                <v-row>
                  <h4>Categoría: {{ nameCategory }}</h4>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-5 pb-2"></v-divider>
      </v-container>
      <v-container class="px-8">
        <v-row>
          <v-col md="6">
            <v-card elevation="1" color="black">
              <v-responsive>
                <v-img
                  v-if="!fotoTalento"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="100%"
                  object-fit="cover"
                  :src="datos.postulacion.poster"
                ></v-img>
                <v-img
                  v-if="fotoTalento"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="100%"
                  object-fit="cover"
                  :src="fotoTalento"
                ></v-img>
              </v-responsive>
            </v-card>
          </v-col>
          <v-col class="pl-5" md="6">
            <h2 class="mb-2">Datos de la Postulación</h2>
            <h4 class="my-2">
              <span v-if="nombreTalento">{{ nombreTalento }}/</span>
              <span> {{ datos.postulacion.nameProgram }}/</span>
              <span v-if="this.programa.channelProduct"
                >{{ this.programa.channelProduct }}/</span
              >
              <span>{{ this.programa.channelIssue }}</span>
            </h4>
            <h4 class="my-2">
              Fecha de publicacion: {{ this.programa.dateIssue }}
            </h4>
            <h4 class="my-2">
              Horario de emisión: {{ this.programa.hourIssue }}
            </h4>
            <h4>Numero de capítulos: {{ this.programa.numberChapter }}</h4>
            <h4>Numero de temporadas: {{ this.programa.numberSeason }}</h4>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="px-8">
        <h1 class="mb-4">Sinopsis</h1>
        <p class="mb-13 pr-15">{{ this.programa.sipnosis }}</p>
      </v-container>
      <v-container d-flex justify-center>
        <div class="col-12" v-if="!datos.video">
          <lottie-animation
            :animationData="videoAnimacion"
            style="height: 400px"
            :autoPlay="true"
            :loop="true"
            :speed="2"
          />
          <h2 class="text-center">Procesando...</h2>
        </div>
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
    </v-card>
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";
import VideoAnimacion from "../../assets/Animation/procesando.json";
import LottieAnimation from "lottie-web-vue";

export default {
  components: {
    LottieAnimation,
  },
  props: {
    datos: Object,
  },
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  data() {
    return {
      videoAnimacion: VideoAnimacion,
      nameCategory: "",
      nombreTalento: "",
      fotoTalento: "",
      modal_votacion: {
        modalVotacion: false,
        validar_voto: false,
      },
      estado_modal: true,

      cantidad_votos_: "",
      votado: false,

      frames: {},
      validacion: true,
      estado: false,
      programa: {},
      name_catetgory: "",
      array_categorias: [],
    };
  },
  watch: {},
  mounted() {
    this.traerConsultas();

    this.nameCategory = this.datos.nombre_categoria;
    this.nombreTalento = this.datos.nombre_talento;
    this.fotoTalento = this.datos.foto_talento;
  },
  methods: {
    ...mapActions({
      _getPostulationsForCategory: "postulacion/_getPostulationsForCategory",
      _getPrograma: "programas/_getPrograma",
      _addVote: "comiteTecnico/_addVote",
      _consultVote: "comiteTecnico/_consultVote",
    }),
    async traerConsultas() {
      let id = this.datos?.id;
      await this.getPostulationsForCategory(id);
      await this.getProgram();
    },
    async getPostulationsForCategory(id) {
      const postulaciones = await this._getPostulationsForCategory(
        this.datos.programId
      );
      this.name_catetgory = postulaciones.data?.data?.nameCategory;
      this.array_categorias = postulaciones?.data?.data;
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
        if (res.data.data) this.ALT_("VOTO-01", "success", "", "", this.cerrar);
        this.modal_votacion.modalVotacion = false;
      } else {
        const buscar = this.array_categorias.postulations.find(
          (e) => e.id == consultarVoto.data.data.postulationId
        );
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

      if (res.data.data) this.ALT_("VOTO-02", "success", "", "", this.cerrar);

      this.modal_votacion.modalVotacion = false;
    },
    cerrar() {
      this.$emit("cerrar");
    },
    async abrirVotar() {
      this.modal_votacion.modalVotacion = true;
      this.modal_votacion.name_catetgory = this.name_catetgory;
      this.modal_votacion.nameProgram = this.datos.nameProgram;
      this.modal_votacion.cantidad_votos_ = this.datos?.cantidad_votos_;
      this.modal_votacion.validar_voto = false;
    },

    submitRating() {
      this.votado = true;
    },
  },
};
</script>

<style scoped>
.section {
  max-height: 500px;
  padding: 1rem;
  overflow-y: auto;
  direction: ltr;
  scrollbar-color: #d4aa70 #e4e4e4;
  scrollbar-width: thin;
}

.section::-webkit-scrollbar {
  width: 20px;
}

.section::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.section::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #e4cc8e;
}

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
.text-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #000;
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
.border-card {
  border-radius: 10px;
}
.border-footer {
  border-radius: 10px;
}
</style>
