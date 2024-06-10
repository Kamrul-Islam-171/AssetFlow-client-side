import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';

const MonthlyRequest = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: monthlyRequest = [], isLoading } = useQuery({
        queryKey: ['monthly-request', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/monthly-request/${user?.email}`);
            return data;
        }
    })
    if(isLoading || isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <div className="container mx-auto mt-20 spcae-y-10">
                <h1 className="text-4xl text-center mb-10">My Monthly Requests</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Product type</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                monthlyRequest?.map((item, idx) => <tr key={item._id}>
                                    <th>{idx + 1}</th>
                                    <td>{item.ProductName}</td>
                                    <td>{item.ProductType}</td>

                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MonthlyRequest;