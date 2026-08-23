import axios from "axios";

export const axiosInstance = axios.create({
    // If we are in a development mode then our localhost url will be work if you are in production mode then our back end URL work
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});