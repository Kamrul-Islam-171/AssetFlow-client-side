
import Swal from 'sweetalert2'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const AssetTable = ({ assets, isDeleted, setisDeleted, count, refetch, page, setPage, currentPage, setCurrentPage}) => {
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
                    if(assets.length === 1 && currentPage > 1) {
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
                            <th>Product Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Added Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            assets?.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductType}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.Date}</td>
                                <td><button className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Update</button></td>
                                <td><button onClick={() => handleDelete(item._id)} className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetTable;