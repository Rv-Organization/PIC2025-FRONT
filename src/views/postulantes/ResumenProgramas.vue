<template>
  <div>
    <v-row class="mx-10 mt-4">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <h2 class="pt-4">Resumen de producciones inscritas</h2>
          <v-divider class="my-4"></v-divider>
          <v-row>
            <v-col cols="12">
              <h4 class="pt-4" v-if="total_registrados">
                A continuación encontrará la lista de producciones inscritas
                hasta este momento para participar en los Premios India Catalina
                2025. Para postular la producción en una o varias categorías, se
                debe click en el botón Categorías de producción, si se va a
                postular la producción en categorías que premian el talento, o
                dar click en Categorías de talento, si lo que se va a postular
                es a un talento dentro de la producción.
              </h4>
              <h4 class="pt-4" v-else>
                Para inscribir una nueva producción, dar click en el botón
                Añadir +. Cuando el proceso de postulación haya terminado, dar
                click en “he terminado” o "guardar" para regresar más tarde y
                culminar con el proceso.
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
              <v-btn
                color="primary"
                outlined
                class="botone"
                @click="añadirPrograma()"
                >Añadir <v-icon>mdi-plus</v-icon></v-btn
              >
            </v-col>
          </v-row>
          <v-row justify="start" class="mt-6">
            <v-col
              v-for="(item, i) in programas"
              class="py-4"
              cols="12"
              :key="i"
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-card
                elevation="2"
                class="rounded-xl d-flex flex-no-wrap"
                color="white"
              >
                <div>
                  <v-img
                    :src="item.poster"
                    class="white--text align-end rounded-xl ma-2"
                    height="94%"
                    width="150px"
                  ></v-img>
                </div>
                <div
                  class="flex-grow-1 d-flex flex-column justify-between px-2"
                >
                  <v-card-title class="title text-left py-3">
                    {{ item.nameProgram }}
                  </v-card-title>
                  <v-card-subtitle>
                    Postular en categorías de:
                  </v-card-subtitle>

                  <v-card-actions class="d-flex flex-column my-1">
                    <v-btn
                      @click="editarPostulacion(item, 1)"
                      color="primary "
                      class="mb-2 botone-outline"
                      outlined
                      block
                    >
                      <span class="black--text font-weight-bold">
                        + Producción
                      </span>
                    </v-btn>
                    <v-btn
                      @click="editarPostulacion(item, 2)"
                      class="ml-0 botone-outline"
                      color="primary"
                      outlined
                      block
                    >
                      <span class="black--text font-weight-bold">
                        + Talento
                      </span>
                    </v-btn>
                  </v-card-actions>
                  <v-divider class="px-md"></v-divider>
                  <v-card-actions class="d-flex justify-left">
                    <v-btn
                      fab
                      x-small
                      color="primary"
                      @click="verPostulacion(item)"
                    >
                      <v-icon>mdi-eye-outline</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      x-small
                      color="primary"
                      @click="modificarPrograma(item)"
                    >
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      x-small
                      color="error"
                      @click="validarEliminarPrograma(item)"
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="true" justify="center" class="mt-10">
            <v-col
              cols="12"
              sm="12"
              xs="12"
              md="12"
              lg="12"
              xl="12"
              class="text-center"
            >
              <div>
                <v-btn
                  color="primary"
                  height="50"
                  class="botone my-2 mr-3"
                  dark
                  @click="pago.estado = true"
                  >Resumen de pago
                  <v-icon class="ml-1">mdi-cash-sync</v-icon></v-btn
                >
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
        v-if="
          pago.estado || currentUser.email == 'alejandrodavidospina@gmail.com'
        "
      />
      <Alerta_ :alert="alert_" v-if="alert_.estado" />
    </v-row>
    <DetallePostulacion
      :datos="datos_detalle"
      v-if="estado_modal_detalle"
      @cerrar="estado_modal_detalle = false"
    />
  </div>
</template>

<script>
import ResumenPostulacion from "../../components/postulantes/ResumenPostulacion.vue";
import ResumenPago from "../../components/postulantes/ResumenPago.vue";
import DetallePostulacion from "@/components/postulantes/DetallePostulacion.vue";

import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";
import AnimacionVideo from "../../assets/Animation/VideoAnimacion.json";
import LottieAnimation from "lottie-web-vue";
import { Components } from "@/mixins";

export default {
  mixins: [INPUT, AUTOCOMPLETE, Components],
  components: {
    ResumenPago,
    ResumenPostulacion,
    LottieAnimation,
    DetallePostulacion,
  },

  data() {
    return {
      currentUser: CURRTET_USER,
      animacionVideo: AnimacionVideo,
      tiempo: false,
      estado_modal_detalle: false,
      datos_detalle: {},
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
      _deletePrograma: "programas/_deletePrograma",
    }),

    añadirPrograma() {
      this.$router.push("/postulantes/registro-produccion");
    },
    verPostulacion(item) {
      this.datos_detalle = {
        id: item.id,
        video: item.video,
        programId: item.id,
        postulacion: item,
        nombre_categoria: item.categoria,
        nombre_talento: item.postulacion,
        foto_talento: item.poster_talento,
      };
      this.estado_modal_detalle = true;
    },
    modificarPrograma(item) {
      this.$router.push({
        name: "/postulantes/registro-produccion",
        params: { data: { programa: item } },
      });
    },
    validarEliminarPrograma(item) {
      return this.callAlerta(
        "",
        "info",
        "P",
        () => this.eliminarPrograma(item),
        this.callbackAlerta,
        `Está seguro de eliminar el programa ${item.nameProgram}, Recuerde que esta acción no se puede deshacer`
      );
    },
    async eliminarPrograma(programa) {
      try {
        await this._deletePrograma(programa.id);
        return this.callAlerta(
          "",
          "success",
          null,
          null,
          this.callbackAlerta,
          "Programa eliminado con éxito"
        );
      } catch (error) {
        return this.callAlerta(
          "",
          "info",
          null,
          null,
          this.callbackAlerta,
          error?.message?.message
        );
      }
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
.title {
  font-size: 05;
  font-weight: 600;
}
</style>
