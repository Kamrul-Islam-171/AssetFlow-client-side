import MonthlyRequest from "../../Compnents/EmployeComponents/MonthlyRequest";
import MyPendingRequest from "../../Compnents/EmployeComponents/MyPendingRequest";
import AssetPiceChart from "../../Compnents/HrComponents/AssetPiceChart";
import ChartforYour from "../../Compnents/HrComponents/ChartforYour";
import FivePendingRequests from "../../Compnents/HrComponents/FivePendingRequests";
import LimitedStocks from "../../Compnents/HrComponents/LimitedStocks";

import TopFourRequestedItems from "../../Compnents/HrComponents/TopFourRequestedItems";
import About from "../../Compnents/NormalHomeComponents/About";
import Bannar from "../../Compnents/NormalHomeComponents/Bannar";
import PackageSection from "../../Compnents/NormalHomeComponents/PackageSection";
import useRole from "../../Hooks/useRole";


const Home = () => {
    const [role] = useRole();
    
    console.log('role = ', role)
    return (
        <div>
            <Bannar></Bannar>
            <MyPendingRequest></MyPendingRequest>
            <MonthlyRequest></MonthlyRequest>
            {/* hr */}
            <FivePendingRequests></FivePendingRequests>
            <TopFourRequestedItems></TopFourRequestedItems>
            <LimitedStocks></LimitedStocks>
            
            {/* <AssetPiceChart></AssetPiceChart> */}
            <ChartforYour></ChartforYour>
            <About></About>
            <PackageSection></PackageSection>
            
            
        </div>
    );
};

export default Home;