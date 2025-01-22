<template>
  <div>
    <v-row class="card">
      <v-col cols="12" class="mt-0 py-0">
        <v-container>
          <h2 class="pt-4">Registro de producciones</h2>
          <h4 class="pt-4">
            Para postular una producción o talento a los Premios india Catalina
            2025 es necesario registrar primero la producción y luego postularla
            a las categorías en las que se quiera participar. Antes de postular,
            por favor revise atentamente el
            <a
              href="https://premiosindiacatalina.com/wp-content/uploads/2025/01/PIC-41-REGLAMENTO-GENERAL-VF-06NE2025.pdf"
              target="_blank"
              >REGLAMENTO</a
            >
          </h4>
          <v-divider class="my-4"></v-divider>
          <v-card-text class="asaccent--text pb-8"
            >Nota: Todos los campos con asteriscos (*) son obligatorios
          </v-card-text>
          <v-form v-model="validacion" ref="form" lazy-validation>
            <v-row justify="start">
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                class="py-0 mt-3"
              >
                <INPUT :field="form.nombre_programa" />
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <TEXTAREA :field="form.sipnosis" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.fecha" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.horario" />
              </v-col>

              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.numero_temporada" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.numero_capitulos" />
              </v-col>
              <v-col
                cols="6"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                xl="6"
                class="py-0"
                v-if="ProducerTypeId != 1"
              >
                <INPUT :field="form.canal_emitido" />
              </v-col>
            </v-row>
            <v-divider class="mt-4"></v-divider>
            <v-card elevation="0" class="pb-0 mb-0 my-12">
              <v-row aling="center" class="my-0">
                <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h3>
                      Póster de la producción: JPG, JPEG, PNG. Tamaño máximo: 10
                      megas, Resolución de la imagen: 854 x 1200 pixeles.
                    </h3>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="5"
                  xs="6"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                >
                  <v-btn
                    @click="subirArchivo('input-file1')"
                    class="upload boton-focus-animation py-2 mb-3"
                    height="100%"
                    plain
                  >
                    <v-row align="center">
                      <v-col
                        class="py-0 mx-auto pl-9 my-0"
                        cols="5"
                        xs="5"
                        sm="5"
                        md="5"
                        lg="5"
                        xl="5"
                      >
                        <v-file-input
                          prepend-icon="mdi-cloud-upload-outline"
                          truncate-length="1"
                          accept="image/png, image/jpeg, image/jpg"
                          id="input-file1"
                          v-model="poster"
                          class="mt-0"
                          hide-input
                          show-size
                        />
                      </v-col>
                      <v-row>
                        <v-col class="py-4">
                          <h3 v-if="!subir_poster">SUBIR POSTER</h3>
                          <h3 v-else>MODIFICAR POSTER</h3>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="subir_poster" class="py-4">
              <v-img
                max-height="100%"
                contain
                max-width="100%"
                :src="frame.poster"
                aspect-ratio="1.4"
              ></v-img>
            </v-col>
            <v-card elevation="0" class="pb-0 mb-0 my-12">
              <v-row aling="center" class="my-0">
                <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h3>
                      Carta de la dirección de programación del canal en donde
                      se certifique la fecha de emisión de la producción y de
                      inicio de promoción de la misma.
                    </h3>
                    <h4>Extensiones permitidas PDF, máximo 10 megas</h4>
                  </v-card-text>
                </v-col>

                <v-col
                  cols="5"
                  xs="6"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                >
                  <v-btn
                    @click="subirArchivo('input-file2')"
                    class="upload boton-focus-animation py-2 mb-3"
                    height="100%"
                    plain
                  >
                    <v-row align="center">
                      <v-col
                        cols="5"
                        xs="5"
                        sm="5"
                        md="5"
                        lg="5"
                        xl="5"
                        class="py-0 mx-auto pl-9 my-0"
                      >
                        <v-file-input
                          prepend-icon="mdi-cloud-upload-outline"
                          truncate-length="1"
                          accept="application/pdf"
                          id="input-file2"
                          v-model="carta"
                          class="mt-0"
                          hide-input
                          show-size
                        />
                      </v-col>
                      <v-row>
                        <v-col class="py-4">
                          <h3 v-if="!subir_carta">SUBIR CARTA</h3>
                          <h3 v-else>MODIFICAR CARTA</h3>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="subir_carta" class="py-4">
              <iframe
                height="500px"
                width="500px"
                class="container"
                :src="frame.carta"
              ></iframe>
            </v-col>
            <v-card elevation="0" class="pb-0 mb-0 my-12">
              <v-row aling="center" class="my-0">
                <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h3>Certificado de emisión Kantar IBOPE o equivalente</h3>
                    <h4>Extensiones permitidas PDF, máximo 2 megas</h4>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="5"
                  xs="6"
                  sm="4"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                >
                  <v-btn
                    @click="subirArchivo('input-file3')"
                    class="upload boton-focus-animation py-2 mb-3"
                    height="100%"
                    plain
                  >
                    <v-row align="center">
                      <v-col
                        class="py-0 mx-auto pl-9 my-0"
                        cols="5"
                        xs="5"
                        sm="5"
                        md="5"
                        lg="5"
                        xl="5"
                      >
                        <v-file-input
                          prepend-icon="mdi-cloud-upload-outline"
                          truncate-length="1"
                          accept="application/pdf"
                          v-model="certificado"
                          id="input-file3"
                          class="mt-0"
                          hide-input
                          show-size
                        />
                      </v-col>
                      <v-row>
                        <v-col class="py-4">
                          <h3 v-if="!subir_certificado">SUBIR CERTIFICADO</h3>
                          <h3 v-else>MODIFICAR CERTIFICADO</h3>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="subir_certificado" class="py-4">
              <iframe
                height="500px"
                width="500px"
                class="container"
                :src="frame.certificado"
              ></iframe>
            </v-col>
            <v-divider class="my-4"></v-divider>
            <v-row aling="center">
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                <v-card-text
                  >Link a una página o red social donde esté alojada una promo
                  que, en su momento, haya anunciado el estreno de la
                  producción:</v-card-text
                >
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                <INPUT :field="form.pagina_web" class="pt-8" />
              </v-col>
            </v-row>

            <v-row aling="center">
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="text-justify pt-0">
                  Si la producción la realizó una casa productora diferente al
                  canal o plataforma donde fue emitida, o si se trata de una
                  coproducción, por favor incluir los nombres de la (s) casa (s)
                  productora (s). Tenga en cuenta que, de quedar nominada la
                  producción, esta información es la única que será relacionada
                  en los créditos, por lo que se recomienda verificar muy bien
                  los datos.
                </v-card-text>
                <v-card-text> </v-card-text>
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                <TEXTAREA :field="form.indicador_canales" />
              </v-col>
            </v-row>
          </v-form>
          <v-container>
            <v-row justify="center">
              <v-col cols="8" xs="6" sm="6" md="6" lg="6" xl="6">
                <v-btn
                  color="boton"
                  height="50"
                  class="botone mr-3"
                  dark
                  outlined
                  @click="volver()"
                  >VOLVER</v-btn
                >
                <v-btn
                  v-if="!editar"
                  color="boton"
                  height="50"
                  class="botone"
                  dark
                  @click="agregarPrograma()"
                  elevation="0"
                  >Guardar</v-btn
                >
                <v-btn
                  v-if="editar"
                  color="boton"
                  height="50"
                  class="botone"
                  dark
                  @click="alertEditar()"
                  elevation="0"
                  >Guardar</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
  </div>
