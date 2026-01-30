import axios from "axios";

const api = axios.create({
    baseURL: "https://memory-hub-wrpt.onrender.com/api"
})

export default api;
