import MonthlyRequest from "../../Compnents/EmployeComponents/MonthlyRequest";
import MyPendingRequest from "../../Compnents/EmployeComponents/MyPendingRequest";
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
            <About></About>
            <PackageSection></PackageSection>
        </div>
    );
};

export default Home;