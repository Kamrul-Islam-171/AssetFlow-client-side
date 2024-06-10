import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


const FivePendingRequests = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: fiveRequests = [], isPending } = useQuery({
        queryKey: ['five-pending-request', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/five-pending-request/${user?.email}`);
                return data;
            } catch (error) {
                console.log(error);
                toast.error('something went wrong');
            }
        }
    })

    if (isPending || loading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto mt-16 space-y-10">
            <h1 className="text-4xl text-center">Pending Requests</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Requester Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fiveRequests?.map((item, idx) => <tr key={item._id}>
                                    <th>{idx + 1}</th>
                                    <td>{item.ProductName}</td>
                                    <td>{item.ProductType}</td>
                                    <td>{item.email}</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FivePendingRequests;