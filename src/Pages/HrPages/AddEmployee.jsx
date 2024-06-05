import toast from "react-hot-toast";
import HrDashboard from "../../Compnents/HrComponents/HrDashboard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import NoData from "../../Compnents/NoData/NoData";
import PendingEmployeeTable from "../../Compnents/HrComponents/PendingEmployeeTable";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";


const AddEmployee = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);
    const { data: pendingEmployee = [], isLoading , refetch} = useQuery({
        queryKey: ['pending-employee'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/pending-employee');
            return data;
        }
    })

    const { data: limitCount = [], isLoading:isLoading1, refetch:refetch1 } = useQuery({
        queryKey: ['limit-count', user?.email],
        enabled:!loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/package-limit/${user?.email}`);
            return data;
        }
    })

    // console.log(limitCount)

    if(loading || isLoading || isLoading1) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-center" >

                <HrDashboard limitCount={limitCount}></HrDashboard>

            </div>


            <div className="mt-10">
                {
                    pendingEmployee?.length > 0 ? <>
                        <PendingEmployeeTable item={pendingEmployee} refetch={refetch} refetch1={refetch1} limitCount={limitCount}></PendingEmployeeTable>

                    </> : <NoData></NoData>
                }
            </div>

        </div>
    );
};

export default AddEmployee;