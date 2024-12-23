<template>
  <v-app>
    <v-container class="fill-height pb-0 pt-0 mb-0" fluid>
      <v-row justify="center"> </v-row>
    </v-container>
    <FOOTER />
    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirm()"
      :alert="alert"
      v-if="alert.estado"
    />
  </v-app>
</template>
<script>
import FOOTER from "../components/global/Footer.vue";
import { ALERTA } from "../mixins/alerta";
import { INPUT } from "../mixins/global";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { FOOTER },
  mixins: [INPUT, ALERTA],
  name: "INGRESO",
  data() {
    return {
      validacion: true,
      showtoken: false,
      register_usuario: {
        estado: false,
      },
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
        token: {
          value: "",
          id: "password",
          tipo: "password",
          label: "Token",
          placeholder: "Ingresar Token",
          show_password: false,
          maxlength: "25",
          rules: [(v) => !!v || "Token es requerido"],
        },
      },
    };
  },
  computed: {
    ...mapGetters({ _stateLoading: "_stateLoading" }),
  },
  mounted() {
    this.ingresar();
  },
  methods: {
    ...mapActions({
      _confimarCorreo: "usuario/_confimarCorreo",
    }),

    async ingresar() {
      const data = {
        email: this.$route.params.email,
        tokenEmail: this.$route.params.token,
      };
      const res = await this._confimarCorreo({ data });
      if (res.data.message == "Previously confirmed email")
        return this.ALT_("CORREO-T1", "info");
      else if (res.data.data) return this.ALT_("CORREO-T", "success");
      else this.ALT_("CORREO-T1", "error");
    },
    cancel() {
      this.ALTD_();
      this.$router.push("/ingreso");
    },
  },
};
</script>
