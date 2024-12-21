<template>
  <v-dialog v-model="voto_postulacion.estado">
    <v-card>
      <v-toolbar color="primary">
        <h1 class="white--text">Votaciones por postulación</h1>
        <v-spacer></v-spacer>
        <v-btn fab small @click="voto_postulacion.estado = false"
          ><v-icon color="primary">mdi-close</v-icon></v-btn
        >
      </v-toolbar>
      <v-container>
        <v-data-table
          :headers="headers"
          :search="buscar"
          :items="voto_postulacion.postulaciones"
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
  props: { voto_postulacion: Object },
  data() {
    return {
      estado: false,
      buscar: "",
      headers: [
        { text: "Categoria", align: "center", value: "categoria" },
        { text: "Postulación", align: "center", value: "nombre" },
        { text: "Canal", align: "center", value: "canal" },
        { text: "Programa", align: "center", value: "programa" },
        { text: "Porcentaje", align: "center", value: "porcentaje" },
        { text: "total de votos", align: "center", value: "votos" },
      ],
    };
  },
};
</script>
