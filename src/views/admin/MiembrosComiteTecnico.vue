<template>
  <v-app>
    <v-card class="pt-1" elevation="0">
      <h2 class="text-center bg-color pt-12">Panel administrativo</h2>
      <h3 class="text-center bg-color mb-8">Podrás visualizar los votos de cada miembro del comité técnico</h3>
      <div class="line"></div>
    </v-card>
    <v-row class="container-channel ">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <v-row justify="start" class="my-2">
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="12" class="py-0 text-start mb-8">
              <h2 class="">Listado miembros del comité técnico</h2>
            </v-col>
          </v-row>
          <v-row v-for="item in miembros_comite" :key="item.userId" class="section-card my-3">
            <v-col cols="7" >
              <h4>{{ item.name }} {{ item.lastName }} - {{ item.email }}</h4>
            </v-col>
            <v-col cols="2" disabled>
              <h4>Estado:</h4>
              <h5 v-if="item.votingEnd">Completo</h5>
              <h5 v-if="item.voteVM[0] && !item.votingEnd"> En Proceso</h5>
              <h5 v-if="!item.voteVM[0]" > No Inicia </h5>
            </v-col>
            <v-col cols="3">
              <a style="font-size: 14px" class="icon--text underline " @click="verVotos(item)">Ver Categorías</a>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";

import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE],

  data() {
    return {
      miembros_comite: [],
    };
  },
  watch: {},
  mounted() {
    this.consultarMiembros();
  },
  methods: {
    ...mapActions({
      _getMiembrosComite: "admin/_getMiembrosComite",
    }),
    async consultarMiembros() {
      const RES = await this._getMiembrosComite();
      if (RES.data?.data) {
        this.miembros_comite = RES.data.data;
      }
    },
    verVotos(item) {
      console.log("🚀 ~ file: MiembrosComiteTecnico.vue:64 ~ verVotos ~ item:", item)
      this.$router.push({
        path: "/admin/categorias/comite-tecnico",
        query: {
          id: item.id,
          panel: "",
          name:`${item.name} ${item.lastName}`
        },
      });
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

.line {
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid #d9d9d9;
  width: 75%;
  margin: auto;
}

.section-card {
  background: #FFFFFF;
  border: 2px solid #D9D9D9;
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
