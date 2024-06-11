import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Compnents/LoadingSpinner/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../Hooks/useRole";
import useEmployee from "../Hooks/useEmployee";


const EmployeeRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [myInfoAsEmployee, isLoading] = useEmployee();
    const [role, isPending] = useRole();




    // console.log(user)

    console.log( 'myemp = ', myInfoAsEmployee?.companyLogo)
    if (loading || isPending ) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user  && role === 'employee') return children;


    return (
        <Navigate to={'/login'} state={location.pathname}></Navigate>
    );
};

export default EmployeeRoute;