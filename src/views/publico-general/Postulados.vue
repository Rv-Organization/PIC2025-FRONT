<template>
  <v-container class="container-channel">
    <v-row class="mb-10">
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
        class="d-flex align-center mb-0 pb-0"
      >
        <v-btn
          @click="retroceder()"
          class="botone d-flex align-center"
          color="boton"
          elevation="0"
          sm-d-none
          x-small
          fab
          ><v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <h2 class="py-5 ml-4">{{ name_catetgory }}</h2>
        <br />
      </v-col>
      <v-col cols="12" class="ml-12 mt-0 pt-0">
        <h4>Vota por tu favorito.</h4>
      </v-col>
    </v-row>
    <v-row class="line mt-10"></v-row>
    <v-row class="mt-10"> </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        xl="6"
        lg="10"
        offset-lg="1"
        offset-xl="0"
        class="botone"
        v-for="item in array_postulados"
        :key="item.id"
      >
        <v-card
          class="py-2 my-2"
          height="auto"
          elevation="4"
          style="border-radius: 20px"
        >
          <v-row class="mx-4 my-2">
            <v-col cols="12" xs="4" sm="4" md="5" lg="4" xl="5" class="mx-auto">
              <v-img
                v-if="item.typePostulation == '1'"
                lazy-src="https://premiosindiacatalina.com/wp-content/uploads/2023/12/logoPic41.png"
                :src="item.photo"
                @click="abrirSipnosis(item)"
                class="mx-auto"
                height="300"
              />
              <v-img
                v-else
                lazy-src="https://premiosindiacatalina.com/wp-content/uploads/2023/12/logoPic41.png"
                :src="item.program.poster"
                @click="abrirSipnosis(item)"
                class="mx-auto"
                height="300"
              />
            </v-col>
            <v-col class="py-0">
              <v-row class="pl-4">
                <v-col
                  cols="9"
                  xs="9"
                  sm="9"
                  md="10"
                  lg="10"
                  xl="10"
                  class="py-0"
                >
                  <h3 class="my-4" v-if="item.typePostulation == '1'">
                    {{ item.name?.toUpperCase() }}
                  </h3>
                  <h3 class="my-4" v-if="item.typePostulation == '2'">
                    {{ item.program?.nameProgram.toUpperCase() }}
                  </h3>
                </v-col>
                <v-col cols="3" xs="3" sm="3" md="2" lg="2" xl="2" class="">
                  <v-icon v-show="item.votado" size="34" color="success"
                    >mdi-check-circle-outline</v-icon
                  >
                </v-col>
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                  class="py-0"
                >
                  <v-divider class="pb-5"></v-divider>
                  <p v-if="item.typePostulation == '1'" class="my-2">
                    <strong>Programa:</strong>
                    {{ item.program?.nameProgram.toUpperCase() }}
                  </p>
                  <p class="my-2">
                    <strong>Canal:</strong> {{ item.channel?.nameClient }}
                  </p>
                  <p class="my-2">
                    <strong>Numero de capitulos:</strong>
                    {{ item.program?.numberChapter }}
                  </p>
                  <p class="my-2">
                    <strong>Fecha de estreno:</strong>
                    {{ item.program?.dateIssue }}
                  </p>
                  <p class="my-2">
                    <strong>Temporadas:</strong>
                    {{ item.program?.numberSeason }}
                  </p>
                  <p v-if="item.typePostulation == '2'" class="py-4"></p>
                </v-col>
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                  class="text-left"
                >
                  <a
                    style="font-size: 18px"
                    class="icon--text text-center px-2 underline mt-4"
                    @click="abrirSipnosis(item)"
                    >Sinopsis</a
                  >
                  <a
                    style="font-size: 18px"
                    class="icon--text text-center px-2 underline mt-4"
                    @click="abrirVideo(item)"
                    >Ver video</a
                  >
                  <v-btn
                    :class="item.votado ? 'mt-16' : ''"
                    @click="sendVote(item)"
                    v-show="!item.votado"
                    color="primary"
                    class="botone"
                    elevation="0"
                    >Votar</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <h2 v-if="array_postulados.length == 0">Cargando...</h2>
    <h2>{{ validar_buscar ? "No se encontraron coincidencias" : "" }}</h2>
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancel()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
    <modal
      ref="modal"
      title="Título del modal"
      text="Texto del modal"
      :item="postulacion"
      :tipo="tipoModal"
      :width="width"
      v-if="postulacion.estado"
    />
  </v-container>
