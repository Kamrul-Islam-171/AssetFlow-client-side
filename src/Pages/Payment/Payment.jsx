import { Helmet } from "react-helmet-async";
import ModalPayment from "./ModalPayment";
import { useState } from "react";


const Payment = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handlePay = () => {
        // Add your payment handling logic here
        console.log('Payment confirmed');
        setModalOpen(false);
    };
    return (
        <div className="container mx-auto mb-10 space-y-10">
            <Helmet><title>Payment</title></Helmet>
            <h1 className="text-4xl text-center mt-10">Pick Your Plan</h1>

            <div className="flex flex-col justify-center min-h-screen">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                    <div className="shadow-2xl border-t-8 border-secondary-color">
                        <div className="py-20 space-y-2">
                            <h1 className="text-center text-5xl text-secondary-color font-bold">$5</h1>
                            <p className="text-center text-gray-600 text-lg">Maximum 5 employees</p>
                        </div>
                        <div className="flex justify-end p-5"><button className="btn hover:bg-yellow-600 bg-secondary-color text-white border-0 px-6">Pay</button></div>
                    </div>
                    <div className="shadow-2xl border-t-8 border-primary-color">
                        <div className="py-20 space-y-2">
                            <h1 className="text-center text-5xl text-primary-color font-bold">$8</h1>
                            <p className="text-center text-gray-600 text-lg">Maximum 10 employees</p>
                        </div>
                        <div className="flex justify-end p-5"><button className="btn hover:bg-purple-900 bg-primary-color text-white border-0 px-6">Pay</button></div>
                    </div>
                    <div className="shadow-2xl border-t-8 border-secondary-color">
                        <div className="py-20 space-y-2">
                            <h1 className="text-center text-5xl text-secondary-color font-bold">$15</h1>
                            <p className="text-center text-gray-600 text-lg">Maximum 20 employees</p>
                        </div>
                        <div className="flex justify-end p-5"><button className="btn hover:bg-yellow-600 bg-secondary-color text-white border-0 px-6">Pay</button></div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Open Modal
            </button>

            <ModalPayment
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onPay={handlePay}
            />
        </div>
    );
};

export default Payment;