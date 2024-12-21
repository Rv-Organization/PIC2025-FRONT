<template>
  <v-app>
    <v-container fluid class="bg-color container-channel">
      <v-row>
        <v-col class="d-flex mb-7">
          <v-btn
            fab
            color="boton"
            class="botone mr-3"
            small
            elevation="0"
            sm-d-none
            @click="retroceder"
            ><v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
          <h2>{{ name_catetgory }}</h2>
        </v-col>
        <v-row class="px-7 mt-">
          <h3>
            En este panel podra ver los {{ cantidad_votos_ }} votos, donde podrá
            evaluar en una puntuación de 1 a {{ cantidad_votos_ }} puntos ( 1
            calificación más baja y {{ cantidad_votos_ }} calificación mas
            alta).
            
          </h3>
          <v-row class="line my-8"></v-row>
        </v-row>
      </v-row>
      <v-row class="my-10">
        <v-col cols="12" class="mt-0 pt-0">
          <v-row justify="start" class="mb-8">
            <v-col
              cols="12"
              xs="6"
              sm="6"
              md="7"
              lg="7"
              xl="7"
              class="py-0 text-start"
            >
              <v-row>
                <v-col cols="10" class="">
                  <h2>{{ this.$route.query.name }}</h2>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="5" lg="5" xl="5" class="py-0">
              <v-text-field
                label="Buscar Producción o Talento"
                v-model="buscar"
                outlined
                rounded
                prepend-icon="mdi-magnify"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-container fluid class="my-0">
            <v-row
              v-for="(item, index) in array_categorias.slice(
                0,
                cantidad_votos_
              )"
              :key="index"
              class="contenedor-postulados py-1 my-2"
            >
              <v-col cols="12" xs="12" sm="7" md="7" lg="5" xl="7" class="ml-4">
                <h4 v-if="canal">
                  {{ item.category }} - {{ item.nameProgram }}
                </h4>
                <h4 v-else>{{ item.nameProgram }} - {{ item.canal }}</h4>
              </v-col>
              <v-col
                cols="6"
                xs="6"
                sm="6"
                md="2"
                lg="3"
                xl="2"
                class="mr-sm-3"
              >
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="2" lg="3" xl="2" class="">
                <v-container
                  v-if="findVotes(item).position"
                  class="d-flex text-center"
                >
                  <v-row class="text-center" justify="end">
                    <v-rating
                      :value="findVotes(item).position"
                      :length="findVotes(item).position"
                      size="26"
                      dense
                      readonly
                    ></v-rating>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
    <MODAL_VOTACION
      :modal_votacion="modal_votacion"
      @votar="votar"
      v-if="modal_votacion.modalVotacion"
      @cambiarVoto="cambiarVoto"
    />
  </v-app>
</template>

