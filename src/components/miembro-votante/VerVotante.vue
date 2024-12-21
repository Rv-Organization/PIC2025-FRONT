<template>
  <v-dialog
    v-model="usuario_votante.estado"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="usuario_votante.estado = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Miembro Acreditado de la industria</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row class="justify-center">
        <v-col cols="10 px-8 mt-15">
          <h2>
            {{ this.usuario_votante.name + " " + this.usuario_votante.lastName }}
          </h2>
          <hr color="E4CC8E" class="mb-5 mt-2" />
          <b>Correo Electrónico: </b> {{ this.usuario_votante.email }} <br />
          <b>Celular: </b> {{ this.usuario_votante.celPhone }} <br />
          <b>Documento: </b> {{ this.usuario_votante.document }} <br />
          <b>Pimera vez: </b> {{ this.usuario_votante.firstTime ? "Si" : "No" }}<br />
          <b v-if="!this.usuario_votante.firstTime">Fecha de la ultima vez: </b>
          {{
            this.usuario_votante.datePrevious
              ? this.usuario_votante.datePrevious.slice(0, 10)
              : "Fecha no registrada"
          }}
          <br />
          <b>Canal: </b> {{ this.usuario_votante.channel }} <br />
          <b>Cargo: </b> {{ this.usuario_votante.position }} <br />
          <b>Ocupacion: </b> {{ this.usuario_votante.occupation }} <br />
          <br />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="10">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th colspan="3"><h2>Proyectos representativos</h2></th>
                </tr>
                <tr>
                  <th>Nombre del proyecto</th>
                  <th>Canal/Plataforma de emisión</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in usuario_votante.projects" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.channel }}</td>
                  <td v-if="item.occupationId == 35">Otro: {{ item.otherOccupation }}</td>
                  <td v-else>{{ item.occupation.description }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row class="justify-center py-10">
        <v-col cols="10">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th colspan="3"><h2>Experiencia profesional</h2></th>
                </tr>
                <tr>
                  <th>Nombre de la empresa</th>
                  <th>Cargo</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de finalización</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in usuario_votante.positionRepresentatives" :key="item.id">
                  <td>{{ item.companyName }}</td>
                  <td v-if="item.occupationId == 35">Otro: {{ item.otherOccupation }}</td>
                  <td v-else>{{ item.occupation.description }}</td>
                  <td>{{ item.dateInital }}</td>
                  <td>{{ item.dateFinal }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <br />
      <br />
      <v-row class="justify-center">
        <h2 class="my-8">Documentos Adjuntos</h2>
        <v-col cols="12" class="py-4">
          <v-img :src="foto" height="500px" width="500px" class="container"></v-img>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="10" class="py-4">
          <iframe height="500px" width="500px" class="container" :src="fotocapia_documento"></iframe>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="10" class="py-4">
          <iframe height="500px" width="500px" class="container" :src="hoja_vida"></iframe>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="10">
          <h2 class="my-8">Categorias Seleccionadas por el usuario</h2>
          <template>
            <v-expansion-panels :value="panelSelect">
              <v-expansion-panel v-for="(item, index) in usuario_votante.groupCategoryVoters" :key="index">
                <v-expansion-panel-header>
                  <h5>
                    {{ getCategoryName(item.groupCategoryId) }}
                    <h5 v-if="validarCumplimiento(item)" class="mt-3">
                      <v-icon color="green" class="text-start">mdi-check-circle</v-icon>
                      cumple
                    </h5>
                    <h5 v-else class="mt-3">
                      <v-icon color="orange" class="text-start">mdi-earbuds-outline</v-icon>
                      Pendiente por revisión
                    </h5>
                  </h5>
                  <v-spacer> </v-spacer>
                  <div class="text-end">
                    <v-btn class="mx-1 white--text" color="red" @click="removeGroupCategory(item)"
                      >Retirar</v-btn
                    >
                    <v-btn class="mx-1 white--text" color="primary" @click="addGroupCategoryCumple(item)"
                      >Cumple</v-btn
                    >
                  </div>
                </v-expansion-panel-header>

                <v-expansion-panel-content v-for="categoria in categoriasPorGrupo[item.groupCategoryId]">
                  <v-checkbox
                    v-model="idCategory"
                    @change="cambiarCategoriasMiembro"
                    :label="categoria.nameCategory"
                    :value="categoria.id"
                  ></v-checkbox>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="10">
          <h2 class="my-8">Categorias no selecionadas</h2>
          <template>
            <v-expansion-panels :value="panelNoSelect">
              <v-expansion-panel v-for="(item, index) in groupCategory" :key="index">
                <v-expansion-panel-header>
                  {{ item.Description }}
                  <v-spacer> </v-spacer>
                  <div class="text-end">
                    <v-btn class="mx-1 white--text" color="green" @click="addGroupCategory(item)"
                      >Agregar</v-btn
                    >
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-for="categoria in categoriasPorGrupo[item.Id]">
                  <v-checkbox
                    v-model="idCategory"
                    :label="categoria.nameCategory"
                    :value="categoria.Id"
                  ></v-checkbox>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-col>
      </v-row>

      <v-row class="mt-12 justify-center">
        <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" v-if="[1, 4].includes(usuario_votante.statusId)">
          <v-btn
            v-if="[1, 4].includes(usuario_votante.statusId)"
            @click="$emit('rechazar', usuario_votante)"
            class="botone"
            color="error"
            elevation="0"
            large
            block
            dark
            >Rechazar
          </v-btn>
        </v-col>

        <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" v-if="[1, 4].includes(usuario_votante.statusId)">
          <v-btn
            @click="habiliarMiembro"
            class="botone text-center"
            color="success"
            elevation="0"
            large
            block
            dark
            >Habilitar
          </v-btn>
        </v-col>
        <v-col cols="12" v-if="[1, 4].includes(usuario_votante.statusId)" />
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"
          class="text-center"
          v-if="usuario_votante.statusId == 2"
        >
          <div>
            <v-chip color="error">Rechazado</v-chip>
          </div>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"
          class="text-center"
          v-if="usuario_votante.statusId == 3"
        >
          <div>
            <v-chip color="green" dark>Aceptado</v-chip>
          </div>
        </v-col>
        <v-col
          v-if="usuario_votante.statusId == 1"
          class="mb-15"
          cols="12"
          xs="8"
          sm="8"
          md="8"
          lg="8"
          xl="8"
        >
          <v-btn @click="revisarMiembro" class="botone" elevation="0" color="blue" large block dark
            >Marcar como revisado
          </v-btn>
        </v-col>
        <v-col class="mb-15" cols="12" xs="8" sm="8" md="8" lg="8" xl="8">
          <v-btn
            @click="usuario_votante.estado = false"
            class="botone"
            color="primary"
            elevation="0"
            large
            block
            dark
            >salir
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <ALT :alert="alert" v-if="alert.estado" />
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { CURRTET_USER } from "../../global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  props: {
    usuario_votante: Object,
  },
  data() {
    return {
      idCategory: [],
      idCategoriasNoSelect: [],
      categorias_base: [],
      categoriasPorGrupo: {},
      categoriasNoSeleccionadas: {},
      format_hoja_vida: "",
      pdf_reglamento: null,
      expandedPanels: {},
      panelNoSelect: null,
      panelSelect: null,
      frames: {
        hoja_vida: "",
      },
      groupCategory: [
        { Id: 1, Description: "Ficción" },
        { Id: 2, Description: "Documentales, periodísticos, deportivos e inclusión" },
        { Id: 3, Description: "Variedades, reality, comedia y musical" },
        { Id: 4, Description: "Infantil, juvenil, universitaria y animación" },
        { Id: 5, Description: "Categorías técnicas " },
        { Id: 6, Description: "Transmedia, vodcast y marca" },
      ],
      groupCategoryBase: [
        { Id: 1, Description: "Ficción" },
        { Id: 2, Description: "Documentales, periodísticos, deportivos e inclusión" },
        { Id: 3, Description: "Variedades, reality, comedia y musical" },
        { Id: 4, Description: "Infantil, juvenil, universitaria y animación" },
        { Id: 5, Description: "Categorías técnicas " },
        { Id: 6, Description: "Transmedia, vodcast y marca" },
      ],
      current_user: {},
      validacion: true,
      form: {
        nombres: {
          value: "",
          id: "nombres",
          label: "Nombres *",
          maxlength: "100",
          disabled: true,
          rules: [(v) => !!v || "Nombre de canal es requerido"],
        },
        apellidos: {
          value: "",
          id: "apellidos",
          label: "Apellidos *",
          maxlength: "100",
          disabled: true,
          rules: [(v) => !!v || "apellidos autizado es requerido"],
        },
        celular: {
          value: "",
          id: "celular",
          label: "Celular *",
          tipo: "number",
          maxlength: "13",
          disabled: true,
          rules: [(v) => !!v || "Celular es requerido", (v) => v.length >= 10 || "Numero celular invalido"],
        },
        documento: {
          value: "",
          id: "documento",
          label: "Documento *",
          maxlength: "15",
          tipo: "number",
          disabled: true,
          rules: [
            (v) => !!v || "Documento es requerido",
            (v) => v.length >= 5 || "Numero de documento invalido",
          ],
        },
        email_1: {
          value: "",
          tipo: "email",
          id: "email_1",
          label: "Email *",
          disabled: true,
          maxlength: "150",
          rules: [(v) => !!v || "Email es requerido", (v) => /.+@.+\..+/.test(v) || "Email no es valido"],
        },

        direccion_oficina: {
          value: "",
          id: "direccion_oficina",
          label: "Dirección oficina *",
          maxlength: "100",
          disabled: true,
          rules: [(v) => !!v || "Dirreción de oficina es requerida"],
        },
        cargo: {
          value: "",
          id: "cargo",
          label: "Cargo",
          disabled: true,
          items: [
            { cod: "1", text: "Director de televisión" },
            { cod: "2", text: "Productor de televisión" },
            { cod: "3", text: "Libretista de televisión" },
            { cod: "4", text: "Directores de fotografía para televisión" },
            { cod: "5", text: "Directores de fotografía para televisión" },
            { cod: "6", text: "Editores conceptual de televisión" },
            { cod: "7", text: "Editores conceptual de televisión" },
            { cod: "8", text: "Productores musicales para televisión" },
            { cod: "9", text: "Productores musicales para televisión" },
            { cod: "10", text: "Personal técnico de televisión" },
            {
              cod: "11",
              text: "Personal técnico de televisión (Camarógrafos, luminotécnicos, sonidistas)",
            },
            { cod: "12", text: "Actores de televisión" },
            { cod: "13", text: "Presentadores de televisión" },
            { cod: "14", text: "Presentadores de televisión" },
            { cod: "15", text: "Académicos expertos en televisión" },
            { cod: "16", text: "Académicos expertos en televisión" },
            { cod: "17", text: "Agencias de medios" },
            { cod: "18", text: "Agencias de medios" },
            { cod: "19", text: "Creadores de contenido" },
            { cod: "20", text: "Creadores de contenido" },
            { cod: "21", text: "Anunciantes" },
            { cod: "22", text: "Varios" },
          ],
          rules: [(v) => !!v || "Cargo es requerido"],
        },

        canal_productora: {
          value: "",
          id: "canal_productora",
          disabled: true,
          label: "Canal o productora",
        },
      },
      hoja_vida: this.usuario_votante.curriculumVitae,
      foto: this.usuario_votante.photo,
      fotocapia_documento: this.usuario_votante.documentFotocopy,
      groupCategoryVotersFormat: [],
    };
  },
  watch: {},
  async mounted() {
    Object.assign(this.current_user, CURRTET_USER);
    this.groupCategoryVotersFormat = this.usuario_votante.groupCategoryVoters.map((e) => e.groupCategoryId);
    this.obtenerCategorias();
  },
  methods: {
    ...mapActions({
      _getCatergorias: "categorias/_getCatergorias",
      _agregarGroupCategory: "admin/_agregarGroupCategory",
      _deleteGroupCategory: "admin/_deleteGroupCategory",
    }),

    habiliarMiembro() {
      this.$emit("habilitar", {
        userId: this.usuario_votante.userId,
        categoriesId: this.idCategory,
      });
    },
    cambiarCategoriasMiembro() {
      this.$emit("cambiarCategoria", {
        userId: this.usuario_votante.userId,
        categoriesId: this.idCategory,
      });
    },
    revisarMiembro() {
      this.$emit("revisar", this.usuario_votante);
    },
    async removeGroupCategory(item) {
      const category = this.groupCategoryBase.find((e) => e.Id == item.groupCategoryId);
      const elemnt = this.categorias_base
        .filter((e) => e.groupCategoryId == item.groupCategoryId)
        .map((e) => e.id);

      await this.deleteGroupCategory(item.id);

      this.groupCategory.push(category);
      this.usuario_votante.groupCategoryVoters = this.usuario_votante.groupCategoryVoters.filter(
        (e) => e.groupCategoryId != category.Id
      );
      this.idCategory = this.eliminarIdCategorias(elemnt, this.idCategory);
      this.panelSelect = 0;
      setTimeout(() => (this.panelSelect = null), 10);
      this.cambiarCategoriasMiembro();
    },
    addGroupCategoryCumple(item) {
      const elemnt = this.categorias_base
        .filter((e) => e.groupCategoryId == item.groupCategoryId)
        .map((e) => e.id);

      const uniqueSet = new Set([...this.idCategory, ...elemnt]);
      this.idCategory = [...uniqueSet];
      setTimeout(() => (this.panelSelect = null), 10);
      this.cambiarCategoriasMiembro();
    },
    validarCumplimiento(item) {
      const elemnt = this.categorias_base
        .filter((e) => e.groupCategoryId == item.groupCategoryId)
        .map((e) => e.id);
      const existsInIdCategory = elemnt.some((e) => this.idCategory.includes(e));
      return existsInIdCategory;
    },

    async addGroupCategory(item) {
      const data = {
        GroupCategoryId: item.Id,
        userId: this.usuario_votante.userId,
      };
      await this.agregarGroupCategory(data);

      if (this.usuario_votante.groupCategoryVoters.length >= 3) {
        return this.ALT_(
          "",
          "info",
          "",
          null,
          this.ALTD_,
          "No se puede agregar más de 3 categorías para ser calificador como miembro votante."
        );
      }
      this.usuario_votante.groupCategoryVoters.push({
        groupCategoryId: item.Id,
      });
      this.groupCategory = this.groupCategory.filter((e) => e.Id != item.Id);
      this.panelNoSelect = 0;
      setTimeout(() => {
        this.panelNoSelect = null;
      }, 10);
    },

    async agregarGroupCategory(data) {
      try {
        await this._agregarGroupCategory(data);
      } catch (error) {
        this.ALT_("", "error", null, null, this.ALTD_, error);
      }
    },

    async deleteGroupCategory(id) {
      try {
        await this._deleteGroupCategory(id);
      } catch (error) {
        this.ALT_("", "error", null, null, this.ALTD_, error);
      }
    },

    eliminarIdCategorias(array1, array2) {
      const conjuntoArray1 = new Set(array1);
      const resultado = array2.filter((elemento) => !conjuntoArray1.has(elemento));
      return resultado;
    },

    getCategoryName(categoryId) {
      switch (categoryId) {
        case 1:
          return "Ficción";
        case 2:
          return "Documentales, periodísticos, deportivos e inclusión";
        case 3:
          return "Variedades, reality, comedia y musical";
        case 4:
          return "Infantil, juvenil, universitaria y animación";
        case 5:
          return "Categorías técnicas";
        case 6:
          return "Transmedia, vodcast y marca";
        case 7:
          return "Favoritas del público";
        default:
          return "Desconocida";
      }
    },
    async obtenerCategorias() {
      try {
        const subCategorias = this.usuario_votante.categoryVoters.map((e) => e.categoryId);
        const response = await this._getCatergorias();
        if (response.data?.data) {
          const categorias = response.data.data;
          this.categorias_base = JSON.parse(JSON.stringify(response.data.data));

          categorias.forEach((categoria) => {
            const idCategory = categoria.id;
            if (this.groupCategoryVotersFormat.includes(categoria.groupCategoryId)) {
              this.groupCategory = this.groupCategory.filter((e) => e.Id != categoria.groupCategoryId);
              if (subCategorias.includes(idCategory)) this.idCategory.push(idCategory);
            } else {
              this.idCategoriasNoSelect.push(idCategory);
            }
            const groupId = categoria.groupCategoryId;
            if (!this.categoriasPorGrupo[groupId]) {
              this.$set(this.categoriasPorGrupo, groupId, []);
            }
            if (!this.categoriasNoSeleccionadas[groupId]) {
              this.$set(this.categoriasNoSeleccionadas, groupId, []);
            }
            this.categoriasPorGrupo[groupId].push(categoria);
          });
        }
      } catch (error) {
        console.error("Error al obtener las categorías", error);
      }
    },
  },
};
</script>

<style>
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
