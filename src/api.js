import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090/",
  headers: {
    Authorization: "Bearer " + window.accesToken,
    "Content-Type": "application/json,",
  },
});

export default api;
