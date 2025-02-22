import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

// http://localhost:5000

const useAxiosSecure = () => {
    return axiosInstance;
};

export default useAxiosSecure;