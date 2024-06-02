
import { Link } from 'react-router-dom';

const PackageSection = () => {
    return (
        <div className="container mx-auto mt-20 space-y-8 px-5 ">
            <h1 className="text-4xl text-center">Packages Plan</h1>
            <p className='text-center'>Unlock efficient asset tracking tailored for HR Managers with our specialized packages.</p>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5'>
                <div className=" shadow-lg p-5 shadow-slate-400">
                    <div className="flex justify-center items-center h-[200px] ">
                        <p className="text-2xl">Maximum 5 employees Plan</p>
                    </div>
                    <div className='text-end'>
                        <Link to={'/'} className="bg-secondary-color text-white px-5 py-2 text-lg font-semibold">Price : $5</Link>
                    </div>
                </div>
                <div className="shadow-lg p-5 shadow-slate-400">
                    <div className="flex justify-center items-center h-[200px] ">
                        <p className="text-2xl">Maximum 10 employees Plan</p>
                    </div>
                    <div className='text-end'>
                        <Link to={'/'} className="bg-secondary-color text-white px-5 py-2 text-lg font-semibold">Price : $8</Link>
                    </div>
                </div>
                <div className="shadow-lg p-5 shadow-slate-400">
                    <div className="flex justify-center items-center h-[200px] ">
                        <p className="text-2xl">Maximum 20 employees Plan</p>
                    </div>
                    <div className='text-end'>
                        <Link to={'/'} className="bg-secondary-color text-white px-5 py-2 text-lg font-semibold">Price : $15</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PackageSection;