import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';

import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const UpdateAsset = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: asset = {}, isLoading } = useQuery({
        queryKey: ['asset-info', id],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/asset/${id}`);
                return data
            } catch (error) {
                console.log(error);
                toast.error('something went wrong')
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const ProductName = form.name.value;
        const ProductType = form.proType.value;
        const Quantity = parseInt(form.quantity.value);

        const ProductInfo = {
            ProductName, ProductType, Quantity
        }
        console.log(ProductInfo)

        try {
            await axiosSecure.patch(`/update-asset/${id}`, ProductInfo);
            toast.success('Product Updated')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

        // console.log(ProductInfo)

    }


    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="container mx-auto flex flex-col justify-center min-h-screen space-y-10">
            <Helmet><title>Update Asset</title></Helmet>
            <h1 className="text-4xl text-center">Update Asset</h1>
            <div className=" lg:w-1/2 mx-auto md:w-2/3 w-full bg-secondary-color">
                <form onSubmit={handleSubmit} className=" px-2 lg:px-8 md:px-5 py-10 space-y-3 rounded-lg">
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Product Name</label>
                        <div className="">
                            <input defaultValue={asset?.ProductName} placeholder="Enter Product Name" className="rounded-lg outline-none px-5 py-2 w-full" type="text" name="name" id="" required={true} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Product type</label>
                        <div>
                            <select defaultValue={asset?.ProductType} name="proType" className="rounded-lg outline-none px-5 py-2 w-full">
                                <option value="">Select a type</option>
                                <option value="returnable">returnable</option>
                                <option value="non-returnable">non-returnable</option>

                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="" className=" text-xl">Quantity</label>
                        <div className="">
                            <input defaultValue={asset?.Quantity} placeholder="Enter Quantity" className="rounded-lg outline-none px-5 py-2 w-full" type="number" name="quantity" id="" required={true} />
                        </div>
                    </div>




                    <div className="">
                        <button className="btn w-full text-xl bg-primary-color mt-3 border-0 px-5 text-white hover:bg-white hover:text-primary-color">Update</button>
                    </div>

                </form>


            </div>
        </div>
    );
};

export default UpdateAsset;