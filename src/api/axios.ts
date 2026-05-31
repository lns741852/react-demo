import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";
import { getToken } from "../utils/user-token";

const instance = axios.create({
  baseURL: "",
  timeout: 10 * 1000,
}) as RequestInstance; //Promise<AxiosResponse<T>> 轉換成 Promise<T>

// request 攔截
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// response 攔截
instance.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data || {};

    if (code !== 200) {
      return Promise.reject(msg || "Error");
    }

    return data;
  },
  (error) => {
    message.error(error.message || "Network Error");
    return Promise.reject(error);
  },
);

export default instance;

interface RequestInstance extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
