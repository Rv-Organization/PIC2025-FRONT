<template>
  <v-dialog v-model="voto_categoria.estado">
    <v-card>
      <v-toolbar color="primary">
        <h1 class="white--text">Votaciones por categoria</h1>
        <v-spacer></v-spacer>
        <v-btn fab small @click="voto_categoria.estado = false"
          ><v-icon color="primary">mdi-close</v-icon></v-btn
        >
      </v-toolbar>
      <v-container>
        <v-data-table
          :headers="headers"
          :search="buscar"
          :items="voto_categoria.categorias"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field v-model="buscar" label="Buscar" class="mx-4"></v-text-field>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { voto_categoria: Object },
  data() {
    return {
      estado: false,
      buscar: "",
      headers: [
        { text: "Categoria", align: "center", value: "nameCategory" },
        { text: "Nominados", align: "center", value: "nominados" },
        { text: "Npc", align: "center", value: "npc" },
        { text: "Pmct", align: "center", value: "pmct" },
        { text: "Votos postulacion", align: "center", value: "postulationsCount" },
        { text: "total votos", align: "center", value: "totalVotes" },
        { text: "Porcentaje", align: "center", value: "vrPorcentual" },
      ],
      categorias: [],
    };
  },
};
</script>
