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
          return RES.data;
        }
        return RES;
      } catch (error) {
        console.error("_addMiembroVotante", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getAvailabilityDay({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const response = await postData({
          method: "get",
          url: `AvailabilityDay`,
        });
        if (response.status == 200) {
          return response.data.data;
        }
        throw new Error(response);
      } catch (error) {
        console.error("_getAvailabilityDay", error);
        throw new Error(error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getSubGroupCategory({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const response = await postData({
          method: "get",
          url: `SubGroupCategory`,
        });
        if (response.status == 200) {
          return response.data.data;
        }
        throw new Error(response);
      } catch (error) {
        console.error("_getSubGroupCategory", error);
        throw new Error(error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getProductionRole({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const response = await postData({
          method: "get",
          url: `ProductionRole`,
        });
        if (response.status == 200) {
          return response.data.data;
        }
        throw new Error(response);
      } catch (error) {
        console.error("_getProductionRole", error);
        throw new Error(error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getSector({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const response = await postData({
          method: "get",
          url: `Sector`,
        });
        if (response.status == 200) {
          return response.data.data;
        }
        throw new Error(response);
      } catch (error) {
        console.error("_getSector", error);
        throw new Error(error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getAvailabilityWeek({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const response = await postData({
          method: "get",
          url: `AvailabilityWeek`,
        });
        if (response.status == 200) {
          return response.data.data;
        }
        throw new Error(response);
      } catch (error) {
        console.error("_getAvailabilityWeek", error);
        throw new Error(error);
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPredominancia({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const response = await postData({
          method: "get",
          url: `Predominancia`,
        });
        if (response.status == 200) {
          return response.data.data;
        }
        throw new Error(response);
      } catch (error) {
        console.error("_getPredominancia", error);
        throw new Error(error);
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
