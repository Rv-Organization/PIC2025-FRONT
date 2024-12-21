import postData from "@/axios_res";
import FormData from "form-data";
export default {
  namespaced: true,
  state: {
    canales: [],
  },
  getters: {
    getcanal: (state) => (list) => state[list],
  },
  mutations: {
    setCanal(state, data) {
      state[data.list] = data.data;
    },
  },
  actions: {
    async _addCanal({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Channel`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_addCanal", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getCanal({ commit }, { id }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Channel/`,
        });

        return RES;
      } catch (error) {
        console.error("_getCanal", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _uploadFile({ commit }, data) {
      let file = new FormData();
      file.append("file", data.archivo);
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `s3/${data.tipo}`,
          data: file,
        });
        return RES;
      } catch (error) {
        console.error("_uploadFile", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getCanales({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/User`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getCanales", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
