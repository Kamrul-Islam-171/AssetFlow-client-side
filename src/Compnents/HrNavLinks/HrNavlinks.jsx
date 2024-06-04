import { NavLink } from "react-router-dom";


const HrNavlinks = () => {
    return (
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
            <NavLink to={'/add-asset'} className={({ isActive }) =>
                isActive
                    ? 'text-primary-color border-b-2 border-primary-color'
                    : 'text-black'
            }>Add Asset</NavLink>
            <NavLink to={'/asset-list'} className={({ isActive }) =>
                isActive
                    ? 'text-primary-color border-b-2 border-primary-color'
                    : 'text-black'
            }>Asset Lists</NavLink>
            <NavLink to={'/asset-request'} className={({ isActive }) =>
                isActive
                    ? 'text-primary-color border-b-2 border-primary-color'
                    : 'text-black'
            }>All Assets Request</NavLink>
        </div>
    );
};

export default HrNavlinks;