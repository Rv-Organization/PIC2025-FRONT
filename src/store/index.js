import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

import admin from "./modules/admin.js";
import usuario from "./modules/usuario.js";
import canales from "./modules/canales.js";
import votaciones from "./modules/votaciones";
import programas from "./modules/programas.js";
import categorias from "./modules/categorias.js";
import postulacion from "./modules/postulacion.js";
import comiteTecnico from "./modules/comiteTecnico.js";
import miembro_votante from "./modules/miembro-votante";

export default new Vuex.Store({
  modules: {
    admin,
    usuario,
    canales,
    programas,
    votaciones,
    categorias,
    postulacion,
    comiteTecnico,
    miembro_votante,
  },
  state: {
    loading: false,
  },
  getters: {
    _stateLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    _loadingState(state) {
      state.loading = !state.loading;
    },
  },
  actions: {},
});
