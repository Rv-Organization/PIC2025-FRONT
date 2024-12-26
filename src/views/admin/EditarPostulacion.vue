<template>
  <v-row class="container-channel px-2">
    <v-col cols="12" class="mt-0 pt-0">
      <v-container>
        <v-btn
          fab
          color="boton"
          class="botone"
          x-small
          elevation="0"
          sm-d-none
          @click="retroceder()"
          ><v-icon color="white">mdi-arrow-left</v-icon></v-btn
        >
        <h2 class="py-5">
          Programa: {{ $route.params.data?.programa.nameProgram }}
        </h2>
        <h4>{{ $route.params.data?.postulacion.nameCategory }}</h4>
        <v-divider class="my-6"></v-divider>
        <h3 class="asaccent--text pb-8">
          Datos productora, operadora y/o programadora
        </h3>
        <v-form v-model="validacion" ref="form" lazy-validation>
          <v-row justify="start">
            <v-col
              v-if="datosPostulacion.typePostulation === 1"
              class="py-0"
              cols="12"
              xl="12"
              xs="6"
              sm="6"
              md="6"
              lg="6"
            >
              <Input_
                v-model="registro.nameTalent"
                :field="form.nameTalent"
                v-if="registro.nameTalent"
              />
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="12" class="py-0">
              <Input_
                v-model="registro.nameProgram"
                :field="form.nameProgram"
                v-if="registro.nameProgram"
              />
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.canal"
                :field="form.canal"
                v-if="registro.canal"
              />
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.canalEmision"
                :field="form.canalEmision"
                v-if="registro.canalEmision"
              />
            </v-col>
            <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.fecha"
                :field="form.fecha"
                v-if="registro.fecha"
              />
            </v-col>
            <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.horarioEmision"
                v-if="registro.horarioEmision"
                :field="form.horarioEmision"
              />
            </v-col>
            <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.numeroCapitulos"
                :field="form.numeroCapitulos"
                v-if="registro.numeroCapitulos"
              />
            </v-col>
            <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.numeroTemporadas"
                :field="form.numeroTemporadas"
                v-if="registro.numeroTemporadas"
              />
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.linkProyecto"
                :field="form.linkProyecto"
                v-if="registro.linkProyecto"
              />
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
              <Input_
                v-model="registro.linkPromo"
                :field="form.linkPromo"
                v-if="registro.linkPromo"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
              <Textarea_
                v-model="registro.sinopsis"
                :field="form.sinopsis"
                v-if="registro.sinopsis"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-divider class="my-4"></v-divider>
        <h2 class="text-start my-10">Archivos requeridos</h2>
        <v-card elevation="0" class="px-3 pb-0 mb-10">
          <!-- MEJOR LIBRETO CATEGORIA 6 -->
          <v-row aling="center" class="my-0" v-if="showLibreto">
            <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
              <v-card-text>
                <h3>Libreto</h3>
                <h4>Extensiones permitidas solo pdf máximo 2 megas</h4>
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
                @click="subirArchivo('file-libreto')"
                plain
                class="upload py-2 mb-3"
                height="100%"
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
                      accept="application/pdf"
                      prepend-icon="mdi-cloud-upload-outline"
                      truncate-length="1"
                      id="file-libreto"
                      v-model="libreto"
                      class="mt-0"
                      hide-input
                      show-size
                    />
                  </v-col>
                  <v-row>
                    <v-col class="py-4">
                      <h3 v-if="!subir_libreto">SUBIR LIBRETO</h3>
                      <h3 v-else>MODIFICAR LIBRETO</h3>
                    </v-col>
                  </v-row>
                </v-row>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-col class="py-4" v-if="showLibreto">
          <iframe
            :src="frame.libreto"
            class="container"
            height="500px"
            width="500px"
          ></iframe>
        </v-col>
        <v-card elevation="0" class="px-3 pb-0 mb-0">
          <v-row aling="center" class="my-0">
            <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
              <v-card-text>
                <h3>Foto reciente del postulado (a) o programa</h3>
                <h4>Extensiones permitidas JPG, JPEG, PNG, máximo 2 megas</h4>
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
                plain
                class="upload py-2 mb-3"
                height="100%"
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
                      accept="image/png, image/jpeg, image/jpg"
                      prepend-icon="mdi-cloud-upload-outline"
                      truncate-length="1"
                      id="input-file2"
                      v-model="photo"
                      class="mt-0"
                      hide-input
                      show-size
                    />
                  </v-col>
                  <v-row>
                    <v-col class="py-4">
                      <h3 v-if="!subir_foto">SUBIR ARCHIVO</h3>
                      <h3 v-else>MODIFICAR ARCHIVO</h3>
                    </v-col>
                  </v-row>
                </v-row>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-col class="py-4">
          <v-img
            max-height="100%"
            contain
            max-width="100%"
            :src="frame.photo"
            aspect-ratio="1.4"
          />
        </v-col>

        <v-card elevation="0" class="px-3 pb-0 mb-0 my-12">
          <v-row aling="center" class="my-0">
            <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
              <v-card-text>
                <h3>
                  Una muestra de la producción. Para esto, revisar el anexo de
                  requerimientos de acuerdo con la categoría.
                </h3>
                <h4>
                  Extensiones permitidas: MP4, WEBM, AVI, MOV. Tamaño máximo:750
                  megas.
                </h4>
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
                @click="elegirArchivo()"
                plain
                class="upload py-2 mb-3"
                height="100%"
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
                      accept="video/mov, video/mkv, video/mp4, video/avi"
                      prepend-icon="mdi-cloud-upload-outline"
                      truncate-length="1"
                      v-model="files"
                      class="mt-0"
                      hide-input
                      show-size
                      id="file"
                      multiple
                      outlined
                      counter
                    />
                  </v-col>
                  <v-row>
                    <v-col class="py-4">
                      <h3 v-if="!files[0] && !id_video">SUBIR VIDEO</h3>
                      <h3 v-if="![0, 100].includes(progreso_crear)">
                        CREANDO VIDEO
                      </h3>
                      <h3
                        v-if="
                          ![0, 100].includes(progreso_carga) &&
                          ![0].includes(progreso_crear)
                        "
                      >
                        SUBIENDO VIDEO
                      </h3>
                      <h3 v-if="progreso_carga == 100 || id_video">
                        MODIFICAR VIDEO
                      </h3>
                    </v-col>
                  </v-row>
                </v-row>
              </v-btn>
            </v-col>
          </v-row>
          <v-progress-linear
            v-show="progreso_carga != 0"
            :value="progreso_carga"
            striped
            height="25"
            class="mb-2"
          >
            <strong>{{ Math.ceil(progreso_carga) }}%</strong>
          </v-progress-linear>
        </v-card>
        <v-col v-if="subir_video" class="py-4">
          <iframe
            height="500px"
            width="500px"
            class="container"
            :src="frame.video"
          ></iframe>
        </v-col>
        <v-container class="px-3">
          <div class="text-center">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              :src="`https://player.vimeo.com/video/${id_video}`"
              v-if="!files[0] && id_video"
              allowfullscreen
              frameborder="0"
              height="315"
              width="560"
            ></iframe>
          </div>
          <v-row class="justify-center mt-12">
            <v-col cols="12" xs="8" sm="8" md="8" lg="8" xl="8">
              <v-btn
                color="boton"
                elevation="0"
                class="botone"
                block
                dark
                @click="agregarPostulacion()"
                large
                >Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-col>
    <Alerta_ :alert="alert_" v-if="alert_.estado" />
  </v-row>
