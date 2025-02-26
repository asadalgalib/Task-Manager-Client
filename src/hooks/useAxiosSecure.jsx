import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://task-server-delta-wheat.vercel.app/"
})

// http://localhost:5000
// https://task-server-delta-wheat.vercel.app/

const useAxiosSecure = () => {
    return axiosInstance;
};

export default useAxiosSecure;