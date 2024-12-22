<template>
  <v-app>
    <v-row class="container-channel px-8">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <h2 class="py-5">
            Inscripción canal productora, operadora y/o programadora
          </h2>
          <h4>
            PRIMER PASO: Inscripción o ratificación del canal, plataforma o
            productora de participar en los Premios India Catalina 2025.
          </h4>
          <v-divider class="mt-6 mb-2"></v-divider>
          <v-card-text class="asaccent--text pb-6 pl-0"
            >Nota: Todos los campos con asteriscos (*) son obligatorios
          </v-card-text>
          <v-card-text class="asaccent--text pb-4"
            >Voy a postular producciones y/o talentos como representante de:
            <v-radio-group v-model="tipo_productora" row>
              <v-radio label="Un canal o plataforma" value="1"></v-radio>
              <v-radio label="Una casa productora" value="2"></v-radio>
              <v-radio
                label="Una persona natural independiente"
                value="3"
              ></v-radio>
            </v-radio-group>
          </v-card-text>

          <v-form v-model="validacion" ref="form" lazy-validation>
            <v-row justify="start">
              <v-col
                cols="12"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                xl="12"
                class="py-0"
                v-if="tipo_productora == '1'"
              >
                <AUTOCOMPLETE :field="form.canales_productoras" />
                <INPUT
                  v-if="form.canales_productoras.value == 'Otro. Cuál'"
                  :field="form.otro_canales_productoras"
                />
              </v-col>
              <v-col
                cols="12"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                xl="12"
                class="py-0"
                v-if="tipo_productora == '2'"
              >
                <INPUT :field="form.nombre_canal" />
              </v-col>
              <v-col
                cols="12"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                xl="12"
                class="py-0"
                v-if="tipo_productora == '3'"
              >
                <INPUT :field="form.nombre_canal" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.cargo" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.email_1" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.email_1_veri" />
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.celular" />
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.celular_verificacion" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.direccion_oficina" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <AUTOCOMPLETE :field="form.paises" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <AUTOCOMPLETE
                  :field="form.departamento"
                  v-if="form.paises.value == 'Colombia'"
                />
                <INPUT
                  v-else
                  :field="{
                    ...form.departamento,
                    label: 'Estado o departamento',
                  }"
                />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <AUTOCOMPLETE
                  :field="form.ciudad"
                  v-if="form.paises.value == 'Colombia'"
                />
                <INPUT v-else :field="form.ciudad" />
              </v-col>
            </v-row>
            <v-card-text class="asaccent--text mt-8 pb-2 pl-0"
              >Seleccione el sector que lo representa como postulante
            </v-card-text>
            <v-radio-group v-model="form.sector.value" row>
              <v-radio
                label="Sector Audiovisual Privado - Canales"
                value="1"
              ></v-radio>
              <v-radio
                label="Sector Audiovisual Privado - Plataformas"
                value="2"
              ></v-radio>
              <v-radio label="Sector Audiovisual Público" value="3"></v-radio>
              <v-radio label="Independiente" value="4"></v-radio>
            </v-radio-group>
          </v-form>
          <v-divider class="my-4"></v-divider>
          <v-form v-model="validacion" ref="form_uploads" lazy-validation>
            <h4 class="text-start my-10">
              Documentos requeridos para la Inscripción de Producciones:
            </h4>
            <v-card elevation="0" class="px-3 pb-0 mb-0">
              <v-row align="center" class="my-0">
                <v-col cols="12" sm="12" xs="6" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h4>
                      Certificado actualizado de Cámara de Comercio del canal o
                      productora *
                    </h4>
                    <p>
                      Para garantizar la participación, es necesario adjuntar
                      los siguientes documentos según corresponda:
                    </p>
                    <br />
                    <ol>
                      <li v-if="tipo_productora == '1'">
                        <strong>Canales y productoras:</strong>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-information-outline</v-icon
                            >
                          </template>
                          <span
                            >Certificado actualizado de la Cámara de Comercio o
                            documento equivalente que acredite su existencia
                            legal.</span
                          >
                        </v-tooltip>
                      </li>
                      <li v-if="tipo_productora == '2'">
                        <strong>Plataformas o empresas de otros países:</strong>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-information-outline</v-icon
                            >
                          </template>
                          <span
                            >Documento oficial que certifique su constitución,
                            como un registro mercantil, certificado de
                            incorporación o inscripción en un registro
                            público.</span
                          >
                        </v-tooltip>
                      </li>
                      <li v-if="tipo_productora == '3'">
                        <strong
                          >Personas naturales con producciones en cuentas
                          digitales:</strong
                        >
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-information-outline</v-icon
                            >
                          </template>
                          <span
                            >Documento oficial de identificación fiscal (RUT o
                            equivalente según el país).</span
                          >
                        </v-tooltip>
                      </li>
                      <li v-if="tipo_productora == '3'">
                        <strong>Menores de edad:</strong>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-information-outline</v-icon
                            >
                          </template>
                          <span
                            >Carta de autorización firmada por los padres o
                            tutor legal.</span
                          >
                        </v-tooltip>
                      </li>
                      <li v-if="tipo_productora == '1'">
                        <strong>Canales universitarios:</strong>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-information-outline</v-icon
                            >
                          </template>
                          <span
                            >Constancia de acreditación emitida por la autoridad
                            educativa competente del país (en Colombia, el
                            Ministerio de Educación Nacional).</span
                          >
                        </v-tooltip>
                      </li>
                    </ol>
                    <br />
                    <h4>Formato y tamaño permitido:</h4>
                    <ul>
                      <li>Extensiones: PDF.</li>
                      <li>Peso máximo por archivo: 5 MB.</li>
                    </ul>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  xs="6"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                >
                  <v-btn
                    @click="subirArchivo('input-file1')"
                    plain
                    class="botone-outlined mb-3 py-2"
                  >
                    <v-file-input
                      prepend-icon="mdi-cloud-upload-outline"
                      accept="application/pdf, image/png, image/jpeg, image/jpg"
                      v-model="form_uploads.certificado"
                      truncate-length="1"
                      id="input-file1"
                      class="d-none"
                      hide-input
                    />
                    <p>
                      {{
                        form_uploads.certificado.name
                          ? "VOLVER A SUBIR"
                          : "SUBIR ARCHIVO"
                      }}
                    </p>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="this.form_uploads.certificado.name" class="py-4">
              <iframe
                v-if="this.format_certificado === 'pdf'"
                height="500px"
                width="500px"
                class="container"
                :src="frames.certificado"
              ></iframe>
              <v-img
                v-else
                max-height="100%"
                contain
                max-width="100%"
                :src="frames.certificado"
                aspect-ratio="1.4"
              ></v-img>
            </v-col>
            <v-card elevation="0" class="px-3 my-10">
              <v-row aling="center" class="my-0">
                <v-col cols="12" sm="12" xs="6" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h3>
                      Carta de intención de postulación del canal o productora
                      firmada y escaneada *
                    </h3>
                    <h6>
                      En la carta se debe mencionar quién es la persona
                      autorizada para representar al canal, plataforma o casa
                      productora en este proceso de postulaciones..
                    </h6>
                    <h4>
                      Extensiones permitidas (JPG, JPEG, PNG, PDF, máximo 2
                      megas)
                    </h4>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  xs="6"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                >
                  <v-btn
                    @click="subirArchivo('input-file2')"
                    plain
                    class="botone-outlined"
                    height="100%"
                  >
                    <v-file-input
                      prepend-icon="mdi-cloud-upload-outline"
                      accept="application/pdf, image/png, image/jpeg, image/jpg"
                      v-model="form_uploads.carta"
                      truncate-length="1"
                      id="input-file2"
                      class="d-none"
                      hide-input
                      show-size
                    />
                    <p>
                      {{
                        form_uploads.carta.name
                          ? "VOLVER A SUBIR"
                          : "SUBIR ARCHIVO"
                      }}
                    </p>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="this.form_uploads.carta.name" class="py-4">
              <iframe
                v-if="this.format_carta === 'pdf'"
                height="500px"
                width="500px"
                class="container"
                :src="frames.carta"
              ></iframe>
              <v-img
                v-else
                max-height="100%"
                contain
                max-width="100%"
                :src="frames.carta"
                aspect-ratio="1.4"
              ></v-img>
            </v-col>
          </v-form>
          <v-container>
            <v-row class="my-15 justify-center">
              <v-col cols="12" xs="8" sm="8" md="8" lg="8" xl="8">
                <v-btn
                  @click="alertaGuardar()"
                  class="botone"
                  color="boton"
                  elevation="0"
                  large
                  block
                  dark
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
        @confirm="registrarCanal()"
        :alert="alert"
        v-if="alert.estado"
      />
    </v-row>
  </v-app>
