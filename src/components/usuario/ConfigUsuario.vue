<template>
  <v-dialog persistent v-model="usu.estado" width="500">
    <v-card class="d-sm-block d-inline" style="border-radius: 20px" color="white" elevation="3" width="500">
      <v-container>
        <div class="text-end">
          <v-btn icon class="botone" color="primary" @click="usu.estado = false">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <h2 class="text-center mb-6">Configurar cuenta</h2>
        <v-form v-model="validacion" ref="form" lazy-validation>
          <v-row justify="center" class="px-5">
            <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
              <INPUT :field="form.nombre" />
            </v-col>
            <v-col cols="12" md="6" sm="6" xl="6" lg="6" class="py-0">
              <INPUT :field="form.apellido" />
            </v-col>
            <v-col cols="12" class="py-0">
              <INPUT :field="form.usuario" />
            </v-col>

            <v-col cols="12" class="py-0">
              <INPUT :field="form.documento" />
            </v-col>
            <v-col cols="12" class="py-0">
              <INPUT :field="form.password" />
            </v-col>
            <v-col cols="12" class="py-0">
              <INPUT :field="form.password_repetir" />
            </v-col>
            <v-col cols="12" class="pt-1 pb-8">
              <v-btn elevation="0" color="boton" dark block @click="cambiarPassword()" large>Aceptar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <ALT @exitEsc="cancel()" @cancel="cancel()" @cancelAlert="cancelAlert()" @confirm="confirm()" :alert="alert" v-if="alert.estado" />
    </v-card>
  </v-dialog>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "@/mixins/alerta";
import { mapActions } from "vuex";
import { CURRTET_USER } from "../../global";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  props: {
    usu: Object,
  },
  data() {
    return {
      validacion: true,
      show_password: false,
      show_password2: false,
      form: {
        nombre: {
          value: "",
          id: "nombre",
          label: "Nombres",
          maxlength: "50",
          disabled: true,
          required: true,
          //   autofocus: true,
          rules: [(v) => !!v || "Nombres son requeridos"],
        },
        apellido: {
          value: "",
          id: "apellido",
          label: "Apellidos",
          maxlength: "50",
          disabled: true,
          rules: [(v) => !!v || "Apellidos son requeridos"],
        },
        usuario: {
          value: "",
          tipo: "email",
          id: "usuario",
          label: "Email",
          maxlength: "50",
          disabled: true,
          rules: [(v) => !!v || "Email es requerido", (v) => /.+@.+\..+/.test(v) || "Email no es valido"],
        },
        tipo_identidad: {
          value: "",
          id: "tipo_identidad",
          label: "Tipo",
          disabled: true,
          items: [
            { id: "0", text: "C.C" },
            { id: "1", text: "T.I" },
            { id: "2", text: "C.E" },
            { id: "3", text: "C.C" },
          ],
          rules: [(v) => !!v || "Obligatorio"],
        },
        documento: {
          value: "",
          id: "documento",
          label: "Documento",
          tipo: "number",
          maxlength: "12",
          disabled: true,
          rules: [(v) => !!v || "Documento es requerido"],
        },
        password: {
          value: "",
          id: "password",
          label: "Contraseña nueva",
          maxlength: "25",
          placeholder: "Ingresar contraseña",
          show_password: false,
          rules: [(v) => !!v || "Contraseña es requerida"],
        },
        password_repetir: {
          value: "",
          id: "password",
          label: "Confirmar contraseña",
          maxlength: "25",
          placeholder: "Repetir contraseña",
          show_password: false,
          rules: [(v) => !!v || "Contraseña es requerida", (v) => v === this.form.password.value || `Las contraseñas no coinciden`],
        },
      },
    };
  },
  mounted() {
    this.form.nombre.value = CURRTET_USER.name;
    this.form.apellido.value = CURRTET_USER.lastName;
    this.form.usuario.value = CURRTET_USER.email;
    this.form.documento.value = CURRTET_USER.document;
  },
  methods: {
    ...mapActions({
      _cambioPassword: "usuario/_cambioPassword",
    }),

    async cambiarPassword() {
      const validacion = this.$refs.form.validate();
      const data = {
        password: this.form.password.value,
      };

      if (validacion) {
        const res = await this._cambioPassword({ data });
        if (res.status == 200) {
          this.$refs.form.reset();
          this.ALT_("USUARIO-1", "success");
        } else if (res.status == 400) this.ALT_("USUARIO-3", "warning");
      }
    },
    cancel() {
      this.usu.estado = false;
      this.ALTD_();
    },
  },
  created() {},
};
</script>

<style></style>
