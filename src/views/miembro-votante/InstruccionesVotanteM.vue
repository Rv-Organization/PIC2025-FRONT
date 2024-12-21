<template>
  <v-container class="container-channel my-8">
    <h2>Instrucciones de votación Premios India Catalina 39°</h2>
    <div class="line my-8"></div>
    <p class="my-4">Para votar en los Premios India Catalina, sigue estos pasos:</p>
    <ol>
      <li>
        Selecciona la categoría en la que deseas votar. A continuación, se muestra la primera
        categoría:
      </li>
      <v-card class="py-5 my-8" cols="12">
        <v-row class="align-center mx-3">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <h4>MEJOR LIBRETO DE FICCIÓN (ORIGINAL O ADAPTACIÓN)</h4>
          </v-col>
          <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3">
            <a
              style="font-size: 18px"
              class="icon--text underline"
              @click="consultarPostulaciones(item)"
              >Ver postulados</a
            >
          </v-col>
          <v-col cols="6" xs="16" sm="6" md="3" lg="3" xl="3" class="text-center">
            <v-btn rounded elevation="0" color="#FFEBB8" class="botone py-1 px-6 default-cursor">
              <h4 class="black--text">incompleto</h4>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <li>Si ya votaste por la categoría, cambiara el estado a "COMPLETO"</li>
      <v-card class="py-5 my-8" cols="12">
        <v-row class="align-center mx-3">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <h4>MEJOR LIBRETO DE FICCIÓN (ORIGINAL O ADAPTACIÓN)</h4>
          </v-col>
          <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3">
            <a style="font-size: 18px" class="icon--text underline">Ver postulados</a>
          </v-col>
          <v-col cols="6" xs="16" sm="6" md="3" lg="3" xl="3" class="text-center">
            <v-btn rounded elevation="0" color="#C2FFD0" class="botone py-1 px-6 default-cursor">
              <h4 class="black--text">Completo</h4>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <li>
        1. Si deseas votar, podrás dar click en el botón votar de tu postulación favorita. Recuerda
        que solo puedes votar una vez por categoría.
        <br />
        Si deseas cambiar de voto, el proceso es igual solo que esta vez, tu voto será reemplazado
        por el nuevo.
      </li>
      <v-card class="my-8 py-10" disable>
        <v-row class="mx-3">
          <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="text-start">
            <v-img contain height="150" src="@/assets/image/logoPic40.png" />
          </v-col>
          <v-col class="py-0">
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" class="py-0">
                <h4 class="my-4">PREMIOS INDIA CATALINA</h4>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" class="py-0">
                <p class="my-2">Programa: Premios india Catalina 39°</p>
                <p class="my-2">Canal: Premios india Catalina 39°</p>
                <p class="my-2">Numero de capitulos: 39</p>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <v-row>
                  <a style="font-size: 18px" class="icon--text underline mx-2 mt-4">Sinopsis</a>
                  <a style="font-size: 18px" class="icon--text underline mx-1 mt-4">Ver video</a>
                  <div>
                    <v-btn
                      rounded
                      elevation="0"
                      color="boton"
                      height="30"
                      class="botone mx-2 mt-4"
                      @click="sendVote(item)"
                    >
                      <h3 class="black--text">Votar</h3>
                    </v-btn>
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <li>
        Una vez hayas votado por tu favorito, veras que el boton del postulado seleccionado dira
        "Votado"
      </li>
      <v-card class="my-8 py-10" disable>
        <v-row class="mx-3">
          <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="text-start">
            <v-img contain height="150" src="@/assets/image/logoPic40.png" />
          </v-col>
          <v-col class="py-0">
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" class="py-0">
                <h4 class="my-4">PREMIOS INDIA CATALINA</h4>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" class="py-0">
                <p class="my-2">Programa: Premios india Catalina 39°</p>
                <p class="my-2">Canal: Premios india Catalina 39°</p>
                <p class="my-2">Numero de capítulos: 39</p>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <v-row>
                  <a style="font-size: 18px" class="icon--text underline mx-2 mt-4">Sinopsis</a>
                  <a style="font-size: 18px" class="icon--text underline mx-1 mt-4">Ver video</a>
                  <div>
                    <v-btn
                      rounded
                      elevation="0"
                      height="30"
                      color="#C2FFD0"
                      class="botone mx-1 mt-4"
                    >
                      <v-icon color="" class="mr-1" size="24">mdi-star </v-icon>
                      <h4 class="Black--text">Votado</h4>
                    </v-btn>
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <li class="my-6">Repite los pasos 1 a 4 para cada categoría en la que desees votar.</li>
      <v-divider></v-divider>

      <v-row class="text-center">
        <v-col>
          <v-btn
            rounded
            elevation="0"
            color="boton"
            class="botone py-6 px-6 mt-4"
            @click="$router.push('/miembro-votante/votar')"
          >
            <v-icon color="" class="mr-1 mr-4" size="24">mdi-vote-outline</v-icon>
            <h2 class="">Ir a votar</h2>
          </v-btn>
        </v-col>
      </v-row>
    </ol>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      rating: 0,
      rating2: 0,
      voto: 0,
      votado: false,
    };
  },
};
</script>
<style>
.line {
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  margin: auto;
}
.container-channel {
  width: 75%;
  margin: auto;
  padding-top: 2rem;
}
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
