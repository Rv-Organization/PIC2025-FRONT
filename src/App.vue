<template>
  <div>
    <SPINNER v-if="state_loading" />
    <v-app style="background-color: #f9f9f9">
      <router-view />
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SPINNER from "./components/global/Spinner.vue";

export default {
  name: "App",
  components: { SPINNER },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      state_loading: "_stateLoading",
    }),
  },
};
</script>
<style lang="scss">
@import "./assets/sass/style";
</style>
