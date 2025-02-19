import { CURRTET_USER } from "@/global";
const isAuthenticatedGuard = async (to, from, next) => {
  return new Promise(() => {
    if (!CURRTET_USER?.roleId) return next({ path: "/inicio" });
    // if (CURRTET_USER?.roleId == 5) return next();
    if (CURRTET_USER.roleId == 1) return next();
    if (CURRTET_USER.roleId == 7) return next("miembro-votante/votar");
    // else if (CURRTET_USER.roleId == 6) return next();
    // else if (CURRTET_USER.roleId == 4) return next({ path: "/comite-tecnico/panel-comite-tecnico" });
    else if ([2, 5, 6, 3].includes(CURRTET_USER.roleId)) {
      return next({ path: "/publico-general/votar" });
    }
    // else if ([6, 3].includes(CURRTET_USER.roleId)) return next({ path: "/miembro-votante/votar" });
    else next({ path: "/inicio" });
  });
};
export default isAuthenticatedGuard;
