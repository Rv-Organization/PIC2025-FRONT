<template>
  <v-dialog
    v-model="item.estado"
    :persistent="persistent"
    :width="width"
    :overlay-color="overlayColor"
  >
    <v-card>
      <v-toolbar class="text-center">
        <div class="text-center">
          <h3 class="text-center">{{ item.nameProgram }}</h3>
        </div>
        <v-btn icon class="ml-auto" rounded @click="item.estado = false">
          <v-icon size="30" color="accent"> mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div class="text-center" v-if="tipo == 'sipnosis'">
        <!-- <v-img :src="require(`../../assets/nominados/${item.id}.png`)" contain class="px-4" height="600" /> -->
        <v-img
          v-if="item.typePostulation == '1'"
          contain
          height="50%"
          :src="item.photo"
        />
        <v-img v-else contain height="50%" :src="item.program.poster" />
      </div>
      <v-card-text v-if="tipo == 'sipnosis'" class="mt-3">
        {{ item.program.sipnosis }}
      </v-card-text>
      <div v-else class="">
        <iframe
          class="player my-2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          :src="item.video"
          allowfullscreen
          frameborder="0"
          height="720"
          width="100%"
        ></iframe>
      </div>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    item: Object,
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    overlayColor: {
      type: String,
      default: "",
    },

    tipo: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "75%",
    },
  },
};
</script>
