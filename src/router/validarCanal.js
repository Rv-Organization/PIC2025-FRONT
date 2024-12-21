import { CURRTET_USER } from "@/global";
import postData from "@/axios_res";

const isValidCanal = async (to, from, next) => {
  const data = await consultarCanal();
  return new Promise(() => {
    if (data?.data) {
      return next();
    } else if (data?.message?.data) {
      return next();
    } else {
      next({ path: "/postulantes/registro-canal" });
    }
  });
};
const consultarCanal = async () => {
  try {
    const RES = await postData({
      method: "GET",
      url: `Channel/`,
    });

    return RES;
  } catch (error) {
    console.error("_getCanal", error);
    return error;
  }
};
export default isValidCanal;
