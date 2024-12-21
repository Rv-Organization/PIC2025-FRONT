import Vuetify from "vuetify/lib/framework";
import es from "vuetify/lib/locale/es";
import Vue from "vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#E4CC8E",
        icon: "#D29D00",
        boton: "#ECC962",
        secondary: "#D29D00",
        tertiary: "5252e8",
        accent: "#5F6A6A",
        error: "#cc0000",
        info: "#0D1A64",
        salir: "#09696e",
        success: "#4BB543",
        warning: "#FFC107",
        background: "#D5D5D5",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