<script>
import MODAL_VOTACION from "../../components/comite-tecnico/VotacionModal.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";
import { CURRTET_USER } from "@/global";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: { MODAL_VOTACION },
  data() {
    return {
      modal_votacion: {
        modalVotacion: false,
        validar_voto: false,
      },
      filtro_category: "",

      modalVotacion: false,
      rating: 0,
      confrimarVoto: false,
      timeout: 2000,
      delete_programa: false,
      id_postulacion: 0,
      format_certificado: "",
      format_carta: "",
      format_logo: "",

      frames: {},
      validacion: true,
      estado: false,
      canal: false,
      postulacion: {},
      canales: Object,
      programs: [],
      categorias: [],
      name_catetgory: "",
      array_categorias: [],
      array_categoria_base: [],
      validar_buscar: false,
      buscar: "",
      form_uploads: {},
      validar_voto: false,
      postulado: "",
      votes: [],
      cantidad_votos_: "",
    };
  },
  watch: {
    filtro_category(val) {
      if (val)
        this.array_categorias.sort(
          (a, b) => this.findVotes(b).position - this.findVotes(a).position
        );
      else this.array_categorias = this.array_categoria_base;
    },
    buscar() {
      this.array_categorias = this.array_categoria_base;
      let filtro = this.array_categorias.filter(
        (categoria) =>
          categoria.nameProgram.includes(this.buscar) ||
          categoria.canal.includes(this.buscar)
      );
      this.array_categorias = filtro;
      this.validar_buscar = this.array_categorias.length == 0 ? true : false;
    },
  },
  mounted() {
    this.traerConsultas();
  },
  methods: {
    ...mapActions({
      _getPostulationsForCategory:
        "postulacion/_getPostulationsForCategoryComite",
      _getUsuariosAdmin: "usuario/_getUsuariosAdmin",
      _getAllProgramas: "programas/_getAllProgramas",
      _deletePostulationAdmin: "postulacion/_deletePostulationAdmin",
      _getCatergoriasAdmin: "categorias/_getCatergoriasAdmin",
      _addVote: "comiteTecnico/_addVote",
      _consultVote: "comiteTecnico/_consultVote",
      _consultVotesCategoryAdmin: "admin/_consultVotesCategoryAdmin",
    }),
    async traerConsultas() {
      await this.getAllCategorys();
      let id = this.$route.query?.id;
      this.cantidad_votos_ = this.$route.query?.total_category;
      this.name_catetgory = this.$route.query.titulo;
      await this.getAllPrgramas();
      await this.getUsuarios();
      const votes = await this._consultVotesCategoryAdmin({
        userId: this.$route.query.userId,
        id: id,
      });
      this.votes = votes.data.data;
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
      this.array_categorias = postulaciones.data.data;
      this.array_categorias.sort(
        (a, b) => this.findVotes(b).position - this.findVotes(a).position
      );

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
          name: "/comite-tecnico/detalle-postulacion",
          query: {
            id: this.$route.query?.id,
            cantidad_votos_: this.$route.query?.total_category,
            datos: btoa(JSON.stringify(item)),
            name_catetgory: this.name_catetgory,
          },
        })
        .catch((err) => {
          console.error(err);
        });
    },
    buscarCanal() {
      let canal;
      let nameProgram;
      let categoria;

      if (this.canal) {
        for (let i = 0; i < this.array_categorias.length; i++) {
          categoria = this.categorias.find(
            (id) => id.id == this.array_categorias[i].categoryId
          );
          nameProgram = this.programs.find(
            (id) => id.id == this.array_categorias[i].programId
          );
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
          canal = this.canales.data.data.find(
            (id) => id.userId == this.array_categorias[i].userId
          );
          nameProgram = this.programs.find(
            (id) => id.id == this.array_categorias[i].programId
          );

          if (canal != undefined) {
            this.array_categorias[i].canal = canal.nameClient;
          } else this.array_categorias[i].canal = "CANAL NO EXISTE";

          if (nameProgram.nameProgram != undefined) {
            this.array_categorias[i].nameProgram = nameProgram.nameProgram;
          } else this.array_categorias[i].nameProgram = "PROGRAMA NO EXISTE";
        }
        this.array_categoria_base = JSON.parse(
          JSON.stringify(this.array_categorias)
        );
      }
    },
    editarPostulacion(item) {
      this.$router.push({
        name: "admin/editar-postulacion",
        params: {
          data: {
            programa: item,
            postulacion: { nameCategory: this.name_catetgory },
            id: item.id,
          },
        },
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
    async votar(rating) {
      const consultarVoto = await this._consultVote({
        userId: CURRTET_USER.id,
        categoryId: this.postulacion.categoryId,
        postulationId: this.postulacion.id,
        position: rating,
      });

      if (consultarVoto.data.data === null) {
        const res = await this._addVote({
          userId: CURRTET_USER.id,
          categoryId: this.postulacion.categoryId,
          postulationId: this.postulacion.id,
          position: rating,
        });

        this.ALT_("VOTO-01", "success");

        this.modal_votacion.modalVotacion = false;
        this.traerConsultas();
      } else {
        const buscar = this.array_categorias.find(
          (e) => e.id == consultarVoto.data.data.postulationId
        );
        // this.postulado = buscar.nameProgram;
        this.modal_votacion.postulado = buscar.nameProgram;
        this.modal_votacion.validar_voto = true;
      }
    },
    async abrirVotar(item) {
      this.modal_votacion.modalVotacion = true;
      this.modal_votacion = Object.assign(this.modal_votacion, item);
      this.modal_votacion.name_catetgory = this.name_catetgory;
      this.modal_votacion.cantidad_votos_ = this.cantidad_votos_;
      this.modal_votacion.validar_voto = false;

      this.postulacion = item;

      this.modalVotacion = true;
      this.validar_voto = false;
      this.rating = 0;
    },
    async cambiarVoto(rating) {
      const res = await this._addVote({
        userId: CURRTET_USER.id,
        categoryId: this.postulacion.categoryId,
        postulationId: this.postulacion.id,
        position: rating,
      });
      this.ALT_("VOTO-02", "success");
      this.traerConsultas();

      this.modal_votacion.modalVotacion = false;
    },
    findVotes(item) {
      let res = this.votes.find((element) => element.postulationId == item.id);
      return res != undefined ? res : { position: 0 };
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
  margin: auto;
}

.v-input {
  border-radius: 100px;
}

.border-new {
  border: 1px solid #d9d9d9;
  border-radius: 10px;
}

.contenedor-postulados {
  background: #ffffff;
  border: 2px solid #d9d9d9;
  border-radius: 10px;
}

.puntos {
  background: #d9d9d9;
  border: 2px solid #e4cc8e;
  border-radius: 0 10px 10px 0;
}

/* Movil  */
@media (max-width: 600px) {
  .container-channel {
    width: 100%;
  }
}
</style>
