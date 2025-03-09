import axios from "axios";

const API_BASE_URL = window.env.API_BASE_URL || "http://localhost:8000/api/";

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const getAuthToken = () => localStorage.getItem("token");

apiService.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]');

    if (csrfToken) {
        config.headers["X-CSRF_TOKEN"] = csrfToken.getAttribute("content");
    }

    return config;
});

export default apiService;
