import { NavLink } from "react-router-dom";


const EmployeeNavlinks = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-5">
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
                <NavLink to={'/my-request-assets'} className={({ isActive }) =>
                    isActive
                        ? 'text-primary-color border-b-2 border-primary-color'
                        : 'text-black'
                }>My Requested Asstes</NavLink>
                <NavLink to={'/my-team'} className={({ isActive }) =>
                    isActive
                        ? 'text-primary-color border-b-2 border-primary-color'
                        : 'text-black'
                }>My Team</NavLink>
                <NavLink to={'/profile'} className={({ isActive }) =>
                    isActive
                        ? 'text-primary-color border-b-2 border-primary-color'
                        : 'text-black'
                }>Profile</NavLink>
            </div>
        </div>
    );
};

export default EmployeeNavlinks;