import React, { useContext, useRef, useState } from 'react';
import MyModal from './MyModal';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const EmployeeAssetTable = ({ assets }) => {
    let [isOpen, setIsOpen] = useState(false);
    let [asset, setAsset] = useState(null);
    const {user} = useContext(AuthContext)
    const inputtext = useRef();
    const axiosSecure = useAxiosSecure();

    // function open() {
    //     setIsOpen(true)
    // }

    // function close() {
    //     setIsOpen(false)
    // }
    const handleRequest = (item) => {
        setIsOpen(true)
        setAsset(item);
        
    }
    const handleRequestSubmit = async() => {
        console.log('i am in');
        const modalInfo = {
            HrEmail : asset?.email,
            RequestDate : new Date(),
            ApprovalDate : '',
            RequestAssetId : asset?._id,
            Request:'pending',
            email : user?.email,
            ProductName : asset?.ProductName,
            ProductType : asset?.ProductType,
            Quantity : asset?.Quantity
        }

        try {
            await axiosSecure.post('/asset-request', modalInfo);
            toast.success('Request submitted')
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        
        // console.log(modalInfo)
// 
    }
    // const hell = e => {
    //     e.preventDefault();
    //     console.log(e.target[0].value);
    //     console.log('i am k')
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
                            <th>Availablity</th>
                            <th>Request an Asset</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            assets?.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductType}</td>
                                <td>{item.Quantity > 0 ? 'Available' : 'Out Of Stcok'}</td>
                                <td><button onClick={() => {
                                    handleRequest(item)
                                    document.getElementById('my_modal_5').showModal();
                                }} disabled={!item.Quantity} className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Request</button></td>

                            </tr>)
                        }

                    </tbody>
                </table>
                {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            </div>
            <div>
                {
                    isOpen && <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">{asset.email}</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                <form method="dialog" >
                                    <input type="text" ref={inputtext}  className='border mr-20' />
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={handleRequestSubmit}  className="btn">Request</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                }
            </div>
        </div>
    );
};

export default EmployeeAssetTable;