import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";


const JoinAsHr = () => {
    const { signInWithGoogle, createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const birthDate = e.target.date.value;
        const company = e.target.company.value;
        const companyLogo = e.target.companyLogo.value;
        const packageData = e.target.package.value;
        const info = {
            name, email, birthDate, company, companyLogo, packageData
        }
        console.log(info)

        
        try {
            await createUser(email, password);
            await updateUserProfile(name, '');
            await axios.post(`${import.meta.env.VITE_url}/hr`, info);

            toast.success('Login successfull')
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
   
    return (
        <div className="container mx-auto flex flex-col justify-center min-h-screen space-y-10">
            <Helmet><title>Join as HR</title></Helmet>
            <h1 className="text-4xl text-center">Join as HR Manager</h1>
            <div className=" lg:w-1/2 mx-auto md:w-2/3 w-full bg-secondary-color">
                <form onSubmit={handleSubmit} className=" px-2 lg:px-8 md:px-5 py-10 space-y-3 rounded-lg">
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Full Name</label>
                        <div className="">
                            <input placeholder="Enter Your Name" className="rounded-lg outline-none px-5 py-2 w-full" type="text" name="name" id="" required={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Company Name</label>
                        <div className="">
                            <input placeholder="Enter Your Company Name" className="rounded-lg outline-none px-5 py-2 w-full" type="text" name="company" id="" required={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Company Logo</label>
                        <div className="">
                            <input placeholder="Enter Your Company Logo URL" className="rounded-lg outline-none px-5 py-2 w-full" type="text" name="companyLogo" id="" required={true} />
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
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Select A Package</label>
                        {/* <div className="">
                            <input placeholder="Enter Your Password" className="rounded-lg outline-none px-5 py-2 w-full" type="password" name="password" id="" required={true} />
                        </div> */}
                        <div>
                            <select name="package" className="rounded-lg outline-none px-5 py-2 w-full">
                                <option value="">Select a package</option>
                                <option value="five">5 members for $5</option>
                                <option value="eight">10 members for $8</option>
                                <option value="fifteen">20 members for $15</option>
                            </select>
                        </div>
                    </div>

                    <div className="">
                        <button className="btn w-full text-xl bg-primary-color mt-3 border-0 px-5 text-white hover:bg-white hover:text-primary-color">Sign Up</button>
                    </div>

                </form>

                
            </div>
        </div>
    );
};

export default JoinAsHr;