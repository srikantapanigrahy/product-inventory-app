import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";

const api = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Allow login and signup without JWT
    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/signup")
    ) {
      return config;
    }

    // 🔥 But DO NOT skip /auth/google
    // Because we MUST send Firebase ID token to backend

    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey") || APP_CONFIG.API_KEY;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (apiKey) config.headers["x-api-key"] = apiKey;

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
