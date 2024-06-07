import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { MdEdit } from "react-icons/md";
import Modal from "../Modal/Modal";

const MyProfile = ({ userInfo, refetch }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    return (
        <div className=" flex justify-center h-screen items-center">
            <div className=" shadow-xl space-y-3 rounded-md py-60 lg:w-[500px] w-[400px] md:w-[500px] flex flex-col items-center">
                <div className="w-[100px] h-[100px] rounded-full ">
                    <img className="w-full h-full object-cover rounded-full" src={userInfo?.image} alt="" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-2xl text-secondary-color">{userInfo?.name} ({userInfo?.role})</h3>
                    <p className="text-gray-500">{userInfo?.email}</p>

                </div>
                <div className="">
                    <button title="update profile" className="mt-4 px-4 py-2 bg-primary-color text-white rounded hover:bg-secondary-color"
                        onClick={openModal}><MdEdit /></button>
                </div>
            </div>

            {/* <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={openModal}
            >
                Open Modal
            </button> */}
            <Modal isVisible={isModalVisible} onClose={closeModal} refetch={refetch}>
                <h2 className="text-2xl font-semibold">Update Your Profile</h2>
                <p className="mt-2">Please fill out the form below:</p>
                <div className="mt-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        name="name"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700">PhotoUrl:</label>
                    <input
                        name="url"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
            </Modal>


        </div>
    );
};

export default MyProfile;