</template>
<script>
import POSTULACIONXCATEGORIA from "../admin/PostulacionPorCategorias.vue";
import { INPUT, AUTOCOMPLETE, CURRTET_USER } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";
import Modal from "./Modal.vue";
// import { cluster } from "../../cloudinary";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: { POSTULACIONXCATEGORIA, Modal },
  data() {
    return {
      estado: false,
      array_postulados: [],
      array_postulados_base: [],
      validar_buscar: false,
      name_catetgory: "",
      buscar: "",
      tipoModal: "",
      width: "",
      estadoVotacion: false,
      dialogo_votacion: false,
      postulacion: { estado: false },
      votos: [],
      criterios: [],
    };
  },
  watch: {
    buscar() {
      this.array_postulados = JSON.parse(
        JSON.stringify(this.array_postulados_base)
      );
      let filtro = this.array_postulados.filter((categoria) =>
        categoria.name
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toUpperCase()
          .includes(this.buscar)
      );
      this.array_postulados = filtro;
      this.validar_buscar = this.array_postulados.length == 0 ? true : false;
    },
  },
  computed: {},
  mounted() {
    this.getAllPostulations();
    this.name_catetgory = this.$route.query?.name_catetgory;
  },

  methods: {
    ...mapActions({
      _getPublicoGeneral: "miembro_votante/_getPublicoGeneral",
      _sendVotePublico: "miembro_votante/_sendVotePublico",
      _getVotePublico: "miembro_votante/_getVotePublico",
      _getVotos: "miembro_votante/_getVotos",
    }),
    truncateText(text) {
      const maxLength = 25; // Define la longitud máxima antes de truncar
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + "..."; // Agrega puntos suspensivos si el texto es demasiado largo
      }
      return text;
    },

    consultarPostulaciones(item) {
      this.$router.push({
        path: "/miembro-votante/postulados",
        query: {
          id: item.id,
          //total_category,
          titulo: item.nameCategory,
          panel: "CATEGORIA",
          postulations: item.postulations,
        },
      });
    },
    retroceder() {
      window.history.back();
    },
    abrirSipnosis(item) {
      this.tipoModal = "sipnosis";
      this.width = "80%";
      this.postulacion = Object.assign(this.postulacion, item);
      this.postulacion.estado = true;

      // this.$refs.modal.dialog = true;
      // this.$refs.modal.dialog = true;
    },
    abrirVideo(item) {
      this.tipoModal = "video";
      this.width = "85%";
      Object.assign(this.postulacion, item);
      this.postulacion.estado = true;
      // this.$refs.modal.dialog = true;
    },
    cancel() {
      this.ALTD_();
    },

    async getAllPostulations() {
      const categories = await this._getPublicoGeneral();

      const postulados = categories.data.data.find(
        (element) => element.id == Number(this.$route.query?.id)
      );
      this.array_postulados = postulados.postulations;
      this.getAllVotes();
    },

    async getAllVotes() {
      const data = await this._getVotePublico();
      const votos = data?.data.data;
      if (votos.length >= 0) {
        const voto = votos.findIndex(
          (e) => e.categoryId == Number(this.$route.query?.id)
        );
        if (voto >= 0) {
          const postulacion_votada = this.array_postulados.findIndex(
            (e) => e.id == votos[voto].postulationId
          );

          this.array_postulados = this.array_postulados.map((e) => {
            return { ...e, votado: false };
          });
          this.array_postulados[postulacion_votada].votado = true;
        }
      }
    },

    async getVotos() {
      const RES = await this._getVotos();
      this.votos = RES.data.data;
      const votosCategoria = this.votos.find(
        (e) => e.categoryId == this.array_postulados[0].categoryId
      );

      votosCategoria
        ? ((this.estado = true), this.buscarVoto(votosCategoria))
        : (this.estado = false);
    },

    buscarVoto(votosCategoria) {
      for (let i = 0; i < this.array_postulados.length; i++) {
        this.array_postulados[i].estadoVoto = false;
      }
      this.array_postulados.map((item, index) => {
        if (item.id == votosCategoria.postulationId) {
          item.estadoVoto = true;
        }
      });
      this.array_postulados_base = this.array_postulados;
    },
    buscarVotoPrueba(item) {
      const votosCategoria = this.votos.find(
        (e) => e.categoryId == this.array_postulados[0].categoryId
      );
      return item.id == votosCategoria?.postulationId;
    },

    sendVote(item) {
      const find_voto = this.array_postulados.findIndex(
        (e) => e.votado == true
      );
      if (find_voto == -1) {
        this.ALT_(
          "",
          "info",
          "p",
          () => this.confirmar(item),
          null,
          "¿Deseas votar por este talento?"
        );
      } else
        this.ALT_(
          "",
          "warning",
          "p",
          () => this.confirmar(item),
          null,
          "¿Deseas cambiar tu voto por este talento?"
        );
    },

    async confirmar(item) {
      const userId = JSON.parse(atob(sessionStorage.current_user)).id;

      this.estado = true;

      const DATA = {
        userId: userId,
        categoryId: item.categoryId,
        postulationId: item.id,
      };

      const RES = await this._sendVotePublico(DATA);
      // await this.getAllPostulations();
      await this.getAllVotes();
      this.ALT_("VOTO-05", "success");

      // await this.getAllPostulations();
      // : this.ALT_("VOTO-ERROR", "error");
    },
  },
};
</script>

<style scoped>
.container-channel {
  width: 85%;
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
  width: 100%;
  margin: auto;
}

.v-input {
  border-radius: 100px;
}

.border-new {
  border: 2px solid #d9d9d9;
  border-radius: 30px;
  background-color: white;
}

.fade-transition {
  transition: all 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.card-animation-enter-active {
  animation: slide-down 1s;
}

.card-animation-leave-active {
  animation: slide-up 1s;
}

.underline {
  text-decoration: underline;
}

.container-channel {
  width: 80%;
  margin: auto;
  padding-top: 2rem;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
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
.text-moving {
  overflow: hidden;
  white-space: nowrap;
  animation: moveText 4s linear infinite;
}

@keyframes moveText {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-10%);
  }
}
.truncate-text {
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  overflow: hidden; /* Oculta el texto que excede el contenedor */
  text-overflow: ellipsis; /* Agrega puntos suspensivos al final del texto truncado */
}
</style>
