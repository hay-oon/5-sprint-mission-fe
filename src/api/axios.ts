import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5005",
  timeout: 5000,
});
