<template>
  <v-app>
    <v-card class="pt-1" elevation="0">
      <h2 class="text-center bg-color py-12">Panel administrativo</h2>
      <div class="line"></div>
    </v-card>
    <v-row class="container-channel">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <v-row justify="center" class="mb-5">
            <v-col
              cols="4"
              xs="4"
              sm="4"
              md="4"
              lg="4"
              xl="4"
              class="py-0 text-start"
            >
              <h2 class="">Pagos</h2>
              <h5>Pendiente: ${{ formatNum_(total_pendiente || 0) }}</h5>
              <h5 class="success--text">
                Entrante: ${{ formatNum_(total_pagados || 0) }}
              </h5>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" class="py-0">
              <INPUT :field="form.buscar" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" v-for="(item, index) in array_pagos" :key="index">
              <v-card class="pa-4">
                <v-container class="fill-height">
                  <v-row justify="center">
                    <v-col cols="6" xs="6" sm="6" md="5" lg="5" xl="5">
                      <h4>{{ item.nameClients }}</h4>
                    </v-col>
                    <v-col
                      cols="5"
                      xs="5"
                      sm="4"
                      md="3"
                      lg="3"
                      xl="3"
                      class="text-center my-0 py-1 mx-auto"
                    >
                      <v-btn
                        fab
                        dark
                        small
                        :color="item.stateOrderId === 1 ? 'green' : 'red'"
                        rounded
                        class="botone"
                      >
                        <v-icon v-if="item.stateOrderId != 1"
                          >mdi-close-circle</v-icon
                        >
                        <v-icon v-if="item.stateOrderId === 1"
                          >mdi-check-circle</v-icon
                        >
                      </v-btn>
                      <v-container
                        class="px-0"
                        fluid
                        v-if="item.stateOrderId != 1"
                      >
                        <v-btn
                          dark
                          small
                          color="green"
                          rounded
                          class="botone mr-6"
                          @click="validarPago(item)"
                          >Aprobar pago</v-btn
                        >
                      </v-container>
                    </v-col>
                    <v-col
                      cols="6"
                      xs="6"
                      sm="6"
                      md="2"
                      lg="2"
                      xl="2"
                      class="text-center"
                    >
                      <a
                        style="font-size: 15px"
                        @click="verPago(item)"
                        class="icon--text mr-6"
                        >Ver detalle</a
                      >
                    </v-col>
                    <v-col
                      cols="6"
                      xs="6"
                      sm="6"
                      md="2"
                      lg="2"
                      xl="2"
                      class="text-center"
                    >
                      <h4 class="ml-2">
                        ${{ formatNum_(item.totalPrice) || 0 }}
                      </h4>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <ALT
        @exitEsc="cancel()"
        @cancel="cancel()"
        @cancelAlert="cancelAlert()"
        @confirm="confirm()"
        :alert="alert"
        v-if="alert.estado"
      />
      <ResumenPago :pago="pago" v-if="pago.estado" />
    </v-row>
  </v-app>
</template>

<script>
import ResumenPago from "@/components/admin/ResumenPago.vue";
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";
import { CURRTET_USER, formatNum_ } from "../../global";
import { mapActions } from "vuex";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],
  components: { ResumenPago },
  data() {
    return {
      pago: {
        estado: false,
      },
      format_certificado: "",
      format_carta: "",
      format_logo: "",
      switch1: true,
      frames: {},
      validacion: true,
      estado: false,
      total_pagados: 0,
      total_pendiente: 0,
      array_pagos: [],
      array_pagos_base: [],

      form: {
        buscar: {
          value: "",
          id: "buscar",
          label: "Nombre o correo electrónico",
          maxlength: "100",
          prepend_icon: "mdi-magnify",
        },
      },
      form_uploads: {},
    };
  },
  watch: {
    "form.buscar.value"() {
      this.array_pagos = this.array_pagos_base;
      let filtro = this.array_pagos.filter((pago) =>
        pago.nameClients.includes(this.form.buscar.value)
      );
      this.array_pagos = filtro;
      this.validar_buscar = this.array_pagos.length == 0 ? true : false;
    },
  },
  computed: {},
  created() {
    this.traerPagos();
  },
  methods: {
    formatNum_,
    ...mapActions({
      _getPagos: "postulacion/_getPagos",
      _putPago: "postulacion/_putPago",
    }),
    validarPago(valor) {
      this.ALT_(
        "pago",
        "warning",
        "P",
        () => {
          this.aceptarPAgo(valor?.userId);
        },
        this.ALTD_
      );
    },
    async aceptarPAgo(id) {
      const RES = await this._putPago({ id });
      if (RES.status == 200) {
        this.ALT_("pago-1", "success", "", "", location.reload);
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    },
    verPago(item) {
      this.pago.estado = true;
      this.pago = Object.assign(this.pago, item);
    },
    async traerPagos() {
      const RES = await this._getPagos();
      if (RES.data.data) {
        const array_new = RES.data.data.channelForOrders;

        array_new.forEach((e) => {
          let nameClients = e.channel.nameClient;
          e.orders.forEach((i) => {
            this.array_pagos.push({ ...i, nameClients });
          });
        });
        this.array_pagos_base = this.array_pagos;

        this.total_pendiente = RES.data.data.totalPending;
        this.total_pagados = RES.data.data.totalPay;
      }
    },
  },
};
</script>

<style>
.container-channel {
  width: 75%;
  margin: auto;
  padding-top: 2rem;
}

.upload {
  border-style: dashed;
  border-color: rgba(102, 102, 102, 0.5);
}

.mdi-cloud-upload-outline::before {
  transform: scale(2);
}

/* Movil  */
@media (max-width: 600px) {
  .upload {
    border-style: dashed;
    border-color: rgba(102, 102, 102, 0.5);
  }

  .container-channel {
    width: 100%;
  }
}
</style>
