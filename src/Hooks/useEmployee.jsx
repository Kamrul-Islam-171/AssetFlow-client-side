import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useEmployee = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data : myInfoAsEmployee = {}, isLoading} = useQuery({
        queryKey:['my-info-as-employee', user?.email],
        enabled:!loading && !!user?.email,
        queryFn : async() => {
            const {data} = await axiosSecure(`/hr-info-for-me/${user?.email}`) 
            return data;
        }
    })
    return [myInfoAsEmployee];
};

export default useEmployee;