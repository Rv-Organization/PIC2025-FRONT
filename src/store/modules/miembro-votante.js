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
    async _addMiembroVotante({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Voter`,
          data: data.data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_addMiembroVotante", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getMiembroVotante({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Voter`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getMiembroVotante", error);
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

    async _getCategoriasMimbroVotante({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `VotingMember/postulation/category`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getCategoriasMimbroVotante", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getCategoriasIberoAmericano({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ method: "GET", url: `category` });
        return RES;
      } catch (error) {
        console.error("_getCategoriasMimbroVotante", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getPublicoGeneral({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Public/postulation/category`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPublicoGeneral", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _sendVote({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `VotingMember/vote`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_sendVote", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _sendVotePublico({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Vote`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_sendVote", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getVotePublico({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Vote/List`,
          data,
        });

        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_sendVote", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getVotos({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Vote/List`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getVotos", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getVotosPorCategoria({ commit }, id_categoriia) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `VotingMember/vote/category?categoryId=${id_categoriia}`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getVotos", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getCargos({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Occupation`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getCargos", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getCriteriosPorCategoria({ commit }, id_category) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `CategoryCriteria/List?categoryId=${id_category}`,
        });
        if (RES.status == 200) {
          return RES.data.data;
        }
        return RES;
      } catch (error) {
        console.error("_getCriteriosPorCategoria", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
