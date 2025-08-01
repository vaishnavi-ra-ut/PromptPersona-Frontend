import axios from "axios";

const API = axios.create({
  baseURL: "https://promptpersona-backend.onrender.com/api",
  withCredentials: true, // for cookie-based auth
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
