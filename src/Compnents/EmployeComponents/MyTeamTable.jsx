

const MyTeamTable = ({ myTeam, isDeleted, setisDeleted, count, refetch, page, setPage, currentPage, setCurrentPage }) => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Image</th>
                            <th>Employee Name</th>
                            <th>Member Type</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myTeam?.map((item, idx) => <tr key={item._id}>


                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}

                                </td>
                                <td>Normal Employee</td>
                               


                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyTeamTable;