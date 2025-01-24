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

        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"
          class="py-0"
          v-if="
            $route.params.data?.postulacion.id == 4 ||
            $route.params.data?.postulacion.id == 5 ||
            $route.params.data?.postulacion.id == 38
          "
        >
          <INPUT :field="form.link" />
        </v-col>
        <h3>
          Descargue
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/10JLRI6kWO5c4MQ2J_ujRPTBFd32BwY6Y?usp=sharing"
            >aquí</a
          >
          la plantilla para usar como claqueta del material audiovisual,
          sobreponga el nombre de la categoría según corresponda (copie y pegue
          el nombre de la lista en el reglamento), y añada solamente el nombre
          de la producción o del talento postulado sin créditos adicionales.
          Tipo de letra Lato, tamaños 48, 90 y 40 de acuerdo con el
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1KEpVA_WTMLtcksDfaqSdmT5i4C0lyeXb/view?usp=drivesdk"
            >ejemplo.</a
          >
        </h3>
        <h2 class="text-start my-10">Archivos requeridos</h2>

        <v-col v-if="subir_foto" class="py-4">
          <v-img
            max-height="100%"
            contain
            max-width="100%"
            :src="frame.photo"
            aspect-ratio="1.4"
          ></v-img>
        </v-col>

        <v-card elevation="0" class="px-3 pb-0 mb-0 my-12">
          <v-row aling="center" class="my-0">
            <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
              <v-card-text>
                <h3>
                  Una muestra de la producción. Para esto, revisar el anexo de
                  <a
                    target="_blank"
                    href="https://premiosindiacatalina.com/wp-content/uploads/2025/01/PIC-2025-REQUERIMIENTO-AUDIOVISUAL-PARA-POSTULACION.pdf"
                    >requerimientos</a
                  >
                  de acuerdo con la categoría. Extensiones permitidas: MP4,
                  WEBM, AVI, MOV. Tamaño máximo:750 megas. (a)
                </h3>
                <h4>
                  (Extensiones permitidas MP4, WEBM, AVI,MOV, máximo 750 megas)
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
                class="boton-focus-animation py-2 mb-3"
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
                      accept="video/mov,video/quicktime, video/mkv, video/mp4, video/avi"
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
          <h5 v-if="validar_mov">
            Lo sentimos, su archivo en formato .mov no puede ser previsualizado
            debido a la incompatibilidad del navegador. Por favor, confíe en que
            su archivo ha sido cargado de forma exitosa y verifíquelo en los
            detalles de su postulación más tarde.
          </h5>
          <iframe
            v-else
            height="500px"
            width="500px"
            class="container"
            :src="frame.video"
          ></iframe>
        </v-col>

        <div class="text-center my-12">
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
        <v-container class="px-3">
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
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
  </v-row>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER } from "../../global";
