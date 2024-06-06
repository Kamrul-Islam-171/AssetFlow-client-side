import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const MyEmployeeTable = ({ myEmployeeList, isDeleted, setisDeleted, count, refetch, page, setPage, currentPage, setCurrentPage }) => {

    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)

    const handleDelete = async (email) => {
        console.log(email)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
               
                try {
                    await axiosSecure.put(`/remove-from-team/${user?.email}`, {userEmail : email});
                    setisDeleted(!isDeleted)
                    refetch()
                    if (myEmployeeList.length === 1 && currentPage > 1) {
                        setCurrentPage(Math.floor(count / 10))
                        setPage(Math.floor(count / 10))
                    }
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }

            }
        });


    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Image</th>
                            <th>Employee Name</th>
                            <th>Member Type</th>
                            <th>Remove from Team</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myEmployeeList?.map((item, idx) => <tr key={item._id}>


                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}

                                </td>
                                <td>Normal Employee</td>
                                <th>
                                    <button onClick={()=>handleDelete(item.email)} className="btn  hover:bg-secondary-color bg-primary-color border-0 text-white ">Remove</button>
                                </th>


                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyEmployeeTable;