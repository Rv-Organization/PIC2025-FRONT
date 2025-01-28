<template>
  <v-dialog
    v-model="pago.estado"
    v-if="pago.estado"
    persistent
    width="700"
    class="rounded-0 border-card"
  >
    <v-card width="700" class="mx-auto border-card">
      <v-footer color="white" class="mb-0 pb-0">
        <h3 class="mx-auto py-6">Resumen de pago</h3>
        <v-btn icon @click="pago.estado = false">
          <v-icon size="30" color="accent"> mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-footer>
      <v-container>
        <v-data-table
          height="300"
          class="elevation-4 border-card mx-4"
          hide-default-footer
          :headers="headers"
          :items="array_order_items"
        >
          <template v-slot:[`item.price`]="{ item }">
            {{ formatNum_(item.price) }}
          </template>
        </v-data-table>
        <v-card class="border-footer mx-4" height="40">
          <h4 class="text-end mr-8 py-2">
            Total: &nbsp; &nbsp; ${{ formatNum_(total) }}
          </h4>
        </v-card>
        <v-card-actions class="mx-0 my-4 py-0">
          <v-container class="text-end">
            <v-btn
              @click="generarImpresion()"
              class="botone mb-1"
              dark
              color="boton"
            >
              Descargar comprobante
              <v-icon class="ml-2">mdi-download-outline</v-icon></v-btn
            >
          </v-container>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { formatNum_, imageBase64 } from "../../global";
import { printComanda } from "../../pdfs/index.js";
import { mapActions } from "vuex";
export default {
  props: {
    pago: Object,
  },
  data() {
    return {
      headers: [
        { text: "Cantidad", align: "center", value: "quantity" },
        { text: "Postulación", align: "center", value: "nameCategory" },
        { text: "Valor a pagar", align: "center", value: "price" },
      ],
      array_order_items: [],
      pagos: [],
      pruebaArray: [],
      total: 0,
    };
  },
  async created() {
    let totalPrice = 0;

    this.page = this.pago;
    this.total = this.page.totalPrice;

    this.page.orderItems.forEach((e) => {
      totalPrice += e.category.price;
      this.array_order_items.push({
        nameCategory: e.category.nameCategory,
        price: e.category.price,
        quantity: e.quantity,
      });
    });
  },
  methods: {
    formatNum_,
    ...mapActions({
      _getPago: "postulacion/_getPago",
    }),
    async generarImpresion() {
      let image = await imageBase64(
        require("../../assets/image/logoPic41.png")
      );
      printComanda(
        [...this.array_order_items, this.total],
        image,
        this.page.nameClients
      );
    },

    pagoEpayco() {
      document.getElementById("Epayco").click();
    },
  },
};
</script>
<style scoped>
.border-card {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.border-footer {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
