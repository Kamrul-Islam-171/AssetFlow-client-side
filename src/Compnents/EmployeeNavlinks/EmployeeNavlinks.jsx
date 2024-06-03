import { NavLink } from "react-router-dom";


const EmployeeNavlinks = () => {
    return (
        <div>
            <div className="flex gap-5">
                <NavLink to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-primary-color border-b-2 border-primary-color'
                            : 'text-black'
                    }
                >
                    Home
                </NavLink>
                <NavLink to={'/request-asset'} className={({ isActive }) =>
                    isActive
                        ? 'text-primary-color border-b-2 border-primary-color'
                        : 'text-black'
                }>Request an Asset</NavLink>
                {/* <NavLink to={'/asset-list'} className={({ isActive }) =>
                    isActive
                        ? 'text-primary-color border-b-2 border-primary-color'
                        : 'text-black'
                }>Asset Lists</NavLink> */}
            </div>
        </div>
    );
};

export default EmployeeNavlinks;