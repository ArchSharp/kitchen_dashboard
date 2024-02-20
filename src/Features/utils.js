import Axios from "axios";
import store from "../Store/store";
import { GetNewToken } from "./kitchenSlice";

const baseURL = "https://f5e2-102-88-63-209.ngrok-free.app/";

export const axios = Axios.create({ baseURL, withCredentials: true });

export const axiosAuth = (refreshToken) => {
  return Axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      Authorization: "Bearer " + refreshToken,
    },
  });
};

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
      const user = store.getState().kitchen.userData;
      await store.dispatch(GetNewToken(user));

      // After getting a new token, retry the original request
      const config = error.config;
      const newToken = store.getState().kitchen.auth.accesstoken;
      config.timeout = 10000;
      config.headers.Authorization = `Bearer ${newToken}`;
      // console.log("config: ", config);

      return Axios(config);
    }
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
