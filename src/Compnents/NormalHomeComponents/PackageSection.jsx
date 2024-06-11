
import { Link } from 'react-router-dom';

const PackageSection = () => {
    return (
        <div className="container mx-auto mt-20 space-y-8 px-5 mb-10">
            <h1 className="text-4xl text-center">Packages Plan</h1>
            <p className='text-center'>Unlock efficient asset tracking tailored for HR Managers with our specialized packages.</p>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5'>

                <div>
                    <div className='border-2 border-primary-color px-5 py-8  rounded-lg'>
                        <div className='flex justify-between text-2xl '>
                            <p>Premium</p>
                            <p>$5</p>
                        </div>
                        <div className='mt-10 pl-4'>
                            <ul>
                                <li className='list-disc'>Maximum 5 employees</li>
                            </ul>
                        </div>
                        <div className='mt-10'>
                            <p className='bg-secondary-color p-3 rounded-full text-center text-white text-lg'>Pay</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='border-2 border-primary-color px-5 py-8  rounded-lg'>
                        <div className='flex justify-between text-2xl '>
                            <p>Premium</p>
                            <p>$8</p>
                        </div>
                        <div className='mt-10 pl-4'>
                            <ul>
                                <li className='list-disc'>Maximum 10 employees</li>
                            </ul>
                        </div>
                        <div className='mt-10'>
                            <p className='bg-secondary-color p-3 rounded-full text-center text-white text-lg'>Pay</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='border-2 border-primary-color px-5 py-8  rounded-lg'>
                        <div className='flex justify-between text-2xl '>
                            <p>Premium</p>
                            <p>$15</p>
                        </div>
                        <div className='mt-10 pl-4'>
                            <ul>
                                <li className='list-disc'>Maximum 20 employees</li>
                            </ul>
                        </div>
                        <div className='mt-10'>
                            <p className='bg-secondary-color p-3 rounded-full text-center text-white text-lg'>Pay</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div>
                <div className='border border-primary-color px-5 py-8  rounded-lg'>
                    <div className='flex justify-between text-2xl '>
                        <p>Premium</p>
                        <p>$5</p>
                    </div>
                    <div className='mt-10 pl-4'>
                        <ul>
                            <li className='list-disc'>Maximum 5 employees</li>
                        </ul>
                    </div>
                    <div className='mt-10'>
                        <p className='bg-secondary-color p-3 rounded-full text-center text-white text-lg'>Pay</p>
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default PackageSection;