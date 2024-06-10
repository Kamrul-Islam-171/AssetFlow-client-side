import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const NavBarUser = ({ userImg }) => {
    // console.log('i am here', userImg)
    const { user } = useContext(AuthContext);
    return (
        
            <div title={user?.displayName} title={user?.displayName} tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt="User" src={userImg} />
                </div>

            </div>
       
    );
};

export default NavBarUser;