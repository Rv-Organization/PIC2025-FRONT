import Alerta from "@/components/global/Alerta.vue";

export const ALERTA = {
  components: { ALT: Alerta },
  data() {
    return {
      alert: {
        estado: false,
        tipo: "",
        codigo: "",
        opcion: "",
        func1: null,
        func2: null,
        text: null,
      },
    };
  },
  methods: {
    ALT_(codigo, tipo, opcion, func1, func2, text) {
      this.alert.estado = true;
      this.alert.codigo = codigo;
      this.alert.tipo = tipo;
      this.alert.opcion = opcion;
      this.alert.func1 = func1;
      this.alert.func2 = func2;
      this.alert.text = text;
    },
    ALTD_() {
      this.alert.estado = false;
      this.alert.codigo = "";
      this.alert.tipo = "";
      this.alert.opcion = "";
      this.alert.func1 = null;
      this.alert.func2 = null;
      this.alert.text = null;
    },
  },
};
