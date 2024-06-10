import toast from "react-hot-toast";
import HrDashboard from "../../Compnents/HrComponents/HrDashboard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import NoData from "../../Compnents/NoData/NoData";
import PendingEmployeeTable from "../../Compnents/HrComponents/PendingEmployeeTable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";


const AddEmployee = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

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
        axiosSecure.get(`/pending-employee-count`)
            .then(res => {
                // console.log('countbyme = ', res.data.count)
                setCount(res.data.count);

            })

    }, [axiosSecure, isDeleted])
    console.log('curn = ', count)



    const { data: pendingEmployee = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-employee', page, limit],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/pending-employee?page=${page}&limit=${limit}`);
            return data;
        }
    })

    const { data: limitCount = [], isLoading: isLoading1, refetch: refetch1 } = useQuery({
        queryKey: ['limit-count', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/package-limit/${user?.email}`);
            return data;
        }
    })

    const { data: emplyeeCount = 0, isLoading: isLoading2, refetch: refetch2 } = useQuery({
        queryKey: ['employee-count', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/employee-under-hr/${user?.email}`);
            return data.MyTeam.length;
        }
    })

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setCurrentPage(newPage)

        // refetch()
    }

    // console.log(limitCount)

    if (loading || isLoading || isLoading1 || isLoading2) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="container mx-auto mt-10 mb-10">
            <Helmet><title>Add Employee</title></Helmet>
            <div className="flex justify-center" >

                <HrDashboard limitCount={limitCount} emplyeeCount={emplyeeCount}></HrDashboard>

            </div>


            <div className="mt-10">
                {
                    pendingEmployee?.length > 0 ? <>
                        <PendingEmployeeTable item={pendingEmployee} isDeleted={isDeleted} setisDeleted={setisDeleted} refetch={refetch} refetch1={refetch1} refetch2={refetch2} limitCount={limitCount} count={count} setPage={setPage} currentPage={currentPage} setCurrentPage={setCurrentPage}></PendingEmployeeTable>
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

export default AddEmployee;