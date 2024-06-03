import React from 'react';

const EmployeeAssetTable = ({assets}) => {
    const handleRequest = (id) => {
        console.log(id)
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Type</th>
                            <th>Availablity</th>
                            <th>Request an Asset</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {
                            assets?.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductType}</td>
                                <td>{item.Quantity > 0 ?  'Available' : 'Out Of Stcok'}</td>
                                <td><button onClick={() => handleRequest(item._id)} disabled={!item.Quantity} className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Request</button></td>
                                {/* <td><button className="btn hover:text-primary-color hover:bg-white bg-primary-color border-0 text-white">Delete</button></td> */}
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeAssetTable;