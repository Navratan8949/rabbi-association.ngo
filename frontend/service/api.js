import axios from "axios";

export const getBaseUrl = () => {
  // 1. Browser context (Client-Side)
  if (typeof window !== "undefined" && window.location) {
    const { hostname, protocol } = window.location;
    if (hostname.includes("rabbi.co.in") || hostname.includes("rabbi-association.ngo")) {
      return "https://api.rabbi.co.in/api/v1";
    }
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `${protocol}//${hostname}:8000/api/v1`;
    }
  }

  // 2. Server context (Next.js SSR / Build)
  if (process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  }

  if (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (process.env.NODE_ENV === "production") {
    return "https://api.rabbi.co.in/api/v1";
  }

  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.baseURL = getBaseUrl();
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
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
