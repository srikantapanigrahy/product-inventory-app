import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";

const api = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.url.includes("/auth/")) return config;

  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey") || APP_CONFIG.API_KEY;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (apiKey) config.headers["x-api-key"] = apiKey;

  return config;
},
 (error) => Promise.reject(error)
);

export default api;
