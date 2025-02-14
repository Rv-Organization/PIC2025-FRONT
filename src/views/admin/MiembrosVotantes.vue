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
            <v-col
              cols="12"
              xs="6"
              sm="6"
              md="6"
              lg="6"
              xl="12"
              class="py-0 text-start"
            >
              <h2 class="">Listado miembros registrados</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" v-if="miembros_votantes.length === 0">
              <h2 class="">Aun no hay miembros votantes</h2>
            </v-col>
            <v-simple-table class="table-container">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Canal</th>
                    <th>Previzualizar</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in miembros_votantes" :key="item.userId">
                    <td>{{ item.name }}</td>
                    <td>{{ item.lastName }}</td>
                    <td>{{ item.channel }}</td>
                    <td>
                      <a
                        style="font-size: 18px"
                        class="icon--text underline mr-10"
                        @click="verVotante(item)"
                        >Ver detalle</a
                      >
                    </td>
                    <td>
                      <div v-if="item.statusId == 1">
                        <v-chip color="orange" dark>Pendiente</v-chip>
                      </div>
                      <div v-if="item.statusId == 2">
                        <v-chip color="error">Rechazado</v-chip>
                      </div>
                      <div v-if="item.statusId == 3">
                        <v-chip color="green" dark>Aceptado</v-chip>
                      </div>
                      <div v-if="item.statusId == 4">
                        <v-chip color="blue" dark>Revisado</v-chip>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-container>
      </v-col>
      <ALT
        @cancelAlert="cancelAlert()"
        @confirm="confirm()"
        v-if="alert.estado"
        @exitEsc="cancel()"
        @cancel="cancel()"
        :alert="alert"
      />
      <VOTANTE
        v-if="usuario_votante.estado"
        @cambiarCategoria="cambiarCategoria"
        :usuario_votante="usuario_votante"
        @habilitar="habilitarValidacion"
        @rechazar="validarRechazar"
        @revisar="validarRevision"
        @aceptar="validarAceptar"
      />
    </v-row>
  </v-app>
</template>

<script>
import VOTANTE from "../../components/miembro-votante/VerVotante.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: { VOTANTE },

  data() {
    return {
      usuario_votante: {
        estado: false,
      },
      miembros_votantes: [],
      index: -1,
      item_select: null,
    };
  },
  watch: {},
  mounted() {
    this.consultarMiembros();
  },
  methods: {
    ...mapActions({
      _getMiembroVotantes: "admin/_getMiembroVotantes",
      _postAceptarVotante: "admin/_postAceptarVotante",
      _cambiarCategorias: "admin/_cambiarCategorias",
      _rechazarVotante: "admin/_rechazarVotante",
      _revisarVotante: "admin/_revisarVotante",
    }),
    async consultarMiembros() {
      try {
        const response = await this._getMiembroVotantes();
        if (response?.length) this.miembros_votantes = response;
      } catch (error) {
        console.error(error);
        this.ALT_("", "warning", null, null, this.ALTD_, error);
      }
    },
    validarAceptar(item) {
      if (this.index == -1) this.index = this.miembros_votantes.indexOf(item);
      this.item_select = Object.assign({}, item);
      this.ALT_(
        "MV-01",
        "warning",
        "p",
        () => {
          this.aceptarVotante(this.item_select.userId);
        },
        this.ALTD_
      );
    },
    validarAceptarPrueba(item) {
      this.ALT_(
        "MV-01",
        "warning",
        "p",
        () => this.aceptarVotante(item),
        this.ALTD_
      );
    },
    validarRechazar(item) {
      this.ALT_(
        "MV-02",
        "warning",
        "p",
        () => this.rechazarVotante(item),
        this.ALTD_
      );
    },
    validarRevision(item) {
      this.ALT_(
        "MV-03",
        "warning",
        "p",
        () => this.revisarVotante(item),
        this.ALTD_
      );
    },

    async habilitarValidacion(miembro) {
      this.validarAceptarPrueba(miembro);
    },
    async aceptarVotante(item) {
      const response = await this._postAceptarVotante(item);
      if (response.status == 200) {
        this.usuario_votante.estado = false;
        setTimeout(() => {
          this.ALT_("MV-01", "success", "", null, () => location.reload());
        }, 100);
      }
    },
    async rechazarVotante(item) {
      const RES = await this._rechazarVotante(item.userId);
      if (RES.status == 200) {
        this.usuario_votante.estado = false;
        setTimeout(() => {
          this.ALT_("MV-02", "success", "", null, () => location.reload());
        }, 10);
      }
    },
    async revisarVotante(item) {
      this.usuario_votante.estado = false;
      try {
        const response = await this._revisarVotante(item.userId);
        this.ALT_("", "success", null, null, () => location.reload(), response);
      } catch (error) {
        this.ALT_("", "warning", null, null, this.ALTD_, error);
      }
    },
    async cambiarCategoria(item) {
      try {
        await this._cambiarCategorias(item);
        this.consultarMiembros();
      } catch (error) {
        this.ALT_("", "warning", null, null, this.ALTD_, error);
      }
    },

    verVotante(item) {
      this.index = this.miembros_votantes.indexOf(item);
      this.usuario_votante.estado = true;
      this.usuario_votante = Object.assign(this.usuario_votante, item);
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
