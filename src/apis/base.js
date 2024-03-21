import axios from "axios";

const DMWAxiosClient = axios.create({
    baseURL: 'http://149.28.159.120:8001',
    headers: {
        "Content-Type": "application/json"
    }
})

DMWAxiosClient.interceptors.request.use(async (config) => config);

export default DMWAxiosClient;