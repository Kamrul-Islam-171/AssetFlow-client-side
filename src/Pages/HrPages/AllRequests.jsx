import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import NoData from "../../Compnents/NoData/NoData";
import AssetTable from "../../Compnents/HrComponents/AssetTable";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import AssetRequestTable from "../../Compnents/HrComponents/AssetRequestTable";

const AllRequests = () => {
    const { user, loading } = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 10;
    const numberOfPages = Math.ceil(count / itemsPerpage);
    const pages = [];
    const [isDeleted, setisDeleted] = useState(false)
    for (let x = 1; x <= numberOfPages; x++) pages.push(x);
    console.log(pages)

    useEffect(() => {
        axiosSecure.get(`/all-requested-asset-count/${user?.email}?search=${search}`)
            .then(res => {
                // console.log('countbyme = ', res.data.count)
                setCount(res.data.count);

            })

    }, [axiosSecure, search, user?.email, isDeleted])
    console.log('curn = ', count)



    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ['all-asset-request', search, page, limit, user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const { data } = await axiosSecure.get(`/all-asset-request/${user?.email}?search=${search}&page=${page}&limit=${limit}`);

            return data;
        }
    })
    // console.log('my new data', assets)

    const handleSearch = async (e) => {
        e.preventDefault();
        const serachValue = e.target.search.value;
        setSearch(serachValue);
        setPage(1);
        setCurrentPage(1)
    }




    
   
    const handlePageChange = (newPage) => {
        setPage(newPage);
        setCurrentPage(newPage)

        // refetch()
    }
    if (isLoading || loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="container mx-auto">
            <Helmet><title>Asset Requests</title></Helmet>
            <div className="mt-16">
                <form onSubmit={handleSearch} className="space-y-5">
                    <div className="flex justify-center" >
                        <input defaultValue={search} className="border border-primary-color w-1/2 px-5 py-2 rounded-lg outline-none" placeholder="Search by name or emial" type="text" name='search' />
                    </div>
                    <div className="flex justify-center">
                        <button className="btn bg-primary-color hover:bg-white hover:text-primary-color outline-none border-0 text-white">Search</button>
                    </div>
                </form>

            </div>

            

            

            <div className="mt-10">
                {
                    assets?.length > 0 && count > 0 ? <>
                        <AssetRequestTable assets={assets} isDeleted={isDeleted} setisDeleted={setisDeleted} refetch={refetch} page={page} setPage={setPage} currentPage={currentPage} setCurrentPage={setCurrentPage} count={count}></AssetRequestTable>
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
                            <button onClick={() => handlePageChange(page + 1)} disabled={currentPage === pages.length} className="btn ml-2"><GrCaretNext /></button>
                        </div>
                    </> : <NoData></NoData>
                }
            </div>


        </div>
    );

};

export default AllRequests;