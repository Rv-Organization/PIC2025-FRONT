<template>
  <v-container class="container-channel">
    <v-card class="pt-y" elevation="0">
      <h2 class="text-center bg-color py-12">Panel administrativo</h2>
      <div class="line mb-8"></div>
    </v-card>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" class="d-flex">
        <v-btn fab color="boton" class="botone d-flex" x-small elevation="0" sm-d-none @click="retroceder()"><v-icon
            color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <h3 class="ml-4">{{ this.$route.query.name }}</h3>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" class="py-0 pt-3 text-end">
        <h3 v-if="['0', ''].includes(filtro_category)">
          {{ total_votadas.length }} de {{ array_categorias.length }} Completos
        </h3>
        <h3 v-if="filtro_category == 1">{{ array_categorias.length }} Completos</h3>
        <h3 v-if="filtro_category == 2">{{ array_categorias.length }} Incompletos</h3>
        <h3 v-if="filtro_category == 3">{{ array_categorias.length }} Sin nominar</h3>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="py-0 pt-6 mb-6">
        <v-autocomplete @input="buscar = buscar.toUpperCase()" prepend-icon="mdi-filter" label="Filtrar categorias"
          v-model="filtro_category" item-value="id" item-color="primary" :items="[
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
            {
              id: '3',
              text: 'Sin nominar',
            },
            {
              id: '4',
              text: 'Abstenidas',
            },
          ]" outlined rounded dense></v-autocomplete>
      </v-col>
      <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="py-0 pt-6 mb-6">
        <v-text-field label="Buscar categorias" v-model="buscar" @input="buscar = buscar.toUpperCase()" outlined rounded
          prepend-icon="mdi-magnify" dense></v-text-field>
      </v-col>
    </v-row>
    <transition-group name="fade">
      <v-card :disabled="estado_votaciones?.data?.data || item.vcc || !item.votes?.length"
        v-for="item in array_categorias" :key="item.nameCategory" class="py-5 my-2" cols="12">
        <v-row class="align-center mx-3">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <h4>{{ item.nameCategory }}</h4>
          </v-col>
          <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3">
            <a style="font-size: 18px" class="icon--text underline" @click="consultarPostulaciones(item)">Ver Detalles</a>
          </v-col>
          <v-col cols="6" xs="16" sm="6" md="3" lg="3" xl="3" class="text-center">
            <div v-if="item.postulations.length == 3 || item.postulations.length == 4">
              <h3 v-if="!item.vcc">{{ item.votes.length }}/3</h3>
              <v-btn v-if="item.votes.length == 0 && !item.vcc" dark small color="#FFEBB8" rounded class="botone"
                elevation="0">
                <h3 class="black--text">Sin nominar</h3>
              </v-btn>
              <v-btn v-if="item.votes.length > 0 && item.votes.length != 3 && !item.vcc" dark small color="#FFEBB8"
                rounded class="botone" elevation="0">
                <h3 class="black--text">Incompleto</h3>
              </v-btn>
              <v-btn v-if="item.votes.length == 3 && !item.vcc" dark small color="#C2FFD0" rounded class="botone"
                elevation="0">
                <h3 class="black--text">Completo</h3>
              </v-btn>
            </div>
            <div v-if="item.postulations.length == 5 || item.postulations.length == 6">
              <h3 v-if="!item.vcc">{{ item.votes.length }}/4</h3>
              <v-btn v-if="item.votes.length == 0 && !item.vcc" dark small color="#FFBEBE" rounded class="botone"
                elevation="0">
                <h3 class="black--text">Sin nominar</h3>
              </v-btn>
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-if="item.votes.length == 0 && !item.vcc" @click="abstenerse(item)" v-bind="attrs" v-on="on"
                    class="pr-2" color="info">mdi-information-outline</v-icon>
                </template>
                <span>Si deseas abstenerse de votar en esta categoría, haz clic en el botón sin
                  nominar.</span>
              </v-tooltip>
              <v-btn v-if="item.votes.length > 0 && item.votes.length != 4 && !item.vcc" dark small color="#FFEBB8"
                rounded class="botone" elevation="0">
                <h3 class="black--text">Incompleto</h3>
              </v-btn>
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-if="item.votes.length > 0 && item.votes.length != 4 && !item.vcc" @click="abstenerse(item)"
                    v-bind="attrs" v-on="on" class="pr-2" color="info">mdi-information-outline</v-icon>
                </template>
                <span>Si deseas abstenerse de votar en esta categoría, haz clic en el botón
                  incompleto.</span>
              </v-tooltip>
              <v-btn v-if="item.votes.length == 4 && !item.vcc" dark small color="#C2FFD0" rounded class="botone"
                @click="abstenerse(item)" elevation="0">
                <h3 class="black--text">Completo</h3>
              </v-btn>
              <v-btn v-if="item.vcc" dark small color="#C2FFD0" rounded class="botone" elevation="0">
                <h3 class="black--text">Abstención</h3>
              </v-btn>
            </div>
            <div v-if="item.postulations.length > 6">
              <h3 v-if="!item.vcc">{{ item.votes.length }}/5</h3>
              <v-btn v-if="item.votes.length == 0 && !item.vcc" dark small color="#FFBEBE" rounded class="botone"
                elevation="0">
                <h3 class="black--text">Sin nominar</h3>
              </v-btn>

              <v-icon v-if="item.votes.length == 0 && !item.vcc" @click="abstenerse(item)" class="pr-2"
                color="info">mdi-information-outline</v-icon>

              <v-btn v-if="item.votes.length > 0 && item.votes.length != 5 && !item.vcc" dark small color="#FFEBB8"
                rounded class="botone" elevation="0">
                <h3 class="black--text">Incompleto</h3>
              </v-btn>

              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-if="item.votes.length > 0 && item.votes.length != 5 && !item.vcc" @click="abstenerse(item)"
                    v-bind="attrs" v-on="on" class="pr-2" color="info">mdi-information-outline</v-icon>
                </template>
                <span>Si deseas abstenerse de votar en esta categoría, haz clic en el botón
                  incompleto.</span>
              </v-tooltip>
              <v-btn v-if="item.votes.length == 5 && !item.vcc" dark small color="#C2FFD0" rounded class="botone"
                elevation="0">
                <h3 class="black--text">Completo</h3>
              </v-btn>
              <v-btn v-if="item.vcc" dark small color="#C2FFD0" rounded class="botone" elevation="0">
                <h3 class="black--text">Abstención</h3>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </transition-group>
    <v-container class="text-center pb-12"> </v-container>
    <h2 v-if="array_categorias.length == 0">No exiten datos</h2>
    <h2>{{ validar_buscar ? "No se encontraron coincidencias" : "" }}</h2>
    <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirmar()" :alert="alert"
      v-if="alert.estado" />
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
      format_certificado: "",
      format_carta: "",
      format_logo: "",
      frames: {},
      id_categoria: "",
      validacion: true,
      estado: false,
      array_categorias: [],
      array_categoria_base: [],
      validar_buscar: false,
      total_votadas: 0,
      buscar: "",
      filtro_category: "",
      estado_votaciones: false,
      miembros_comite: [],
      idCategory:"",
    };
  },
  watch: {
    filtro_category() {
      this.array_categorias = this.array_categoria_base;
      switch (this.filtro_category) {
        case "0": //Todas
          return (this.array_categorias = this.array_categoria_base);
        case "1": //Completas
          this.array_categorias = this.array_categorias.filter(
            (e) => e.nominationsAllowed == e.total
          );
          break;
        case "2": //Incompleto
          this.array_categorias = this.array_categorias.filter(
            (e) => e.nominationsAllowed != e.total && e.votes.length != 0
          );
          break;
        case "3": //Sin nominar
          return (this.array_categorias = this.array_categorias.filter(
            (e) => e.votes.length == 0 && !e.vcc
          ));
        case "4": //Abstenerse
          return (this.array_categorias = this.array_categorias.filter((e) => e.vcc));
        default:
          return (this.array_categorias = this.array_categoria_base);
      }
    },
    buscar() {
      this.array_categorias = this.array_categoria_base;
      let filtro = this.array_categorias.filter((categoria) =>
        categoria.nameCategory.includes(this.buscar)
      );
      this.array_categorias = filtro;
      this.validar_buscar = this.array_categorias.length == 0 ? true : false;
    },
  },
  computed: {},
  mounted() {
    this.getAllCategories();
    //this.estadoVotacion();
    this.consultarMiembros();
  },

  methods: {
    ...mapActions({
      _getCatergoriasComiteAdmin: "categorias/_getCatergoriasComiteAdmin",
      _terminarVotacion: "votaciones/_terminarVotacion",
      _getVotaciones: "votaciones/_getVotaciones",
      _addVotacion: "votaciones/_addVotacion",
      _getMiembrosComite: "admin/_getMiembrosComite",
    }),
    validarVotar() {
      this.ALT_("VOTO-01", "warning", "p", () => this.terminarVoto(true));
    },
    async estadoVotacion() {
      this.estado_votaciones = await this._getVotaciones();
      if (this.estado_votaciones?.data?.data)
        this.ALT_("VOTO-05", "info", "", () => this.terminarVoto(false));
    },

    async abstenerse(item) {
      let editar_indice = this.array_categorias.indexOf(item);
      let item_select = Object.assign({}, item);
      this.ALT_("VOTO-03", "info", "p", async () => {
        const RES = await this._addVotacion(item?.id);
        if ("userId" in RES.data.data) {
          item_select.vcc = true;
          Object.assign(this.array_categorias[editar_indice], item_select);
          this.ALT_("VOTO-01", "success", "", () => this.terminarVoto(false));
        }
      });
    },
    async terminarVoto(data) {
      if (data) {
        const RES = await this._terminarVotacion();
        if (RES.data.data) {
          setTimeout(() => {
            this.ALT_("VOTO-03", "success", "");
          }, 100);
          location.reload();
        } else {
          setTimeout(() => {
            this.ALT_("VOTO-06", "info", "");
          }, 100);
        }
      } else {
        setTimeout(() => {
          this.ALT_("VOTO-02", "warning", "p", () => this.terminarVoto(true));
        }, 100);
      }
      localStorage.cerrar_votacion = true;
    },
    total_category_(item) {
      if (item.postulations.length == 3 || item.postulations.length == 4) {
        return 3;
      } else if (item.postulations.length == 5 || item.postulations.length == 6) {
        return 4;
      } else if (item.postulations.length > 6) {
        return 5;
      }
    },
    consultarPostulaciones(item) {
      let total_category;

      if (item.postulations.length == 3 || item.postulations.length == 4) {
        total_category = 3;
      } else if (item.postulations.length == 5 || item.postulations.length == 6) {
        total_category = 4;
      } else if (item.postulations.length) {
        total_category = 5;
      }

      this.$router.push({
        path: "/admin/postulados/comite-tecnico",
        query: {
          id: item.id,
          total_category,
          titulo: item.nameCategory,
          panel: "CATEGORIA",
          postulations: item.postulations,
          userId: this.$route.query.id,
          name:this.$route.query.name
        },
      });
    },
    cancel() {
      this.ALTD_();
    },
    retroceder() {
      window.history.back(); //para devolver esta molestando Pendiente por revisar
    },
    async consultarMiembros() {
      const RES = await this._getMiembrosComite();
      if (RES.data?.data) {
        this.miembros_comite = RES.data.data;
      }
    },
    async getAllCategories() {
      const id = this.$route.query.id;
      const categories = await this._getCatergoriasComiteAdmin(id);
      this.array_categorias = categories.data.data;
      this.total_votadas = this.array_categorias.filter(
        (e) => e.nominationsAllowed == e.total || e.vcc
      );
      this.array_categoria_base = categories?.data?.data;
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

/* .fade-leave-active below version 2.1.8 */
  {
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
</style>
