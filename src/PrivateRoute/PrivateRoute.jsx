import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import PropTypes from 'prop-types'; // ES6
import { AuthContext } from "../Provider/AuthProvider";
import LoadingSpinner from "../Compnents/LoadingSpinner/LoadingSpinner";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();


    // console.log(user)
    if (user) return children;

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }



    return (
        <Navigate to={'/login'} state={location.pathname}  ></Navigate>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;