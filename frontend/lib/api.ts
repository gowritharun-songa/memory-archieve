import axios from "axios";

const api = axios.create({
  baseURL: "https://memory-archieve.onrender.com/api/memories",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
