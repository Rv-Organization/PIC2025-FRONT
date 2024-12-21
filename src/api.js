import { default as axios } from "axios";
import { TOKEN } from "./global";

const uri = "https://app.premiosindiacatalina.com/api/";

const postData = ({ url, data = {}, method = "POST", header = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    let config = {
      data,
      method,
      responseType,
      url: `${uri}${url}`,
      headers: { "access-control-allow-origin": "*", Authorization: "Bearer " + TOKEN },
      validateStatus: (status) => status >= 200 && status < 400,
    };
    axios(config)
      .then((response) => {
        resolve(response.data);
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
        errorConsole("global", error);
        reject(response.message);
      });
  });
};
function errorConsole(form, error, data = null) {
  console.debug("-> Error:", form, error, data);
}
export default postData;
