<template>
  <div class="api">
    <lottie-animation
      :animationData="spinner"
      style="height: 800px"
      v-if="state_loading"
      :autoPlay="true"
      :loop="true"
      :speed="2"
    />
  </div>
</template>
<script>
import Spinner from "../../assets/image/spinner_v2.json";
import LottieAnimation from "lottie-web-vue";
import { mapGetters } from "vuex";
export default {
  name: "PIC20223FSpinner",
  components: {
    LottieAnimation,
  },

  data() {
    return {
      spinner: Spinner,
      tiempo: false,
    };
  },
  computed: {
    ...mapGetters({
      state_loading: "_stateLoading",
    }),
    estado() {
      if (this.state_loading && this.tiempo) return true;
      else false;
    },
  },

  mounted() {
    setTimeout(() => (this.tiempo = true), 200);
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.api {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  height: 100%;
  width: 100%;
  background-color: rgba(22, 20, 20, 0.432);
  justify-content: center;
  align-items: center;
}
</style>
