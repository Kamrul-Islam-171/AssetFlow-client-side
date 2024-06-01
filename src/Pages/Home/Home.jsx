import Bannar from "../../Compnents/NormalHomeComponents/Bannar";
import useRole from "../../Hooks/useRole";


const Home = () => {
    const [role] = useRole();
    
    console.log('role = ', role)
    return (
        <div>
            <Bannar></Bannar>
        </div>
    );
};

export default Home;