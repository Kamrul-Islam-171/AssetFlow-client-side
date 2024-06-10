import { loadStripe } from '@stripe/stripe-js';

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);


const ModalPayment = ({ isOpen, onClose, onPay, amount }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-4">Payment Confirmation</h2>
                    <p className="mb-4">Are you sure you want to proceed with the payment?</p>

                    {/* checkout form */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm onClose={onClose} onPay={onPay} amount={amount}/>
                    </Elements>

                    {/* <div className="flex justify-end space-x-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onPay}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Pay
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ModalPayment;