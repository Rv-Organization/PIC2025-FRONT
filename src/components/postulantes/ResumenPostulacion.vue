<template>
  <v-dialog
    v-model="postulacion.estado"
    persistent
    width="700"
    class="rounded-0 border-card"
  >
    <v-card width="700" class="mx-auto border-card">
      <v-footer color="white" class="mb-0 pb-0" height="80">
        <h2 class="mx-auto py-6">Registro de postulación</h2>
        <v-btn icon @click="postulacion.estado = false">
          <v-icon size="30" color="accent"> mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-footer>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" v-if="tipo_postulacion == 1">
            <h3 class="mx-4">
              Categoría a la cual se postulará la producción:
            </h3>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            class="py-0"
            v-if="tipo_postulacion == 1"
          >
            <AUTOCOMPLETE :field="form.categoria" class="mx-4" />
          </v-col>
          <v-col cols="12" class="py-0" v-if="tipo_postulacion == 1">
            <h5 class="mx-4 pb-2 mt-0">
              Resumen de categorías en las que se ha postulado la producción.
              ({{ this.desserts.length + this.dessertsTaltento.length }})
            </h5>
          </v-col>
          <!-- :items-per-page="3" -->
          <v-col cols="12" class="py-0" v-if="tipo_postulacion == 1">
            <v-data-table
              class="elevation-2 border-card mx-4"
              :items="dessertsTaltento"
              :headers="headers"
              height="130"
              dense
            >
              <template v-slot:[`item.actions1`]="{ item }">
                <v-icon small class="mr-2" @click="verPostulacion(item)">
                  mdi-eye
                </v-icon>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editarPostulacion(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="eliminarPostulacion(item)" color="red">
                  mdi-trash-can-outline
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="12" v-if="tipo_postulacion == 2">
            <h3 class="mx-4">Categoría a la cual se postulará el talento:</h3>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            class="py-0"
            v-if="tipo_postulacion == 2"
          >
            <AUTOCOMPLETE :field="form.talento" class="mx-4" />
          </v-col>
          <v-col cols="12" class="py-0" v-if="tipo_postulacion == 2">
            <v-data-table
              height="130"
              class="elevation-2 border-card mx-4"
              :headers="headers"
              :items="desserts"
              dense
            >
              <template v-slot:[`item.actions1`]="{ item }">
                <v-icon small class="mr-2" @click="verPostulacion(item)">
                  mdi-eye
                </v-icon>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editarTalento(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="eliminarPostulacion(item)" color="red">
                  mdi-trash-can-outline
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-card-actions class="mx-0 pt-10">
          <v-container class="text-center">
            <v-btn
              outlined
              @click="eliminarPrograma()"
              class="botone mr-4"
              width="200"
              dark
              color="boton"
            >
              Eliminar producción</v-btn
            >
            <v-btn
              @click="editarPrograma()"
              class="botone"
              dark
              width="200"
              color="boton"
            >
              Editar producción</v-btn
            >
          </v-container>
        </v-card-actions>
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
    <DETALLE
      :datos="datos_detalle"
      v-if="estado_modal_detalle"
      @cerrar="estado_modal_detalle = false"
    />
  </v-dialog>
</template>

<script>
import DETALLE from "./DetallePostulacion.vue";
import { AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";

export default {
  components: {
    DETALLE,
  },
  mixins: [AUTOCOMPLETE, ALERTA],
  props: {
    postulacion: Object,
    programa: {},
    tipo_postulacion: Number,
  },

  data() {
    return {
      nombre_talento: "",
      estado_modal_detalle: false,
      datos_detalle: {},

      delete_programa: false,
      delete_postulacion: false,
      id_postulacion: 0,
      estado: false,
      postulaciones: [],
      categoria_lista: [],
      talento_lista: [],
      categoria: {},
      talento: {},
      form: {
        categoria: {
          value: "",
          id: "categoria",
          label: "Seleccionar categoria",
          items: [],
          item_text: "nameCategory",
          rules: [(v) => !!v || "Categoria es requerida"],
        },
        talento: {
          value: "",
          id: "talento",
          label: "Seleccionar talento",
          items: [],
          item_text: "nameCategory",
          rules: [(v) => !!v || "Categoria es requerida"],
        },
      },
      headers: [
        {
          text: "Catergoria",
          align: "center",
          sortable: false,
          value: "categoria",
        },
        { text: "Postulado", align: "center", value: "postulacion" },
        { text: "Previsualizacón", align: "center", value: "actions1" },
        { text: "Opción", value: "actions", sortable: false },
      ],
      desserts: [],
      dessertsTaltento: [],
    };
  },
  watch: {
    "form.categoria.value"() {
      this.categoria = this.categoria_lista.find(
        (categoria, i) =>
          categoria.nameCategory === `${this.form.categoria.value}`
      );
      this.$router.push({
        name: "/postulantes/registro-postulacion",
        params: {
          data: { programa: this.programa, postulacion: this.categoria },
        },
      });
    },
    "form.talento.value"() {
      this.talento = this.talento_lista.find(
        (talento) => talento.nameCategory === `${this.form.talento.value}`
      );
      this.$router.push({
        name: "/postulantes/registro-talento",
        params: {
          data: { programa: this.programa, postulacion: this.talento },
        },
      });
    },
  },
  created() {
    this.obteberCategorias();
    this.obtenerPostulaciones();
  },
  methods: {
    ...mapActions({
      _getCatergorias: "categorias/_getCatergorias",
      _deletePrograma: "programas/_deletePrograma",
      _getPostulation: "postulacion/_getPostulation",
      _deletePostulation: "postulacion/_deletePostulation",
      _getPostulationNoinscritas: "postulacion/_getPostulationNoinscritas",
    }),
    async obteberCategorias() {
      const respuesta = await this._getCatergorias();

      const programa = [];
      const talento = [];
      const programa_1 = [];
      const talento_1 = [];
      const res = await this._getPostulationNoinscritas(this.programa.id);

      for (let i = 0; i < respuesta.data.data.length; i++) {
        if (respuesta.data.data[i].typeCategoryId == 2)
          programa.push(respuesta.data.data[i]);
        else talento.push(respuesta.data.data[i]);
      }

      for (let i = 0; i < respuesta.data.data.length; i++) {
        if (respuesta.data.data[i].typeCategoryId == 2)
          programa_1.push(respuesta.data.data[i]);
        else talento_1.push(respuesta.data.data[i]);
      }

      this.form.categoria.items = JSON.stringify(programa_1);
      this.form.categoria.items = JSON.parse(this.form.categoria.items);

      this.form.talento.items = JSON.stringify(talento_1);
      this.form.talento.items = JSON.parse(this.form.talento.items);

      this.categoria_lista = programa;

      this.talento_lista = talento;
    },

    async obtenerPostulaciones() {
      const respuesta = await this._getPostulation(this.programa.id);

      this.postulaciones = respuesta.data.data;
      let newDessertTalento = [];
      let newDesserts = [];
      for (let i = 0; i < respuesta.data.data.length; i++) {
        if (respuesta.data.data[i].typePostulation == "2") {
          newDessertTalento.push({
            categoria: respuesta.data.data[i].category.nameCategory,
            postulacion: respuesta.data.data[i].name,
            id: respuesta.data.data[i].id,
            video: respuesta.data.data[i].video,
          });
        } else {
          newDesserts.push({
            categoria: respuesta.data.data[i].category.nameCategory,
            postulacion: respuesta.data.data[i].name,
            poster_talento: respuesta.data.data[i].photo,
            id: respuesta.data.data[i].id,
            video: respuesta.data.data[i].video,
          });
        }
      }
      this.dessertsTaltento = newDessertTalento;
      // this.dessertsTaltento.forEach((element) => {
      //   this.form.categoria.items = this.categoria_lista.filter((e) => element.categoria != e.nameCategory);
      // });
      this.desserts = newDesserts;

      // this.desserts.forEach((element) => {
      //   this.form.talento.items = this.talento_lista.filter((e) => element.categoria != e.nameCategory);
      // });
    },

    cancel() {
      this.ALTD_();
    },
    async confirmar() {
      if (this.delete_programa) {
        await this._deletePrograma(this.programa.id);
        this.ALTD_();
        this.postulacion.estado = false;
        this.delete_programa = false;
        location.reload();
      }
      if (this.delete_postulacion) {
        await this._deletePostulation(this.id_postulacion);
        await this.obtenerPostulaciones();
        this.ALTD_();
      }
    },
    editarPrograma() {
      this.$router.push({
        name: "/postulantes/registro-produccion",
        params: { data: { programa: this.programa } },
      });
    },

    verPostulacion(item) {
      this.datos_detalle = {
        id: item.id,
        video: item.video,
        programId: this.programa.id,
        postulacion: this.programa,
        tipo: this.tipo_postulacion,
        nombre_categoria: item.categoria,
        nombre_talento: item.postulacion,
        foto_talento: item.poster_talento,
      };
      this.estado_modal_detalle = true;
    },
    editarPostulacion(item) {
      this.postulacion = item;
      const categoria = this.categoria_lista.find(
        (categoria) => categoria.nameCategory === `${item.categoria}`
      );
      this.$router.push({
        name: "/postulantes/registro-postulacion",
        params: {
          data: {
            programa: this.programa,
            postulacion: categoria,
            id: item.id,
          },
        },
      });
    },
    editarTalento(item) {
      this.postulacion = item;
      const categoria = this.talento_lista.find(
        (categoria) => categoria.nameCategory === `${item.categoria}`
      );
      this.$router.push({
        name: "/postulantes/registro-talento",
        params: {
          data: {
            programa: this.programa,
            postulacion: categoria,
            id: item.id,
          },
        },
      });
    },
    eliminarPrograma() {
      this.delete_programa = true;
      this.ALT_("deleteProgram", "info", "p");
    },
    eliminarPostulacion(item) {
      this.id_postulacion = item.id;
      this.delete_postulacion = true;
      this.ALT_("deletePostulacion", "info", "p");
    },
  },
};
</script>
<style scoped>
.border-card {
  border-radius: 10px;
}
.border-footer {
  border-radius: 10px;
}
</style>
