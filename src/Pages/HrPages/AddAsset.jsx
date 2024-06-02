import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const AddAsset = () => {
    const axiosSecure = useAxiosSecure();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const ProductName = form.name.value;
        const ProductType = form.proType.value;
        const Quantity = form.quantity.value;

        const ProductInfo = {
            ProductName, ProductType, Quantity, Date: new Date().toLocaleDateString()
        }

        try {
            await axiosSecure.post('/asset', ProductInfo);
            toast.success('Product Added')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

        // console.log(ProductInfo)

    }
    return (
        <div className="container mx-auto flex flex-col justify-center min-h-screen space-y-10">
            <Helmet><title>Add Asset</title></Helmet>
            <h1 className="text-4xl text-center">Add Asset</h1>
            <div className=" lg:w-1/2 mx-auto md:w-2/3 w-full bg-secondary-color">
                <form onSubmit={handleSubmit} className=" px-2 lg:px-8 md:px-5 py-10 space-y-3 rounded-lg">
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Product Name</label>
                        <div className="">
                            <input placeholder="Enter Product Name" className="rounded-lg outline-none px-5 py-2 w-full" type="text" name="name" id="" required={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Product type</label>
                        <div>
                            <select name="proType" className="rounded-lg outline-none px-5 py-2 w-full">
                                <option value="">Select a type</option>
                                <option value="returnable">returnable</option>
                                <option value="non-returnable">non-returnable</option>
                                
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Quantity</label>
                        <div className="">
                            <input placeholder="Enter Quantity" className="rounded-lg outline-none px-5 py-2 w-full" type="number" name="quantity" id="" required={true} />
                        </div>
                    </div>




                    <div className="">
                        <button className="btn w-full text-xl bg-primary-color mt-3 border-0 px-5 text-white hover:bg-white hover:text-primary-color">Add</button>
                    </div>

                </form>


            </div>
        </div>
    );
};

export default AddAsset;