import Axios from "axios";
import store from "../Store/store";

const baseURL = "https://localhost:3000/";

export const axios = Axios.create({ baseURL, withCredentials: true });

const axiosWithAuth = Axios.create();

axiosWithAuth.interceptors.request.use((config) => {
  const token = store.getState().kitchen.auth.accesstoken;
  config.baseURL = baseURL;
  config.timeout = 10000;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosWithAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response && error.response.status === 401) {
      //   var msg = {
      //     showAlert: true,
      //     content: "Token has expired, please sign in to continue",
      //   };
      //   await store.dispatch(setShowAlert(msg));
      //   await store.dispatch(setISAuth(false));

      // After getting a new token, retry the original request
      //   const config = error.config;
      //   const newToken = store.getState().user.token;
      //   config.timeout = 15000;
      //   config.headers.Authorization = `Bearer ${newToken}`;
      //   console.log("config: ", config);

      //   return Axios(config);
      return null;
    }
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
