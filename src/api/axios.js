import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-api-1-m4ak.onrender.com/api/v1",
  withCredentials: true, 
});

export default api;
