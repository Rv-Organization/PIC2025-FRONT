<template>
  <v-app>
    <v-row class="container-channel px-5">
      <v-col cols="12" class="mt-0 pt-0">
        <v-container>
          <h2 class="py-5">Postulación Miembros Acreditados de la Industria</h2>
          <h4>
            La Organización de los Premios India Catalina se complace en contar
            con su experiencia y conocimiento para evaluar o votar las
            producciones y talentos postulados a la edición número 41 de esta
            entrega anual, que reconoce a lo mejor de la Industria Audiovisual
            Colombiana. Este año, cada categoría será evaluada y votada por
            profesionales con experiencia certificada en los formatos y géneros
            que dicha categoría premia. Le invitamos a llenar el siguiente
            formulario y esperamos contar con su valiosa participación.
          </h4>
          <br />
          <h4>
            Antes de llenar el formulario, tenga en cuenta que los procesos de
            evaluación y votación requieren de su tiempo personal para hacer una
            visualización a conciencia de las producciones y talentos
            postulados. Si usted considera que no cuenta con ese tiempo, le
            agradecemos participar en los Premios India Catalina de otra forma,
            por ejemplo, votando por los ganadores como público, proceso que
            vendrá más adelante.
          </h4>
          <br />
          <h4>
            Antes de inscribirse, por favor revise atentamente el

            <a
              href="https://premiosindiacatalina.com/wp-content/uploads/2025/01/PIC-41-REGLAMENTO-GENERAL-VF-06NE2025.pdf"
              target="_blank"
              >REGLAMENTO</a
            >
          </h4>
          <v-divider class="my-6"></v-divider>
          <v-card-text class="asaccent--text pb-8"
            >Nota: Todos los campos con asteriscos (*) son obligatorios
          </v-card-text>
          <v-form v-model="validacion" ref="form" lazy-validation>
            <v-row justify="start">
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.nombres" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.apellidos" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.email_1" />
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.email_1_veri" />
              </v-col>
            </v-row>
            <v-divider class="my-6"></v-divider>
            <v-row justify="start" class="mt-8">
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                class="py-0"
              >
                <h3 class="mb-5">
                  ¿Esta sería su primera vez como Miembro Acreditado de la
                  Industria en los Premios India Catalina?
                </h3>
                <v-radio-group v-model="radioGroupPrimeraVez" row>
                  <v-radio
                    key="1"
                    label="Sí, es mi primera vez."
                    value="1"
                  ></v-radio>
                  <v-radio
                    key="2"
                    label="No, ya he participado antes."
                    value="2"
                  ></v-radio>
                  <v-col
                    cols="6"
                    xs="6"
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    class="py-0 mt-4"
                  >
                    <INPUT
                      v-if="radioGroupPrimeraVez == '2'"
                      :field="form.fechaUltimaVez"
                    />
                  </v-col>
                </v-radio-group>
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.documento" />
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.celular" />
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.celular_veri" />
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.profesion" />
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="6" xl="6" class="py-0">
                <INPUT :field="form.ocupacion" />
              </v-col>
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                class="py-0"
              >
                <h3 class="mb-5">
                  ¿Está vinculado actualmente con algún canal, plataforma o
                  productora?
                </h3>
                <v-radio-group v-model="radioGroupVinculado" row>
                  <v-radio key="1" label="Sí." value="1"></v-radio>
                  <v-radio
                    key="2"
                    label="No."
                    value="2"
                    @click="form.vinculado.value = null"
                  ></v-radio>
                </v-radio-group>
                <div v-if="radioGroupVinculado == 1">
                  <AUTOCOMPLETE :field="form.canales_productoras" />
                  <INPUT
                    v-if="form.canales_productoras.value == 'Otro. ¿Cuál?'"
                    :field="form.vinculado"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                class="py-0"
                v-if="['1', '2'].includes(radioGroupVinculado)"
              >
                <h3>
                  Seleccione el sector que mejor representa su realidad
                  profesional actual.
                </h3>
                <p class="mb-5">
                  Si usted es freelancer, deberá considerarse como
                  independiente, salvo que mantenga un vínculo activo con
                  proyectos específicos en los sectores privados o públicos.
                  <br />
                  <br />
                  Se entiende por vínculo activo cualquier relación contractual
                  o de prestación de servicios que se encuentre vigente al
                  momento de la convocatoria.
                </p>

                <v-radio-group v-model="sector" row>
                  <v-radio
                    :label="sector.description"
                    v-for="sector in sectores"
                    :value="sector.id"
                    class="col-6 mx-0"
                    :key="sector.id"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center justify-space-between">
                        <span>{{ sector.id + ". " + sector.description }}</span>
                        <v-tooltip bottom color="primary">
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                              <v-icon>mdi-comment-question-outline</v-icon>
                            </v-btn>
                          </template>
                          <v-card class="tooltip-card" outlined>
                            <p class="ma-2">
                              {{ sector.detail }}
                            </p>
                          </v-card>
                        </v-tooltip>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>

              <!-- ****************************Lista proyectos**************************** -->
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                class="py-0"
              >
                <h3 class="mb-5">
                  Por favor incluya hasta 5 de los proyectos más representativos
                  en su carrera como miembro de la Industria Audiovisual
                  Colombiana
                </h3>
              </v-col>
            </v-row>
            <v-row
              justify="start"
              class="mb-5"
              v-for="(proyecto, index) in proyectos"
            >
              <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="py-0">
                <INPUT :field="form[`nombre_proyecto_${index + 1}`]" />
              </v-col>
              <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="py-0">
                <AUTOCOMPLETE :field="form[`canal_${index + 1}`]" />
              </v-col>
              <v-col
                v-if="form[`canal_${index + 1}`].value == 'Otro. ¿Cuál?'"
                cols="12"
                xs="4"
                sm="4"
                md="4"
                lg="4"
                xl="4"
                class="py-0"
              >
                <INPUT :field="form[`otro_${index + 1}`]" />
              </v-col>
              <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="py-0">
                <AUTOCOMPLETE :field="form[`cargo_proyecto_${index + 1}`]" />
                <INPUT
                  v-if="
                    form[`cargo_proyecto_${index + 1}`].value == 'Otro. ¿Cuál?'
                  "
                  :field="form[`otro_cargo_proyecto_${index + 1}`]"
                />
              </v-col>
            </v-row>
            <v-row justify="center" class="mb-5">
              <v-col
                cols="6"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                xl="6"
                class="py-0 text-center"
              >
                <v-btn
                  class="mx-2"
                  fab
                  small
                  color="red"
                  :disabled="proyectos == 1 ? true : false"
                  @click="restarProyecto()"
                >
                  <v-icon class="white--text"> mdi-minus </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2"
                  fab
                  small
                  color="green"
                  :disabled="proyectos == 5 ? true : false"
                  @click="sumarProyecto()"
                >
                  <v-icon class="white--text"> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- ****************************Lista Cargos**************************** -->
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
              class="py-0"
            >
              <h3 class="mb-5">
                Por favor incluya hasta 5 de los cargos más representativos en
                su carrera como miembro de la Industria Audiovisual Colombiana
              </h3>
            </v-col>
            <v-row
              justify="center"
              class="mb-5"
              v-for="(cargo, index) in cargos"
            >
              <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="py-0">
                <INPUT :field="form[`nombre_empresa_${index + 1}`]" />
              </v-col>
              <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" class="py-0">
                <AUTOCOMPLETE :field="form[`cargo_${index + 1}`]" />
                <INPUT
                  v-if="form[`cargo_${index + 1}`].value == 'Otro. ¿Cuál?'"
                  :field="form[`otro_cargo_${index + 1}`]"
                />
              </v-col>
              <v-col cols="12" xs="2" sm="2" md="2" lg="2" xl="2" class="py-0">
                <INPUT :field="form[`ano_inicio_${index + 1}`]" />
              </v-col>
              <v-col cols="12" xs="2" sm="2" md="2" lg="2" xl="2" class="py-0">
                <INPUT :field="form[`ano_fin_${index + 1}`]" />
              </v-col>
            </v-row>
            <v-row justify="center" class="mb-5">
              <v-col
                cols="6"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                xl="6"
                class="py-0 text-center"
              >
                <v-btn
                  class="mx-2"
                  fab
                  small
                  color="red"
                  :disabled="cargos == 1 ? true : false"
                  @click="restarCargos()"
                >
                  <v-icon class="white--text"> mdi-minus </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2"
                  fab
                  small
                  color="green"
                  :disabled="cargos == 5 ? true : false"
                  @click="sumarCargos()"
                >
                  <v-icon class="white--text"> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row justify="center" class="mb-5">
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                class="py-0"
              >
                <h3 class="mb-5">
                  Ahora que ha listado sus proyectos y cargos más
                  representativos en la industria, seleccione hasta tres áreas
                  en las que tenga mayor experiencia certificada. Indique su
                  nivel de predominancia (1: Principal, 3: Menos predominante)
                  en el orden en que las selecciona.
                </h3>
              </v-col>
              <v-col
                v-for="(categoria, index) in sub_group_category"
                :key="index"
                class="my-0 py-0"
                cols="12"
                md="4"
              >
                <v-checkbox
                  :label="categoria.description"
                  :value="categoria.id"
                  v-model="selectedCategorias"
                  :disabled="
                    selectedCategorias.length === 3 &&
                    !selectedCategorias.includes(categoria.id)
                  "
                  class="d-flex align-center"
                >
                  <template v-slot:label>
                    <div class="d-flex align-center justify-space-between">
                      <span>{{ categoria.description }}</span>
                      <v-tooltip bottom color="primary">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on">
                            <v-icon>mdi-comment-question-outline</v-icon>
                          </v-btn>
                        </template>
                        <v-card class="tooltip-card" outlined>
                          <v-list dense>
                            <v-list-item
                              v-for="(item, i) in categorias[index]"
                              :key="i"
                            >
                              <v-list-item-content>
                                {{ item }}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-form>
          <v-divider class="my-4"></v-divider>

          <v-form v-model="validacion" ref="form_uploads" lazy-validation>
            <h2 class="text-start my-10">Archivos requeridos</h2>
            <!-- FOTO -->
            <v-card elevation="1" class="px-3 mt-4" outlined>
              <v-row aling="center" class="my-0">
                <v-col cols="12" sm="12" xs="6" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h3>Foto donde se le puede identificar claramente *</h3>
                    <h4>
                      Extensiones permitidas JPG, JPEG, PNG, máximo 25 megas
                    </h4>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  xs="6"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                  id="uploadmyfile"
                >
                  <v-btn
                    @click="subirArchivo('input-file1')"
                    plain
                    class="upload boton-focus-animation py-2 mb-3"
                    height="100%"
                  >
                    <v-row aling="center">
                      <v-col
                        cols="5"
                        xs="5"
                        sm="5"
                        md="5"
                        lg="5"
                        xl="5"
                        class="py-0 mx-auto pl-9 my-0"
                      >
                        <v-file-input
                          prepend-icon="mdi-cloud-upload-outline"
                          accept="image/png, image/jpeg, image/jpg"
                          v-model="form_uploads.foto"
                          truncate-length="1"
                          id="input-file1"
                          class="mt-0"
                          hide-input
                        />
                      </v-col>
                      <v-row>
                        <v-col class="py-4">
                          <h3 v-if="!form_uploads.foto.name">SUBIR</h3>
                          <h3 v-else>VOLVER A SUBIR</h3>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="this.form_uploads.foto.name" class="py-4">
              <v-img
                max-height="100%"
                contain
                max-width="100%"
                :src="frames.foto"
                aspect-ratio="1.4"
              ></v-img>
            </v-col>

            <!-- DOCUMENTO -->

            <v-card elevation="1" class="px-3 mt-4" outlined>
              <v-row aling="center" class="my-0">
                <v-col cols="12" sm="12" xs="6" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h3>Fotocopia del documento de identidad. *</h3>
                    <h4>
                      Extensiones permitidas JPG, JPEG, PNG, PDF, máximo 25
                      megas
                    </h4>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  xs="6"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                  id="uploadmyfile"
                >
                  <v-btn
                    @click="subirArchivo('input-file2')"
                    plain
                    class="upload boton-focus-animation py-2 mb-3"
                    height="100%"
                  >
                    <v-row aling="center">
                      <v-col
                        cols="5"
                        xs="5"
                        sm="5"
                        md="5"
                        lg="5"
                        xl="5"
                        class="py-0 mx-auto pl-9 my-0"
                      >
                        <v-file-input
                          prepend-icon="mdi-cloud-upload-outline"
                          accept="application/pdf, image/png, image/jpeg, image/jpg"
                          v-model="form_uploads.documento"
                          truncate-length="1"
                          id="input-file2"
                          class="mt-0"
                          hide-input
                        />
                      </v-col>
                      <v-row>
                        <v-col class="py-4">
                          <h3 v-if="!form_uploads.documento.name">SUBIR</h3>
                          <h3 v-else>VOLVER A SUBIR</h3>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="this.form_uploads.documento.name" class="py-4">
              <iframe
                v-if="this.format_documento === 'pdf'"
                height="500px"
                width="500px"
                class="container"
                :src="frames.documento"
              ></iframe>
              <v-img
                v-else
                max-height="100%"
                contain
                max-width="100%"
                :src="frames.documento"
                aspect-ratio="1.4"
              ></v-img>
            </v-col>

            <!-- CERTIFICACION -->
            <v-card elevation="1" class="px-3 mt-4" outlined>
              <v-row aling="center" class="my-0">
                <v-col cols="12" sm="12" xs="6" md="8" lg="8" xl="8">
                  <v-card-text>
                    <h3>
                      Hoja de vida con diplomas y certificaciones (por favor
                      referenciar solo experiencia certificada). *
                    </h3>
                    <h4>Extensiones permitidas PDF, máximo 25 megas</h4>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  xs="6"
                  md="4"
                  lg="4"
                  xl="4"
                  class="text-center mx-auto"
                  id="uploadmyfile"
                >
                  <v-btn
                    @click="subirArchivo('input-file3')"
                    plain
                    class="upload boton-focus-animation py-2 mb-3"
                    height="100%"
                  >
                    <v-row aling="center">
                      <v-col
                        cols="5"
                        xs="5"
                        sm="5"
                        md="5"
                        lg="5"
                        xl="5"
                        class="py-0 mx-auto pl-9 my-0"
                      >
                        <v-file-input
                          prepend-icon="mdi-cloud-upload-outline"
                          accept="application/pdf, image/png, image/jpeg, image/jpg"
                          v-model="form_uploads.hoja_vida"
                          truncate-length="1"
                          id="input-file3"
                          class="mt-0"
                          hide-input
                        />
                      </v-col>
                      <v-row>
                        <v-col class="py-4">
                          <h3 v-if="!form_uploads.hoja_vida.name">SUBIR</h3>
                          <h3 v-else>VOLVER A SUBIR</h3>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-col v-if="this.form_uploads.hoja_vida.name" class="py-4">
              <iframe
                v-if="this.format_hoja_vida === 'pdf'"
                height="500px"
                width="500px"
                class="container"
                :src="frames.hoja_vida"
              ></iframe>
              <v-img
                v-else
                max-height="100%"
                contain
                max-width="100%"
                :src="frames.hoja_vida"
                aspect-ratio="1.4"
              ></v-img>
            </v-col>

            <v-row class="mt-10 justify-left">
              <h3>Rol Principal en Producciones Audiovisuales</h3>
              <p class="mb-5">
                Seleccione el rol con el que tiene más experiencia en su carrera
                profesional (marque solo uno):
              </p>
              <v-radio-group v-model="role" row>
                <v-radio
                  v-for="item in production_role"
                  :label="item.description"
                  :value="item.id"
                  class="col-6 mx-0"
                  :key="item.id"
                >
                  <template v-slot:label>
                    <div class="d-flex align-center justify-space-between">
                      <span>{{ item.id + ". " + item.description }}</span>
                      <v-tooltip bottom color="primary">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on">
                            <v-icon>mdi-comment-question-outline</v-icon>
                          </v-btn>
                        </template>
                        <v-card class="tooltip-card" outlined>
                          <p class="ma-2">
                            <span
                              v-html="
                                item?.productionSubRoles
                                  .map((e) => e.description)
                                  .join('<br>')
                              "
                            ></span>
                          </p>
                        </v-card>
                      </v-tooltip>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-row>
            <v-row class="mt-10 justify-center">
              <h3 class="mb-5">
                Porfavor seleccione su disponibilidad para participar en las
                postulaciones como miebro acreditado de la industria
              </h3>
              <AUTOCOMPLETE
                class="mx-2"
                :field="form.availability_week"
                item_text="description"
              />
              <AUTOCOMPLETE
                class="mx-2"
                :field="form.availability_day"
                item_text="description"
              />
            </v-row>
            <v-row class="mt-10 justify-center">
              <h3 class="col-12">Declaración de Confidencialidad</h3>

              <v-checkbox
                v-model="form.confidentiality_authorization.value"
                :rules="[
                  (v) =>
                    !!v || 'Debe aceptar la declaración de confidencialidad',
                ]"
                label="Confirmo que no tengo conflictos de interés con ninguna producción postulada y que cumpliré con las normas de confidencialidad establecidas."
                class="d-flex align-center"
              />
            </v-row>
          </v-form>

          <v-container>
            <v-row class="my-15 justify-center">
              <v-col cols="12" xs="8" sm="8" md="8" lg="8" xl="8">
                <v-btn
                  @click="alertaGuardar()"
                  class="botone"
                  color="boton"
                  elevation="0"
                  large
                  block
                  dark
                  >Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
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
    </v-row>
  </v-app>
