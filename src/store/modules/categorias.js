import postData from "@/axios_res";
import FormData from "form-data";
export default {
  namespaced: true,
  state: {
    categorias: [],
  },
  getters: {
    getCategorias: (state) => (list) => state[list],
  },
  mutations: {
    setCategorias(state, data) {
      state[data.list] = data.data;
    },
  },
  actions: {
    async _getCatergorias({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Category`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getCatergorias", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getCatergoriasAdmin({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/postulation/category`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getCatergoriasAdmin", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getCatergoriasComite({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `VotingMember/category`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getCatergoriasComite", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getCatergoriasComiteAdmin({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `VotingMember/category/user/${data}`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getCatergoriasComiteAdmin", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
