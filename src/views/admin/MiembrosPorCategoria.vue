<template>
  <v-app>
    <v-container fluid class="bg-color">
      <v-card elevation="0" class="mt-6 mx-10">
        <h2 class="text-center bg-color py-12">Panel administrativo</h2>
        <div class="line"></div>
      </v-card>
      <v-row class="container-channel my-10">
        <v-col cols="12" class="mt-0 pt-0">
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
              <v-row>
                <v-col cols="1" class="my-4 mr-3">
                  <v-btn
                    fab
                    color="boton"
                    class="botone d-flex"
                    x-small
                    elevation="0"
                    sm-d-none
                    @click="retroceder"
                    ><v-icon color="white">mdi-arrow-left</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="10" class="my-4">
                  <h3>{{ nameCategory }}</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card-title>
                Filtro de busqueda
                <v-spacer></v-spacer>
                <v-text-field
                  dense
                  outlined
                  hide-details
                  label="Buscar"
                  v-model="search"
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :items="voterMember"
                class="elevation-1"
                :headers="headers"
                :search="search"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon class="mx-1" small @click="verMiembroVotante(item)">
                    mdi-eye
                  </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
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
    <VOTANTE v-if="usuario_votante.estado" :usuario_votante="usuario_votante" />
  </v-app>
</template>

<script>
import VOTANTE from "../../components/miembro-votante/VerVotanteGestion.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: { VOTANTE },
  data() {
    return {
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Apellido", value: "lastName" },
        { text: "Canal", value: "channel" },
        { text: "Correo", value: "email" },
        { text: "", value: "actions" },
      ],
      voterMember: [],
      index: -1,
      search: null,
      usuario_votante: { estado: false },
      nameCategory: null,
    };
  },
  watch: {
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
    this.nameCategory = this.$route.query.nameCategory;
    this.getMiembrosVoter(this.$route.query?.id);
  },
  methods: {
    ...mapActions({
      _getCategoryMember: "admin/_getCategoryMember",
    }),

    async getMiembrosVoter(id) {
      if (!id)
        return this.ALT_(
          "",
          "info",
          null,
          null,
          this.ALTD_,
          "No existe parametros para ver los miembros"
        );
      try {
        const response = await this._getCategoryMember(id);
        this.voterMember = response;
      } catch (error) {
        this.ALT_("", "warning", null, null, this.ALTD_, error);
      }
    },
    verMiembroVotante(item) {
      this.index = this.voterMember.indexOf(item);
      this.usuario_votante.estado = true;
      Object.assign(this.usuario_votante, item);
    },
    cancel() {
      this.ALTD_();
    },
    retroceder() {
      window.history.back();
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
  border: 1px solid #d9d9d9;
  border-radius: 10px;
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
