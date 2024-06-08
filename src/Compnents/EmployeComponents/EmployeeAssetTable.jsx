import React, { useContext, useRef, useState } from 'react';
import MyModal from './MyModal';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import RequestModal from '../Modal/RequestModal';

const EmployeeAssetTable = ({ assets }) => {
    let [isOpen, setIsOpen] = useState(false);
    let [asset, setAsset] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext)
    const inputtext = useRef();
    const axiosSecure = useAxiosSecure();

    const [info, setInfo] = useState(null);

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
    const handleRequestSubmit = async (item) => {
        // console.log('i am in');
        const modalInfo = {
            HrEmail: asset?.email,
            RequestDate: new Date(),
            ApprovalDate: '',
            RequestAssetId: asset?._id,
            Request: 'pending',
            RName: user?.displayName,
            email: user?.email,
            ProductName: asset?.ProductName,
            ProductType: asset?.ProductType,
            Quantity: asset?.Quantity
        }

        try {
            await axiosSecure.patch(`/increase-request/${asset?._id}`);
            await axiosSecure.post('/asset-request', modalInfo);
            toast.success('Request submitted')
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

       
    }
    const toggleModal = (item) => {
        setInfo(item)

        setShowModal(!showModal);
    };
    
  
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
                                {/* <td><button onClick={() => {
                                    handleRequest(item)
                                    document.getElementById('my_modal_5').showModal();
                                }} disabled={!item.Quantity} className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Request</button></td> */}
                                <td>
                                    <button
                                        onClick={
                                           
                                           ()=> toggleModal(item)
                                        }
                                        className="px-4 py-2 bg-primary-color text-white rounded hover:bg-secondary-color"
                                    >
                                        Request
                                    </button>
                                </td>
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
                                    <input type="text" ref={inputtext} className='border mr-20' />
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={() => handleRequestSubmit(asset)} className="btn">Request</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                }
            </div>

            <RequestModal show={showModal} onClose={toggleModal} info={info} />
        </div>
    );
};

export default EmployeeAssetTable;