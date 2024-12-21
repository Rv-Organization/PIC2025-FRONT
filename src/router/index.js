import Vue from "vue";
import VueRouter from "vue-router";
import isAuthenticatedGuard from "./auth-guard.js";
import isValidCanal from "./validarCanal";

Vue.use(VueRouter);
const TITLE = "PIC2024";
const routes = [
  {
    path: "*",
    redirect: "/ingreso",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
    meta: {
      requiresAuth: true || false,
      title: `${TITLE} - Error - 404`,
    },
  },
  {
    path: "/",
    redirect: "/ingreso",
  },
  {
    path: "/ingreso",
    name: "ingreso",
    component: () => import("../views/Ingreso.vue"),
    meta: {
      requiresAuth: false,
      title: `${TITLE} - Ingreso`,
    },
  },
  {
    path: "/validar-correo/:email/:token",
    name: "validar-correo",
    component: () => import("../views/ValidarCorreo.vue"),
    meta: {
      requiresAuth: false,
      title: `${TITLE} - Validar correo`,
    },
  },
  {
    path: "/admin/panel-administrativo",
    // beforeEnter: isAuthenticatedGuard,
    component: () => import("../views/admin/Inicio.vue"),
    children: [
      {
        path: "/admin/panel-administrativo",
        name: "admin/panel-administrativo",
        component: () => import("../views/admin/PanelAdministrativo.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
      {
        path: "/admin/categorias",
        name: "admin/categorias",
        component: () => import("../views/admin/Categorias.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Categorias`,
        },
      },
      {
        path: "/admin/categorias/postulaciones",
        name: "admin/categorias/postulaciones",
        component: () => import("../views/admin/PostulacionPorCategorias.vue"),
        props: { newsletterPopup: false },
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Postulaciones`,
        },
      },
      {
        path: "/admin/categorias/docunmentos",
        name: "admin/categorias/docunmentos",
        component: () => import("../views/admin/DocumentosCanal.vue"),
        props: { newsletterPopup: false },
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Documentos`,
        },
      },
      {
        path: "/admin/categorias/miembros",
        name: "admin/categorias/miembros",
        component: () => import("../views/admin/MiembrosPorCategoria.vue"),
        props: { newsletterPopup: false },
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Miembros`,
        },
      },
      {
        path: "/admin/postulacion",
        name: "admin/postulacion",
        component: () => import("../views/admin/Postulacion"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Postulacion`,
        },
      },
      {
        path: "/admin/usuarios",
        name: "admin/usuarios",
        component: () => import("../views/admin/Usuarios.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Usuarios`,
        },
      },
      {
        path: "/admin/pagos",
        name: "admin/pagos",
        component: () => import("../views/admin/Pagos.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Pagos`,
        },
      },
      {
        path: "/admin/excel",
        name: "admin/excel",
        component: () => import("../views/admin/ExportarExcel.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - generar informes`,
        },
      },
      {
        path: "/admin/miembros-votates",
        name: "admin/miembros-votates",
        component: () => import("../views/admin/MiembrosVotantes.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
      {
        path: "/admin/miembros-votates-getion",
        name: "admin/miembros-votates-getion",
        component: () => import("../views/admin/MiembrosVotantesGestion.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
      {
        path: "/admin/miembros-categoria",
        name: "admin/miembros-categoria",
        component: () => import("../views/admin/CategoriaUsuario.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Categorias por usuario`,
        },
      },
      {
        path: "/admin/miembros-comite-tecnico",
        name: "admin/miembros-comite-tecnico",
        component: () => import("../views/admin/MiembrosComiteTecnico.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
      {
        path: "/admin/categorias/comite-tecnico",
        name: "admin/categorias/comite-tecnico",
        component: () => import("../views/admin/CategoriasComiteTecnico.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
      {
        path: "/admin/postulados/comite-tecnico",
        name: "admin/postulados/comite-tecnico",
        component: () => import("../views/admin/Postulados.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
      {
        path: "/admin/editar-postulacion",
        name: "admin/editar-postulacion",
        component: () => import("../views/admin/EditarPostulacion.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Administración`,
        },
      },
    ],
  },
  {
    path: "/comite-tecnico/panel-comite-tecnico",
    component: () => import("../views/comite-tecnico/Inicio.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/comite-tecnico/panel-comite-tecnico",
        name: "/comite-tecnico/panel-comite-tecnico",
        component: () => import("../views/comite-tecnico/PanelComiteTecnico.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Inicio`,
        },
      },
      {
        path: "/comite-tecnico/instrucciones",
        name: "/comite-tecnico/intrucciones",
        component: () => import("../views/comite-tecnico/Instrucciones.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Instrucciones`,
        },
      },
      {
        path: "/comite-tecnico/sugerencias",
        name: "/comite-tecnico/sugerencias",
        component: () => import("../views/comite-tecnico/Sugerencias.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - sugerencias`,
        },
      },
      {
        path: "/comite-tecnico/categorias/postulados",
        name: "/comite-tecnico/categorias/postulados",
        component: () => import("../views/comite-tecnico/Postulados.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Postulaciones`,
        },
      },
      {
        path: "/comite-tecnico/detalle-postulacion",
        name: "/comite-tecnico/detalle-postulacion",
        component: () => import("../views/comite-tecnico/DetallePostulacion.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Detalle Postulacion`,
        },
      },
    ],
  },
  {
    path: "/miembro-votante/home",
    component: () => import("../views/miembro-votante/Inicio.vue"),
    meta: {
      requiresAuth: true,
      title: `${TITLE} - home`,
    },
    children: [
      {
        path: "/miembro-votante/reglamento",
        name: "/miembro-votante/reglamento",
        component: () => import("../views/miembro-votante/Reglamento.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - reglamento`,
        },
      },
      {
        path: "/miembro-votante/votar",
        name: "/miembro-votante/votar",
        component: () => import("../views/miembro-votante/Votar.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - votar`,
        },
      },
      {
        path: "/miembro-votante/registro",
        name: "/miembro-votante/registro",
        component: () => import("../views/miembro-votante/RegistroVotante.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - registro`,
        },
      },
      {
        path: "/miembro-votante/sugerencia",
        name: "/miembro-votante/sugerencia",
        component: () => import("../views/miembro-votante/SugerenciaVotante.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - sugerencia`,
        },
      },
      {
        path: "/miembro-votante/instrucciones",
        name: "/miembro-votante/instrucciones",
        component: () => import("../views/miembro-votante/InstruccionesVotante.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - instrucciones`,
        },
      },
      {
        path: "/miembro-votante/instruccionesM",
        name: "/miembro-votante/instruccionesM",
        component: () => import("../views/miembro-votante/InstruccionesVotanteM.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - instrucciones`,
        },
      },
      {
        path: "/miembro-votante/postulados",
        name: "/miembro-votante/postulados",
        component: () => import("../views/miembro-votante/Postulados.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - instrucciones`,
        },
      },
    ],
  },
  {
    path: "/publico-general/home",
    component: () => import("../views/publico-general/Inicio.vue"),
    meta: {
      requiresAuth: true,
      title: `${TITLE} - home`,
    },
    children: [
      {
        path: "/publico-general/reglamento",
        name: "/publico-general/reglamento",
        component: () => import("../views/publico-general/Reglamento.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - reglamento`,
        },
      },
      {
        path: "/publico-general/votar",
        name: "/publico-general/votar",
        component: () => import("../views/publico-general/Votar.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Votaciones`,
        },
      },
      {
        path: "/publico-general/registro",
        name: "/publico-general/registro",
        component: () => import("../views/publico-general/RegistroVotante.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - registro`,
        },
      },
      {
        path: "/publico-general/sugerencia",
        name: "/publico-general/sugerencia",
        component: () => import("../views/publico-general/SugerenciaVotante.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - sugerencia`,
        },
      },
      {
        path: "/publico-general/instrucciones",
        name: "/publico-general/instrucciones",
        component: () => import("../views/publico-general/InstruccionesVotante.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - instrucciones`,
        },
      },
      {
        path: "/publico-general/instruccionesM",
        name: "/publico-general/instruccionesM",
        component: () => import("../views/publico-general/InstruccionesVotanteM.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - instrucciones`,
        },
      },
      {
        path: "/publico-general/postulados",
        name: "/publico-general/postulados",
        component: () => import("../views/publico-general/Postulados.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Postulaciones`,
        },
      },
    ],
  },
  {
    path: "/postulantes/registro-canal",
    beforeEnter: isAuthenticatedGuard,
    component: () => import("../views/postulantes/Inicio.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/postulantes/registro-canal",
        name: "/postulantes/registro-canal  ",
        component: () => import("../views/postulantes/RegistroCanal.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Registro de canal`,
        },
      },
      {
        path: "/postulantes/resumen-produccion",
        name: "/postulantes/resumen-produccion",
        beforeEnter: isValidCanal,
        component: () => import("../views/postulantes/ResumenProgramas.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Resumen programa`,
        },
      },
      {
        path: "/postulantes/registro-produccion",
        name: "/postulantes/registro-produccion",
        beforeEnter: isValidCanal,
        component: () => import("../views/postulantes/RegistroProgramas.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Registro programa`,
        },
      },
      {
        path: "/postulantes/registro-postulacion",
        name: "/postulantes/registro-postulacion",
        component: () => import("../views/postulantes/RegistroPostulacion.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Registro postulación`,
        },
      },
      {
        path: "/postulantes/registro-talento",
        name: "/postulantes/registro-talento",
        component: () => import("../views/postulantes/RegistroTalento.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - Registro postulación`,
        },
      },
      {
        path: "/postulantes/reglamento",
        name: "/postulantes/reglamento",
        component: () => import("../views/postulantes/Reglamento.vue"),
        meta: {
          requiresAuth: true,
          title: `${TITLE} - reglamento`,
        },
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const auth = sessionStorage.current_user;
  document.title = to.meta.title;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const CURRTET_USER = auth ? JSON.parse(atob(auth)) : null;

  if (requiresAuth && !CURRTET_USER) next("Ingreso");
  else if (!requiresAuth && CURRTET_USER && CURRTET_USER.Roleld == "1") {
    next("Ingreso");
  } else if (!requiresAuth && CURRTET_USER && CURRTET_USER.roleId == "4") {
    next("admin/panel-administrativo");
  } else if (!requiresAuth && CURRTET_USER && CURRTET_USER.roleId == "5") {
    next("miembro-votante/registro");
  } else if (!requiresAuth && CURRTET_USER && to.path !== "/postulantes/registro-canal") {
    next("/postulantes/registro-canal");
  } else next();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;
