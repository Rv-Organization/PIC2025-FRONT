<template>
  <div v-if="!is_mobil">
    <v-app-bar color="primary" elevation="0" :class="`${is_mobil ? 'px-12' : ''}`" :fixed="is_fixed" v-scroll="onScroll" dark>
      <v-app-bar-nav-icon @click="hideNav()" :hidden="is_mobil"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text mx-auto" :hidden="is_mobil">Premios india catalina</v-toolbar-title>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "AppBar",
  data() {
    return {
      is_mobil: null,
      is_fixed: null,
    };
  },
  created() {
    this.mobile(this.$vuetify.breakpoint.name);
    this.$watch("$vuetify.breakpoint.name", (e) => {
      this.mobile(e);
    });
  },
  methods: {
    onScroll(e) {
      if (!this.is_mobil) {
        if (window.scrollY > 83) this.is_fixed = true;
        else this.is_fixed = false;
        this.$emit("fixedBar", this.is_fixed);
      } else {
        if (window.scrollY > 150) this.is_fixed = true;
        else this.is_fixed = false;
        this.$emit("fixedBar", this.is_fixed);
      }
    },
    mobile(data) {
      switch (data) {
        case "xs":
        case "sm":
          this.is_mobil = false;
          break;
        case "md":
        case "lg":
        case "xl":
          this.is_mobil = true;
          break;
      }
    },
    hideNav() {
      this.$emit("toggleNav", (this.drawer = !this.drawer));
    },
  },
};
</script>
