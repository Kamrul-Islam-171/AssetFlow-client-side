import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AssetTable from "../../Compnents/HrComponents/AssetTable";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";
import NoData from "../../Compnents/NoData/NoData";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";



const AssetList = () => {
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    const [returnAble, setReturnAble] = useState('');
    const [sort, setSort] = useState(false);
    const [available, setAvailable] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(4);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 4;
    const numberOfPages = Math.ceil(count / itemsPerpage);
    const pages = [];
    for(let x = 1; x <= numberOfPages; x++) pages.push(x);
    console.log(pages)

    useEffect(() => {
        axiosSecure.get(`/assetsCount?search=${search}&returnOrNot=${returnAble}&sortData=${sort ? 'asc' : 'dsc'}&available=${available}`)
            .then(res => {
                // console.log('count = ', res.data.count)
                setCount(res.data.count);
                
            })

    }, [axiosSecure, search, returnAble, sort, available])
    console.log('curn = ', count)
   


    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ['assets', search, returnAble, sort, available, page, limit],
        queryFn: async () => {

            const { data } = await axiosSecure.get(`/assets?search=${search}&returnOrNot=${returnAble}&sortData=${sort ? 'asc' : 'dsc'}&available=${available}&page=${page}&limit=${limit}`);
            
            return data;
        }
    })

    const handleSearch = async (e) => {
        e.preventDefault();
        const serachValue = e.target.search.value;
        setSearch(serachValue);
        setPage(1);
        setCurrentPage(1)
    }




    const handleType = e => {
        // e.preventDefault()
        setReturnAble(e.target.value);
        setPage(1);
        setCurrentPage(1)

    }
    const handleAvailable = e => {
        setAvailable(e.target.value);
        setPage(1);
        setCurrentPage(1)
    }
    const handlePageChange = (newPage) => {
        setPage(newPage);
        setCurrentPage(newPage)

        // refetch()
    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
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

                <div className="space-y-2">
                    <p>Returnable / Nonreturnable</p>
                    <select defaultValue={returnAble} name="returnOrNot" id="" onChange={handleType} className="px-10 py-2">
                        <option value="">Select Type</option>
                        <option value="returnable">Returnable</option>
                        <option value="non-returnable">Nonreturnable</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <p>Available / Out of Stock</p>
                    <select defaultValue={available} name="returnOrNot" id="" onChange={handleAvailable} className="px-10 py-2">
                        <option value="">Select Type</option>
                        <option value="available">Available</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center mt-5">
                <button onClick={() => setSort(!sort)} className="btn bg-primary-color hover:bg-white hover:text-primary-color outline-none border-0 text-white">{sort ? 'High to Low' : 'Low to High'}</button>
            </div>

            <div className="mt-10">
                {
                    assets?.length > 0 ? <>
                        <AssetTable assets={assets}></AssetTable>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="btn mr-2"><GrCaretPrevious /></button>
                            {/* <p>{currentPage}</p> */}
                            <span className="flex gap-4">
                                {
                                    pages?.map((pageNo) => <button onClick={() => {
                                        setCurrentPage(pageNo)
                                        setPage(pageNo)
                                    }} key={pageNo} className={`btn px-5 border-0 ${currentPage === pageNo ? 'bg-secondary-color text-white' : 'text-black'}   `}>{pageNo}</button>)
                                }
                            </span>
                            <button onClick={() => handlePageChange(page + 1)} disabled={assets?.length < limit} className="btn ml-2"><GrCaretNext /></button>
                        </div>
                    </> : <NoData></NoData>
                }
            </div>


        </div>
    );
};

export default AssetList;