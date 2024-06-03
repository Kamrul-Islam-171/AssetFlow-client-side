


import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const MyRequestedAssetsTable = ({ assets }) => {
    // let [isOpen, setIsOpen] = useState(false);
    // let [asset, setAsset] = useState(null);
    const {user} = useContext(AuthContext)
    // const inputtext = useRef();
    const axiosSecure = useAxiosSecure();

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
                                <td>{item.ApprovalDate ? item.ApprovalDate:'pending'}</td>
                                <td>{item.Request}</td>
                                <td>action</td>
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

