import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useUser = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: myInfoAsUser = {}, isLoading } = useQuery({
        queryKey:['my-info-as-user', user?.email],
        enabled:!loading && !!user?.email,
        queryFn : async() => {
            const {data} = await axiosSecure(`/my-info/${user?.email}`) ;
            return data;
        }
    })
    return [myInfoAsUser];
};

export default useUser;