<template>
  <v-textarea
    @click:append="field.show_password = !field.show_password"
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
    :label="field.label"
    :rules="field.rules"
    @input="textArea()"
    :rows="field.row"
    :ref="field.id"
    :id="field.id"
    type="text"
    row-height="30"
    class="border-input"
    dense
  >
  <!-- no-resize -->

  </v-textarea>
</template>
<script>
export default {
  props: {
    field: {
      show_password: Boolean,
      append_icon: String,
      placeholder: String,
      maxlength: String,
      counter: Boolean,
      disabled: Boolean,
      validate: Boolean,
      label: String,
      error: String,
      value: String,
      row: String,
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
      if (this.field.value.length == 0) {
        if (this.field.required) {
          this.$emit("textAreaAlert");
        } else if (this.field.validation) {
          const res = await this.field.validation();
          if (res) this.$emit("textAreaAlert");
        } else this.$emit("textAreaAlert");
      } else {
        if (this.field.validation) {
          this.field.disabled = true;
          const res = await this.field.validation();
          if (res) {
            this.$emit("textAreaAlert");
          }
        }
      }
      this.$emit("textAreaAlert");
    },
    textArea() {},
  },
};
</script>
