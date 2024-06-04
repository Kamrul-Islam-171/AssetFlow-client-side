


import Swal from 'sweetalert2'

import toast from 'react-hot-toast';
import { format } from "date-fns";


import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AssetRequestTable = ({ assets, isDeleted, setisDeleted, count, refetch, page, setPage, currentPage, setCurrentPage }) => {
    const axiosSecure = useAxiosSecure();

    // console.log(page, currentPage);

    // console.log(assets.length)
    const handleDelete = async (id) => {
        // console.log(id)
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
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
                try {
                    await axiosSecure.delete(`/assetDelete/${id}`);
                    setisDeleted(!isDeleted)
                    refetch()
                    if (assets.length === 1 && currentPage > 1) {
                        setCurrentPage(Math.floor(count / 10))
                        setPage(Math.floor(count / 10))
                    }
                    // console.log('i am count from table = ', count)
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
                            <th></th>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Email of requester</th>
                            <th>Name</th>
                            <th>Request Date</th>
                            <th>Additional note</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            assets?.map((item, idx) => <tr key={item._id}>

                                <th>{idx + 1}</th>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductType}</td>
                                <td>{item.email}</td>
                                <td>{item.RName}</td>
                                <td>{format(item.RequestDate, "MM/dd/yyyy")}</td>
                                <td>not approved</td>
                                <td>{item.Request}</td>
                                <td><button  className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">approve</button></td>
                                {/* <td><Link to={`/asset-update/${item._id}`}><button 
                                    className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Update</button></Link></td> */}
                                <td><button onClick={() => handleDelete(item._id)} className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Reject</button></td>



                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div>


            </div>

        </div>
    );
};

export default AssetRequestTable;

