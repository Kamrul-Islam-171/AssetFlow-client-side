import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Compnents/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/useRole";

const HrRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isPending] = useRole();
    const location = useLocation();



    // console.log(user)
    if (user && role === 'HR') return children;

    if (loading || isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }



    return (
        <Navigate to={'/login'} state={location.pathname}  ></Navigate>
    );
   
};

export default HrRoute;