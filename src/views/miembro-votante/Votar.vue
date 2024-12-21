<template>
  <v-container class="container-channel">
    <v-row>
      <v-col>
        <h2 class="mb-6">Panel de evaluadores</h2>
        <h3>
          En este panel encontrará {{ array_categorias.length }} categorías que tienes asignadas para realizar la evaluación de todas las
          postulaciones en cada una de ellas. Para evaluar, debes ingresar en la categoría, revisar el material de cada postulación y dar una
          puntuación de acuerdo con los criterios de evaluación. Es requisito fundamental hacer el ejercicio con todas las postulaciones.
        </h3>
        <v-divider class="my-4"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        Nota: Cada evaluación que realices quedará guardada y podrás modificarla cuentas veces creas necesario hasta terminar con el proceso.
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
      <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="py-0 pt-6 mb-6">
        <v-text-field
          @input="buscar = buscar.toUpperCase()"
          v-if="array_categorias.length != 0"
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
    <!-- <div v-if="array_categorias.length == 0" class="red--text">
      No has sido seleccionado en ningún criterio para la votación
    </div> -->
    <div v-if="array_categorias.length == 0 && mostrar_mensaje" class="red--text">No has sido seleccionado en ningún criterio para la votación</div>
    <transition-group name="fade">
      <v-card
        class="py-4 my-2 category default-cursor"
        @click="consultarPostulaciones(item)"
        v-for="item in array_categorias"
        :key="item.id"
        cols="12"
      >
        <v-row class="align-center mx-3">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <h4>{{ item.nameCategory }}</h4>
          </v-col>
          <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3" class="text-end">
            <a style="font-size: 18px" class="icon--text underline">Ver postulados</a>
          </v-col>
          <v-col cols="6" xs="16" sm="6" md="3" lg="3" xl="3" class="text-center" v-if="![6].includes(usuario.roleId)">
            <v-btn v-if="item.isCompleted" class="botone py-1 px-6 default-cursor" elevation="0" color="green" rounded>
              <h4 class="black--text">Completo</h4>
            </v-btn>
            <v-btn v-else rounded elevation="0" color="#FFEBB8" class="botone py-1 px-6 default-cursor">
              <h4 class="black--text">incompleto</h4>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </transition-group>
    <h2>{{ validar_buscar ? "No se encontraron coincidencias" : "" }}</h2>
    <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirmar()" :alert="alert" v-if="alert.estado" />
  </v-container>
</template>
<script>
import POSTULACIONXCATEGORIA from "../admin/PostulacionPorCategorias.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";
import { CURRTET_USER } from "../../global";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: { POSTULACIONXCATEGORIA },
  data() {
    return {
      usuario: {},
      estado: false,
      array_categorias: [],
      array_categoria_base: [],
      mostrar_mensaje: false,
      validar_buscar: false,
      filtro_category: "",
      buscar: "",
    };
  },
  watch: {
    buscar() {
      this.array_categorias = this.array_categoria_base;
      let filtro = this.array_categorias.filter((categoria) => categoria.nameCategory.toUpperCase().includes(this.buscar));
      this.array_categorias = filtro;
      this.validar_buscar = this.array_categorias.length == 0 ? true : false;
    },
    filtro_category() {
      this.array_categorias = this.array_categoria_base;
      switch (this.filtro_category) {
        case "0": //Todas
          return (this.array_categorias = this.array_categoria_base);
        case "1": //Completas
          this.array_categorias = this.array_categorias.filter((e) => e.estado == true);
          break;
        case "2": //Incompletas
          this.array_categorias = this.array_categorias.filter((e) => e.estado == false);
          break;
        default:
          return (this.array_categorias = this.array_categoria_base);
      }
    },
  },
  computed: {},
  mounted() {
    this.usuario = CURRTET_USER;
    this.getAllCategories();
  },

  methods: {
    ...mapActions({
      _getCategoriasMimbroVotante: "miembro_votante/_getCategoriasMimbroVotante",
      _getCategoriasIberoAmericano: "miembro_votante/_getCategoriasIberoAmericano",
      _getCatergoriasComite: "categorias/_getCatergoriasComite",
      _terminarVotacion: "votaciones/_terminarVotacion",
      _getVotaciones: "votaciones/_getVotaciones",
      _addVotacion: "votaciones/_addVotacion",
      _getVotos: "miembro_votante/_getVotos",
    }),
    consultarPostulaciones(item) {
      this.$router.push({
        path: "/miembro-votante/postulados",
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
      let categories;
      if (this.usuario.roleId == 6) {
        categories = await this._getCategoriasIberoAmericano();
      } else {
        categories = await this._getCategoriasMimbroVotante();
      }
      const response = await this._getVotos();
      categories?.data?.data.map((item) => {
        response?.data?.data.find((e) => e.categoryId == item.id) ? (item.estado = true) : (item.estado = false);
      });

      this.array_categorias = categories?.data?.data;
      this.array_categoria_base = categories?.data?.data;
      if (this.array_categorias?.length === 0) this.mostrar_mensaje = true;
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
