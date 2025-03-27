<template>
  <v-container class="container-channel">
    <v-row>
      <v-col>
        <h2 class="mb-6">Panel de votaciones</h2>
        <h3>
          En este panel encontrarás
          {{ this.array_categorias.length }} categorías en las que tienes la
          oportunidad de escoger a tus favoritos. ¡Decide con tu voto quiénes
          merecen ser los ganadores en cada una de ellas!
        </h3>
        <v-divider class="my-4"></v-divider>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <!-- <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="py-0 pt-6 mb-6">
        <v-autocomplete
          @input="buscar = buscar.toUpperCase()"
          background-color="#ffffff"
          v-model="filtro_category"
          prepend-icon="mdi-filter"
          label="Filtrar categorias"
          item-value="id"
          item-color="primary"
          :items="[
            {
              id: '0',
              text: 'Todas',
            },
            {
              id: '1',
              text: 'Completas',
            },
            {
              id: '2',
              text: 'Incompletas',
            },
          ]"
          outlined
          rounded
          dense
        ></v-autocomplete>
      </v-col> -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
        class="py-0 pt-6 mb-6"
      >
        <v-text-field
          @input="buscar = buscar"
          prepend-icon="mdi-magnify"
          background-color="#ffffff"
          label="Buscar categorias"
          v-model="buscar"
          outlined
          rounded
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <transition-group name="fade">
      <v-container
        v-for="item in array_categorias"
        :key="item.nameCategory"
        class="py-4 my-2 category default-cursor"
        cols="12"
        @click="consultarPostulaciones(item)"
      >
        <v-row class="align-center mx-3">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <h4>{{ item.nameCategory }}</h4>
          </v-col>
          <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3" class="text-end">
            <a style="font-size: 18px" class="icon--text underline"
              >Ver postulados</a
            >
          </v-col>

          <v-col
            cols="6"
            xs="16"
            sm="6"
            md="3"
            lg="3"
            xl="3"
            class="text-center"
          >
            <v-btn
              v-if="item.votado"
              rounded
              elevation="0"
              color="#C2FFD0"
              class="botone py-1 px-6 default-cursor"
            >
              <h4 class="black--text">Completo</h4>
            </v-btn>
            <v-btn
              v-else
              rounded
              elevation="0"
              color="#FFEBB8"
              class="botone py-1 px-6 default-cursor"
            >
              <h4 class="black--text">incompleto</h4>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </transition-group>
    <!-- <h2 v-if="array_categorias.length == 0">Cargando ...</h2> -->
    <h2>{{ validar_buscar ? "No se encontraron coincidencias" : "" }}</h2>
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
  </v-container>
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
      estado: false,
      array_categorias: [],
      array_categoria_base: [],
      validar_buscar: false,
      filtro_category: "",
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
    filtro_category() {
      this.array_categorias = this.array_categoria_base;
      switch (this.filtro_category) {
        case "0": //Todas
          return (this.array_categorias = this.array_categoria_base);
        case "1": //Completas
          this.array_categorias = this.array_categorias.filter(
            (e) => e.estado == true
          );
          break;
        case "2": //Incompletas
          this.array_categorias = this.array_categorias.filter(
            (e) => e.estado == false
          );
          break;
        default:
          return (this.array_categorias = this.array_categoria_base);
      }
    },
  },
  computed: {},
  mounted() {
    this.getAllCategories();
  },

  methods: {
    ...mapActions({
      _getPublicoGeneral: "miembro_votante/_getPublicoGeneral",
      _getCatergoriasComite: "categorias/_getCatergoriasComite",
      _getVotePublico: "miembro_votante/_getVotePublico",
      _terminarVotacion: "votaciones/_terminarVotacion",
      _getVotaciones: "votaciones/_getVotaciones",
      _addVotacion: "votaciones/_addVotacion",
      _getVotos: "miembro_votante/_getVotos",
    }),
    consultarPostulaciones(item) {
      this.$router.push({
        path: "/publico-general/postulados",
        query: {
          id: item.id,
          name_catetgory: item.nameCategory,
        },
      });
    },
    cancel() {
      this.ALTD_();
    },

    async getAllCategories() {
      const categories = await this._getPublicoGeneral();
      // const RES = await this._getVotos();
      // categories.data.data.map((item) => {
      //   RES.data.data.find((e) => e.categoryId == item.id) ? (item.estado = true) : (item.estado = false);
      // });
      // const data = categories.data.data.filter((e) => e.groupCategoryId == 7);
      const data = categories.data.data;
      this.array_categorias = data;

      this.array_categorias = this.array_categorias.map((e) => {
        return { ...e, votado: false };
      });

      this.array_categoria_base = data;
      this.array_categoria_base = this.array_categorias.map((e) => {
        return { ...e, votado: false };
      });

      this.getAllVotes();
    },

    async getAllVotes() {
      const data = await this._getVotePublico();
      const votos = data?.data.data;
      if (votos.length >= 0) {
        for (let i = 0; i < votos.length; i++) {
          const categoria_votada = this.array_categorias.findIndex(
            (e) => e.id == votos[i].categoryId
          );

          if (this.array_categorias[categoria_votada])
            this.array_categorias[categoria_votada].votado = true;
        }
      }
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
  width: 75%;
  margin: auto;
  padding-top: 2rem;
}

.category {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  margin-bottom: 1rem;
  cursor: pointer;
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
</style>
