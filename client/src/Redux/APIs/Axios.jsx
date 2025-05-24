import axios from "axios";
import { store } from "../store";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Add a request interceptor
API.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.userLogin?.userInfo?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
