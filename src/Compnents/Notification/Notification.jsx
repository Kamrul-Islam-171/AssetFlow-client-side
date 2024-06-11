
import { useContext } from "react";
import { formatDistance, subDays } from "date-fns";
import { IoMdNotifications } from "react-icons/io";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const Notification = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: previousNotification = {}, isLoading, refetch } = useQuery({
        queryKey: ['previous-notificaiton', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/previous-notification/${user?.email}`);
            return data;
        }
    })
    const { data: currentNotification = {}, isPending } = useQuery({
        queryKey: ['current-notificaiton', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/current-notification/${user?.email}`);
            return data;
        }
    })
    const { data: notificationData = {}, isPending: isPending1 } = useQuery({
        queryKey: ['notificaiton-data', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/notification-data/${user?.email}`);
            return data;
        }
    })
    const handleNotification = async() => {
        // console.log('hlee')
        await axiosSecure.put(`/update-notification-count`, {email : user?.email, nCount : currentNotification?.nCount});
        refetch();
    }
    if (isPending || isLoading || isPending1) return <LoadingSpinner></LoadingSpinner>
    // console.log('pre = ', previousNotification);
    // console.log('cur = ', currentNotification);
    return (
        <button onClick={handleNotification} className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> */}
                    <span className="text-2xl"><IoMdNotifications /></span>
                    {/* {
                        previousNotification?.nCount ? <span className="badge badge-sm indicator-item">{parseInt(currentNotification.nCount) - parseInt(previousNotification.nCount)}</span> : <span className="badge badge-sm indicator-item">{currentNotification.nCount}</span>
                    } */}
                    {
                        previousNotification?.nCount && currentNotification?.nCount && <span className="badge badge-sm indicator-item">{parseInt(currentNotification.nCount) - parseInt(previousNotification.nCount)}</span>
                    }
                    {
                        !previousNotification?.nCount && !currentNotification?.nCount && <span className="badge badge-sm indicator-item">0</span>
                    }
                    {
                        !previousNotification?.nCount && currentNotification?.nCount && <span className="badge badge-sm indicator-item">{currentNotification.nCount}</span>
                    }
                   
                    {/* <span className="badge badge-sm indicator-item">8</span> */}
                </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow">
                <div className="card-body">
                    {/* <span className="font-bold text-lg">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                        <button className="btn btn-primary btn-block">View cart</button>
                    </div> */}
                    {
                        notificationData?.map(item => <div className="border my-2 border-primary-color rounded-lg" key={item._id}>
                            <p  > Your request for {item.ProductName} is {item.status}</p>
                            <p>{formatDistance(
                                item.date,
                                new Date(),
                                { addSuffix: true },
                            )}</p>
                        </div>)
                    }
                </div>
            </div>
        </button>
    );
};

export default Notification;