</template>

<script>
import { INPUT, AUTOCOMPLETE } from "@/mixins/global";
import { ALERTA } from "../../mixins/alerta";

import { CURRTET_USER, imageBase64 } from "../../global";
import { mapActions, mapMutations } from "vuex";
import moment from "moment";
export default {
  mixins: [INPUT, AUTOCOMPLETE, ALERTA],

  data() {
    return {
      usuario: CURRTET_USER,

      format_hoja_vida: "",
      format_documento: "",
      pdf_reglamento: null,
      frames: {
        hoja_vida: "",
        documento: "",
        foto: "",
      },
      validacion: true,
      estado: false,
      radioGroupPrimeraVez: "1",
      radioGroupVinculado: "2",
      sector: "",
      role: null,
      sub_group_category: [],
      production_role: [],
      proyectos: 1,
      cargos: 1,
      tipos_categorias: [
        /*    "Ficción",
        "Documentales, periodísticos",
        "Deportivos",
        "Inclusión social",
        "Infantil",
        "Juvenil",
        "Universitaria",
        "Animación",
        "Variedades",
        "Realities",
        "Comedia",
        "Musical",
        "Digital",
        "Transmedia",
        "Vodcast", */
      ],
      categorias: [
        [
          "Mejor Ficción",
          "Mejor Miniserie de Ficción",
          "Mejor Serie de Ficción Online",
          "Mejor Dirección de Ficción",
          "Mejor Libreto de Ficción",
          "Mejor Actriz Protagónica",
          "Mejor Actor Protagónico",
          "Mejor Actriz de Reparto",
          "Mejor Actor de Reparto",
          "Actriz o Actor Revelación del Año",
        ],
        [
          "Mejor Documental",
          "Mejor Serie Documental",
          "Mejor Noticiero Nacional",
          "Mejor Noticiero Regional o Local",
          "Mejor Presentador (a) de Noticias",
          "Mejor Producción Periodística",
          "Mejor Producción Deportiva",
          "Mejor Presentador (a) de Deportes",
          "Mejor Producción de Inclusión Social",
          "Mejor Producción de Canal Comunitario",
        ],
        [
          "Mejor Producción de Variedades",
          "Mejor Presentador (a) de Variedades",
          "Mejor Reality o Concurso",
          "Mejor Producción de Comedia",
          "Mejor Producción Musical",
        ],
        [
          "Mejor Producción Infantil",
          "Mejor Producción Juvenil",
          "Mejor Talento Infantil",
          "Mejor Talento Juvenil",
          "Mejor Producción de Animación",
          "Mejor Actuación de Voz",
          "Mejor Producción Universitaria",
        ],
        [
          "Mejor Edición",
          "Mejor Dirección de Fotografía",
          "Mejor Dirección de Arte",
          "Mejor Musicalización ",
          "Mejor Diseño Sonoro",
        ],
        [
          "Mejor Producción Transmedia",
          "Mejor Vodcast",
          "Mejor Contenido Audiovisual de Marca / Branded Content ",
        ],
      ],
      selectedCategorias: [],

      form: {
        nombres: {
          value: CURRTET_USER.name,
          id: "nombres",
          label: "Nombres *",
          maxlength: "100",
          disabled: true,
          rules: [(v) => !!v || "Nombre de canal es requerido"],
        },
        apellidos: {
          value: CURRTET_USER.lastName,
          id: "apellidos",
          label: "Apellidos *",
          maxlength: "100",
          disabled: true,
          rules: [(v) => !!v || "apellidos es requerido"],
        },
        celular: {
          value: "",
          id: "celular",
          label: "Celular *",
          tipo: "number",
          maxlength: "10",
          disabled: false,
          rules: [
            (v) => !!v || "Celular es requerido",
            (v) => v.length >= 10 || "Numero celular invalido",
          ],
        },
        celular_veri: {
          value: "",
          id: "celular_veri",
          tipo: "number",
          disabled: false,
          label: "Confirmar celular *",
          maxlength: "10",
          rules: [
            (v) => !!v || "Numero celular es requerido",
            (v) => v.length >= 10 || "Numero celular invalido",
            (v) => v == this.form.celular.value || "Numero celular no coincide",
          ],
        },
        profesion: {
          value: "",
          id: "profesion",
          label: "Profesión *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Profesión es requerida"],
        },
        ocupacion: {
          value: "",
          id: "ocupacion",
          label: "Ocupación *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Ocupación es requerida"],
        },
        vinculado: {
          value: "",
          id: "vinculado",
          label: "Indique cuál... *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Informacion requerida"],
        },

        canales_productoras: {
          value: "",
          id: "canales_productoras",
          label: "Nombre del canal o Productora Postulante",
          items: [
            { id: "Caracol Tv", text: "Caracol TV" },
            { id: "Canal RCN", text: " Canal RCN" },
            { id: "Canal 1", text: "Canal 1" },
            { id: "Señal Colombia", text: "Señal Colombia" },
            { id: "Canal Institucional", text: "Canal Institucional" },
            { id: "RTVCPlay", text: "RTVCPlay" },
            { id: "Teleantioquia", text: "Teleantioquia" },
            { id: "Telemedellín", text: "Telemedellín" },
            { id: "Telecaribe", text: "Telecaribe" },
            { id: "Telepacífico", text: "Telepacífico" },
            { id: "Capital", text: "Capital" },
            { id: "Eureka", text: "Eureka" },
            { id: "Teleislas", text: "Teleislas" },
            { id: "Telecafé", text: "Telecafé" },
            { id: "Canal TRO", text: "Canal TRO" },
            { id: "CityTV", text: "CityTV" },
            { id: "Canal Trece", text: "Canal Trece" },
            { id: "Netflix", text: "Netflix" },
            { id: "HBO Max", text: "HBO Max" },
            { id: "Star +", text: "Star +" },
            { id: "Prime Video", text: "Prime Video" },
            { id: "Disney +", text: "Disney +" },
            { id: "MinTIC", text: "MinTIC" },
            { id: "", text: "Otro. ¿Cuál?" },
          ],
          rules: [(v) => !!v || "Nombre del canal o Productora Postulante"],
        },

        // ****************************Lista proyectos****************************

        nombre_proyecto_1: {
          value: "",
          id: "nombre_proyecto_1",
          label: "Nombre del proyecto *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre del proyecto requerido"],
        },
        canal_1: {
          value: "",
          id: "canal_1",
          label: "Canal / plataforma de emisión *",
          items: this.itemsCanales(),
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        otro_1: {
          value: "",
          id: "otro_1",
          maxlength: "100",
          label: "Indique cuál... *",
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        cargo_proyecto_1: {
          value: "",
          id: "cargo_proyecto_1",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_proyecto_1: {
          value: "",
          id: "otro_cargo_proyecto_1",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },

        nombre_proyecto_2: {
          value: "",
          id: "nombre_proyecto_2",
          label: "Nombre del proyecto *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre del proyecto requerido"],
        },
        canal_2: {
          value: "",
          id: "canal_2",
          label: "Canal / plataforma de emisión *",
          maxlength: "100",
          disabled: false,
          items: this.itemsCanales(),
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        otro_2: {
          value: "",
          id: "otro_1",
          maxlength: "100",
          label: "Indique cuál... *",
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        cargo_proyecto_2: {
          value: "",
          id: "cargo_proyecto_2",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_proyecto_2: {
          value: "",
          id: "otro_cargo_proyecto_2",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },

        nombre_proyecto_3: {
          value: "",
          id: "nombre_proyecto_3",
          label: "Nombre del proyecto *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre del proyecto requerido"],
        },
        canal_3: {
          value: "",
          id: "canal_3",
          label: "Canal / plataforma de emisión *",
          maxlength: "100",
          disabled: false,
          items: this.itemsCanales(),
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        otro_3: {
          value: "",
          id: "otro_1",
          maxlength: "100",
          label: "Indique cuál... *",
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        cargo_proyecto_3: {
          value: "",
          id: "cargo_proyecto_3",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_proyecto_3: {
          value: "",
          id: "otro_cargo_proyecto_3",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },

        nombre_proyecto_4: {
          value: "",
          id: "nombre_proyecto_4",
          label: "Nombre del proyecto *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre del proyecto requerido"],
        },
        canal_4: {
          value: "",
          id: "canl_4",
          label: "Canal / plataforma de emisión *",
          maxlength: "100",
          disabled: false,
          items: this.itemsCanales(),
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        otro_4: {
          value: "",
          id: "otro_1",
          maxlength: "100",
          label: "Indique cuál... *",
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        cargo_proyecto_4: {
          value: "",
          id: "cargo_proyecto_4",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_proyecto_4: {
          value: "",
          id: "otro_cargo_proyecto_4",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },

        nombre_proyecto_5: {
          value: "",
          id: "nombre_proyecto_5",
          label: "Nombre del proyecto *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre del proyecto requerido"],
        },
        canal_5: {
          value: "",
          id: "canal_5",
          label: "Canal / plataforma de emisión *",
          maxlength: "100",
          disabled: false,
          items: this.itemsCanales(),
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        otro_5: {
          value: "",
          id: "otro_1",
          maxlength: "100",
          label: "Indique cuál... *",
          rules: [(v) => !!v || "Canal / plataforma de emisión requerido"],
        },
        cargo_proyecto_5: {
          value: "",
          id: "cargo_proyecto_5",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_proyecto_5: {
          value: "",
          id: "otro_cargo_proyecto_5",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },

        // ****************************Lista cargos****************************

        nombre_empresa_1: {
          value: "",
          id: "nombre_empresa_1",
          label: "Nombre de la empresa *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre de la empresa es requerido"],
        },
        cargo_1: {
          value: "",
          id: "cargo_1",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_1: {
          value: "",
          id: "otro_cargo_1",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        ano_inicio_1: {
          value: "",
          id: "ano_inicio_1",
          label: "Año inicio *",
          tipo: "number",
          maxlength: "4",
          disabled: false,
          rules: [(v) => !!v || "Año de inicio es requerido"],
        },
        ano_fin_1: {
          value: "",
          id: "ano_fin_1",
          label: "Año fin",
          tipo: "number",
          maxlength: "4",
          disabled: false,
        },

        nombre_empresa_2: {
          value: "",
          id: "nombre_empresa_2",
          label: "Nombre de la empresa *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre de la empresa es requerido"],
        },
        cargo_2: {
          value: "",
          id: "cargo_2",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_2: {
          value: "",
          id: "otro_cargo_2",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        ano_inicio_2: {
          value: "",
          id: "ano_inicio_2",
          label: "Año inicio *",
          tipo: "number",
          maxlength: "4",
          disabled: false,
          rules: [(v) => !!v || "Año de inicio es requerido"],
        },
        ano_fin_2: {
          value: "",
          id: "ano_fin_2",
          label: "Año fin",
          tipo: "number",
          maxlength: "4",
          disabled: false,
        },

        nombre_empresa_3: {
          value: "",
          id: "nombre_empresa_3",
          label: "Nombre de la empresa *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre de la empresa es requerido"],
        },
        cargo_3: {
          value: "",
          id: "cargo_3",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_3: {
          value: "",
          id: "otro_cargo_3",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        ano_inicio_3: {
          value: "",
          id: "ano_inicio_3",
          label: "Año inicio *",
          tipo: "number",
          maxlength: "4",
          disabled: false,
          rules: [(v) => !!v || "Año de inicio es requerido"],
        },
        ano_fin_3: {
          value: "",
          id: "ano_fin_3",
          label: "Año fin",
          tipo: "number",
          maxlength: "4",
          disabled: false,
        },

        nombre_empresa_4: {
          value: "",
          id: "nombre_empresa_4",
          label: "Nombre de la empresa *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre de la empresa es requerido"],
        },
        cargo_4: {
          value: "",
          id: "cargo_4",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_4: {
          value: "",
          id: "otro_cargo_4",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        ano_inicio_4: {
          value: "",
          id: "ano_inicio_4",
          label: "Año inicio *",
          tipo: "number",
          maxlength: "4",
          disabled: false,
          rules: [(v) => !!v || "Año de inicio es requerido"],
        },
        ano_fin_4: {
          value: "",
          id: "ano_fin_4",
          label: "Año fin",
          tipo: "number",
          maxlength: "4",
          disabled: false,
        },

        nombre_empresa_5: {
          value: "",
          id: "nombre_empresa_5",
          label: "Nombre de la empresa *",
          maxlength: "100",
          disabled: false,
          rules: [(v) => !!v || "Nombre de la empresa es requerido"],
        },
        cargo_5: {
          value: "",
          id: "cargo_5",
          label: "Cargo",
          items: [],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        otro_cargo_5: {
          value: "",
          id: "otro_cargo_5",
          maxlength: "50",
          label: "Indique cuál cargo... *",
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        ano_inicio_5: {
          value: "",
          id: "ano_inicio_5",
          label: "Año inicio *",
          tipo: "number",
          maxlength: "4",
          disabled: false,
          rules: [(v) => !!v || "Año de inicio es requerido"],
        },
        ano_fin_5: {
          value: "",
          id: "ano_fin_5",
          label: "Año fin",
          tipo: "number",
          maxlength: "4",
          disabled: false,
        },

        telefono: {
          value: "",
          id: "telefono",
          label: "Teléfono *",
          maxlength: "15",
          tipo: "number",
          rules: [
            (v) => !!v || "Teléfono es requerido",
            (v) => v.length >= 5 || "Numero de telefono invalido",
          ],
        },
        documento: {
          value: CURRTET_USER.document,
          id: "documento",
          label: "Documento *",
          maxlength: "15",
          tipo: "number",
          rules: [
            (v) => !!v || "Documento es requerido",
            (v) => v.length >= 5 || "Numero de documento invalido",
          ],
        },

        fechaUltimaVez: {
          value: "",
          id: "fecha",
          tipo: "number",
          label: "¿Cuándo fue la última vez? *",
          maxlength: "4",
          rules: [(v) => !!v || "El año de última participación es requerida"],
        },

        email_1: {
          value: CURRTET_USER.email,
          tipo: "email",
          id: "email_1",
          label: "Email *",
          disabled: true,
          maxlength: "50",
          rules: [
            (v) => !!v || "Email es requerido",
            (v) => /.+@.+\..+/.test(v) || "Email no es valido",
          ],
        },
        email_1_veri: {
          value: CURRTET_USER.email,
          tipo: "email",
          id: "email_1_veri",
          disabled: true,
          label: "Verificar Email *",
          maxlength: "50",
          rules: [
            (v) => !!v || "Email es requerido",
            (v) => /.+@.+\..+/.test(v) || "Email no es valido",
            (v) => v == this.form.email_1.value || "email no coincide",
          ],
        },
        direccion_oficina: {
          value: "",
          id: "direccion_oficina",
          label: "Dirección oficina *",
          maxlength: "100",
          rules: [(v) => !!v || "Dirreción de oficina es requerida"],
        },
        cargo: {
          value: "",
          id: "cargo",
          label: "Cargo",
          items: [
            { cod: "1", text: "Director (a) de contenido" },
            { cod: "2", text: "Asistente de dirección" },
            { cod: "3", text: "Libretista" },
            { cod: "4", text: "Productor (a) general" },
            { cod: "5", text: "Productor (a) ejecutivo (a)" },
            { cod: "6", text: "Coordinador (a) de producción" },
            { cod: "7", text: "Coordinador (a) de posproducción " },
            { cod: "8", text: "Productor (a) delegado (a)" },
            { cod: "9", text: "Editor (a)" },
            { cod: "10", text: "Director (a) de arte" },
            { cod: "11", text: "Director (a) de fotografía" },
            { cod: "12", text: "Director (a) musical" },
            { cod: "13", text: "Posproductor (a) de audio " },
            { cod: "14", text: "Gerente" },
            { cod: "15", text: "Subgerente" },
            { cod: "16", text: "Director (a) creativo (a)" },
            { cod: "17", text: "Investigador (a)" },
            { cod: "18", text: "Presidente" },
            { cod: "19", text: "Vicepresidente de contenido" },
            { cod: "20", text: "Vicepresidente de producción" },
            { cod: "21", text: "Script" },
            { cod: "22", text: "Influenciador (a)" },
            { cod: "23", text: "Actor " },
            { cod: "24", text: "Actriz" },
            { cod: "25", text: "Presentador (a)" },
            { cod: "26", text: "Director (a) de casting" },
            { cod: "27", text: "Showrunner " },
            { cod: "28", text: "Productor (a) en línea " },
            { cod: "29", text: "Periodista" },
            { cod: "30", text: "Rector" },
            { cod: "31", text: "Profesor (a)" },
            { cod: "32", text: "Director (a) académico (a)" },
            { cod: "33", text: "Crítico (a)" },
          ],
          rules: [(v) => !!v || "Cargo es requerido"],
        },
        availability_week: {
          value: "",
          id: "availability_week",
          item_value: "id",
          item_text: "description",
          label: "Cuantas semanas puede dedicar *",
          rules: [(v) => !!v || "Especificar semanas"],
          items: [],
        },
        availability_day: {
          value: "",
          id: "availability_day",
          item_value: "id",
          item_text: "description",
          label: "Cuantas dias puede dedicar *",
          rules: [(v) => !!v || "Espeficar dias"],
          items: [],
        },
        canal_productora: {
          value: "",
          id: "canal_productora",
          label: "Canal o productora",
          maxlength: "100",
        },

        confidentiality_authorization: {
          value: "",
          id: "confidentiality_authorization",
          label: "Declaración de Confidencialidad",
          rules: [
            (v) => !!v || "Debe aceptar la declaración de confidencialidad",
          ],
        },
      },
      form_uploads: {
        hoja_vida: [],
        foto: [],
        documento: [],
      },
      estado_registro: false,
      cargosPrueba: [],
      sectores: [],
    };
  },
  watch: {
    "form_uploads.hoja_vida"() {
      this.format_hoja_vida = this.form_uploads.hoja_vida.name.split(".");
      this.format_hoja_vida =
        this.format_hoja_vida[this.format_hoja_vida.length - 1];
      if (this.form_uploads.hoja_vida.size > 25000000) {
        this.form_uploads.hoja_vida = "";
        this.ALT_("CORREO-6", "warning");
      } else
        this.frames.hoja_vida = URL.createObjectURL(
          this.form_uploads.hoja_vida
        );
    },
    "form_uploads.documento"() {
      this.format_documento = this.form_uploads.documento.name.split(".");
      this.format_documento =
        this.format_documento[this.format_documento.length - 1];
      if (this.form_uploads.documento.size > 25000000) {
        this.form_uploads.documento = "";
        this.ALT_("CORREO-6", "warning");
      } else
        this.frames.documento = URL.createObjectURL(
          this.form_uploads.documento
        );
    },
    "form_uploads.foto"() {
      if (this.form_uploads.foto.size > 25000000) {
        this.form_uploads.foto = "";
        this.ALT_("CORREO-6", "warning");
      } else this.frames.foto = URL.createObjectURL(this.form_uploads.foto);
    },
    "form.canales_productoras.value"() {
      this.form.vinculado.value = "";
    },
  },
  async created() {
    const availability_day = await this._getAvailabilityDay();
    this.form.availability_day.items = availability_day;

    const availability_week = await this._getAvailabilityWeek();
    this.form.availability_week.items = availability_week;

    const sector = await this._getSector();
    this.sectores = sector;

    const production_role = await this._getProductionRole();
    this.production_role = production_role;

    const sub_group_category = await this._getSubGroupCategory();
    this.sub_group_category = sub_group_category;

    const cargos = await this._getCargos();
    for (let i = 0; i < cargos.data.data.length; i++) {
      this.cargosPrueba.push({
        cod: `${cargos.data.data[i].id}`,
        text: cargos.data.data[i].description,
      });
    }

    for (let i = 0; i < 5; i++) {
      this.form[`cargo_proyecto_${i + 1}`].items = this.cargosPrueba;
      this.form[`cargo_${i + 1}`].items = this.cargosPrueba;
    }
  },
  async mounted() {
    this.obtenerVotantes();
  },
  methods: {
    ...mapMutations({
      _logout: "usuario/_logout",
    }),
    ...mapActions({
      _addCanal: "canales/_addCanal",
      _getCanal: "canales/_getCanal",
      _uploadFile: "canales/_uploadFile",
      _getCargos: "miembro_votante/_getCargos",
      _getAvailabilityDay: "miembro_votante/_getAvailabilityDay",
      _getAvailabilityWeek: "miembro_votante/_getAvailabilityWeek",
      _addMiembroVotante: "miembro_votante/_addMiembroVotante",
      _getMiembroVotante: "miembro_votante/_getMiembroVotante",
      _getSector: "miembro_votante/_getSector",
      _getSubGroupCategory: "miembro_votante/_getSubGroupCategory",
      _getProductionRole: "miembro_votante/_getProductionRole",
    }),

    async obtenerVotantes() {
      /*TODO: Condicion para redireccionar segun una echa de cierre */
      // return this.$router.push("/miembro-votante/votar");
      /* 22-02-2024 ya no registra, se redirecciona a votar */
      const response = await this._getMiembroVotante();
      if (response.data.success) {
        this.estado_registro = response.data.success;
        if (response.data.data.email == "pruebas@pruebas.com") {
        }
        this.ALT_("MV-S1", "info", "", null, this.logout);
      }
    },

    subirArchivo(id) {
      document.getElementById(id).click();
    },
    async registroVotante() {
      if (!this.$refs.form.validate()) return;

      if (
        (this.form_uploads.hoja_vida,
        this.form_uploads.foto,
        this.form_uploads.documento)
      ) {
        const hoja_vida = await this.uploadHojaVida();
        const foto = await this.uploadFoto();
        const documento = await this.uploadDocumento();

        if (
          [hoja_vida.status].includes(200) &&
          [foto.status].includes(200) &&
          [documento.status].includes(200)
        ) {
          const data = {
            name: this.form.nombres.value,
            lastName: this.form.apellidos.value,
            email: this.form.email_1.value,

            isFirstTime: this.radioGroupPrimeraVez == "1" ? true : false,
            DatePrevious:
              this.radioGroupPrimeraVez == "2"
                ? new Date(`${this.form.fechaUltimaVez.value}-01-01`)
                : null,
            celPhone: this.form.celular.value,
            document: this.form.documento.value,
            position: this.form.profesion.value,
            occupation: this.form.ocupacion.value,

            channel: this.validarCanal(),
            Projects: this.guardarProyectos(),
            positionRepresentatives: this.guardarCargos(),
            // groupCategoryVoters: this.guardarCategoria(),
            subGroupCategoryVoters: this.guardarSubCategoria(),

            // DOCUMENTOS
            curriculumVitae: hoja_vida.data.data,
            photo: foto.data.data,
            documentFotocopy: documento.data.data,
            //*******//

            userId: CURRTET_USER.id,
            productionSubRoleId: this.role,
            isValidate: false,
            availabilityWeekId: this.form.availability_week.value,
            availabilityDayId: this.form.availability_day.value,
            confidentialityAuthorization:
              this.form.confidentiality_authorization.value,
            sectorId: this.sector,
          };

          const RES = await this._addMiembroVotante({ data });

          if (RES.success)
            setTimeout(() => {
              this.ALT_("MV-SS", "success", "p", this.logout);
            }, 200);
          // this.ALT_("MV-SS", "success", "", location.reload());
          else this.ALT_("CORREO-5", "warning");
        } else {
          this.ALT_("CORREO-04", "warning");
        }
      } else {
        this.ALT_("CORREO-4", "warning");
      }
    },
    alertaGuardar() {
      this.guardarProyectos();
      if (!this.$refs.form.validate()) {
        window.scrollTo({
          top: 600,
          behavior: "smooth",
        });
        return;
      }
      if (this.frames.hoja_vida && this.frames.documento && this.frames.foto) {
        if (this.selectedCategorias.length == 0)
          this.ALT_("CATEGORIAS-1", "warning");
        else this.ALT_("MV-03", "info", "p", this.registroVotante);
      } else {
        this.ALT_("MV-00", "warning");
      }
    },

    async uploadHojaVida() {
      return await this._uploadFile({
        archivo: this.form_uploads.hoja_vida,
        tipo: 5,
      });
    },
    async uploadFoto() {
      return await this._uploadFile({
        archivo: this.form_uploads.foto,
        tipo: 4,
      });
    },
    async uploadDocumento() {
      return await this._uploadFile({
        archivo: this.form_uploads.documento,
        tipo: 3,
      });
    },
    confirm() {
      this.registroVotante();
    },
    cancel() {
      this.ALTD_();
    },

    sumarProyecto() {
      this.proyectos == 5 ? undefined : this.proyectos++;
    },
    restarProyecto() {
      this.proyectos == 1 ? undefined : this.proyectos--;
    },

    sumarCargos() {
      this.cargos == 5 ? undefined : this.cargos++;
    },
    restarCargos() {
      this.cargos == 1 ? undefined : this.cargos--;
    },
    reload() {
      location.reload();
    },
    itemsCargos() {
      return this.cargosPrueba;
      // return [
      //   { cod: "1", text: "Director (a) de contenido" },
      //   { cod: "2", text: "Asistente de dirección" },
      //   { cod: "3", text: "Libretista" },
      //   { cod: "4", text: "Productor (a) general" },
      //   { cod: "5", text: "Productor (a) ejecutivo (a)" },
      //   { cod: "6", text: "Coordinador (a) de producción" },
      //   { cod: "7", text: "Coordinador (a) de posproducción " },
      //   { cod: "8", text: "Productor (a) delegado (a)" },
      //   { cod: "9", text: "Editor (a)" },
      //   { cod: "10", text: "Director (a) de arte" },
      //   { cod: "11", text: "Director (a) de fotografía" },
      //   { cod: "12", text: "Director (a) musical" },
      //   { cod: "13", text: "Posproductor (a) de audio " },
      //   { cod: "14", text: "Gerente" },
      //   { cod: "15", text: "Subgerente" },
      //   { cod: "16", text: "Director (a) creativo (a)" },
      //   { cod: "17", text: "Investigador (a)" },
      //   { cod: "18", text: "Presidente" },
      //   { cod: "19", text: "Vicepresidente de contenido" },
      //   { cod: "20", text: "Vicepresidente de producción" },
      //   { cod: "21", text: "Script" },
      //   { cod: "22", text: "Influenciador (a)" },
      //   { cod: "23", text: "Actor " },
      //   { cod: "24", text: "Actriz" },
      //   { cod: "25", text: "Presentador (a)" },
      //   { cod: "26", text: "Director (a) de casting" },
      //   { cod: "27", text: "Showrunner " },
      //   { cod: "28", text: "Productor (a) en línea " },
      //   { cod: "29", text: "Periodista" },
      //   { cod: "30", text: "Rector" },
      //   { cod: "31", text: "Profesor (a)" },
      //   { cod: "32", text: "Director (a) académico (a)" },
      //   { cod: "33", text: "Crítico (a)" },
      // ];
    },
    itemsCanales() {
      return [
        { id: "Caracol Tv", text: "Caracol TV" },
        { id: "Canal RCN", text: " Canal RCN" },
        { id: "Canal 1", text: "Canal 1" },
        { id: "Señal Colombia", text: "Señal Colombia" },
        { id: "Canal Institucional", text: "Canal Institucional" },
        { id: "RTVCPlay", text: "RTVCPlay" },
        { id: "Teleantioquia", text: "Teleantioquia" },
        { id: "Telemedellín", text: "Telemedellín" },
        { id: "Telecaribe", text: "Telecaribe" },
        { id: "Telepacífico", text: "Telepacífico" },
        { id: "Capital", text: "Capital" },
        { id: "Eureka", text: "Eureka" },
        { id: "Teleislas", text: "Teleislas" },
        { id: "Telecafé", text: "Telecafé" },
        { id: "Canal TRO", text: "Canal TRO" },
        { id: "CityTV", text: "CityTV" },
        { id: "Canal Trece", text: "Canal Trece" },
        { id: "Netflix", text: "Netflix" },
        { id: "HBO Max", text: "HBO Max" },
        { id: "Star +", text: "Star +" },
        { id: "Prime Video", text: "Prime Video" },
        { id: "Disney +", text: "Disney +" },
        { id: "MinTIC", text: "MinTIC" },
        { id: "", text: "Otro. ¿Cuál?" },
      ];
    },

    guardarProyectos() {
      let proyectos = [];
      for (let i = 0; i < 5; i++) {
        if (!this.form[`nombre_proyecto_${i + 1}`].value) break;

        const value = this.form[`cargo_proyecto_${i + 1}`].value;
        const occupationId = this.cargosPrueba.find(
          (cargo, i) => cargo.text === value
        );

        proyectos.push({
          name: this.form[`nombre_proyecto_${i + 1}`].value,
          channel:
            this.form[`canal_${i + 1}`].value == "Otro. ¿Cuál?"
              ? this.form[`otro_${i + 1}`].value
              : this.form[`canal_${i + 1}`].value,
          occupationId: occupationId.cod,
          OtherOccupation:
            this.form[`cargo_proyecto_${i + 1}`].value == "Otro. ¿Cuál?"
              ? this.form[`otro_cargo_proyecto_${i + 1}`].value
              : " ",
          userId: CURRTET_USER.id,
        });
      }
      return proyectos;
    },

    guardarCargos() {
      let cargos = [];
      for (let i = 0; i < 5; i++) {
        if (!this.form[`nombre_empresa_${i + 1}`].value) break;

        const value = this.form[`cargo_${i + 1}`].value;
        const occupationId = this.cargosPrueba.find(
          (cargo, i) => cargo.text === value
        );

        cargos.push({
          companyName: this.form[`nombre_empresa_${i + 1}`].value,
          occupationId: occupationId.cod,
          OtherOccupation:
            this.form[`cargo_${i + 1}`].value == "Otro. ¿Cuál?"
              ? this.form[`otro_cargo_${i + 1}`].value
              : " ",
          dateInital: this.form[`ano_inicio_${i + 1}`].value,
          dateFinal: this.form[`ano_fin_${i + 1}`].value || "0",
          userId: CURRTET_USER.id,
        });
      }

      return cargos;
    },

    guardarCategoria() {
      const categorias = [];
      this.selectedCategorias.forEach((categoriaId) => {
        categorias.push({
          groupCategoryId: categoriaId,
          userId: CURRTET_USER.id,
        });
      });
      return categorias;
    },
    guardarSubCategoria() {
      const categorias = [];
      this.selectedCategorias.forEach((categoriaId, index) => {
        categorias.push({
          groupCategoryId: categoriaId,
          userId: CURRTET_USER.id,
          groupLevelId: index + 1,
        });
      });
      return categorias;
    },

    validarCanal() {
      if (this.radioGroupVinculado == "1") {
        return this.form.canales_productoras.value == "Otro. ¿Cuál?"
          ? (this.form.vinculado.value = this.form.vinculado.value)
          : (this.form.vinculado.value = this.form.canales_productoras.value);
      } else {
        return "No Está Vinculado.";
      }
    },

    logout() {
      this._logout();
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
