import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";
import NoData from "../../Compnents/NoData/NoData";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import MyTeamTable from "../../Compnents/EmployeComponents/MyTeamTable";


const MyTeam = () => {
    const { user, loading } = useContext(AuthContext);

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
        axiosSecure.get(`/my-team-count/${user?.email}`)
            .then(res => {

                setCount(res.data.MyTeam?.length);

            })

    }, [axiosSecure, user?.email, isDeleted])
    console.log('curn = ', count)

    const { data: myTeam= [], isLoading, refetch } = useQuery({
        queryKey: ['my-Team', user?.email, page, limit],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-team-members/${user?.email}?page=${page}&limit=${limit}`);
            // console.log(data);
            return data;
        }
    })
    const handlePageChange = (newPage) => {
        setPage(newPage);
        setCurrentPage(newPage)

        // refetch()
    }
    console.log(myTeam)
    if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="container mx-auto mt-10">
            <Helmet><title>My Team</title></Helmet>
            <h1 className="text-center text-4xl">My Team Members</h1>

            <div className="mt-10">
                {
                    myTeam?.length > 0 && count > 0 ? <>
                        <MyTeamTable myTeam={myTeam} isDeleted={isDeleted} setisDeleted={setisDeleted} refetch={refetch} page={page} setPage={setPage} currentPage={currentPage} setCurrentPage={setCurrentPage} count={count}></MyTeamTable>
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

export default MyTeam;