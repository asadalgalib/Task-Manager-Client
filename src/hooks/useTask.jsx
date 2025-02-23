import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext/AuthProvider';

const useTask = () => {
    const axioSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);

    const { data: allTask, isLoading, error, refetch } = useQuery({
        queryKey: ['allTask',user?.email],
        queryFn: async ()=>{
            const res = await axioSecure.get(`/task?email=${user?.email}`);
            return res.data
        }
    });
    return [allTask,isLoading,error,refetch];
};

export default useTask;