import About from "../../Compnents/NormalHomeComponents/About";
import Bannar from "../../Compnents/NormalHomeComponents/Bannar";
import useRole from "../../Hooks/useRole";


const Home = () => {
    const [role] = useRole();
    
    console.log('role = ', role)
    return (
        <div>
            <Bannar></Bannar>
            <About></About>
        </div>
    );
};

export default Home;