</template>

<script>
import { INPUT, AUTOCOMPLETE, TEXTAREA } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, TEXTAREA, ALERTA],

  data() {
    return {
      validacion: false,
      editar: false,
      ProducerTypeId: null,

      poster: [],
      carta: [],
      certificado: [],

      frame: { poster: "", carta: "", certificado: "" },

      edit_poster: false,
      edit_carta: false,
      edit_certificado: false,

      subir_poster: false,
      subir_carta: false,
      subir_certificado: false,

      format_poster: "",
      channelIssue: "",
      form: {
        nombre_programa: {
          value: "",
          id: "nombre_programa",
          label: "Nombre de la producción *",
          maxlength: "50",
          rules: [(v) => !!v || "Nombre de canal es requerido"],
        },
        fecha: {
          value: "",
          id: "fecha",
          tipo: "date",
          label: "Fecha de emisión *",
          maxlength: "100",
          rules: [(v) => !!v || "Fecha autizado es requerido"],
        },
        horario: {
          value: "",
          tipo: "time",
          id: "horario",
          label: "Horario emisión *",
          maxlength: "100",
          rules: [(v) => !!v || "Horario es requerido"],
        },
        canal_emitido: {
          value: "",
          id: "canal_emitido",
          label: "Canal donde se emitió el producto *",
          maxlength: "100",
          rules: [(v) => !!v || "Este campo es requerido"],
        },
        formato: {
          value: "",
          id: "formato",
          label: "Formato *",
          maxlength: "100",
          rules: [(v) => !!v || "Formaro es requerido"],
        },
        numero_capitulos: {
          value: null,
          id: "numero_capitulos",
          tipo: "number",
          label: "Número de capítulos",
          maxlength: "100",
        },
        numero_temporada: {
          value: null,
          id: "numero_temporada",
          tipo: "number",
          label: "Número de temporada",
          maxlength: "100",
        },
        pagina_web: {
          value: "",
          id: "pagina_web",
          label: "Link",
          maxlength: "1000",
        },
        indicador_canales: {
          value: "",
          id: "indicador_canales",
          label: "Indicar casa (s) productoras (s)",
          row: "5",
          maxlength: "3000",
        },
        sipnosis: {
          value: "",
          id: "sipnosis",
          label: "Sinopsis *",
          row: "2",
          maxlength: "3000",
          rules: [(v) => !!v || "Sinopsis es requerida"],
        },
      },
    };
  },

  watch: {
    poster() {
      this.format_poster = this.poster.name.split(".");
      this.format_poster = this.format_poster[this.format_poster.length - 1];

      if (this.poster.size > 10000000) {
        this.format_poster = "";
        this.ALT_("CORREO-10", "warning");
      } else {
        this.frame.poster = URL.createObjectURL(this.poster);
        this.edit_poster = true;
        this.subir_poster = true;
      }
    },
    carta() {
      this.format_carta = this.carta.name.split(".");
      this.format_carta = this.format_carta[this.format_carta.length - 1];

      if (this.carta.size > 10000000) {
        this.format_carta = "";
        this.ALT_("CORREO-10", "warning");
      } else {
        this.frame.carta = URL.createObjectURL(this.carta);
        this.edit_carta = true;
        this.subir_carta = true;
      }
    },
    certificado() {
      this.format_certificado = this.certificado.name.split(".");
      this.format_certificado =
        this.format_certificado[this.format_certificado.length - 1];

      if (this.certificado.size > 10000000) {
        this.format_certificado = "";
        this.ALT_("CORREO-10", "warning");
      } else {
        this.frame.certificado = URL.createObjectURL(this.certificado);
        this.edit_certificado = true;
        this.subir_certificado = true;
      }
    },
  },

  mounted() {
    window.console.log(
      "😎 this.$route.params.data?.programa",
      this.$route.params.data?.programa
    );
    if (this.$route.params.data?.programa) {
      this.form.nombre_programa.value =
        this.$route.params.data.programa.nameProgram;
      this.form.fecha.value = this.$route.params.data.programa.dateIssue;
      this.form.horario.value = this.$route.params.data.programa.hourIssue;
      this.form.canal_emitido.value =
        this.$route.params.data.programa.channelIssue;
      this.form.indicador_canales.value =
        this.$route.params.data.programa.channelProduct;
      this.form.formato.value = this.$route.params.data.programa.format;
      this.form.numero_capitulos.value =
        this.$route.params.data.programa.numberChapter;
      this.form.numero_temporada.value =
        this.$route.params.data.programa.numberSeason;
      this.form.pagina_web.value = this.$route.params.data.programa.webpage;
      this.form.sipnosis.value = this.$route.params.data.programa.sipnosis;

      this.frame.poster = this.$route.params.data.programa.poster;
      this.edit_poster = true;
      this.subir_poster = true;

      this.frame.carta = this.$route.params.data.programa.letter;
      this.edit_carta = true;
      this.subir_carta = true;

      this.frame.certificado = this.$route.params.data.programa.certifyKantar;
      this.edit_certificado = true;
      this.subir_certificado = true;

      this.editar = true;
    }
    this.obetenerCanal();
  },
  methods: {
    ...mapActions({
      _addProgramas: "programas/_addProgramas",
      _getCanal: "canales/_getCanal",
      _uploadFile: "canales/_uploadFile",
      _editProgramas: "programas/_editProgramas",
    }),
    async obetenerCanal() {
      const id = CURRTET_USER.id;
      const res = await this._getCanal({ id });
      if (res.data?.data?.id) {
        this.ProducerTypeId = res.data.data.producerTypeId;
      }
      this.channelIssue = res.data.data.nameClient;
    },
    subirArchivo(id) {
      document.getElementById(id).click();
    },
    async agregarPrograma() {
      const validacion = this.$refs.form.validate();
      if (validacion) {
        let poster = "";
        let carta = "";
        let certificado = "";
        if (this.frame.poster) {
          poster = await this.uploadPoster();
        }
        if (this.frame.carta) {
          carta = await this.uploadCarta();
        }
        if (this.frame.certificado) {
          certificado = await this.uploadCertificado();
        }
        const data = {
          nameProgram: this.form.nombre_programa.value,
          dateIssue: this.form.fecha.value,
          hourIssue: this.form.horario.value,
          // channelIssue: this.form.canal_emitido.value,
          channelIssue: this.channelIssue,
          channelProduct: this.form.indicador_canales.value,
          format: this.form.formato.value,
          poster: poster ? poster.data.data : "",
          letter: carta ? carta.data.data : "",
          certifyKantar: certificado ? certificado.data.data : "",
          numberChapter: this.form.numero_capitulos.value,
          numberSeason: this.form.numero_temporada.value,
          Webpage: this.form.pagina_web.value,
          sipnosis: this.form.sipnosis.value,
          userId: CURRTET_USER.id,
        };

        const respuesta = await this._addProgramas(data);
        if (respuesta.status == 200)
          this.$router.push("/postulantes/resumen-produccion");
        else if (respuesta.message) {
          this.ALT_("PROGRAMA-0", "info");
        }
      }
    },
    async editarPrograma() {
      const validacion = this.$refs.form.validate();
      if (validacion) {
        let poster = "";
        let carta = "";
        let certificado = "";
        if (this.poster.length != 0) {
          poster = await this.uploadPoster();
        }
        if (this.carta.length != 0) {
          carta = await this.uploadCarta();
        }
        if (this.certificado.length != 0) {
          certificado = await this.uploadCertificado();
        }
        const data = {
          id: this.$route.params.data.programa.id,
          nameProgram: this.form.nombre_programa.value,
          dateIssue: this.form.fecha.value,
          hourIssue: this.form.horario.value,
          channelIssue: this.form.canal_emitido.value,
          channelProduct: this.form.indicador_canales.value,
          format: this.form.formato.value,
          poster: poster?.data?.data || this.$route.params.data.programa.poster,
          letter: carta?.data?.data || this.$route.params.data.programa.letter,
          certifyKantar:
            certificado?.data?.data ||
            this.$route.params.data.programa.certificado,
          numberChapter: this.form.numero_capitulos.value,
          numberSeason: this.form.numero_temporada.value,
          Webpage: this.form.pagina_web.value,
          sipnosis: this.form.sipnosis.value,
          userId: CURRTET_USER.id,
        };

        const respuesta = await this._editProgramas(data);
        if (respuesta.status == 200)
          this.$router.push("/postulantes/resumen-produccion");
      }
    },
    async uploadPoster() {
      return await this._uploadFile({
        archivo: this.poster,
        tipo: 4,
      });
    },
    async uploadCarta() {
      return await this._uploadFile({
        archivo: this.carta,
        tipo: 2,
      });
    },
    async uploadCertificado() {
      return await this._uploadFile({
        archivo: this.certificado,
        tipo: 2,
      });
    },

    volver() {
      this.$router.push("/postulantes/resumen-produccion");
    },
    cancel() {
      this.ALTD_();
    },
    alertEditar() {
      this.ALT_("editProgram", "info", "p");
    },
    async confirmar() {
      this.editarPrograma();
      //this.$router.push("/postulantes/resumen-produccion");
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

.card {
  width: 80%;
  padding-top: 3%;
  margin: auto;
}
@media (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>
