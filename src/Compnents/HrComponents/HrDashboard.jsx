import React from 'react';
import toast from 'react-hot-toast';

const HrDashboard = ({limitCount}) => {
    return (
        <div>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                    <div className="stat-figure text-primary-color">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Employee</div>
                    <div className="stat-value text-primary-color">31K</div>
                    <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary-color">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Package Limit</div>
                    <div className="stat-value text-secondary-color">{limitCount?.employeeLimit}</div>
                    <div className="stat-desc">You Can increase</div>
                </div>

                <button onClick={() => { toast.success('hello') }} className="stat  text-white hover:bg-secondary-color flex items-center bg-primary-color">
                    Increase Limit
                </button>
            </div>
        </div>
    );
};

export default HrDashboard;