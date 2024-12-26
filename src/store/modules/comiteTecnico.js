import postData from "@/axios_res";
export default {
  namespaced: true,
  state: {
    comiteTecnico: [],
  },
  getters: {
    getComiteTecnico: (state) => (list) => state[list],
  },
  mutations: {
    setComiteTecnico(state, data) {
      state[data.list] = data.data;
    },
  },
  actions: {
    async _addVote({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          //header: {},
          method: "post",
          url: `VotingMember/vote`,
          data,
        });

        if (RES.status == 200) {
          return RES;
        }

        return RES;
      } catch (error) {
        console.error("_addVote", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _consultVote({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          //header: {},
          method: "post",
          url: `VotingMember/ConsultVote`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }

        return RES;
      } catch (error) {
        console.error("_consultVote", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _consultVotesCategory({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          //header: {},
          method: "get",
          url: `VotingMember/vote/category/${data}`,
          data,
        });

        if (RES.status == 200) {
          return RES;
        }

        return RES;
      } catch (error) {
        console.error("_consultVotesCategory", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
