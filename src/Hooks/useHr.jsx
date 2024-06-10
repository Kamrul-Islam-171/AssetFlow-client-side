import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useHr = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data : hrInformation = {}, isLoading} = useQuery({
        queryKey:['hr-information', user?.email],
        enabled:!loading && !!user?.email,
        queryFn : async() => {
            const {data} = await axiosSecure(`/hr-information/${user?.email}`) 
            return data;
        }
    })
    return [hrInformation];
};

export default useHr;