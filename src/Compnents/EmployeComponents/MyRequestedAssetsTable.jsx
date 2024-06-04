


import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { PDFDownloadLink} from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';


const MyRequestedAssetsTable = ({ assets }) => {
    // let [isOpen, setIsOpen] = useState(false);
    // let [asset, setAsset] = useState(null);
    const { user, loading } = useContext(AuthContext);
    const [isPrint, setIsPrint] = useState(false)
    // const inputtext = useRef();
    const axiosSecure = useAxiosSecure();

    const {data : hrInfo = {}, isLoading} = useQuery({
        queryKey : ['hr-info', user?.email],
        enabled:!loading && !!user?.email,
        queryFn: async() => {
            const {data} = await axiosSecure.get(`/hr-info/${user?.email}`);
            return data;
        }
    })
    console.log(hrInfo)
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

    if(isLoading || loading) return <LoadingSpinner></LoadingSpinner>

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
                                <td>{item.RequestDate}</td>
                                <td>{item.ApprovalDate ? item.ApprovalDate : 'pending'}</td>
                                <td>{item.Request}</td>
                                <td>
                                    {item.Request === 'pending' && <button className='btn'>Cancel</button>}
                                    {item.Request === 'approve' && item.ProductType === 'returnable' && <button className='btn'>Return</button>}
                                    {item.Request === 'approve' && <button className='btn bg-primary-color text-white border-0 hover:text-primary-color hover:bg-white'>
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

