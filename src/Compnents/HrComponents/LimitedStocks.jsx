import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const LimitedStocks = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: limitedStocks = [], isPending } = useQuery({
        queryKey: ['limited-stocks', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/limited-stocks/${user?.email}`);
                return data;
            } catch (error) {
                console.log(error);
                toast.error('something went wrong');
            }
        }
    })


    if (isPending || loading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto mt-20 space-y-10">
            <h1 className="text-4xl text-center">Limited Stocks</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Added Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                limitedStocks?.map((item, idx) => <tr key={item._id}>
                                    <th>{idx + 1}</th>
                                    <td>{item.ProductName}</td>
                                    <td>{item.ProductType}</td>
                                    <td>{item.Date}</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LimitedStocks;