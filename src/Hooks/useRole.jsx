import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {
    const {user, loading} = useContext(AuthContext);
    console.log(user)
    const axiosSecure = useAxiosSecure();
    // const [role, setRole] = useState('');
    const {data : role = '', isPending} = useQuery({
        queryKey:['role', user?.email],
        enabled : !loading && !!user?.email,
        queryFn : async() => {
            const {data} = await axiosSecure.get(`/user/${user?.email}`);
            // console.log(data)
            return data.role;
        }

    })

    return [role, isPending];
};

export default useRole;