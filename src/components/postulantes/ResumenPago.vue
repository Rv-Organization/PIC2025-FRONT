<template>
  <v-dialog
    v-model="pago.estado"
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
        <!-- :items-per-page="5" -->
        <v-data-table
          class="elevation-4 border-card mx-4"
          height="130"
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
              outlined
              @click="pago.estado = false"
              class="botone mb-1"
              dark
              color="boton"
            >
              Guardar y Salir</v-btn
            >
            <!-- <v-btn @click="pagoEpayco()" class="botone" dark color="boton"> Pagar</v-btn> -->
            <v-btn
              type="button"
              class="mx-7"
              id="Epayco"
              style="height: 30px; width: 120px"
            ></v-btn>
          </v-container>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { formatNum_ } from "../../global";
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
      buttonContainer: null,
    };
  },

  created() {
    this.initializeEpaycoScript();
  },
  methods: {
    formatNum_,
    ...mapActions({
      _getPago: "postulacion/_getPago",
    }),
    async initializeEpaycoScript() {
      this.page = await this._getPago();

      let totalPrice = 0;
      this.total = this.page.data.data.totalPrice;
      this.page.data.data.orderItems.forEach((e) => {
        totalPrice += e.category.price;
        this.array_order_items.push({
          nameCategory: e.category.nameCategory,
          price: e.category.price,
          quantity: e.quantity,
        });
      });

      if (totalPrice === 0) {
        this.pago.estado = false;
        return;
      }

      const node = document.createElement("script");
      node.src = "https://checkout.epayco.co/checkout.js";
      node.setAttribute(
        "data-epayco-button",
        "https://epayco.com/wp-content/uploads/2022/01/logo.png"
      );
      node.setAttribute("data-epayco-key", "a43c7b06b80c9e6cf02c5370c76e304c");
      node.setAttribute("class", "epayco-button");
      node.setAttribute("data-epayco-amount", this.total.toString());
      node.setAttribute("data-epayco-tax", "0");
      node.setAttribute("data-epayco-tax", "0");
      node.setAttribute("data-epayco-tax-ico", "0");
      node.setAttribute("data-epayco-tax-base", this.total.toString());
      node.setAttribute("data-epayco-name", "postulaciones");
      node.setAttribute("data-epayco-description", "Postulaciones");
      node.setAttribute("data-epayco-currency", "cop");
      node.setAttribute("data-epayco-country", "CO");
      node.setAttribute("data-epayco-test", "false");
      node.setAttribute("data-epayco-external", "false");
      //node.setAttribute("data-epayco-response", "https://app.premiosindiacatalina.com/api/order/epayco");
      node.setAttribute(
        "data-epayco-confirmation",
        "https://app.premiosindiacatalina.com/api/order/epayco"
      );
      node.setAttribute("data-epayco-extra1", this.page.data.data.id);

      document.body.appendChild(node);
      this.buttonContainer = document.getElementById("Epayco");

      this.buttonContainer.appendChild(node);
      this.observeButtonContainer();

      this.$nextTick(() => {
        this.buttonContainer = document.getElementById("Epayco");
        if (this.buttonContainer) {
          this.buttonContainer.appendChild(node);
          this.applyImageStylesOnLoad();
        } else {
          console.error("El contenedor del botón Epayco no se encontró.");
        }
      });
    },
    observeButtonContainer() {
      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.type === "childList") {
            this.applyImageStylesOnLoad();
          }
        });
      });

      observer.observe(this.buttonContainer, {
        childList: true,
        subtree: true,
      });

      this.observer = observer;
    },
    applyImageStylesOnLoad() {
      if (!this.buttonContainer) {
        console.error("buttonContainer no está definido.");
        return;
      }

      const images = this.buttonContainer.querySelectorAll("img");

      images.forEach((img) => {
        if (img.complete) {
          this.applyStyles(img);
        } else {
          img.addEventListener("load", () => {
            this.applyStyles(img);
          });
        }
      });
    },
    applyStyles(img) {
      img.style.width = "120px";
      img.style.height = "30px";
      img.style.objectFit = "contain";
    },

    pagoEpayco() {
      document.getElementById("Epayco").click();
    },
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
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
