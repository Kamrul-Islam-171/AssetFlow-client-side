import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AssetTable from "../../Compnents/HrComponents/AssetTable";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";
import NoData from "../../Compnents/NoData/NoData";


const AssetList = () => {
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    const [returnAble, setReturnAble] = useState('');
    const [sort, setSort] = useState(false);
    // console.log(sort)

    // const [assets, setAssets] = useState([]);

    // useEffect(() => {
    //     axiosSecure.get(`/assets?search=${search}`)
    //     .then(res => {
    //         setAssets(res.data);
    //     })
    // }, [search, axiosSecure])

    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['assets', search, returnAble, sort],
        queryFn: async () => {
            // try {
            //     const {data} = axiosSecure.get(`/assets?search=${search}`);
            //     return data;
            // } catch (error) {
            //     console.log(error.message);
            //     toast.error(error.message)
            // }
            const { data } = await axiosSecure.get(`/assets?search=${search}&returnOrNot=${returnAble}&sortData=${sort?'asc':'dsc'}`);
            return data;
        }
    })
    console.log(assets)

    const handleSearch = async (e) => {
        e.preventDefault();
        const serachValue = e.target.search.value;
        setSearch(serachValue);
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const handleType = e => {
        // e.preventDefault()
        setReturnAble(e.target.value);

    }
    // console.log(search)
    return (
        <div className="container mx-auto">
            <div className="mt-16">
                <form onSubmit={handleSearch} className="space-y-5">
                    <div className="flex justify-center" >
                        <input defaultValue={search} className="border border-primary-color w-1/2 px-5 py-2 rounded-lg outline-none" placeholder="Search by name" type="text" name='search' />
                    </div>
                    <div className="flex justify-center">
                        <button className="btn bg-primary-color hover:bg-white hover:text-primary-color outline-none border-0 text-white">Search</button>
                    </div>
                </form>

            </div>

            <div className="flex flex-col lg:flex-row md:flex-row  justify-center items-center gap-5 mt-10">
                {/* <div className="">
                    <p>Returnable / Nonreturnable</p>
                    <select name="returnOrNot" id="" onChange={handleType} className="px-10 py-2">
                        <option value="">Select Type</option>
                        <option value="returnable">Returnable</option>
                        <option value="non-returnable">Nonreturnable</option>
                    </select>
                </div> */}
                <div className="space-y-2">
                    <p>Returnable / Nonreturnable</p>
                    <select defaultValue={returnAble} name="returnOrNot" id="" onChange={handleType} className="px-10 py-2">
                        <option value="">Select Type</option>
                        <option value="returnable">Returnable</option>
                        <option value="non-returnable">Nonreturnable</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center mt-5">
                <button onClick={() => setSort(!sort)} className="btn bg-primary-color hover:bg-white hover:text-primary-color outline-none border-0 text-white">{sort ? 'High to Low' : 'Low to High'}</button>
            </div>

            <div className="mt-10">
                {
                    assets?.length > 0 ? <AssetTable assets={assets}></AssetTable> : <NoData></NoData>
                }
            </div>
            
            {/* <LoadingSpinner></LoadingSpinner> */}
        </div>
    );
};

export default AssetList;