<template>
  <v-row justify="center">
    <v-col cols="12" lg="12" md="12" sm="12">
      <lottie-animation
        :animationData="require('@/assets/image/404.json')"
        style="height: 400px"
        :autoPlay="true"
        ref="anim_login"
        id="anim_login"
        class="botone"
        :loop="true"
        :speed="2"
        content
      />
    </v-col>
    <v-col class="text-center" cols="12" lg="12" md="12" sm="12">
      <v-btn color="boton" dark class="botone" to="/postulantes/resumen-produccion">
        Inicio
        <v-icon color="succes" class="ml-2">mdi-home-circle-outline</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
  <script>
import LottieAnimation from "lottie-web-vue";
export default {
  components: {
    LottieAnimation,
  },
};
</script>
