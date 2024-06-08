import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";


const RequestModal = ({ show, onClose, info: asset }) => {

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    if (!show) return null;


    const handleSubmit = async(event) => {
        event.preventDefault();
        const Note = event.target.note.value;
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
            Quantity: asset?.Quantity,
            Note
        }
        // console.log(modalInfo)

        try {
            await axiosSecure.patch(`/increase-request/${asset?._id}`);
            await axiosSecure.post('/asset-request', modalInfo);
            toast.success('Request submitted');
            onClose();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            onClose();
        }
        // onClose(); 
    };
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Add a Note</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {/* <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
                            {info?.ProductType}
                        </label> */}
                        <input
                            type="text"
                            id="inputField"
                            name="note"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary-color text-white rounded hover:bg-secondary-color"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestModal;