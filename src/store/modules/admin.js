import postData from "@/axios_res";
import postDatav2 from "@/api";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    _getMiembroVotantes({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postData({
          url: `Admin/Voter`,
          method: "GET",
          data,
        })
          .then((response) => {
            response.data.success
              ? resolve(response.data.data)
              : reject(response.data.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    async _postAceptarVotante({ commit }, item) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `admin/Voter/Validate?userId=${item.userId}`,
          data: item.categoriesId,
        });
        return RES;
      } catch (error) {
        console.error("_postAceptarVotante", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    _revisarVotante({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postData({
          url: `admin/Voter/Revise?userId=${id}`,
          method: "POST",
        })
          .then((response) => {
            response.data.success
              ? resolve("Miembro revisado")
              : reject(response.data.message);
          })
          .catch((error) => console.error(error));
        commit("_loadingState", null, { root: true });
      });
    },
    _getCategoryMember({ commit }, categoryId) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postData({
          url: `admin/Voter/Category?categoryId=${categoryId}`,
          method: "GET",
        })
          .then((response) => {
            response.data.success
              ? resolve(response.data.data)
              : reject(response.data.message);
          })
          .catch((error) => console.error(error));
        commit("_loadingState", null, { root: true });
      });
    },
    _deleteGroupCategory({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postData({
          url: `GroupCategory?id=${id}`,
          method: "DELETE",
        })
          .then((response) => {
            response.data.success
              ? resolve(response.data.data)
              : reject(response.data.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    _agregarGroupCategory({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postData({
          url: `GroupCategory`,
          method: "POST",
          data,
        })
          .then((response) => {
            response.data.success
              ? resolve(response.data.data)
              : reject(response.data.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    _getCategoryMemberCount({ commit }) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postData({
          url: `admin/Category/CountVoter`,
          method: "GET",
        })
          .then((response) => {
            response.data.success
              ? resolve(response.data.data)
              : reject(response.data.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    _cambiarCategorias({ commit }, item) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postData({
          url: `admin/Voter/ReviseCategory?userId=${item.userId}`,
          method: "POST",
          data: item.categoriesId,
        })
          .then((response) => {
            response.data.success
              ? resolve("Categorias cambiadas correctamente")
              : reject(response.data.message);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    async _rechazarVotante({ commit }, id) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `admin/Voter/Rejection?userId=${id}`,
        });
        return RES;
      } catch (error) {
        console.error("_rechazarVotante", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _eliminarVotante({ commit }, id) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          url: `admin/Voter/Delete?userId=${id}`,
          method: "DELETE",
        });
        return RES;
      } catch (error) {
        console.error("_eliminarVotante", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getMiembrosComite({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/VotingMember`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getMiembrosComite", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getConteos({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `VotingMember/CountVotes`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getConteos", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _consultVotesCategoryAdmin({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          //header: {},
          method: "get",
          url: `VotingMember/${data.userId}/vote/category/${data.id}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_consultVotesCategoryAdmin", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    // async _consultResultadoVotos({ commit }) {
    //   try {
    //     commit("_loadingState", null, { root: true });
    //     const RES = await postData({
    //       //header: {},
    //       method: "get",
    //       url: `admin/ResultVote`,
    //     });
    //     if (RES.status == 200) {
    //       return RES;
    //     }
    //     return RES;
    //   } catch (error) {
    //     console.error("_consultResultadoVotos", error);
    //     return error;
    //   } finally {
    //     commit("_loadingState", null, { root: true });
    //   }
    // },
    async _consultResultadoVotos({ commit }) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postDatav2({ method: "get", url: `Report` })
          .then((response) => {
            response.data.length && resolve(response.data);
            reject("No existen registros");
          })
          .catch((error) => {
            reject(error);
            console.error("_consultResultadoVotos", error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    async _reportVoter({ commit }) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postDatav2({ method: "get", url: `Report/voter` })
          .then((response) => {
            response.data.length && resolve(response.data);
            reject("No existen registros");
          })
          .catch((error) => {
            reject(error);
            console.error("_consultResultadoVotos", error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    async _consultResultadoVotosV2({ commit }) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postDatav2({ method: "get", url: `Report/Qualification` })
          .then((response) => {
            response.data.length && resolve(response.data);
            reject("No existen registros");
          })
          .catch((error) => {
            reject(error);
            console.error("_consultResultadoVotosV2", error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    async _getResultadoVotosCuradores({ commit }) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postDatav2({ method: "get", url: `Report/QualificationCuratorial` })
          .then((response) => {
            response.data.length && resolve(response.data);
            reject("No existen registros");
          })
          .catch((error) => {
            reject(error);
            console.error("_getResultadoVotosCuradores", error);
          });
        commit("_loadingState", null, { root: true });
      });
    },
    async _consultVotacionMiembrosVotantes({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "get",
          url: `admin/VotesMemberCount`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_consultVotacionMiembrosVotantes", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
