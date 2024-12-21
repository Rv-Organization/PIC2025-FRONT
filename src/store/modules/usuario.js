import postData from "@/axios_res";
import postDatav2 from "@/api";

export default {
  namespaced: true,
  state: {
    usuarios: [],
  },
  getters: {
    getusuarios: (state) => (list) => state[list],
  },
  mutations: {
    _logout() {
      sessionStorage.removeItem("current_user");
      if (process.env.NODE_ENV == "production")
        location.href = "https://premiosindiacatalina.com/";
      else location.reload();
    },
    setUsers(state, data) {
      state[data.list] = data.data;
    },
  },
  actions: {
    async _recuperarPassword({ commit }, { data }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Auth/recover-password`,
          data,
        });
        return RES;
      } catch (error) {
        console.error("_recuperarPassword", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _cambioPassword({ commit }, { data }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "POST",
          url: `Auth/change-password`,
          data,
        });
        return RES;
      } catch (error) {
        console.error("_cambioPassword", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _confimarCorreo({ commit }, { data }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          header: {},
          method: "post",
          url: `Auth/TokenConfirm`,
          data,
        });
        return RES;
      } catch (error) {
        console.error("_confimarCorreo", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _addUsuario({ commit }, data) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          header: {},
          method: "post",
          url: `Auth/register`,
          data,
        });
        return RES;
      } catch (error) {
        console.error("_addUsuario", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },

    _login({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("_loadingState", null, { root: true });
        postDatav2({ url: `Auth/login`, method: "POST", data })
          .then((response) => {
            if (response.data.emailConfirm === false) resolve(2);
            else {
              sessionStorage.current_user = btoa(JSON.stringify(response.data));
              location.reload();
            }
          })
          .catch((error) => {
            console.error("_login", error);
            reject(error?.message);
          });
        commit("_loadingState", null, { root: true });
      });
    },

    async _putUsuario({ commit }, {}) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          header: {},
          method: "PUT",
          url: ``,
          data,
        });
        if (RES.status == 200) {
          commit("", { list: "usuarios", data: RES.data });
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_putUsuario", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _deleteUsuario({ commit }, id_Usuario) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "DELETE", url: `` });
        return RES;
      } catch (error) {
        console.error("_deleteUsuario", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getusuarios({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "GET", url: `` });
        if (!RES.msg)
          return commit("setUsuario", { list: "usuarios", data: RES.data });
        return RES;
      } catch (error) {
        console.error("_getusuarios", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getUsuario({ commit }, {}) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({ header: {}, method: "GET", url: `` });
        return RES;
      } catch (error) {
        console.error("_getUsuario", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
    async _getUsuariosAdmin({ commit }) {
      try {
        commit("_loadingState", null, { root: true });
        const RES = await postData({
          method: "GET",
          url: `Admin/channel`,
        });
        if (RES.status == 200) {
          return RES;
        }
        return RES;
      } catch (error) {
        console.error("_getUsuariosAdmin", error);
        return error;
      } finally {
        commit("_loadingState", null, { root: true });
      }
    },
  },
};
