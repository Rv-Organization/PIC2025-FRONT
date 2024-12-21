import Autocomplete from "../components/ui/Autocomplete.vue";
import Textarea from "../components/ui/Textarea.vue";
import Alerta from "../components/global/Alerta.vue";
import Input from "../components/ui/Input.vue";

export const Components = {
  components: { Input_: Input, Textarea_: Textarea, Autocomplete_: Autocomplete, Alerta_: Alerta },
  data() {
    return {
      alert_: {
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
    callAlerta(codigo, tipo, opcion, func1, func2, text) {
      this.alert_.estado = true;
      this.alert_.codigo = codigo;
      this.alert_.tipo = tipo;
      this.alert_.opcion = opcion;
      this.alert_.func1 = func1;
      this.alert_.func2 = func2;
      this.alert_.text = text;
    },
    callbackAlerta() {
      this.alert_.estado = false;
      this.alert_.codigo = "";
      this.alert_.tipo = "";
      this.alert_.opcion = "";
      this.alert_.func1 = null;
      this.alert_.func2 = null;
      this.alert_.text = null;
    },
  },
};
