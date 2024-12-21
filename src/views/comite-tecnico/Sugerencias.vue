<template>
  <v-app>
    <v-container class="container-sug">
      <h2 class="pt-4">Sugerencias</h2>
      <h4 class="pt-4">
        En este espacio debe llenar el formulario para realizar las sugerencias
        sobre el panel de votaciones de los Premios Indias Catalina.
      </h4>
      <v-divider class="mt-14"></v-divider>
      <v-form v-model="validacion" ref="form" lazy-validation>
        <v-row aling="center">
          <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="pt-14">
            <INPUT :field="form.asunto" />
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            class="mt-0 pt-0"
          >
            <TEXTAREA :field="form.sugerencias" />
          </v-col>
        </v-row>
      </v-form>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            class="text-center"
          >
            <v-btn
              color="boton"
              height="50"
              class="botone white--text"
              :disabled="!validacion"
              @click="enviarSugerencia()"
              elevation="0"
              >Enviar</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <ALT
      @exitEsc="cancel()"
      @cancel="cancel()"
      @cancelAlert="cancelAlert()"
      @confirm="confirmar()"
      :alert="alert"
      v-if="alert.estado"
    />
  </v-app>
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
      validacion: true,
      editar: false,
      form: {
        asunto: {
          value: "",
          id: "asunto",
          label: "Asunto*",
          maxlength: "100",
          rules: [(v) => !!v || "Este campo es requerido"],
        },
        sugerencias: {
          value: "",
          id: "sugerencias",
          label: "Escribir una sugerencia",
          row: "6",
          maxlength: "2000",
          rules: [(v) => !!v || "Sugerencia es requerida"],
        },
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      _sendSugerencia: "votaciones/_sendSugerencia",
    }),

    volver() {
      this.$router.push("/postulantes/resumen-produccion");
    },
    cancel() {
      this.ALTD_();
    },
    async enviarSugerencia() {
      const DATA = {
        userId:CURRTET_USER.id,
        issue: this.form.asunto.value,
        suggestionMessage: this.form.sugerencias.value,
      };
      const RES = await this._sendSugerencia(DATA)
      if (!this.$refs.form.validate()) return;
      this.$refs.form.reset();
      RES.data.success ? this.ALT_("SUGERENCIA", "success") : this.ALT_("!SUGERENCIA", "error")
    },
    async confirmar() {
      this.editarPrograma();
    },
  },
};
</script>
<style scoped>
.TEXTAREA {
  border-radius: 20px !important;
}
.container-sug {
  width: 50%;
  align-items: center;
}
</style>
