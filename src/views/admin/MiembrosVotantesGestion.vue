<template>
  <v-app>
    <v-card class="pt-1" elevation="0">
      <h2 class="text-center pt-12">Panel administrativo</h2>
      <h3 class="text-center mb-8">Miembros Acreditados de la Industria</h3>
      <div class="line"></div>
    </v-card>
    <v-row class="container-channel">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container fluid>
          <v-row justify="start" class="my-2">
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="12" class="py-0 text-start">
              <h2 class="">Listado miembros registrados</h2>
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
              <v-data-table :items="voterMember" class="elevation-1" :headers="headers" :search="search">
                <template v-slot:item.actions="{ item }">
                  <v-icon class="mx-1" small @click="verVotante(item)"> mdi-eye </v-icon>
                  <v-icon class="mx-1" small @click="validarEliminar(item)"> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <ALT
        :alert="alert"
        @cancel="cancel()"
        @exitEsc="cancel()"
        v-if="alert.estado"
        @cancelAlert="cancelAlert()"
      />
      <VOTANTE v-if="usuario_votante.estado" :usuario_votante="usuario_votante" />
    </v-row>
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
      index: -1,
      search: null,
      voterMember: [],
      deleteItem: {},
      usuario_votante: { estado: false },
      headers: [
        { text: "Nombre", value: "name" },
        { text: "Apellido", value: "lastName" },
        { text: "Canal", value: "channel" },
        { text: "Correo", value: "email" },
        { text: "Eliminar", value: "actions" },
      ],
    };
  },
  mounted() {
    this.consultarMiembros();
  },
  methods: {
    ...mapActions({
      _getMiembroVotantes: "admin/_getMiembroVotantes",
      _eliminarVotante: "admin/_eliminarVotante",
    }),
    async consultarMiembros() {
      try {
        const response = await this._getMiembroVotantes();
        if (response.data?.data) this.voterMember = response.data.data.filter((e) => e.statusId == 1);
      } catch (error) {
        console.error(error);
        this.ALT_("", "warning", null, null, this.ALTD_, error);
      }
    },
    validarEliminar(item) {
      this.index = this.voterMember.indexOf(item);
      this.deleteItem = Object.assign({}, item);
      return this.ALT_(
        "",
        "warning",
        "P",
        () => this.eliminarVotante(item.userId),
        () => this.ALTD_(),
        `Estas seguro de eliminar el miembro votante con el correo ${item.email}`
      );
    },
    async eliminarVotante(id) {
      try {
        const response = await this._eliminarVotante(id);
        if (response.data.success) {
          this.voterMember.splice(this.index, 1);
          this.ALT_("", "success", null, null, this.ALTD_, "Miembro votante eliminado correctamente");
        } else {
          this.ALT_("", "error", null, null, this.ALTD_, "Ocurrio un error eliminando el miembro votante");
        }
      } catch (error) {
        console.error(error);
        this.ALT_("", "error", null, null, this.ALTD_, error);
      }
    },
    verVotante(item) {
      this.index = this.voterMember.indexOf(item);
      this.usuario_votante.estado = true;
      Object.assign(this.usuario_votante, item);
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
.section-card {
  background: #ffffff;
  border: 2px solid #d9d9d9;
  border-radius: 10px;
}
.table-container {
  width: 100%;
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
