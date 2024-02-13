import axios from "axios";

const axiosInstance = axios.create({baseURL:"http://localhost:4000/api"});

// middlewares 
axios.interceptors.response.use(
    (response)=>response,
    (error)=>{Promise.reject(
        (error.response && error.response.data) || "someting went wrong")
        // if response is error return data or "something went wrong"
});

export default axiosInstance;
