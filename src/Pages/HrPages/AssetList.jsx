import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AssetTable from "../../Compnents/HrComponents/AssetTable";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


const AssetList = () => {
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    // const [assets, setAssets] = useState([]);

    // useEffect(() => {
    //     axiosSecure.get(`/assets?search=${search}`)
    //     .then(res => {
    //         setAssets(res.data);
    //     })
    // }, [search, axiosSecure])

    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['assets', search],
        queryFn: async () => {
            // try {
            //     const {data} = axiosSecure.get(`/assets?search=${search}`);
            //     return data;
            // } catch (error) {
            //     console.log(error.message);
            //     toast.error(error.message)
            // }
            const { data } = await axiosSecure.get(`/assets?search=${search}`);
            return data;
        }
    })
    console.log(assets)

    const handleSearch = async (e) => {
        e.preventDefault();
        const serachValue = e.target.search.value;
        setSearch(serachValue);
    }

    if(isLoading) {
        return <p className="text-5xl">Loading...</p>
    }
    // console.log(search)
    return (
        <div className="container mx-auto">
            <div className="mt-16">
                <form onSubmit={handleSearch} className="space-y-5">
                    <div className="flex justify-center" >
                        <input className="border border-primary-color w-1/2 px-5 py-2 rounded-lg outline-none" placeholder="Search by name" type="text" name='search' />
                    </div>
                    <div className="flex justify-center">
                        <button className="btn bg-primary-color outline-none border-0 text-white">Search</button>
                    </div>
                </form>

            </div>
            <div>
                <AssetTable assets={assets}></AssetTable>
            </div>
        </div>
    );
};

export default AssetList;