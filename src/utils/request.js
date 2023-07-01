import axios from "axios";
import { Toast } from "vant";
import router from "@/router/index";
const xaxios = axios.create({
  baseURL: "http://tpadmin.test/api",
});

//请求拦截器
xaxios.interceptors.request.use(
  (config) => {
    Toast.loading({
      message: "加载中...",
      duration: 3000,
    });
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 添加响应拦截器
xaxios.interceptors.response.use(
  (response) => {
    // 对响应数据做些处理
    Toast.clear();
    if (response.data.code === 2) {
      Toast.fail({
        message: response.data.msg,
      });
      router.replace("/layout/login");
    }
    return response;
  },
  (error) => {
    // 对响应错误做些处理
    return Promise.reject(error);
  }
);

export default xaxios;