import { default as axios } from "axios";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: {},
  data() {
    return {
      files: [],
      photo: [],
      letter: [],

      format_image: "",
      format_letter: "",

      edit_photo: false,
      edit_video: false,
      edit_letter: false,

      subir_foto: false,
      subir_video: false,
      subir_letter: false,

      validar_mov: false,

      datosPostulacion: {},
      frame: {
        photo: "",
        video: "",
        letter: "",
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

      form: {
        nombre: {
          value: "",
          id: "nombre",
          label: "Nombre ",
          maxlength: "100",
        },
        contacto: {
          value: "",
          id: "contacto",
          label: "Celular",
          tipo: "number",
          maxlength: "10",
        },
        email: {
          value: "",
          tipo: "email",
          id: "email",
          label: "Email",
          maxlength: "100",
        },
        telefono: {
          value: "",
          id: "telefono",
          label: "Teléfono ",
          maxlength: "15",
        },
        link: {
          value: "",
          id: "link",
          label: "Link a la página del proyecto",
          maxlength: "100",
        },
      },
    };
  },
  watch: {
    files() {
      if (this.files[0].type === "video/quicktime") {
        this.validar_mov = true;
      } else {
        this.validar_mov = false;
      }
      this.frame.video = URL.createObjectURL(this.files[0]);
      this.edit_video = true;
      this.subir_video = true;
      if (this.files[0]) {
        this.createVimeo();
      }
    },
    photo() {
      this.format_image = this.photo.name.split(".");
      this.format_image = this.format_image[this.format_image.length - 1];

      this.frame.photo = URL.createObjectURL(this.photo);
      this.edit_photo = true;
      this.subir_foto = true;
    },
    letter() {
      this.format_letter = this.letter.name.split(".");
      this.format_letter = this.format_letter[this.format_letter.length - 1];
      if (this.letter.size > 2000000) {
        this.letter = "";
        this.ALT_("CORREO-6", "warning");
      } else {
        this.edit_letter = true;
        this.subir_letter = true;
        this.frame.letter = URL.createObjectURL(this.letter);
      }
    },
  },
  computed: {
    // id_vimeo_c() {
    //   return this.id_video;
    // },
  },

  mounted() {
    if (!this.$route.params?.data)
      this.$router.push("/postulantes/resumen-produccion");
    if (this.$route.params?.data?.id) this.buscarPostulacion();
    if (this.$route.params.postulacion) this.$route.params.postulacion;
  },
  methods: {
    ...mapActions({
      _addPostulacion: "postulacion/_addPostulacion",
      _uploadFile: "canales/_uploadFile",
      _getPostulations: "postulacion/_getPostulations",
      _editPostulacion: "postulacion/_editPostulacion",
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
      const initBody = {
        upload: {
          approach: "tus",
          size: fileSize,
        },
        name: `${this.$route.params.data.postulacion.nameCategory} - ${this.$route.params.data.programa.nameProgram}`,
        description: this.$route.params.data.programa.sipnosis,
      };
      const url = `https://api.vimeo.com/me/videos`;

      this.vimeo_crear = await this.axiosSc({
        url,
        data: initBody,
        header,
        method: "POST",
      });
      console.log("😎 ");
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

      const res = await this.axiosSc({
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

    onReady() {
      this.playerReady = true;
    },
    play() {
      this.$refs.player.play();
    },
    pause() {
      this.$refs.player.pause();
    },
    async agregarPostulacion() {
      // const validacion = this.$refs.form.validate();
      const datos = this.$route.params.data;
      if (this.progreso_carga == 100 || this.id_video != "") {
        if (this.$route.params.data.id) {
          this.ALT_("editpostulacion", "info", "p");
        } else {
          // const logo = await this.uploadPhoto();
          // const letter = await this.uploadLetter();
          // if (logo.status === 200)
          const data = {
            name: this.form.nombre.value,
            phone: this.form.telefono.value,
            celphone: this.form.contacto.value,
            email: this.form.email.value,
            typePostulation: `${datos.postulacion.typeCategoryId}`,
            photo: ``,
            video: `https://player.vimeo.com/video/${this.id_video}`,
            LetterManager: ``,
            categoryId: datos.postulacion.id,
            userId: CURRTET_USER.id,
            programId: datos.programa.id,
            link: this.form.link.value,
          };
          const respuesta = await this._addPostulacion(data);
          if (respuesta.status === 200)
            this.$router.push("/postulantes/resumen-produccion");
        }
      } else this.ALT_("VIMEO-0", "info");
    },
    async uploadPhoto() {
      return await this._uploadFile({
        archivo: this.photo,
        tipo: 4,
      });
    },
    async uploadLetter() {
      return await this._uploadFile({
        archivo: this.letter,
        tipo: 2,
      });
    },
    async buscarPostulacion() {
      const respuesta = await this._getPostulations(this.$route.params.data.id);
      this.datosPostulacion = respuesta.data.data;
      this.typePostulation = respuesta.data.data;
      this.form.nombre.value = respuesta.data.data.name;
      this.form.contacto.value = respuesta.data.data.celphone;
      this.form.email.value = respuesta.data.data.email;
      this.form.telefono.value = respuesta.data.data.phone;
      this.form.link.value = respuesta.data.data.link;
      // this.frame.photo = respuesta.data.data.photo;
      // this.frame.letter = respuesta.data.data.letterManager;

      // this.subir_foto = true;
      // this.subir_letter = true;
      const new_id_video = respuesta.data.data.video.split("/");
      this.id_video = new_id_video[new_id_video.length - 1];

      // this.format_letter = this.frame.letter.split(".");
      // this.format_letter = this.format_letter[this.format_letter.length - 1];
    },
    async editarPostulacion() {
      // let logo = {};
      // let letter = {};
      // if (this.edit_photo) logo = await this.uploadPhoto();
      // if (this.edit_letter) letter = await this.uploadLetter();
      // if (logo.status === 200 || !this.edit_photo) {
      // let newLogo = "";
      // let newLetter = "";
      // if (this.edit_photo) newLogo = logo.data.data;
      // else newLogo = this.datosPostulacion.photo;
      // if (this.edit_letter) newLetter = letter.data.data;
      // else newLetter = this.datosPostulacion.LetterManager;

      const data = {
        id: this.$route.params.data.id,
        name: this.form.nombre.value,
        phone: this.form.telefono.value,
        celphone: this.form.contacto.value,
        email: this.form.email.value,
        typePostulation: `${this.datosPostulacion.typePostulation}`,
        photo: newLogo,
        video: `https://player.vimeo.com/video/${this.id_video}`,
        letterManager: newLetter,
        categoryId: this.datosPostulacion.categoryId,
        userId: CURRTET_USER.id,
        programId: this.datosPostulacion.programId,
        link: this.form.link.value,
      };
      const respuesta = await this._editPostulacion(data);
      if (respuesta.status === 200)
        this.$router.push("/postulantes/resumen-produccion");
    },
    cancel() {
      this.ALTD_();
    },
    async confirmar() {
      this.editarPostulacion();
      //this.$router.push("/postulantes/resumen-produccion");
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
