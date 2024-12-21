<template>
  <v-dialog v-model="modal_votacion.modalVotacion" max-width="700px">
    <v-card>
      <v-card-title>
        <h3 class="my-2 mx-auto">{{ modal_votacion.name_catetgory }}</h3>
      </v-card-title>
      <v-card-text align="center" class="my-12">
        <h2>{{ modal_votacion.nameProgram }}</h2>
        <h3 class="mt-4">
          Califica del 1 al {{ modal_votacion.cantidad_votos_ }}, siendo 1 la más baja y {{
            modal_votacion.cantidad_votos_
          }} la más alta </h3>
        <v-rating v-model="rating" :length="modal_votacion.cantidad_votos_" size="70" dense ></v-rating>
        <p v-show="rating > 0">Has seleccionado {{ modal_votacion.rating }} puntos</p>
        <h2 v-show="modal_votacion.validar_voto">
          La postulacion "{{ modal_votacion.postulado }}" se encuentra en esta posicion, ¿Deseas cambiarla?
        </h2>
      </v-card-text>
      <div class="text-center pb-4">
        <v-btn v-if="modal_votacion.validar_voto" :disabled="rating == 0" color="primary" @click="cambiarVoto(rating)"
          class="boton mx-2">Cambiar</v-btn>
        <v-btn v-else color="primary" :disabled="rating == 0" @click="votar(rating)" class="boton mx-2">Votar</v-btn>
        <v-btn color="error" class="mx-2" @click="modal_votacion.modalVotacion = false">Cancelar</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    modal_votacion: Object,
  },
  data() {
    return {
      rating: 0,
      modalVotacion: false,
      voto: 0,
      votado: false,
    };
  },
  watch: {
    "$props.modal_votacion.validar_voto"(val) { },
  },
  methods: {
    cambiarVoto() {
      this.$emit("cambiarVoto", this.rating);
    },
    votar() {
      this.$emit("votar", this.rating);
    },
  },
};
</script>
