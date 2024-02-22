import Axios from "axios";
import { GetNewToken } from "./kitchenSlice";

export const baseURL = "https://c58a-102-88-33-103.ngrok-free.app/";

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

export const setupAxiosInterceptors = (dispatch) => {
  axiosWithAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem("accesstoken");
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
        dispatch(GetNewToken());
        const newToken = localStorage.getItem("accesstoken");
        const config = error.config;
        config.timeout = 10000;
        config.headers.Authorization = `Bearer ${newToken}`;
        // Dispatch action to get new token
        return Axios(config);
      }
      return Promise.reject(error);
    }
  );
};

export default axiosWithAuth;
