import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error: ", error);
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["X-Auth-Token"] = jwt ? jwt.token : null;
}

const httpService = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default httpService;
