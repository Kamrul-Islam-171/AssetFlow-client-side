import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Modal = ({ isVisible, onClose, children, refetch }) => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    if (!isVisible) return null;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image  = e.target.url.value;
        const info = {name, image};
        
        try {
            const {data} = await axiosSecure.put(`/profile-update/${user?.email}`, info);
            console.log(data);

            refetch();
            toast.success('Profile Updated');


            onClose();
        } catch (error) {
            console.log(error);
            toast.error('somthing wrong');
            onClose();
        }
        
        
        // onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          {children}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-primary-color text-white rounded hover:bg-secondary-color"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    );
};

export default Modal;