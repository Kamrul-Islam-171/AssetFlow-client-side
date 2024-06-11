import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from './../../Compnents/LoadingSpinner/LoadingSpinner';
import NoData from "../../Compnents/NoData/NoData";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import MyEmployeeTable from "../../Compnents/HrComponents/MyEmployeeTable";


const MyEmployeeList = () => {

    const {user, loading} = useContext(AuthContext);
    
    const axiosSecure = useAxiosSecure();
   
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 10;
    const numberOfPages = Math.ceil(count / itemsPerpage);
    const pages = [];
    const [isDeleted, setisDeleted] = useState(false)
    for(let x = 1; x <= numberOfPages; x++) pages.push(x);
    console.log(pages)

    useEffect(() => {
        axiosSecure.get(`/my-employee-count/${user?.email}`)
            .then(res => {
               
                setCount(res.data.MyTeam?.length);
                
            })

    }, [axiosSecure, user?.email, isDeleted])
    console.log('curn = ', count)

    const { data: myEmployeeList = [], isLoading, refetch } = useQuery({
        queryKey: ['my-employee-list', user?.email, page, limit],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-employee-list/${user?.email}?page=${page}&limit=${limit}`);
            // console.log(data);
            return data;
        }
    })

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setCurrentPage(newPage)

        // refetch()
    }
    
    if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>
    console.log('my-eomdf = ',myEmployeeList)

    return (
        <div className="container mx-auto mt-10 mb-10">
            <Helmet><title>My Employee List</title></Helmet>

            <h1 className="text-center text-4xl">My Team Members</h1>

            <div className="mt-10">
                {
                    myEmployeeList?.length > 0 && count > 0 ? <>
                        <MyEmployeeTable myEmployeeList={myEmployeeList} isDeleted={isDeleted} setisDeleted={setisDeleted} refetch={refetch} page={page} setPage={setPage} currentPage={currentPage} setCurrentPage={setCurrentPage} count={count}></MyEmployeeTable>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="btn mr-2"><GrCaretPrevious /></button>
                           
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

export default MyEmployeeList;