<template>
  <v-dialog v-model="cambiar_password.estado" width="500">
    <v-card class="" style="border-radius: 20px" color="white" elevation="3" width="500">
      <v-container>
        <div class="text-end">
          <v-btn icon class="botone" color="primary" @click="cancel()">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <h2 class="text-center pt-6 pb-12">Recuperar contraseña</h2>
        <v-spacer></v-spacer>

        <v-form v-model="validacion" ref="form" lazy-validation>
          <v-row justify="center" class="px-5">
            <v-col cols="12" class="py-0">
              <INPUT :field="form.usuario" />
            </v-col>
            <v-col cols="12" class="pt-1 pb-8">
              <v-btn elevation="0" color="boton" dark block @click="recuperarPassword()" large>Recuperar</v-btn>
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

export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  props: {
    cambiar_password: Object,
  },
  data() {
    return {
      validacion: true,
      show_password: false,
      show_password2: false,
      form: {
        usuario: {
          value: "",
          tipo: "email",
          id: "usuario",
          label: "Email",
          maxlength: "50",
          rules: [(v) => !!v || "Email es requerido", (v) => /.+@.+\..+/.test(v) || "Email no es valido"],
        },
      },
    };
  },
  methods: {
    ...mapActions({
      _recuperarPassword: "usuario/_recuperarPassword",
    }),

    async recuperarPassword() {
      const validacion = this.$refs.form.validate();

      if (validacion) {
        const data = {
          email: this.form.usuario.value,
        };
        const res = await this._recuperarPassword({ data });
        if (res.status == 200) {
          this.$refs.form.reset();
          this.ALT_("USUARIO-0", "email");
        } else if (res.status == 400) this.ALT_("CORREO-03", "warning");
        else this.ALT_("CORREO-04", "warning");
      }
    },
    cancel() {
      this.cambiar_password.estado = false;
      this.ALTD_();
    },
  },
  created() {},
};
</script>

<style></style>
