<template>
  <v-text-field
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    :append-icon="field.id == 'password' ? (field.show_password ? 'mdi-eye' : 'mdi-eye-off') : undefined"
    :type="field.id == 'password' ? (field.show_password ? 'text' : 'password') : field.tipo"
    @click:append="field.show_password = !field.show_password"
    :hide-details="field.details == false ? true : false"
    :counter="field.counter ? field.maxlength : false"
    :error="field.error == true ? true : false"
    :prepend-icon="field.prepend_icon"
    :placeholder="field.placeholder"
    :maxlength="field.maxlength"
    :autofocus="field.autofocus"
    @keydown.enter="pressEnter"
    :disabled="field.disabled"
    :messages="field.message"
    @keydown.esc="pressEsc"
    v-model="field.value"
    :value="field.value"
    :label="field.label"
    :rules="field.rules"
    @input="input()"
    :ref="field.id"
    :id="field.id"
    class="border-input"
    dense
  >
  </v-text-field>
</template>
<script>
import { nameToUper_ } from "../../global";
export default {
  props: {
    field: {
      show_password: Boolean,
      append_icon: String,
      prepend_icon: String,
      placeholder: String,
      maxlength: String,
      counter: Boolean,
      disabled: Boolean,
      validate: Boolean,
      label: String,
      error: String,
      value: String,
      rules: {
        type: Array,
        default: () => false,
      },
      autofocus: {
        type: Boolean,
        default: () => false,
      },
      tipo: {
        type: String,
        default: () => "string",
      },
      required: {
        type: Boolean,
        default: () => false,
      },
      details: {
        type: Boolean,
        default: () => false,
      },
    },
    mask: Function,
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    async pressEnter() {
      this.$emit("validateEnter");
    },
    input() {
      switch (this.field.id) {
        case "usuario":
        case "email":
          this.field.value = this.field.value.toLowerCase();
          break;
        case "nombre":
        case "apellido":
          this.field.value = nameToUper_(this.field.value);
          break;

        default:
          break;
      }
    },
  },
};
</script>
