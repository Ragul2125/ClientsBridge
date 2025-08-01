import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  timeout: 10000,
});

console.log(`${import.meta.env.VITE_BACKEND_URL}/api`);

// Add interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// You can also add a response interceptor to handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href(error.response.data.redirect);
      console.error("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
