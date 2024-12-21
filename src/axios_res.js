import { default as axios } from "axios";
import { TOKEN, CURRTET_USER } from "./global";
import moment from "moment";

const URI = "https://app.premiosindiacatalina.com/api/"; //Api HTTP teamolorena123
// const URI = "https://localhost:7167/api/"; //Api local

const axiosSc = ({ url, data = {}, method = "POST", header = {}, responseType = "json" }) => {
  // if ([1, 2, 3, 5].includes(CURRTET_USER?.roleId) && moment().format("YYYY-MM-DD").slice(8) != 24) {
  //   sessionStorage.removeItem("current_user");
  //   location.reload();
  // }
  return new Promise((resolve, reject) => {
    let config = {
      url: `${URI}${url}`,
      method,
      data,
      headers: {
        "access-control-allow-origin": "*",
        // "content-type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      responseType,
      validateStatus: function (status) {
        return status >= 200 && status < 400;
      },
    };

    axios(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        let response = { status: -1, message: null };
        if (error.response) {
          response.status = error.response.status;
          response.message = error.response.data;
          response.status == -1;
        } else if (response.request) {
          response.message = error.request;
          response.status == -1;
        } else {
          response.message = error.message;
          response.status == -1;
        }
        error_console("global", error);
        reject({ ...response });
      });
  });
};
function error_console(form, error, data = null) {
  console.debug("-> Error:", form, error, data);
}
export default axiosSc;
