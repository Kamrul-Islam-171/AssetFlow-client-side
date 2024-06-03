import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../../../Provider/AuthProvider"
import toast from "react-hot-toast";
import NormalNav from "../../NomarLavlinks/NormalNav";
import useRole from "../../../Hooks/useRole";
import HrNavlinks from "../../HrNavLinks/HrNavlinks";
import EmployeeNavlinks from "../../EmployeeNavlinks/EmployeeNavlinks";



const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [role] = useRole();
    const nablinks = <  >

        <div >
        {/* <NormalNav></NormalNav> */}
            {
                role === 'admin' && <NormalNav></NormalNav>
            }
            {
                role === 'HR' && <HrNavlinks></HrNavlinks>
            }
            {
                role === 'employee' && <EmployeeNavlinks></EmployeeNavlinks>
            }
        </div>

    </>

    const handleLogout = async () => {
        try {
            await logOut()
            toast.success('Logout Successfull')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className="container mx-auto ">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {nablinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl w-[100px]">
                        {
                            role === 'admin' && <p>Admin</p>
                        }
                        {
                            role === 'HR' && <p>HR</p>
                        }
                        {
                            role === 'employee' && <p>Employee</p>
                        }
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {nablinks}
                    </ul>
                </div>
                {
                    user ? <div className="navbar-end">
                        <button onClick={handleLogout} className="btn bg-primary-color border-0 px-5 text-white hover:bg-white hover:text-primary-color">Logout</button>
                    </div> :
                        <div className="navbar-end">
                            <Link to='/login' className="btn bg-primary-color border-0 px-5 text-white hover:bg-white hover:text-primary-color">Login</Link>
                        </div>
                }


            </div>
        </div>
    )
}

export default Navbar