<template>
  <v-dialog v-model="resultado_votaciones.estado" fullscreen>
    <v-card>
      <v-toolbar color="primary">
        <h1 class="white--text">Resultado de votaciones</h1>
        <v-spacer></v-spacer>
        <v-btn fab small @click="resultado_votaciones.estado = false">
          <v-icon color="primary">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container v-for="(categoria, index) in postulacionesPorCategoria" :key="index">
        <h2>{{ categoria[0].categoryName }}</h2>
        <v-data-table
          :headers="headers"
          :items="categoria"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="buscar"
              label="Buscar"
              class="mx-4"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { resultado_votaciones: Object },
  mounted() {
    this.organizarInfo();
  },
  data() {
    return {
      estado: false,
      buscar: "",
      headers: [
        { text: "ID", align: "left", value: "categoryId" },
        { text: "Categoria", align: "left", value: "categoryName" },
        { text: "ID", align: "left", value: "postulationId" },
        { text: "Postulación", align: "left", value: "postulationName" },
        { text: "Votos evaluadores", align: "left", value: "resultEvaluators" },
        { text: "Publico general", align: "left", value: "resultPublic" },
      ],
      votaciones: [],
      postulacionesPorCategoria: [],
    };
  },
  methods: {
    organizarInfo() {
      const postulacionesPorCategoria = this.resultado_votaciones.votaciones.reduce(
        (acumulador, postulacion) => {
          const { categoryId } = postulacion;
          if (!acumulador[categoryId]) {
            acumulador[categoryId] = [];
          }
          acumulador[categoryId].push(postulacion);
          return acumulador;
        },
        {}
      );

      this.postulacionesPorCategoria = Object.values(postulacionesPorCategoria);
    },
  },
};
</script>
