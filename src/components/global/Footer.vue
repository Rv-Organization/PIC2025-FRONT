<template>
  <v-footer color="primary" class=" mt-15">
    <v-container fluid>
      <v-row class="py-8 d-flex align-center">
        <v-col cols="3" xs="2" sm="2" md="2" lg="2" xl="2" class="pa-0 ma-0">
          <v-card-text class=" py-0 my-0 d-md-flex justify-md-center ">
            <v-btn v-for="icon in icons" :key="icon.icon" fab dark small color="icon" class="ma-1" rounded elevation="0" :href="icon.url" target="_blank">
              <v-icon color="white">
                {{ icon.icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-col>
        <v-col cols="9" xs="10" sm="10" md="10" lg="10" xl="10" class="d-flex justify-center ">
          <v-row class="d-flex align-center git c">
            <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3" class=" d-flex justify-center">
              <h5 class="black--text ">¿Necesitas ayuda? <a style="font-size: 15px" class="icon--text"
                href="mailto:coordinacion@premiosindiacatalina.com?Subject=Necesito%20ayuda">Contactenos</a></h5>
            </v-col>
            <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3" class=" d-flex justify-center">
              <h5 class="black--text ">Todos lo derechos reservados</h5>
            </v-col>
            <v-col cols="6" xs="3" sm="3" md="3" lg="3" xl="3" class="d-flex justify-center">
              <h5 class="black--text">Reglamento</h5>
            </v-col>
            <v-col cols="4" xs="2" sm="3" md="3" lg="3" xl="3">
              <v-row class="d-flex justify-center  ">
                <h5 class="black--text  ">Powered By</h5>
              </v-row>
              <v-row class="d-flex justify-center ">
                <img src="../../assets/image/logo-rv.svg" width="36" alt="">
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

  </v-footer>

</template>

<script>
export default {
  data() {
    return {
      icons: [{icon:"mdi-facebook", url:"https://www.facebook.com/premiosindiacatalina"}, {icon:"mdi-twitter", url: "https://twitter.com/premiosindia"}, {icon:"mdi-instagram", url:"https://www.instagram.com/premiosindiacatalina"}],
    };
  },
};
</script>

<style>
my-md-15 {
  box-shadow: 5 5 5 5 5;
}
</style>
