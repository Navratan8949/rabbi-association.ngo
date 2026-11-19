import axios from "axios";

const getBaseUrl = () => {
  if (typeof window !== "undefined" && window.location) {
    const { hostname } = window.location;
    if (hostname.includes("rabbi.co.in") || hostname.includes("rabbi-association.ngo")) {
      return "https://api.rabbi.co.in/api/v1";
    }
  }

  if (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== "undefined" && window.location.hostname && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return `http://${window.location.hostname}:8000/api/v1`;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Run only in browser
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token"); // adjust key if needed
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
