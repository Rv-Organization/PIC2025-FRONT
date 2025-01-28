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
        class="d-flex align-center"
      >
        <v-btn
          class="botone d-flex ml-4 align-center"
          @click="retroceder()"
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
      <h4>
        En este panel, se solicita que califique cada uno de los criterios en
        una escala del 1 al 10, siendo 10 la calificación más alta posible.
      </h4>
      <h4 class="mt-10" v-if="porcentaje != 100 && !validarUsuariosIbero()">
        Completa el 100%, evaluando los criterios presentes
      </h4>
      <h4 class="mt-10" v-else>
        Genial, ya completo la evaluación de los criterios para esta categoria
      </h4>
      <v-progress-linear
        :value="porcentaje"
        height="25"
        v-if="!validarUsuariosIbero()"
      >
        <strong>{{ Math.ceil(porcentaje) }}%</strong>
      </v-progress-linear>
    </v-row>
    <v-row class="line"></v-row>
    <v-row class="mt-6"> </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        xl="6"
        lg="6"
        v-for="item in array_postulados"
        :key="item.id"
      >
        <v-card class="py-5 my-2" height="auto">
          <v-row class="mx-3 my-2">
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="12"
              lg="5"
              xl="5"
              class="mx-auto"
            >
              <v-img
                v-if="item.typePostulation == '1'"
                lazy-src="https://premiosindiacatalina.com/wp-content/uploads/2023/12/logoPic41.png"
                :src="item.photo"
                class="mx-auto"
                height="200"
              />
              <v-img
                v-else
                lazy-src="https://premiosindiacatalina.com/wp-content/uploads/2023/12/logoPic41.png"
                :src="item.program.poster"
                class="mx-auto"
                height="200"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="12" lg="7" xl="7" class="py-0">
              <v-row>
                <v-col
                  cols="9"
                  xs="9"
                  sm="9"
                  md="10"
                  lg="10"
                  xl="10"
                  class="py-0"
                >
                  <h4 class="my-4">
                    {{ item.name?.toUpperCase() }}
                  </h4>
                </v-col>

                <v-col cols="3" xs="3" sm="3" md="2" lg="2" xl="2" class="py-0">
                  <v-img
                    src="../../assets/image/icono-india.png"
                    v-show="item.rating_criterios.length"
                    height="30"
                    width="30"
                    contain
                  />
                </v-col>
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                  class="py-0 ellipsis"
                  style="overflow: hidden; text-overflow: ellipsis"
                >
                  <v-divider></v-divider>
                  <p class="my-2">
                    <strong>Programa:</strong> {{ item.program?.nameProgram }}
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
                  <a
                    class="my-2"
                    target="_blank"
                    :href="item.link"
                    v-if="item.link"
                  >
                    <strong>Link</strong>
                  </a>
                  <a
                    class="my-12"
                    target="_blank"
                    :href="item.libretto"
                    v-if="item.libretto"
                  >
                    <strong>Libreto</strong>
                  </a>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="text-center mt-4">
              <a
                class="icon--text text-center px-2 underline mt-4"
                @click="abrirSipnosis(item)"
                >Sinopsis</a
              >
              <a
                class="icon--text text-center px-2 underline mt-4"
                @click="abrirVideo(item)"
                >Ver video</a
              >
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
              class="text-center"
              v-if="!validarUsuariosIbero()"
            >
              <v-btn
                elevation="10"
                class="botone"
                @click="item.dialogo_votacion = true"
                color="primary"
                >Evaluar</v-btn
              >
            </v-col>
            <v-dialog
              v-model="item.dialogo_votacion"
              v-if="item.dialogo_votacion"
              style="border-radius: 20px"
              width="500"
              persistent
            >
              <v-card style="border-radius: 20px">
                <v-footer color="white" class="mb-0 pb-0">
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <h2 class="mt-2 text-center text-bold">
                    Criterios de evaluación
                  </h2>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click="item.dialogo_votacion = false"
                    class="botone"
                  >
                    <v-icon size="30" color="accent">
                      mdi-close-circle-outline</v-icon
                    >
                  </v-btn>
                </v-footer>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-divider color="#E4CC8E" />
                      <v-row
                        v-for="(criterio, indexCriterio) in criterios"
                        :key="criterio.name"
                        justify="center"
                        align="center"
                        class="mt-4"
                      >
                        <v-col
                          cols="12"
                          xs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                          class="py-0"
                        >
                          <h3 class="mt-2 text-center">
                            {{ criterio.name }}
                            <!-- <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                  <v-icon color="grey lighten-1">
                                    mdi-comment-question-outline
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>{{ criterio.description }}</span>
                            </v-tooltip> -->
                          </h3>
                          <h6 class="mt-2">
                            {{ criterio.description }}
                          </h6>
                        </v-col>
                        <v-col>
                          <v-rating
                            v-model="item.rating_criterios[indexCriterio]"
                            class="my-0 py-0 text-center"
                            background-color="withe"
                            empty-icon="$ratingFull"
                            color="primary"
                            length="10"
                            hover
                          ></v-rating>
                          <h5 class="text-center">
                            {{ item.rating_criterios[indexCriterio] }} puntos
                          </h5>
                          <v-divider color="#E4CC8E"></v-divider>
                        </v-col>
                      </v-row>

                      <div class="text-center">
                        <v-btn
                          @click="sendVote(item)"
                          class="botone mt-4"
                          color="primary"
                          elevation="0"
                          width="110"
                          height="30"
                          rounded
                          dense
                        >
                          Evaluar
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
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
      contar_votos: 0,
      porcentaje: 0,
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
    this.getCriteriosPorCategoria();
    this.name_catetgory = this.$route.query?.name_catetgory;
  },

  methods: {
    ...mapActions({
      _getCategoriasMimbroVotante:
        "miembro_votante/_getCategoriasMimbroVotante",
      _getCriteriosPorCategoria: "miembro_votante/_getCriteriosPorCategoria",
      _getVotosPorCategoria: "miembro_votante/_getVotosPorCategoria",
      _sendVote: "miembro_votante/_sendVote",
      _getVotos: "miembro_votante/_getVotos",
    }),
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
    },
    abrirVideo(item) {
      this.tipoModal = "video";
      this.width = "85%";
      Object.assign(this.postulacion, item);
      this.postulacion.estado = true;
    },
    cancel() {
      this.ALTD_();
    },

    async getAllPostulations() {
      const votos = await this._getVotosPorCategoria(this.$route.query?.id);
      const categories = await this._getCategoriasMimbroVotante();

      const postulados = categories.data.data.find(
        (element) => element.id == Number(this.$route.query?.id)
      );
      this.array_postulados = postulados.postulations;

      this.array_postulados = this.array_postulados.map((e) => {
        return { ...e, rating_criterios: [], dialogo_votacion: false };
      });

      if (votos) {
        for (let i = 0; i < votos.data.data.length; i++) {
          const postulacion = this.array_postulados.findIndex(
            (e) => e.id == votos.data.data[i].postulationId
          );
          this.array_postulados[postulacion].rating_criterios.push(
            votos.data.data[i].qualification
          );
        }
      }
      this.contar_votos = 0;
      this.array_postulados.forEach((e) => {
        if (e.rating_criterios.length > 0) this.contar_votos++;
      });
      this.porcentaje =
        (100 / this.array_postulados.length) * this.contar_votos;

      await this.getVotos();
    },

    async getCriteriosPorCategoria() {
      this.criterios = await this._getCriteriosPorCategoria(
        Number(this.$route.query?.id)
      );
    },

    async getVotos() {
      const response = await this._getVotos();
      this.votos = response?.data?.data;
      const votosCategoria = this.votos?.find(
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
      if (item.rating_criterios.length != this.criterios.length) {
        return this.ALT_(
          "MV-CRITERIOS-1",
          "warning",
          "Debes seleccionar todos los criterios."
        );
      }

      this.confirmar(item);
    },

    async confirmar(item) {
      this.estado = true;
      for (let i = 0; i < this.criterios.length; i++) {
        const data = {
          userId: 0,
          categoryCriteriaId: this.criterios[i].id,
          postulationId: item.id,
          qualification: item.rating_criterios[i],
        };
        await this._sendVote(data);
      }
      item.dialogo_votacion = false;
      this.contar_votos = 0;
      this.array_postulados.forEach((e) => {
        if (e.rating_criterios.length > 0) this.contar_votos++;
      });
      this.porcentaje =
        (100 / this.array_postulados.length) * this.contar_votos;
      this.ALT_("VOTO-05", "success");
    },

    validarUsuariosIbero() {
      const CORREO = JSON.parse(atob(sessionStorage.current_user)).email;
      const CORREOS_NO_VOTAN = [
        "marioemorales@hotmail.com",
        "yalgior@gmail.com",
        "majidaissa@yahoo.com",
      ];

      return CORREOS_NO_VOTAN.find((e) => e == CORREO) ? true : false;
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
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
