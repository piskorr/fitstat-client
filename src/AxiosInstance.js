import axios from "axios";

var api = axios.create({
  baseURL: "http://localhost:8090/",
});

api.interceptors.request.use(
  (config) => {
    const token = window.accessToken;
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