</template>

<script>
import { INPUT, AUTOCOMPLETE, TEXTAREA } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { Components } from "../../mixins";
import { CURRTET_USER } from "../../global";
import { default as axios } from "axios";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, TEXTAREA, ALERTA, Components],
  props: { item: Object },
  data() {
    return {
      files: [],
      photo: [],
      libreto: [],

      format_image: "",
      format_libreto: "",

      subir_foto: false,
      subir_video: false,
      subir_libreto: false,

      edit_photo: false,
      edit_video: false,
      edit_libreto: false,

      datosPostulacion: {},
      frame: {
        photo: "",
        video: "",
        libreto: "",
      },
      options: {
        muted: true,
        autoplay: true,
      },

      progreso_carga: 0,
      progreso_crear: 0,
      vimeo_crear: "",
      id_video: "",
      url_test_vimeo: "",

      playerReady: false,
      validacion: false,
      showLibreto: false,

      registro: {
        numeroTemporadas: null,
        numeroCapitulos: null,
        nameTalent: null,
        horarioEmision: null,
        canalEmision: null,
        linkProyecto: null,
        nameProgram: null,
        linkPromo: null,
        sinopsis: null,
        fecha: null,
        canal: null,
      },
      form: {
        nameProgram: {
          id: "nameProgram",
          label: "Nombre del programa",
          maxlength: "100",
        },
        nameTalent: {
          id: "nameTalent",
          label: "Nombre del talento",
          maxlength: "100",
        },
        canal: {
          id: "canal",
          label: "Canal",
          tipo: "string",
          maxlength: "100",
        },
        canalEmision: {
          id: "canalEmision",
          label: "Canal de emisión",
          tipo: "string",
          maxlength: "100",
        },
        fecha: {
          id: "fecha",
          tipo: "date",
          label: "Fecha",
          maxlength: "10",
        },
        horarioEmision: {
          id: "horarioEmision",
          label: "Horario de emisión",
          tipo: "time",
          maxlength: "15",
        },
        numeroCapitulos: {
          id: "numeroCapitulos",
          label: "Numero de capitulos",
          tipo: "number",
          maxlength: "10",
        },
        numeroTemporadas: {
          id: "numeroTemporadas",
          label: "Numero de temporadas",
          tipo: "number",
          maxlength: "10",
        },
        linkProyecto: {
          id: "linkProyecto",
          label: "Link del proyecto",
          tipo: "string",
          maxlength: "100",
        },
        linkPromo: {
          id: "linkPromo",
          label: "Link de la promo",
          tipo: "string",
          maxlength: "100",
        },
        sinopsis: {
          id: "sinopsis",
          label: "Sinopsis",
          row: "2",
          maxlength: "3000",
        },
      },
    };
  },
  watch: {
    files() {
      this.frame.video = URL.createObjectURL(this.files[0]);
      this.edit_video = true;
      this.subir_video = true;
      if (this.files[0]) this.createVimeo();
    },
    photo() {
      this.format_image = this.photo.name.split(".");
      this.format_image = this.format_image[this.format_image.length - 1];
      this.frame.photo = URL.createObjectURL(this.photo);
      this.edit_photo = true;
      this.subir_foto = true;
    },
    libreto() {
      this.format_libreto = this.libreto.name.split(".");
      this.format_libreto = this.format_libreto[this.format_libreto.length - 1];
      if (this.libreto.size > 25000000) {
        this.libreto = [];
        this.callAlerta("CORREO-6", "warning", null, null, this.callbackAlerta);
      } else {
        this.frame.libreto = URL.createObjectURL(this.libreto);
        this.edit_libreto = true;
        this.subir_libreto = true;
      }
    },
  },
  computed: {},
  mounted() {
    if (!this.$route.params?.data) {
      this.retroceder();
    } else if (this.$route.params.data?.id) {
      this.buscarPostulacion();
    }
    if (this.$route.params.postulacion) this.$route.params.postulacion;
  },
  methods: {
    ...mapActions({
      _getPostulations: "postulacion/_getPostulations",
      _editPostulacion: "postulacion/_editPostulacion",
      _addPostulacion: "postulacion/_addPostulacion",
      _editProgramas: "programas/_editProgramas",
      _addProgramas: "programas/_addProgramas",
      _getPrograma: "programas/_getPrograma",
      _uploadFile: "canales/_uploadFile",
    }),

    elegirArchivo() {
      document.getElementById("file").click();
    },
    subirArchivo(id) {
      document.getElementById(id).click();
    },

    axiosSc({
      url,
      data = {},
      header = {},
      method = "POST",
      responseType = "json",
      options,
    }) {
      return new Promise((resolve, reject) => {
        let config = {
          url: url,
          method,
          data: data,
          headers: header,
          responseType,
          onUploadProgress: (progressEvent) => {
            if (options) {
              this.progreso_carga = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              if (this.progreso_carga > 100) {
                this.progreso_carga = 100;
              }
            } else {
              this.progreso_crear = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              if (this.progreso_crear > 100) {
                this.progreso_crear = 100;
              }
            }
          },
        };
        axios(config)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            let response = { status: -1, message: null };
            if (error.response) {
              response.status = error.response.status;
              response.message = error.response.data;
              response.status == -1;
            } else if (response.request) {
              response.message = error.request;
              response.status == -1;
            } else {
              response.message = error.message;
              response.status == -1;
            }
            reject(response);
          });
      });
    },

    async createVimeo(
      tk = "82e2b1510dc5f744de0a8c5f6f52586c",
      fileSize = this.files[0].size
    ) {
      const header = {
        Authorization: "Bearer " + tk,
        "Content-Type": "application/json",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      };
      const name =
        this.datosPostulacion.typePostulation == 1
          ? this.registro.nameTalent
          : this.registro.nameProgram;

      const initBody = {
        upload: { approach: "tus", size: fileSize },
        name: `${this.$route.params.data.postulacion.nameCategory}-${name}`,
        description: "Premios India Catalina 40°",
      };

      const url = `https://api.vimeo.com/me/videos`;
      this.vimeo_crear = await this.axiosSc({
        data: initBody,
        method: "POST",
        header,
        url,
      });

      let id_video = this.vimeo_crear.data.link.split("/");
      this.url_test_vimeo = this.vimeo_crear.data.player_embed_url;
      this.vimeoUpload(
        this.vimeo_crear.data.upload.upload_link,
        this.files[0],
        id_video
      );
    },

    async vimeoUpload(url, file, id_video) {
      const headers = {
        "Tus-Resumable": "1.0.0",
        "Upload-Offset": "0",
        "Content-Type": "application/offset+octet-stream",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      };
      let options = true;
      await this.axiosSc({
        url,
        header: headers,
        data: file,
        method: "PATCH",
        options,
      });
      options = false;
      this.id_video = id_video[id_video.length - 1];
      this.id_video = this.id_video;
    },

    async agregarPostulacion() {
      const validacion = this.$refs.form.validate();
      if (this.progreso_carga == 100 || this.id_video != "") {
        if (validacion) {
          if (this.$route.params.data.id) {
            this.callAlerta(
              "",
              "info",
              "p",
              this.editarPostulacion,
              this.callbackAlerta,
              "¿Estas seguro que deseas editar esta postulacion?"
            );
          }
        }
      } else {
        this.callAlerta(
          "",
          "info",
          "p",
          this.editarPostulacion,
          this.callbackAlerta,
          `El video no se ha cargado 100 %`
        );
      }
    },

    async uploadPhoto() {
      return await this._uploadFile({ archivo: this.photo, tipo: 4 });
    },
    async uploadLibreto() {
      return await this._uploadFile({ archivo: this.libreto, tipo: 3 });
    },

    async buscarPostulacion() {
      /* typePostulation 1 TALENTO 2 PRODUCCION */
      const respuesta = await this._getPostulations(this.$route.params.data.id);
      this.datosPostulacion = respuesta.data.data;
      if (this.datosPostulacion.categoryId == 6) {
        this.showLibreto = true;
        this.frame.libreto = this.datosPostulacion.libretto;
      }

      const programa = await this._getPrograma(this.datosPostulacion.programId);
      this.programa = programa.data.data;

      if (!this.registro.numeroTemporadas)
        this.registro.numeroTemporadas = null;
      if (!this.registro.numeroCapitulos) this.registro.numeroCapitulos = null;
      if (!this.registro.horarioEmision) this.registro.horarioEmision = null;
      if (!this.registro.canalEmision) this.registro.canalEmision = null;
      if (!this.registro.linkProyecto) this.registro.linkProyecto = null;
      if (!this.registro.nameProgram) this.registro.nameProgram = null;
      if (!this.registro.nameTalent) this.registro.nameTalent = null;
      if (!this.registro.linkPromo) this.registro.linkPromo = null;
      if (!this.registro.sinopsis) this.registro.sinopsis = null;
      if (!this.registro.canal) this.registro.canal = null;
      if (!this.registro.fecha) this.registro.fecha = null;

      this.registro.numeroTemporadas = this.programa.numberSeason;
      this.registro.numeroCapitulos = this.programa.numberChapter;
      this.registro.canalEmision = this.programa.channelProduct;
      this.registro.linkProyecto = this.datosPostulacion.link;
      this.registro.horarioEmision = this.programa.hourIssue;
      this.registro.nameProgram = this.programa.nameProgram;
      this.registro.nameTalent = this.datosPostulacion.name;
      this.registro.canal = this.programa.channelIssue;
      this.registro.linkPromo = this.programa.webpage;
      this.registro.sinopsis = this.programa.sipnosis;
      this.registro.fecha = this.programa.dateIssue;

      if (this.datosPostulacion.typePostulation == 1)
        this.frame.photo = this.datosPostulacion.photo;
      else this.frame.photo = this.programa.poster;

      const new_id_video = this.datosPostulacion.video.split("/");
      this.id_video = new_id_video[new_id_video.length - 1];
    },

    async editarPostulacion() {
      let logo = {};
      let libreto = {};
      if (this.edit_photo) logo = await this.uploadPhoto();
      if (this.edit_libreto) libreto = await this.uploadLibreto();

      var new_logo = "";
      var new_libreto = "";

      if (logo.status === 200) new_logo = logo.data.data;
      else {
        if (this.datosPostulacion.typePostulation == 1) {
          new_logo = this.datosPostulacion.photo;
        } else {
          new_logo = this.programa.poster;
        }
      }

      if (libreto.status === 200) {
        if (this.edit_libreto) new_libreto = libreto.data.data;
      } else new_libreto = this.datosPostulacion.libretto;

      const dataPostulation = {
        Id: this.$route.params.data.id,
        Name: this.registro.nameTalent,
        Link: this.registro.linkProyecto,
        TypePostulation: `${this.datosPostulacion.typePostulation}`,
        Photo:
          this.datosPostulacion.typePostulation == 1
            ? new_logo
            : this.datosPostulacion.photo,
        Video: `https://player.vimeo.com/video/${this.id_video}`,
        CategoryId: this.datosPostulacion.categoryId,
        UserId: this.datosPostulacion.userId,
        ProgramId: this.datosPostulacion.programId,
        Canal: this.registro.canal,
        Libretto: this.showLibreto ? new_libreto : "",
        NameProgram: this.registro.nameProgram,
      };

      const dataProgram = {
        Letter: this.programa.letter,
        id: this.datosPostulacion.programId,
        poster:
          this.datosPostulacion.typePostulation == 1
            ? this.programa.poster
            : new_logo,
        nameProgram: this.registro.nameProgram,
        channelIssue: this.registro.canal,
        channelProduct: this.registro.canalEmision,
        dateIssue: this.registro.fecha,
        hourIssue: this.registro.horarioEmision,
        numberChapter: this.registro.numeroCapitulos,
        numberSeason: this.registro.numeroTemporadas,
        webpage: this.registro.linkPromo,
        userId: this.datosPostulacion.userId,
        sipnosis: this.registro.sinopsis,
      };
      const respuestaPostulacion = await this._editPostulacion(dataPostulation);
      const respuestaPrograma = await this._editProgramas(dataProgram);
      if (
        respuestaPostulacion.status === 200 &&
        respuestaPrograma.status === 200
      )
        this.retroceder();
    },
    retroceder() {
      window.history.back();
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
