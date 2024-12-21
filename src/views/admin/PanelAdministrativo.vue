<template>
  <v-app>
    <v-row class="container-channel px-8">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <h2 class="py-5">Panel administrativo</h2>
          <h4>
            En esta sesión podrás gestionar todos los datos referentes a los Premios India Catalina
            que tiene como privilegio los roles administrativos.
          </h4>
          <v-divider class="my-6"></v-divider>
          <v-card-text class="asaccent--text pb-8"
            >Nota: Los cambios gestionados por cada una de las cuentas administrativas estarán bajo
            la responsabilidad del usuario
          </v-card-text>

          <v-divider class="my-4"></v-divider>
        </v-container>
      </v-col>
      <ALT
        @exitEsc="cancel()"
        @cancel="cancel()"
        @cancelAlert="cancelAlert()"
        @confirm="confirm()"
        :alert="alert"
        v-if="alert.estado"
      />
    </v-row>
  </v-app>
</template>

<script>
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
      format_logo: "",
      frames: {},
      validacion: true,
      estado: false,
      form: {},
      form_uploads: {},
    };
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions({}),
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

.mdi-cloud-upload-outline::before {
  transform: scale(2);
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
