import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import MyProfile from "../../Compnents/Profile/MyProfile";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";


const Profile = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data:userInfo = {}, isLoading, refetch} = useQuery({
        queryKey:['user-info', user?.email],
        enabled:!loading && !!user?.email,
        queryFn : async() => {
            const {data} = await axiosSecure(`/get-user-info/${user?.email}`)
            return data;
        }
    })

    if(isLoading || loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <MyProfile userInfo={userInfo} refetch={refetch}></MyProfile>
        </div>
    );
};

export default Profile;