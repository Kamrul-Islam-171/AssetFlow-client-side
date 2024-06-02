import { ScaleLoader } from "react-spinners";


const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ScaleLoader color="#7851a9" />
        </div>
    );
};

export default LoadingSpinner;