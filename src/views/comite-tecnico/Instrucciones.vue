<template>
    <v-container class="container-channel my-8">
        <h2>Instrucciones de votación Premios India Catalina 39°</h2>
        <div class="line  my-8"></div>
        <p class="my-4">Para votar en los Premios India Catalina, sigue estos pasos:</p>
        <ol>
            <li>Selecciona la categoría en la que deseas votar. A continuación se muestra la primera categoría:</li>
            <v-card class="py-5 my-8 " cols="12">
                <v-row class="align-center mx-3">
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <h4>MEJOR LIBRETO DE FICCIÓN (ORIGINAL O ADAPTACIÓN)</h4>
                    </v-col>
                    <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3">
                        <a style="font-size: 18px" class="icon--text underline">Ver postulados</a>
                    </v-col>
                    <v-col cols="6" xs="16" sm="6" md="3" lg="3" xl="3" class="text-center">
                        <div>
                            <h3>0/5</h3>
                            <v-btn dark small color="#FFEBB8" rounded class="botone" elevation="0">
                                <h3 class="black--text">Sin nominar</h3>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card>

            <li>Si deseas abstenerse de votar en esa categoría, haz clic en el botón "Sin nominar" o “Incompleto” al lado
                del nombre de la categoría. Esto eliminará cualquier voto previo que hayas emitido para esa categoría y
                cambiará su estado a abstenido.</li>
            <v-card class="py-5 my-8" cols="12" disabled>
                <v-row class="align-center mx-3 ">
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <h4>MEJOR LIBRETO DE FICCIÓN (ORIGINAL O ADAPTACIÓN)</h4>
                    </v-col>
                    <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3">
                        <a style="font-size: 18px" class="icon--text underline">Ver postulados</a>
                    </v-col>
                    <v-col cols="6" xs="16" sm="6" md="3" lg="3" xl="3" class="text-center">
                        <div>
                            <h3>0/5</h3>
                            <v-btn dark small color="#C2FFD0" rounded class="botone" elevation="0">
                                <h3 class="black--text">Abstención</h3>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
            <li>Si deseas votar, califica las nominaciones de 1 a la cantidad de votos disponibles en esa categoría. Usa la
                calificación más alta para tu nominación favorita y la más baja para tu nominación menos favorita.</li>
            <v-card align="center" class="my-8 py-10" disable>
                <h2>MEJOR LIBRETO DE FICCIÓN (ORIGINAL O ADAPTACIÓN)</h2>
                <h2>MI CASA ES TU CASA</h2>
                <h3 class="mt-4">
                    Califica del 1 al 5, siendo 1 la más baja y 5 la más alta </h3>
                <v-rating v-model="rating" :length="5" size="60" dense></v-rating>
                <p v-show="rating > 0">Has seleccionado {{ rating }} puntos</p>
            </v-card>
            <li>Si deseas cambiar tu voto antes de enviarlo, simplemente ajusta tus calificaciones en consecuencia.</li>
            <v-card align="center" class="my-8 py-10">
                <h2>MEJOR LIBRETO DE FICCIÓN (ORIGINAL O ADAPTACIÓN)</h2>
                <h2>Hasta que la plata nos separe</h2>
                <h3 class="mt-4">
                    Califica del 1 al 5, siendo 1 la más baja y 5 la más alta </h3>
                <v-rating v-model="rating2" :length="5" size="60" dense></v-rating>
                <p v-show="rating2 > 0">Has seleccionado {{ rating2 }} puntos</p>
                <h3 v-show="rating2 < 1">
                    La postulación MI CASA ES TU CASA se encuentra en esta posición, ¿Deseas cambiarla?
                </h3>
            </v-card>
            <li class="my-6">Repite los pasos 1 a 4 para cada categoría en la que desees votar.</li>

            <li>Una vez que hayas calificado todas las nominaciones en la categoría, haz clic en el botón "Enviar" para
                guardar en tus votos (Se encuentra ubicado debajo de la ultima categoría). Recuerda que una vez que hayas
                enviado tu votación, no podrás realizar modificaciones.
            </li>
            <v-card class="py-5 my-6" cols="12">
                <v-row class="align-center mx-3">
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <h4>MEJOR SERIE DE FICCIÓN WEB</h4>
                    </v-col>
                    <v-col cols="6" xs="6" sm="6" md="3" lg="3" xl="3">
                        <a style="font-size: 18px" class="icon--text underline">Ver postulados</a>
                    </v-col>
                    <v-col cols="6" xs="16" sm="6" md="3" lg="3" xl="3" class="text-center">
                        <div>
                            <h3>5/5</h3>
                            <v-btn dark small color="#C2FFD0" rounded class="botone" elevation="0">
                                <h3 class="black--text">Completo</h3>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
            <v-row class="text-center">
                <v-col>
                    <v-btn rounded elevation="0" color="boton" class="botone py-6 px-6 mt-4">
                        <h2 class="">Enviar votaciones</h2>
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