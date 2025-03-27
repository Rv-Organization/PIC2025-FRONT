import { CURRTET_USER } from "@/global";
const isAuthenticatedGuard = async (to, from, next) => {
  return new Promise(() => {
    if (!CURRTET_USER?.roleId) return next({ path: "/inicio" });
    if (CURRTET_USER.roleId == 7) return next("miembro-votante/votar");
    else if ([1, 2, 5, 6, 3].includes(CURRTET_USER.roleId)) {
      return next({ path: "/publico-general/votar" });
    } else next({ path: "/inicio" });
  });
};
export default isAuthenticatedGuard;

export const isAdmin = async (to, from, next) => {
  return new Promise(() => {
    if (CURRTET_USER?.roleId != 4) return next({ path: "/inicio" });
    return next();
  });
};
