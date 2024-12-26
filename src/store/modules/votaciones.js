import postData from "@/axios_res";

export default {
  namespaced: true,
  state: {
    Votacioneses: [],
  },
  getters: {
    getVotaciones: (state) => (list) => state[list],
  },
  mutations: {
    setVotaciones(state, data) {
      state[data.list] = data.data;
    },
  },
  actions: {
    async _addVotacion({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `VotingMember/VotingClosed/?categoryId=${data}`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_addVotacion", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _terminarVotacion({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `VotingMember/VotingEnd`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_terminarVotacion", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getVotaciones({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `VotingMember/VotingEnd`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getVotaciones", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _sendSugerencia({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Suggestion`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_sendSugerencia", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
