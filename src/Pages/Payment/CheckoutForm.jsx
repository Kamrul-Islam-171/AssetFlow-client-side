import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './common.css'
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { AuthContext } from "../../Provider/AuthProvider";
import { FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ onClose, onPay, amount }) => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();


    // console.log(amount)

    useEffect(() => {
        if (amount > 1) {
            getClientSecret({ price: amount });
        }
    }, [amount])

    const getClientSecret = async (price) => {
        const { data } = await axiosSecure.post('/create-payment-intent', price);
        console.log("client secred = ", data.clientSecret)
        setClientSecret(data.clientSecret);

    }

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
            setProcessing(false)
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }

        //payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            return
        }

        if (paymentIntent.status === 'succeeded') {

            const paymentInfo = {
                transactionId: paymentIntent.id,
                date: new Date()
            }

            // console.log(paymentIntent)
            // console.log(paymentInfo)

            setProcessing(false)
            try {
                let incrementLimit = 0;
                if(amount === 5) incrementLimit = 5
                else if(amount === 8) incrementLimit = 10
                else if(amount === 15) incrementLimit = 20
                
                await axiosSecure.patch(`/update-limit-count/${user?.email}`, {incrementLimit});
                toast.success('Payment Successfull')
                navigate('/add-employee')
            } catch (error) {
                console.log(error);
                toast.error('somthing went wrong')
            }
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/* <button type="submit" disabled={!stripe}>
                Pay
            </button> */}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        // onClick={onPay}
                        disabled={!stripe || !clientSecret || processing}
                        className="px-4 py-2 bg-primary-color text-white rounded hover:bg-purple-800"
                    >
                        {processing ? <FaSpinner size={24} className="animate-spin m-auto" /> : `Pay ${amount}`}
                        {/* <FaSpinner size={24} className="animate-spin m-auto"/>
                        Pay ${amount} */}
                    </button>
                </div>
            </form>
            {cardError && <p className="text-red-500">{cardError}</p>}
        </>
    );
};

export default CheckoutForm;