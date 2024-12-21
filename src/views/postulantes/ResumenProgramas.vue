<template>
  <v-app>
    <v-row class="card">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <h2 class="pt-4">Resumen de producciones inscritas</h2>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <!-- <v-col cols="12">
              <lottie-animation
            :animationData="animacionVideo"
            height="300px"
            :autoPlay="true"
            :loop="true"
            :speed="2"
          />
            </v-col> -->
            <v-col cols="12">
              <h4 class="pt-4" v-if="total_registrados">
                A continuación encontrará la lista de producciones inscritas hasta este momento para
                participar en los Premios India Catalina 2024. Para postular la producción en una o
                varias categorías, se debe click en el botón Categorías de producción, si se va a
                postular la producción en categorías que premian el talento, o dar click en
                Categorías de talento, si lo que se va a postular es a un talento dentro de la
                producción.
              </h4>
              <h4 class="pt-4" v-else>
                Para inscribir una nueva producción, dar click en el botón Añadir +. Cuando el
                proceso de postulación haya terminado, dar click en “he terminado” o "guardar" para
                regresar más tarde y culminar con el proceso.
              </h4>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>
          <v-row justify="center">
            <v-col col="6" class="ma-0 pa-0">
              <v-card-text class="asaccent--text text-p"
                >Total registrados: {{ total_registrados }}</v-card-text
              >
            </v-col>
            <v-col col="6" class="ma-0 text-end">
              <v-btn color="primary" outlined class="botone" @click="añadirPrograma()"
                >Añadir <v-icon>mdi-plus</v-icon></v-btn
              >
            </v-col>
          </v-row>
          <v-row justify="start" class="mt-6">
            <v-col
              v-for="(item, i) in programas"
              class="py-4"
              cols="9"
              :key="i"
              xs="9"
              sm="8"
              md="5"
              lg="5"
              xl="3"
            >
              <v-card elevation="2" class="border-card" color="white">
                <v-card-title class="title">
                  <v-icon color="primary" size="32" left>mdi-movie</v-icon>
                  {{ item.nameProgram }}</v-card-title
                >
                <v-img :src="item.poster" class="white--text align-end img" contain height="250px">
                </v-img>

                <v-card-subtitle class="pb-0"> Postular en categorías de:</v-card-subtitle>
                <v-card-actions class="mx-2 my-2 pb-4" d-flex justify-center>
                  <v-tooltip bottom color="info">
                    <template v-slot:activator="{ on, attrs }">
                      <v-hover v-slot="{ hover }" open-delay="0">
                        <v-btn
                          @click="editarPostulacion(item, 1)"
                          class="text-center mr-2"
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Producción
                        </v-btn>
                      </v-hover>
                    </template>
                    <span>Postular producción </span>
                  </v-tooltip>
                  <v-tooltip bottom color="info">
                    <template v-slot:activator="{ on, attrs }">
                      <v-hover v-slot="{ hover }" open-delay="0">
                        <v-btn
                          @click="editarPostulacion(item, 2)"
                          class="text-center"
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Talento
                        </v-btn>
                      </v-hover>
                    </template>
                    <span>Postular talento </span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="true" justify="center" class="mt-10">
            <v-col cols="12" sm="12" xs="12" md="12" lg="12" xl="12" class="text-center">
              <div>
                <v-btn
                  color="boton"
                  height="50"
                  class="botone my-2 mr-3"
                  dark
                  outlined
                  @click="pago.estado = true"
                  >Resumen de pago</v-btn
                >
                <!-- <v-btn
                  color="boton"
                  height="50"
                  class="botone my-2"
                  dark
                  @click="añadirPrograma()"
                  >Añadir programa</v-btn
                > -->
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <ResumenPostulacion
        :tipo_postulacion="tipo_postulacion"
        v-if="postulacion.estado"
        :postulacion="postulacion"
        :programa="programa"
      />
      <ResumenPago
        :pago="pago"
        v-if="pago.estado || currentUser.email == 'alejandrodavidospina@gmail.com'"
      />
    </v-row>
  </v-app>
</template>

<script>
import ResumenPostulacion from "../../components/postulantes/ResumenPostulacion.vue";
import ResumenPago from "../../components/postulantes/ResumenPago.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";
import AnimacionVideo from "../../assets/Animation/VideoAnimacion.json";
import LottieAnimation from "lottie-web-vue";

export default {
  mixins: [INPUT, AUTOCOMPLETE],
  components: { ResumenPago, ResumenPostulacion, LottieAnimation },

  data() {
    return {
      currentUser: CURRTET_USER,
      animacionVideo: AnimacionVideo,
      tiempo: false,

      pago: {
        estado: false,
      },
      postulacion: {
        estado: false,
      },
      programas: [],
      total_registrados: 0,
      programa: {},
    };
  },
  mounted() {
    this.getAllPrograms();
  },
  methods: {
    ...mapActions({
      _getProgramas: "programas/_getProgramas",
    }),

    añadirPrograma() {
      this.$router.push("/postulantes/registro-produccion");
    },
    async getAllPrograms() {
      const respuesta = await this._getProgramas(CURRTET_USER.id);
      this.programas = respuesta.data.data;
      this.total_registrados = respuesta.data.data.length;
    },
    editarPostulacion(item, tipo_postulacion) {
      this.tipo_postulacion = tipo_postulacion;
      this.programa = item;
      this.postulacion.estado = true;
    },
  },
};
</script>
<style scoped>
.border-card {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15) !important;
}
.card {
  width: 80%;
  padding-top: 3%;
  margin: auto;
}
.img {
  padding: 0;
  margin: 0;
}
.title {
  font-size: 05;
  font-weight: 600;
}
@media (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>
