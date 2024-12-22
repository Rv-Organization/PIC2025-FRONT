<template>
  <v-autocomplete
    :item-value="field.item_value"
    :item-text="field.item_text"
    :required="field.required"
    :disabled="field.disabled"
    :messages="field.message"
    v-model="field.value"
    :items="field.items"
    :label="field.label"
    :rules="field.rules"
    autocomplete="none"
    :ref="field.id"
    :id="field.id"
    outlined
    dense
  ></v-autocomplete>
</template>
<script>
export default {
  name: "Combobox",
  props: {
    field: {
      id: String,
      label: String,
      value: String,
      disabled: Boolean,
      items: Array,
      item_value: String,
      item_text: String,
      rules: {
        type: Array,
        default: () => false,
      },
      required: {
        type: Boolean,
        default: () => false,
      },
    },
  },
  data() {
    return {
      cont: 0,
    };
  },
  watch: {
    "field.disabled"() {
      if (this.field.disabled === false) {
        this.setCaja(this.field);
        this.$nextTick(() => {
          this.$refs.combo.focus();
        });
      }
    },
  },
  methods: {
    async pressEnter() {},
  },
};
</script>
