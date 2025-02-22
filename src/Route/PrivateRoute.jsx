import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext/AuthProvider';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { loading, user } = useContext(AuthContext);

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-spinner text-primary"></span></div>
    }
    else if (!loading && !user){
        
    }
    else if (user) {
        return children;
    }
    return (
        <div>
            <Navigate state={location.pathname} to={'/task'}></Navigate>
        </div>
    );
};

export default PrivateRoute;