</template>

<script>
import Departamentos from "../../listas/Departamentos";
import Paises from "../../listas/Paises";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER } from "../../global";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],

  data() {
    return {
      format_certificado: "",
      format_carta: "",
      frames: { certificado: "", carta: "" },
      tipo_productora: "1",
      validacion: true,
      estado: false,

      form: {
        canales_productoras: {
          value: "",
          id: "canales_productoras",
          label: "Nombre del canal o Productora Postulante",
          items: [
            { id: "Caracol Tv", text: "Caracol TV" },
            { id: "Canal RCN", text: " Canal RCN" },
            { id: "Canal 1", text: "Canal 1" },
            { id: "Señal Colombia", text: "Señal Colombia" },
            { id: "Canal Institucional", text: "Canal Institucional" },
            { id: "RTVCPlay", text: "RTVCPlay" },
            { id: "Teleantioquia", text: "Teleantioquia" },
            { id: "Telemedellín", text: "Telemedellín" },
            { id: "Telecaribe", text: "Telecaribe" },
            { id: "Telepacífico", text: "Telepacífico" },
            { id: "Capital", text: "Capital" },
            { id: "Eureka", text: "Eureka" },
            { id: "Teleislas", text: "Teleislas" },
            { id: "Telecafé", text: "Telecafé" },
            { id: "Canal TRO", text: "Canal TRO" },
            { id: "CityTV", text: "CityTV" },
            { id: "Canal Trece", text: "Canal Trece" },
            { id: "Netflix", text: "Netflix" },
            { id: "HBO Max", text: "HBO Max" },
            { id: "Star +", text: "Star +" },
            { id: "Prime Video", text: "Prime Video" },
            { id: "Disney +", text: "Disney +" },
            { id: "MinTIC", text: "MinTIC" },
            { id: "", text: "Otro. Cuál" },
          ],
          rules: [(v) => !!v || "Nombre del canal o Productora Postulante"],
        },
        casa_productoras: {
          value: "",
          id: "casa_productoras",
          label: "Nombre de la casa Productora Postulante",
          items: [
            { id: "CityTV", text: "CityTV" },
            { id: " Canal Trece", text: " Canal Trece" },
            { id: "Netflix", text: "Netflix" },
            { id: "HBO Max", text: "HBO Max" },
            { id: "Canal Institucional", text: "Canal Institucional" },
            { id: "RTVCPlay", text: "RTVCPlay" },
            { id: "Star +", text: "Star +" },
            { id: "Prime Video", text: "Prime Video" },
            { id: "Disney +", text: "Disney +" },
            { id: "MinTIC", text: "MinTIC" },
            { id: "", text: "Otros, especifica cual" },
          ],
          rules: [(v) => !!v || "Nombre de la casa Productora Postulante"],
        },
        otro_canales_productoras: {
          value: "",
          id: "otro_canales_productoras",
          label: "Indique cual... *",
          maxlength: "100",
          rules: [(v) => !!v || "Nombre es requerido"],
        },
        otro_casa_productoras: {
          value: "",
          id: "otro_casa_productoras",
          label: "Indique cual... *",
          maxlength: "100",
          rules: [(v) => !!v || "Nombre es requerido"],
        },
        nombre_canal: {
          value: "",
          id: "nombre_canal",
          label: "Nombre *",
          maxlength: "100",
          rules: [(v) => !!v || "Nombre es requerido"],
        },
        contacto: {
          value: "",
          id: "contacto",
          label: "Contacto autorizado por canal o productora *",
          maxlength: "100",
          rules: [(v) => !!v || "Contacto autizado es requerido"],
        },
        cargo: {
          value: "",
          id: "cargo",
          label: "Cargo *",
          maxlength: "100",
          rules: [(v) => !!v || "Cargo es requerido"],
        },

        email_1: {
          value: "",
          tipo: "email",
          id: "email_1",
          label: "Correo *",
          maxlength: "50",
          rules: [
            (v) => !!v || "Correo es requerido",
            (v) => /.+@.+\..+/.test(v) || "Correo no es valido",
          ],
        },
        email_1_veri: {
          value: "",
          tipo: "email",
          id: "email_1_veri",
          label: "Verificar correo *",
          maxlength: "50",
          rules: [
            (v) => !!v || "Correo es requerido",
            (v) => /.+@.+\..+/.test(v) || "Correo no es valido",
            (v) => v == this.form.email_1.value || "Correo no coincide",
          ],
        },
        celular: {
          value: "",
          id: "celular",
          label: "Celular *",
          tipo: "number",
          maxlength: "10",
          rules: [
            (v) => !!v || "Celular es requerido",
            (v) => v.length >= 10 || "Numero celular invalido",
          ],
        },
        celular_verificacion: {
          value: "",
          id: "celular_verificacion",
          label: "Confirmación de celular *",
          tipo: "number",
          maxlength: "10",
          rules: [
            (v) => !!v || "Celular es requerido",
            (v) => v.length >= 10 || "Numero celular invalido",
            (v) => v == this.form.celular.value || "email no coincide",
          ],
        },
        direccion_oficina: {
          value: "",
          id: "direccion_oficina",
          label: "Dirección *",
          maxlength: "100",
          rules: [(v) => !!v || "Dirreción de oficina es requerida"],
        },
        departamento: {
          value: "",
          id: "departamento",
          label: "Departamento",
          maxlength: "100",
          items: Departamentos.departamento,
          rules: [(v) => !!v || "Departamento es requerido"],
        },
        paises: {
          value: "",
          id: "paises",
          label: "País",
          items: Paises.paises,
          rules: [(v) => !!v || "Pais es requerido"],
        },
        ciudad: {
          value: "",
          id: "ciudad",
          label: "Ciudad",
          maxlength: "100",
          items: [],
          rules: [(v) => !!v || "Ciudad es requerida"],
        },
        sector: {
          value: "",
          id: "sector",
          label: "Seleccione el sector que lo representa como postulante",
          rules: [(v) => !!v || "El sector es obligatorio"],
        },
      },
      form_uploads: {
        certificado: [],
        carta: [],
      },
    };
  },
  watch: {
    tipo_productora() {
      this.form.canales_productoras.value = "";
      this.form.casa_productoras.value = "";
      this.form.nombre_canal.value = "";
    },
    "form.canales_productoras.value"() {
      this.form.otro_canales_productoras.value = "";
    },
    "form.departamento.value"() {
      Departamentos.departamento.forEach((u) => {
        this.form.departamento.value == u.text
          ? (this.form.ciudad.items = u.municipio)
          : null;
      });
    },
    "form_uploads.certificado"() {
      this.format_certificado = this.form_uploads.certificado.name.split(".");
      this.format_certificado =
        this.format_certificado[this.format_certificado.length - 1];
      if (this.form_uploads.certificado.size > 5000000) {
        this.form_uploads.certificado = "";
        this.ALT_("CORREO-7", "warning");
      } else
        this.frames.certificado = URL.createObjectURL(
          this.form_uploads.certificado
        );
    },
    "form_uploads.carta"() {
      this.format_carta = this.form_uploads.carta.name.split(".");
      this.format_carta = this.format_carta[this.format_carta.length - 1];
      if (this.form_uploads.carta.size > 2000000) {
        this.form_uploads.carta = "";
        this.ALT_("CORREO-6", "warning");
      } else this.frames.carta = URL.createObjectURL(this.form_uploads.carta);
    },
  },
  mounted() {
    this.obetenerCanal();
    this.form.paises.value = "Colombia";
  },
  methods: {
    ...mapActions({
      _addCanal: "canales/_addCanal",
      _getCanal: "canales/_getCanal",
      _uploadFile: "canales/_uploadFile",
    }),
    async obetenerCanal() {
      const id = CURRTET_USER.id;
      const res = await this._getCanal({ id });
      if (res.data?.data?.id)
        this.$router.push("/postulantes/registro-produccion");
    },
    subirArchivo(id) {
      document.getElementById(id).click();
    },
    async registrarCanal() {
      const validacion = this.$refs.form.validate();
      if (this.tipo_productora == "1") {
        this.form.canales_productoras.value == "Otro. Cuál"
          ? (this.form.nombre_canal.value =
              this.form.otro_canales_productoras.value)
          : (this.form.nombre_canal.value =
              this.form.canales_productoras.value);
      }
      // if (this.tipo_productora == "2") {
      //   this.form.casa_productoras.value == "Otros, especifica cual"
      //     ? (this.form.nombre_canal.value =
      //         this.form.otro_casa_productoras.value)
      //     : (this.form.nombre_canal.value = this.form.casa_productoras.value);
      // }

      if (validacion) {
        if (this.form_uploads.carta && this.form_uploads.certificado) {
          const certificado = await this.uploadCertificado();
          const carta = await this.uploadCarta();
          if (certificado.status === 200 && carta.status === 200) {
            const data = {
              nameClient: this.form.nombre_canal.value,
              contact: this.form.contacto.value,
              position: this.form.cargo.value,
              celphone: this.form.celular.value,
              // phone: this.form.telefono.value,
              email: this.form.email_1.value,
              // emailTwo: this.form.email_2.value,
              adress: this.form.direccion_oficina.value,
              departament: this.form.departamento.value,
              city: this.form.ciudad.value,
              ProducerTypeId: this.tipo_productora,
              sectorId: this.form.sector.value,
              certifycc: certificado.data.data,
              letter: carta.data.data,
              userId: CURRTET_USER.id,
            };
            const respuesta = await this._addCanal(data);
            if (respuesta.status === 200)
              this.$router.push("/postulantes/registro-produccion");
            else this.ALT_("CORREO-5", "warning");
          } else {
            this.ALT_("CORREO-5", "warning");
          }
          if (!this.form.sector.value) {
            this.ALT_("Debe seleccionar un sector", "warning");
            return;
          }
        } else {
          this.ALT_("CORREO-4", "warning");
        }
      }
    },
    alertaGuardar() {
      const validacion = this.$refs.form.validate();
      if (validacion) {
        if (this.frames.carta && this.frames.certificado) {
          this.ALT_("guardarCanal", "info", "p");
        } else {
          this.ALT_("CORREO-4", "warning");
        }
      }
    },
    confirm() {
      this.registrarCanal();
    },
    async uploadCertificado() {
      return await this._uploadFile({
        archivo: this.form_uploads.certificado,
        tipo: 1,
      });
    },
    async uploadCarta() {
      return await this._uploadFile({
        archivo: this.form_uploads.carta,
        tipo: 2,
      });
    },
    cancel() {
      this.ALTD_();
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
