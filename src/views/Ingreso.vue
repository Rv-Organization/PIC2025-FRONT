<template>
  <v-app>
    <v-container class="fill-height pb-0 pt-0 mb-0" fluid>
      <v-row justify="center" align="center">
        <v-col cols="5" md="6" sm="6" xl="6" lg="6" class="py-2">
          <v-img
            width="415"
            contain
            class="mx-auto fill-height"
            src="../assets/image/logoPic40.png"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4" sm="6" xl="6" lg="6">
          <v-card
            :disabled="_stateLoading"
            color="white"
            elevation="3"
            class="pt-8 d-sm-block d-inline"
            width="500"
            height="470"
            v-if="!register_usuario.estado"
            style="border-radius: 20px"
          >
            <h2 class="text-center my-2">Iniciar sesión</h2>
            <v-form v-model="validacion" ref="form" lazy-validation>
              <v-row justify="center">
                <v-col cols="12" class="px-10 0pb-0 mt-4">
                  <Input_
                    :field="form.usuario"
                    v-model="user.email"
                    @validateEnter="datoCorreo()"
                  />
                </v-col>
                <v-col cols="12" class="px-10 pb-0 py-0">
                  <Input_
                    :field="form.password"
                    v-model="user.password"
                    @validateEnter="ingresar()"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="px-10 pt-0 text-end"
                  @click="cambiar_password.estado = true"
                >
                  <div>
                    <a style="font-size: 15px" class="botone"
                      >Olvidé la contraseña</a
                    >
                  </div>
                </v-col>
                <v-col cols="12" class="px-10 pt-0 botone">
                  <v-btn
                    color="boton"
                    dark
                    block
                    @click="ingresar()"
                    elevation="0"
                    large
                    >Ingresar</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
            <v-row justify="center" class="mt-3">
              <v-col cols="3" class="mx-0 px-0">
                <v-divider class="mt-2 ml-10"></v-divider>
              </v-col>
              <v-col cols="5" class="mx-0 px-0">
                <h4 class="text-center">¿Aún no tienes una cuenta?</h4>
              </v-col>
              <v-col cols="3" class="mx-0 px-0">
                <v-divider class="mt-2 mr-8"></v-divider>
              </v-col>
              <v-col cols="12" class="px-9 pt-3 text-center">
                <v-btn
                  color="boton"
                  class="botone"
                  @click="register_usuario.estado = true"
                  outlined
                  large
                  >Crear cuenta</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
          <REGISTRARUSUARIO
            :register_usuario="register_usuario"
            class="my-10"
          />
          <CAMBIARPASSWORD
            :cambiar_password="cambiar_password"
            v-if="cambiar_password.estado"
            class="my-10"
          />
        </v-col>
      </v-row>
    </v-container>
    <FOOTER />
    <Alerta_ :alert="alert_" v-if="alert_.estado" />
  </v-app>
</template>

<script>
import REGISTRARUSUARIO from "../components/usuario/RegistrarUsuario.vue";
import CAMBIARPASSWORD from "../components/usuario/RecuperarPassword.vue";
// import VueReCaptcha from "vue-recaptcha-v3";
import FOOTER from "../components/global/Footer.vue";
import { Components } from "../mixins";
// import { ALERTA } from "../mixins/alerta";
import { INPUT } from "../mixins/global";
import { mapActions, mapGetters } from "vuex";
// Vue.use(VueReCaptcha, { siteKey: "6LeQoIMaAAAAABuNWmZf8JrsoooVgQPSJVXdRXgW" });

export default {
  components: { FOOTER, REGISTRARUSUARIO, CAMBIARPASSWORD },
  mixins: [INPUT, Components],
  name: "INGRESO",
  data() {
    return {
      validacion: true,
      showPassword: false,
      miembro_votante: false,

      register_usuario: { estado: false },
      cambiar_password: { estado: false },
      user: { email: null, password: null },

      form: {
        usuario: {
          value: "",
          tipo: "email",
          id: "usuario",
          label: "  Correo Electrónico",
          maxlength: "50",
          placeholder: "Ingresar usuario",
          rules: [
            (v) => !!v || "Email es requerido",
            (v) => /.+@.+\..+/.test(v) || "Email no es valido",
          ],
        },
        password: {
          value: "",
          id: "password",
          tipo: "password",
          label: "Contraseña",
          placeholder: "Ingresar contraseña",
          show_password: false,
          maxlength: "25",
          rules: [(v) => !!v || "Contraseña es requerido"],
        },
      },
    };
  },
  computed: {
    ...mapGetters({ _stateLoading: "_stateLoading" }),
  },
  mounted() {
    this.miembro_votante = this.$route.query.llave == "PIC2023";
    this.miembro_votante
      ? (this.register_usuario.estado = true)
      : (this.register_usuario.estado = false);
  },
  methods: {
    ...mapActions({ _login: "usuario/_login" }),

    datoCorreo() {
      document.getElementById("password").focus();
    },

    async ingresar() {
      const validacion = this.$refs.form.validate();
      if (!validacion) return;

      try {
        const respuesta = await this._login(this.user);
        if (respuesta === 2)
          return this.callAlerta(
            "CORREO-1",
            "email",
            null,
            null,
            this.callbackAlerta
          );
        if (respuesta == "finally")
          return this.callAlerta(
            "",
            "info",
            null,
            null,
            this.callbackAlerta,
            `Hemos concluido nuestras votaciones. Agradecemos tu participación. Te invitamos a sintonizar la transmisión de los Premios India Catalina este jueves 18 a partir de las 6:00 pm. Míralo Online aquí
            <a href='https://youtube.com/@FicciFestival?si=wt0evLhVEKhhqqdP' target="_blank">Abrir</a>`
          );
        if (respuesta == 5)
          return this.callAlerta(
            "",
            "info",
            null,
            null,
            this.callbackAlerta,
            "Pronto se dará inicio a las evaluaciones"
          );
        if (respuesta == "rest") {
          return this.callAlerta(
            "",
            "info",
            null,
            null,
            this.callbackAlerta,
            "Evaluaciones finalizadas"
          );
        }
        if ([3].includes(respuesta)) {
          return this.callAlerta(
            "",
            "info",
            null,
            null,
            this.callbackAlerta,
            "La selección de ganadores estará habilitada en breve"
          );
        }
        if (respuesta == "no-acceso")
          return this.callAlerta("CORREO-9", "info");
        else this.callAlerta("-1", "error");
      } catch (error) {
        if (error == "Not Authorized")
          return this.callAlerta(
            "",
            "info",
            null,
            null,
            this.callbackAlerta,
            "Pronto podrás dar tu voto como miembro votante acreditado de la industria"
          );
        this.callAlerta(
          "",
          "info",
          null,
          null,
          this.callbackAlerta,
          "Las credenciales no son correctas"
        );
      }
    },

    cancel() {
      this.ALTD_();
    },
  },
};
</script>
