import postData from "@/axios_res";

export default {
  namespaced: true,
  state: {
    postulaciones: [],
  },
  getters: {
    getPostulacion: (state) => (list) => state[list],
  },
  actions: {
    async _addPostulacion({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          //header: {},
          method: "post",
          url: `Postulation`,
          data,
        });

        if (RES.status == 200) {
          return RES;
        }

        return RES;
      } catch (error) {
        console.error("_addPostulacion", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _editPostulacion({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          //header: {},
          method: "put",
          url: `Postulation`,
          data,
        });

        if (RES.status == 200) {
          return RES;
        }

        return RES;
      } catch (error) {
        console.error("_editPostulacion", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPostulaciones({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/Postulation`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPostulaciones", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    async _getPostulation({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Postulation/Program/${data}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPostulation", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPostulationNoinscritas({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `category/Program/${data}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPostulationNoinscritas", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPagoExist({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Order/paymentExist`,
        });
        return RES;
      } catch (error) {
        console.error("_getPagoExist", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _putPago({ commit }, { id }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Admin/ChangePay/userId/${id}`,
        });
        return RES;
      } catch (error) {
        console.error("_putPago", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPago({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Order`,
        });
        return RES;
      } catch (error) {
        console.error("_getPago", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPagos({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/ChannelOrder`,
        });

        return RES;
      } catch (error) {
        console.error("_getPagos", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPostulations({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Postulation/${data}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPostulation", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _deletePostulation({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "DELETE",
          url: `Postulation/${data}`,
        });

        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_deletePostulation", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _deletePostulationAdmin({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "DELETE",
          url: `Admin/Postulation/${data}`,
        });

        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_deletePostulation", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPostulationsForCategory({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/postulation/category/${data}`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPostulationsForCategory", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPostulationsForProgram({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Postulation/Program/${data}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPostulationsForProgram", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getPostulationsForCategoryComite({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `VotingMember/postulation/category/${data}`,
          data,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getPostulationsForCategoryComite", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
