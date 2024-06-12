import { NavLink } from "react-router-dom";


const NormalNav = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 text-lg mb-5">

            <NavLink to="/"
                className={({ isActive }) =>
                    isActive
                        ? 'text-primary-color border-b-2 border-primary-color'
                        : 'text-black'
                }
            >
                Home
            </NavLink>

            <NavLink to={'/join-as-employee'} className={({ isActive }) =>
                isActive
                    ? 'text-primary-color border-b-2 border-primary-color'
                    : 'text-black'
            }>Join as Employee</NavLink>
            <NavLink to={'/join-as-hr'} className={({ isActive }) =>
                isActive
                    ? 'text-primary-color border-b-2 border-primary-color'
                    : 'text-black'
            }>Join as HR Manager</NavLink>
        </div>
    );
};

export default NormalNav;