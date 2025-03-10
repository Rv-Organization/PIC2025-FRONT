<template>
  <v-dialog
    v-model="alert.estado"
    persistent
    width="500"
    class="rounded-0 border-card"
  >
    <v-card width="500" class="mx-auto border-card">
      <v-footer color="white" class="mb-0 pb-0">
        <v-spacer></v-spacer>
        <v-btn icon @click="cancel(), (alert.estado = false)" class="botone">
          <v-icon size="30" color="accent"> mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-footer>
      <lottie-animation
        :animationData="type_alert"
        style="height: 200px"
        v-if="alert.estado"
        :autoPlay="true"
        ref="anim_login"
        id="anim_login"
        class="mx-auto"
        :loop="true"
        :speed="2"
        content
      />

      <v-container>
        <h2 class="text-center mt-4">{{ title }}</h2>
        <h4 class="text-center my-5 mx-16" v-html="cuerpo"></h4>
        <v-divider class="mx-14"></v-divider>
        <v-card-actions class="mx-0 mx-6 pb-10">
          <v-btn
            ref="btn3"
            color="boton"
            class="botone"
            v-if="!btn_cancel"
            dark
            block
            @click="cancel()"
            >{{ texto_boton }}
          </v-btn>
          <v-col
            cols="12"
            lg="12"
            md="12"
            sm="12"
            class="py-2 my-0 text-center"
            v-if="btn_cancel"
          >
            <v-btn
              ref="btn1"
              color="boton"
              width="110"
              class="botone"
              dark
              @click="confirm()"
            >
              Aceptar
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              ref="btn2"
              color="error"
              width="110"
              class="botone ml-2"
              @click="cancel()"
            >
              cancelar
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import warning from "../../assets/image/warning.json";
import success from "../../assets/image/success.json";
import error from "../../assets/image/error.json";
import email from "../../assets/image/email.json";
import info from "../../assets/image/info.json";
import LottieAnimation from "lottie-web-vue";
export default {
  props: {
    alert: Object,
  },
  components: {
    LottieAnimation,
  },
  data() {
    return {
      list_alert: {
        warning: ["mdi-alert-circle", "¡Precaución!", warning],
        error: ["mdi-close-octagon-outline", "¡Error!", error],
        success: ["mdi-check-circle-outline", "¡Realizado!", success],
        info: ["mdi-information-outline", "¡Información!", info],
        email: ["mdi-information-outline", "¡Email!", email],
      },
      btn_cancel: false,
      type_alert: "",
      title: "",
      color: "",
      icon: "",
      cuerpo: "",
      texto_boton: "",
    };
  },
  methods: {
    msjalert(codigo) {
      this.btn_cancel = true;
      switch (codigo) {
        case "logout":
          this.title = `Precaución!`;
          this.cuerpo = `¿Estás seguro que deseas cerrar sesión?`;
          break;
        case "pago":
          this.title = `¡Confirmación de aprobación de pago!`;
          this.cuerpo = `Estimado administrador, antes de aprobar un pago realizado fuera de la plataforma, le pedimos que considere que esta acción es irreversible. Por favor, verifique que todos los detalles son correctos y que está seguro de aprobar el pago antes de continuar.`;
          break;
        case "xlsx":
          this.title = `¡Confimar tu Email!`;
          this.cuerpo = `¡Gracias por registrarte!, Enviaremos un correo Electronico para verificar tu cuenta`;
          this.texto_boton = `Verificar cuenta`;
          break;
        case "pdf":
          this.title = `Generar impresión`;
          this.cuerpo = `¿Generar Impresión Formato PDF?`;
          break;
        //Users.
        case "OUT":
          this.title = `¡Cuidado!`;
          this.cuerpo = "¿Desea cerrar la sesión?";
          this.texto_boton = `Cerrar sesión`;
          break;
        case "deleteProgram":
          this.title = `¡Cuidado!`;
          this.cuerpo =
            "¿Desea eliminar el programa? Recuerda que tambien se eliminaran todas las postulaciones realacionadas a este.";
          this.texto_boton = `Eliminar programa`;
          break;
        case "editProgram":
          this.title = `¿Estas seguro que deseas editar este programa?`;
          this.cuerpo = "";
          this.texto_boton = `Editar programa`;
          break;
        case "programa-0":
          this.title = `¿Estas seguro que deseas editar este programa?`;
          this.cuerpo = "";
          this.texto_boton = `Editar programa`;
          break;
        case "editpostulacion":
          this.title = `¿Estas seguro que deseas editar esta postulacion?`;
          this.cuerpo = "";
          this.texto_boton = `Editar postulacion`;
          break;
        case "deletePostulacion":
          this.title = `¿Estas seguro que deseas eliminar esta postulacion?`;
          this.cuerpo = "";
          this.texto_boton = `Eliminar`;
          break;
        case "guardarCanal":
          this.title = `¿Deseas continuar?`;
          this.cuerpo =
            "Una vez guardada la informacion, no podrá ser editada.";
          this.texto_boton = `Guardar`;
          break;
        case "xlsx_":
          this.title = `¿Deseas continuar?`;
          this.cuerpo = "Sesea imprimir documento xlsx.";
          this.texto_boton = `Guardar`;
          break;
        case "VOTO-01":
          this.title = `¡Ten cuiado!`;
          this.cuerpo = `Estas a punto de cerrar las votaciones, ¿Seguro deseas enviar tus votaciones?`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-02":
          this.title = `¡Ten encuenta!`;
          this.cuerpo = `Tienes postulaciones sin nominar... , ¿Deseas continuar?`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-03":
          this.title = `¡Abstenerce!`;
          this.cuerpo = `¡Cuidado!, No podras revertir esta acción y si cuentas con votos en esta categoria seran eliminados, ¿Deseas abstenerce de votar en esta categoria?`;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-01":
          this.title = `¡Cuidado!`;
          this.cuerpo = `  ¿Deseas aceptar este usuario como miembro votante?`;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-02":
          this.title = `¡Cuidado!`;
          this.cuerpo = `  ¿Deseas rechazar este usuario como miembro votante?`;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-03":
          this.title = `¡Cuidado!`;
          this.cuerpo = `Por favor, confirma que la información es correcta, una vez guardada, no podrá ser editada.`;
          this.texto_boton = `Guardar`;
          break;
        case "MV-SS":
          this.title = `¡Registro creado correctamente!`;
          this.cuerpo = `Muchas gracias por su interés en participar como Miembro Acreditado de la Industria en la entrega número 41 de los Premios India Catalina. Su información compartida será analizada por la Organización y pronto nos pondremos en contacto con Ud. para confirmarle su participación y, en ese caso, las categorías en las cuales agradecemos su evaluación o votación. Hasta pronto.`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO":
          this.title = `¡Cuidado!`;
          this.cuerpo = `  Parece que ya votaste en esta categoria, ¿Deseas cambiar tu voto?`;
          this.texto_boton = `Aceptar`;
          break;
        default:
          this.title = `¡Atención!`;
          this.cuerpo = this.alert.text;
          this.texto_boton = `Aceptar`;
          break;
      }
      return this.cuerpo;
    },
    msjError(codigo) {
      switch (codigo) {
        case "MV-00":
          this.title = `¡Todos los documentos son requeridos!`;
          this.cuerpo = `Faltan documentos por seleccionar`;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-S1":
          this.title = `¡Ya te registraste!`;
          this.cuerpo = `Por favor espera a que el administrador te acepte.`;
          this.texto_boton = `Aceptar`;
          break;
        case "000001":
          this.title = `¡Ya te registraste!`;
          this.cuerpo = `El administrador ya reviso tu registro, espera a ser evaluado.`;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-S2":
          this.title = `¡No se ha validado tu registro!`;
          this.cuerpo = `Porfavor espera a que el administrador verifique tu registro, si no te has registrado porfavor registrate`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-01":
          this.title = `¡Votación realizada!`;
          this.cuerpo = `¡Gracias por votar`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-02":
          this.title = `¡Votación corregida!`;
          this.cuerpo = `¡Gracias por votar, la votación ha sido cambiada correctamente`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-03":
          this.title = `¡Votación enviada!`;
          this.cuerpo = `¡Gracias por votar, las votaciones se han enviado correctamente`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-04":
          this.title = `¡Votación enviada!`;
          this.cuerpo = `¡Gracias por votar, las votaciones se han enviado correctamente`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-05":
          this.title = `¡Genial!`;
          this.cuerpo = `¡Tu votación ha sido guardada con éxito!`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-06":
          this.title = `¡No has terminado tus votaciones!`;
          this.cuerpo = `¡Porfavor termina de revisar tus votaciones antes de cerrar tu votación`;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-01":
          this.title = `¡Miembro aceptado!`;
          this.cuerpo = `¡Has aceptado este miembro como usuario votante!`;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-02":
          this.title = `¡Miembro rechazado!`;
          this.cuerpo = `¡Has rechazado este miembro como usuario votante!`;
          this.texto_boton = `Aceptar`;
          break;
        case "SUGERENCIA":
          this.title = `Sugerencia enviada!`;
          this.cuerpo = `¡Gracias por tu sugerencia!, Se registro correctamente`;
          this.texto_boton = `Aceptar`;
          break;
        case "!SUGERENCIA":
          this.title = `No se puedo enviar la sugerencia.`;
          this.cuerpo = `Ocurrió un error al intentar enviar la sugerencia, por favor intentalo mas tarde.`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-T":
          this.title = `¡Confimación correcta!`;
          this.cuerpo = `¡Gracias por confirmar tu correo!, Ya puedes iniciar sesión en tu cuenta`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-T1":
          this.title = `¡Correo confirmado!`;
          this.cuerpo = `¡El correo ya se confirmo anteriormente!, Inicia sesión en tu cuenta`;
          this.texto_boton = `Ingresar`;
          break;
        case "CORREO-T1":
          this.title = `¡Ups, algo salió!`;
          this.cuerpo = `¡Verifica los campos y el token que fue enviado a tu correo electrónico`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-0":
          this.title = `¡Confimar tu Email!`;
          this.cuerpo = `¡Gracias por registrarte!, Enviaremos un correo Electronico para verificar tu cuenta`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-1":
          this.title = `¡Falta confirmar tu correo!`;
          this.cuerpo = `Verifica en tu correo electrónico y confirma tu Email.
          Recuerdo revisar en SPAM o correos no deseados.`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-2":
          this.title = `¡Correo o contraseña incorrecta!`;
          this.cuerpo = `Verifica tus datos e intenta nuevamente`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-3":
          this.title = `¡Ups!`;
          this.cuerpo = `Parece que el correo ingresado ya se encuentra registrado!`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-03":
          this.title = `¡Ups!`;
          this.cuerpo = `¡El correo no se ha registrado!
          Debes registrarte primero con el correo suministrado`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-04":
          this.title = `¡Ups!`;
          this.cuerpo = `Algo ha salido mal. Inténtalo de nuevo.
          `;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-4":
          this.title = `¡Ups!`;
          this.cuerpo = `Faltan algunos doocumentos por subir!`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-5":
          this.title = `¡Error inesperado!`;
          this.cuerpo = ``;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-6":
          this.title = `¡Intenta con un archivo menos pesado!`;
          this.cuerpo = `El peso máximo permitido es de 25MB`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-7":
          this.title = `¡Intenta con un archivo menos pesado!`;
          this.cuerpo = `El peso máximo permitido es de 5MB`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-8":
          this.title = `¡Acceso restringido!`;
          this.cuerpo = `Porfavor póngase en contacto con un administrativo`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-9":
          this.title = `¡Ya se finalizarón las votaciones!`;
          this.cuerpo = `Pronto se daran resultados de los ganadores`;
          this.texto_boton = `Aceptar`;
          break;
        case "CORREO-10":
          this.title = `¡Intenta con un archivo menos pesado!`;
          this.cuerpo = `El peso máximo permitido es de 10MB`;
          this.texto_boton = `Aceptar`;
          break;
        case "USUARIO-0":
          this.title = `¡Recuperar contraseña!`;
          this.cuerpo = `¡Enviamos un correo Electronico a tu correo para recuperar tu contraseña`;
          this.texto_boton = `Aceptar`;
          break;
        case "USUARIO-1":
          this.title = `¡Cambio de contraseña!`;
          this.cuerpo = `¡Tu contraseña se ha modificado correctamente`;
          this.texto_boton = `Aceptar`;
          break;
        case "USUARIO-3":
          this.title = `¡No se pudo cambiar la contraseña!`;
          this.cuerpo = `¡Tu contraseña no se modifico, intentalo denuevo`;
          this.texto_boton = `Aceptar`;
          break;
        case "PROGRAMA-0":
          this.title = `El programa ya se encuentra inscrito`;
          this.cuerpo =
            "El nombre de programa ya se encuentra registrado, intenta con otro.";
          this.texto_boton = `Cambiar nombre`;
          break;
        case "VIMEO-0":
          this.title = `El video no se ha cargado 100 %`;
          this.cuerpo =
            "Verifica que hayas subido el video al 100% para continuar";
          this.texto_boton = `Aceptar`;
          break;
        case "CTG-0":
          this.title = `No existen postulaciones`;
          this.cuerpo = "No existen ninguna postulación para esta categoria";
          this.texto_boton = `Aceptar`;
          break;
        case "pago-1":
          this.title = `Se hizo el pago correctamente`;
          this.cuerpo =
            "Se acaba de cambiar el estado de pago de la postulación";
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO":
          this.title = `¡Cuidado!`;
          this.cuerpo = `  Parece que ya votaste en esta categoria, ¿Deseas cambiar tu voto?`;
          this.texto_boton = `Aceptar`;
          break;
        case "VOTO-ERROR":
          this.title = `¡Error!`;
          this.cuerpo = `  Ocurrio un error al enviar el voto, intentalo nuevamente.`;
          this.texto_boton = `Aceptar`;
          break;
        case "-1":
          this.title = `¡Error!`;
          this.cuerpo = `  Erro de conexión con el servidor, verifica la conexion a internet.`;
          this.texto_boton = `Aceptar`;
          break;
        case "CATEGORIAS-1":
          this.title = `¡Selecciona al menos una categoria!`;
          this.cuerpo = ``;
          this.texto_boton = `Aceptar`;
          break;
        case "MV-CRITERIOS-1":
          this.title = `Debes calificar todos los criterios.`;
          this.cuerpo = ``;
          this.texto_boton = `Aceptar`;
          break;
        default:
          this.title = `¡Atención!`;
          this.cuerpo = this.alert.text;
          this.texto_boton = `Aceptar`;
          break;
      }
    },
    validarAlerta() {
      for (const key of Object.keys(this.list_alert)) {
        if (this.alert.tipo == key) {
          this.type_alert = this.list_alert[key][2];
          this.icon = this.list_alert[key][0];
          this.color = key;
          break;
        }
      }
    },
    confirm() {
      if (!this.alert.func1) this.$emit("confirm");
      else {
        this.alert.func1();
        this.alert.estado = false;
      }
    },
    cancel() {
      if (!this.alert.func2) this.$emit("cancel");
      else {
        this.alert.estado = false;
        this.alert.func2();
      }
    },
    exit() {
      if (event.keycodigo === 27) {
        if (this.btn_cancel) {
          this.$emit("cancel");
        } else {
          this.$emit("exitEsc");
        }
      }
    },
  },
  created() {
    this.validarAlerta();
  },
  mounted() {
    if (["p", "P"].includes(this.alert.opcion)) {
      this.msjalert(this.alert.codigo);
    } else {
      this.msjError(this.alert.codigo);
    }
  },
};
</script>
<style scoped>
.border-card {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
</style>
