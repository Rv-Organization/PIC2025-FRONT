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
          <b>Pimera vez: </b> {{ this.usuario_votante.firstTime ? "Si" : "No" }}
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
          <iframe
            height="500px"
            width="500px"
            class="container"
            :src="fotocapia_documento"
          ></iframe>
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
              <v-expansion-panel
                v-for="(item, index) in usuario_votante.groupCategoryVoters"
                v-model="expandedPanels[index]"
                :key="index"
              >
                <v-expansion-panel-header>
                  {{ getCategoryName(item.groupCategoryId) }}
                  <v-spacer> </v-spacer>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  v-for="categoria in categoriasPorGrupo[item.groupCategoryId]"
                >
                  <v-checkbox
                    :label="categoria.nameCategory"
                    v-model="idCategory"
                    :value="categoria.id"
                    disabled
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
                </v-expansion-panel-header>
                <v-expansion-panel-content v-for="categoria in categoriasPorGrupo[item.Id]">
                  <v-checkbox
                    :label="categoria.nameCategory"
                    :value="categoria.Id"
                    v-model="idCategory"
                    disabled
                  ></v-checkbox>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-col>
      </v-row>
      <v-row class="mt-12 justify-center">
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
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { CURRTET_USER } from "../../global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  props: { usuario_votante: Object },
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
          rules: [
            (v) => !!v || "Celular es requerido",
            (v) => v.length >= 10 || "Numero celular invalido",
          ],
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
          rules: [
            (v) => !!v || "Email es requerido",
            (v) => /.+@.+\..+/.test(v) || "Email no es valido",
          ],
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
    this.groupCategoryVotersFormat = this.usuario_votante.groupCategoryVoters.map(
      (e) => e.groupCategoryId
    );
    this.obtenerCategorias();
  },
  methods: {
    ...mapActions({
      _getCatergorias: "categorias/_getCatergorias",
    }),

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
          return "Categoria desconocida";
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
              this.groupCategory = this.groupCategory.filter(
                (e) => e.Id != categoria.groupCategoryId
              );

              if (subCategorias.includes(idCategory)) {
                this.idCategory.push(idCategory);
              }
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
