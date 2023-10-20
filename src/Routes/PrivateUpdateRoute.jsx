import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateUpdateRoute = ({children }) => {
   
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

  
    
    if(loading)
    {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user)
    {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>
     
};

PrivateUpdateRoute.propTypes={
    children: PropTypes.node
}
export default PrivateUpdateRoute;