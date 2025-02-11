import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true,
})

export default axiosInstance