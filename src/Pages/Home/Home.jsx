import { useContext } from "react";
import Events from "../../Compnents/EmployeComponents/Events";
import MonthlyRequest from "../../Compnents/EmployeComponents/MonthlyRequest";
import MyPendingRequest from "../../Compnents/EmployeComponents/MyPendingRequest";
import Notice from "../../Compnents/EmployeComponents/Notice";
import AssetPiceChart from "../../Compnents/HrComponents/AssetPiceChart";
import ChartforYour from "../../Compnents/HrComponents/ChartforYour";
import FivePendingRequests from "../../Compnents/HrComponents/FivePendingRequests";
import LimitedStocks from "../../Compnents/HrComponents/LimitedStocks";

import TopFourRequestedItems from "../../Compnents/HrComponents/TopFourRequestedItems";
import VacationCalander from "../../Compnents/HrComponents/VacationCalander";
import About from "../../Compnents/NormalHomeComponents/About";
import Bannar from "../../Compnents/NormalHomeComponents/Bannar";
import PackageSection from "../../Compnents/NormalHomeComponents/PackageSection";
import useRole from "../../Hooks/useRole";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Compnents/LoadingSpinner/LoadingSpinner";


const Home = () => {
    const [role] = useRole();
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data : myHrInfo = {}, isLoading} = useQuery({
        queryKey:['my-hr-info', user?.email],
        enabled:!loading && !!user?.email,
        queryFn : async() => {
            const {data} = await axiosSecure(`/hr-info-for-me/${user?.email}`) 
            return data;
        }
    })

    // if(isLoading) return <LoadingSpinner></LoadingSpinner>
    
    console.log('role = ', role);
    console.log('mymyHrInfo = ',myHrInfo);
    return (
        <div>
            {
                role === '' && <Bannar></Bannar>
            }
            {
                role === 'employee' && myHrInfo &&<MyPendingRequest></MyPendingRequest>
            }
            {
                role === 'employee' && myHrInfo &&<MonthlyRequest></MonthlyRequest>
            }
            
            
            {/* hr */}
            {
                role === 'HR' && <FivePendingRequests></FivePendingRequests>
            }
            {
                role === 'HR' && <TopFourRequestedItems></TopFourRequestedItems>
            }
            {
                role === 'HR' && <LimitedStocks></LimitedStocks>
            }
            {
                role === 'HR' &&  <ChartforYour></ChartforYour>
            }
            
            
            
            {/* <AssetPiceChart></AssetPiceChart> */}
           
            {
                role === '' && <About></About>
            }
            {
                role === '' && <PackageSection></PackageSection>
            }
            

            {
                role === 'HR' && <Events></Events> 
            }

            {
                role === 'employee' && myHrInfo &&<Notice></Notice>
            }
            
            {/* <Notice></Notice> */}

            
            {
                role === 'HR' && <VacationCalander></VacationCalander>
            }
            
            
            
        </div>
    );
};

export default Home;