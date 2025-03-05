import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 攔截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 從 localStorage 獲取 token（如果有的話）
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 攔截器
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 處理未授權的情況
      localStorage.removeItem("token");
      // 可以在這裡添加重定向到登入頁面的邏輯
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
