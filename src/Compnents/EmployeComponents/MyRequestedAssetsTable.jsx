


import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import { format, compareAsc } from "date-fns";
import Swal from 'sweetalert2';


const MyRequestedAssetsTable = ({ assets, refetch, isDeleted, setIsDeleted, count, page, setPage, currentPage, setCurrentPage }) => {
    // let [isOpen, setIsOpen] = useState(false);
    // let [asset, setAsset] = useState(null);

    const { user, loading } = useContext(AuthContext);
    const [isPrint, setIsPrint] = useState(false)
    // const inputtext = useRef();
    const axiosSecure = useAxiosSecure();

    const { data: hrInfo = {}, isLoading } = useQuery({
        queryKey: ['hr-info', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/hr-info/${user?.email}`);
            return data;
        }
    })
    // console.log(hrInfo)

    const handleReturn = async (item, idx) => {
        // console.log(item);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Return it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                await axiosSecure.put(`/return-my-asset/${item._id}`);
                await axiosSecure.patch(`/asset-count-increase-for-return/${item.RequestAssetId}`)
                Swal.fire({
                    title: "Returned!",
                    text: "Your item has been returned.",
                    icon: "success"
                });
                refetch();
            }
        });


    }

    const handleDelete = async (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                await axiosSecure.delete(`/cancel-request/${id}`)
                setIsDeleted(!isDeleted);
                if (assets.length === 1 && currentPage > 1) {
                    setCurrentPage(Math.floor(count / 10))
                    setPage(Math.floor(count / 10))
                }
                Swal.fire({
                    title: "Returned!",
                    text: "Your item has been returned.",
                    icon: "success"
                });
                refetch();
            }
        });
    }

    // const [asset, setAsset] = useState({});

    // const handleRequest = (item) => {
    //     setIsOpen(true)
    //     setAsset(item);

    // }
    // const handleRequestSubmit = async() => {
    //     console.log('i am in');
    //     const modalInfo = {
    //         HrEmail : asset?.email,
    //         RequestDate : new Date(),
    //         RequestAssetId : asset?._id,
    //         Request:'pending',
    //         email : user?.email,
    //         ProductName : asset?.ProductName,
    //         ProductType : asset?.ProductType,
    //         Quantity : asset?.Quantity
    //     }

    //     try {
    //         await axiosSecure.post('/asset-request', modalInfo);
    //         toast.success('Request submitted')
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.message);
    //     }



    // }
    // const handlePrint = (item) => {
    //     setAsset(item);
    // }

    // console.log(asset)

    if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>

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
                            <th>Request Date</th>
                            <th>Approval Date</th>
                            <th>Request Status</th>
                            <th>Action</th>
                            {/* <th>Request an Asset</th> */}

                        </tr>
                    </thead>
                    <tbody>

                        {
                            assets?.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductType}</td>
                                <td>{format(item.RequestDate, "MM/dd/yyyy")}</td>
                                <td>{item.ApprovalDate ? format(item.ApprovalDate, "MM/dd/yyyy") : ''}</td>
                                <td>{item.Request}</td>
                                <td>
                                    {item.Request === 'pending' && <button onClick={() => handleDelete(item._id)} className='btn bg-primary-color text-white border-0 hover:text-primary-color hover:bg-white'>Cancel</button>}
                                    {item.Request === 'approve' && item.ProductType === 'returnable' && <button disabled={item.ReturnStatus} onClick={() => handleReturn(item, idx)} className='btn bg-primary-color text-white border-0 hover:text-primary-color hover:bg-white mr-2'>Return</button>}
                                    {item.Request === 'approve' && <button disabled={item.ReturnStatus} className='btn bg-primary-color text-white border-0 hover:text-primary-color hover:bg-white'>
                                        <PDFDownloadLink document={<MyDocument asset={item} hrInfo={hrInfo} />} fileName="example.pdf">
                                            {({ blob, url, loading, error }) =>
                                                loading ? 'Loading document...' : 'Print'
                                            }
                                        </PDFDownloadLink>

                                    </button>}
                                </td>
                                {/* <td>{item.Quantity > 0 ? 'Available' : 'Out Of Stcok'}</td> */}


                            </tr>)
                        }

                    </tbody>
                </table>


            </div>

        </div>
    );
};

export default MyRequestedAssetsTable;

