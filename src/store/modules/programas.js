import postData from "@/axios_res";
import FormData from "form-data";
export default {
  namespaced: true,
  state: {
    programases: [],
  },
  getters: {
    getProgramas: (state) => (list) => state[list],
  },
  mutations: {
    setProgramas(state, data) {
      state[data.list] = data.data;
    },
  },
  actions: {
    async _addProgramas({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Program`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_addProgramas", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getProgramas({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Program/UserId/${data}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getProgramas", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPrograma({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Program/${data}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPrograma", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _deletePrograma({ commit }, id) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "DELETE",
          url: `Program/${id}`,
        });
        if (RES.status == 200) {
          return RES;
        }
        throw RES;
      } catch (error) {
        console.error("_deteleProgramas", error);
        throw error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _editProgramas({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          //header: {},
          method: "put",
          url: `Program`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }

        return RES;
      } catch (error) {
        console.error("_editProgramas", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getAllProgramas({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/program`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getAllProgramas", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
