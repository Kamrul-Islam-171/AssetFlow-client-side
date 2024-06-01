import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";
import "react-datepicker/dist/react-datepicker.css";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const JoinAsEmployee = () => {
    // const [startDate, setStartDate] = useState(new Date());
    const { signInWithGoogle, createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const birthDate = e.target.date.value;
        const employeeInfo = {
            name, email, password, birthDate
        }
        // console.log(employeeInfo);
        try {
            await createUser(email, password);
            await updateUserProfile(name, '')
            toast.success('Login successfull')
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
    const handleGoogle = async () => {
        try {
            await signInWithGoogle();
            toast.success('Login successfull')
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <div className="container mx-auto flex flex-col justify-center min-h-screen space-y-10">
            <Helmet><title>Join as Employee</title></Helmet>
            <h1 className="text-4xl text-center">Join as Employee</h1>
            <div className=" lg:w-1/2 mx-auto md:w-2/3 w-full bg-secondary-color">
                <form onSubmit={handleSubmit} className=" px-2 lg:px-8 md:px-5 py-10 space-y-3 rounded-lg">
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Full Name</label>
                        <div className="">
                            <input placeholder="Enter Your Name" className="rounded-lg outline-none px-5 py-2 w-full" type="text" name="name" id="" required={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Email</label>
                        <div className="">
                            <input placeholder="Enter Your Email" className="rounded-lg outline-none px-5 py-2 w-full" type="email" name="email" id="" required={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Password</label>
                        <div className="">
                            <input placeholder="Enter Your Password" className="rounded-lg outline-none px-5 py-2 w-full" type="password" name="password" id="" required={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Date of Birth</label>
                        <div className="">
                            <input placeholder="" className="rounded-lg outline-none px-5 py-2 w-full" type="date" name="date" id="" required={true} />
                        </div>
                        {/* <div className="w-full ">
                            <DatePicker className="rounded-lg outline-none px-5 py-2 lg:w-[700px] w-[432px] md:w-[470px]" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div> */}
                    </div>

                    <div className="">
                        <button className="btn w-full text-xl bg-primary-color mt-3 border-0 px-5 text-white hover:bg-white hover:text-primary-color">Sign Up</button>
                    </div>

                </form>

                <div className="space-y-3">
                    <div className='flex items-center justify-center '>

                        <p className='px-3  text-lg text-gray-600'>
                            Login with social accounts
                        </p>

                    </div>
                    <div className="flex justify-center pb-10">
                        <button onClick={handleGoogle} className='flex  justify-center items-center space-x-2 border  p-2 border-primary-color rounded-lg border-rounded cursor-pointer'>
                            <FcGoogle size={32} />
                            <p>Continue with Google</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinAsEmployee;