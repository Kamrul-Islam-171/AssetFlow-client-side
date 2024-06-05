import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const PendingEmployeeTable = ({ item, refetch, refetch1, refetch2, limitCount, isDeleted, setisDeleted, currentPage, setPage, setCurrentPage, count }) => {
    // const [limit, setLimit] = useState(1);
    const [limit, setLimit] = useState(limitCount?.employeeLimit);
    const [arr, setArr] = useState(Array(item.length).fill(false));
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [slectedCount, isSelectedCount] = useState(0);

    console.log(arr);
    console.log(limit)

    const handleLimit = (e, id, idx) => {

        if (!arr[idx] && e.target.checked) {
            if (limit <= 0) {
                toast.error('Limit Crossed');
                e.target.checked = false;
                return;
            }
            setLimit(limit - 1);
            arr[idx] = e.target.checked;
            isSelectedCount(slectedCount - 1);
        }
        else if (arr[idx] && !e.target.checked) {
            setLimit(limit + 1);
            isSelectedCount(slectedCount + 1);
            arr[idx] = e.target.checked
        }
    }

    const handleSelected = async () => {
        const selectedEmployee = [];
        const newLimit = limit;
        const x = item.map((em, idx) => {
            if (arr[idx]) {
                selectedEmployee.push(em.email);
            }
        })
        // console.log(selectedEmployee)
        try {
            await axiosSecure.put(`/add-selected-employee/${user?.email}`, { selectedEmployee, newLimit });
            // await axiosSecure.patch(`/update-employee-status/${user?.email}`);
            toast.success('Selected Employee add Under Your company')
            setisDeleted(!isDeleted)
            refetch();
            refetch1();
            refetch2();
            if (item.length === 1 && currentPage > 1) {
                setCurrentPage(Math.floor(count / 10))
                setPage(Math.floor(count / 10))
            }

        } catch (error) {
            console.log(error);
            toast.error('Something Wrong')
        }


    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Member Type</th>
                            <th>Add to Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            item?.map((employee, idx) => <tr key={employee._id}>
                                <th>
                                    <label>
                                        <input onClick={(e) => handleLimit(e, employee._id, idx)} type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={employee?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {employee.name}

                                </td>
                                <td>Employee</td>
                                <th>
                                    <button className="btn bg-primary-color text-white border-0 hover:bg-secondary-color">Add</button>
                                </th>
                            </tr>)
                        }


                    </tbody>



                </table>


            </div>

            <div className="flex justify-center mt-10"><button disabled={!slectedCount} onClick={handleSelected} className="btn bg-primary-color text-white border-0 hover:bg-secondary-color">Add Selected Employee</button></div>

        </div>
    );
};

export default PendingEmployeeTable;