<template>
  <v-main>
    <APPBAR @toggleNav="toggleNav()" @fixedBar="fixedBar" />
    <NAVIGATE :drawer="drawer" />
    <transition name="fade">
      <router-view style="background-color: #f9f9f9"></router-view>
    </transition>
  </v-main>
</template>

<script>
import NAVIGATE from "../../components/comite-tecnico/NavigateDrawer.vue";
import APPBAR from "@/components/global/AppBar.vue";
export default {
  components: { NAVIGATE, APPBAR },
  data() {
    return {
      drawer: true,
      is_fixed: false,
    };
  },

  methods: {
    fixedBar(data) {
      this.is_fixed = data;
    },
    toggleNav(data) {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style></style>
