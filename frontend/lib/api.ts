import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api/memories",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;