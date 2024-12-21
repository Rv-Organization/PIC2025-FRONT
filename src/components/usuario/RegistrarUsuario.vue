<template>
  <v-card
    class="pt-8 d-sm-block d-inline"
    style="border-radius: 20px"
    color="white"
    elevation="3"
    width="500"
    v-if="register_usuario.estado"
  >
    <h2 class="text-center pt-6 pb-12">Crear cuenta</h2>
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
        <v-col cols="4" class="py-0">
          <AUTOCOMPLETE :field="form.tipo_identidad" />
        </v-col>
        <v-col cols="8" class="py-0">
          <INPUT :field="form.documento" />
        </v-col>
        <v-col cols="12" class="py-0">
          <INPUT :field="form.password" />
        </v-col>
        <v-col cols="12" class="py-0">
          <INPUT :field="form.password_repetir" />
        </v-col>
        <v-col cols="12" class="pt-1 pb-8">
          <v-btn
            elevation="0"
            color="boton"
            dark
            block
            @click="registrarUsuario()"
            large
            >Crear cuenta</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-row justify="center">
      <v-col cols="3" class="mx-0 px-0">
        <v-divider class="mt-2 ml-10"></v-divider>
      </v-col>
      <v-col cols="5" class="mx-0 px-0">
        <h5 class="text-center">¿Ya tienes una cuenta?</h5>
      </v-col>
      <v-col cols="3" class="mx-0 px-0">
        <v-divider class="mt-2 mr-10"></v-divider>
      </v-col>
      <v-col cols="12" class="px-13 pt-4 pb-10 text-center">
        <v-btn
          color="boton"
          @click="register_usuario.estado = false"
          outlined
          large
          >Iniciar sesión</v-btn
        >
      </v-col>
    </v-row>
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirm()"
      :alert="alert"
      v-if="alert.estado"
    />
  </v-card>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "@/mixins/alerta";
import { mapActions } from "vuex";

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  props: {
    register_usuario: Object,
  },
  data() {
    return {
      validacion: true,
      show_password: false,
      show_password2: false,
      miembro_votante: false,
      roleId: "",
      form: {
        nombre: {
          value: "",
          id: "nombre",
          label: "Nombres",
          maxlength: "50",
          required: true,
          autofocus: true,
          rules: [(v) => !!v || "Nombres son requeridos"],
        },
        apellido: {
          value: "",
          id: "apellido",
          label: "Apellidos",
          maxlength: "50",
          rules: [(v) => !!v || "Apellidos son requeridos"],
        },
        usuario: {
          value: "",
          tipo: "email",
          id: "usuario",
          label: "Email",
          maxlength: "50",
          rules: [
            (v) => !!v || "Email es requerido",
            (v) => /.+@.+\..+/.test(v) || "Email no es valido",
          ],
        },
        tipo_identidad: {
          value: "",
          id: "tipo_identidad",
          label: "Tipo",
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
          rules: [(v) => !!v || "Documento es requerido"],
        },
        password: {
          value: "",
          id: "password",
          label: "Contraseña",
          maxlength: "25",
          placeholder: "Ingresar contraseña",
          show_password: false,
          rules: [(v) => !!v || "Contraseña es requerida"],
        },
        password_repetir: {
          value: "",
          id: "password",
          label: "Contraseña",
          maxlength: "25",
          placeholder: "Repetir contraseña",
          show_password: false,
          rules: [
            (v) => !!v || "Contraseña es requerida",
            (v) =>
              v === this.form.password.value || `Las contraseñas no coinciden`,
          ],
        },
      },
    };
  },
  mounted() {
    const opciones = { PICI: 6, PICM: 5 };
    this.roleId = opciones[this.$route.query.llave] || 1;
  },
  methods: {
    ...mapActions({
      _addUsuario: "usuario/_addUsuario",
    }),
    async registrarUsuario() {
      const validacion = this.$refs.form.validate();
      const data = {
        name: this.form.nombre.value,
        lastName: this.form.apellido.value,
        email: this.form.usuario.value,
        typeDocument: this.form.tipo_identidad.value,
        document: this.form.documento.value,
        password: this.form.password.value,
        roleId: this.roleId,
      };

      if (validacion) {
        const res = await this._addUsuario(data);
        if (res.status == 200) {
          this.$refs.form.reset();
          this.ALT_("CORREO-0", "email");
        } else if (res.status == 400) this.ALT_("CORREO-3", "warning");
      }
    },

    cancel() {
      this.register_usuario.estado = false;
      this.ALTD_();
    },
  },
  created() {},
};
</script>
