import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";



const Bannar = () => {
    return (
        <div className="container mx-auto">
            <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>
                <div className="h-screen">
                    <img className="h-full object-cover" src={'https://i.ibb.co/FwZLVTK/pexels-rebrand-cities-1367272.jpg'} />
                    <p className="legend space-y-3 my-5">
                        <p className="text-3xl">Join As HR Manager</p>
                        <Link to={'/join-as-hr'} className="px-10 text-lg hover:bg-black  btn bg-transparent text-white outline-none">Join</Link>
                    </p>
                </div>
                <div className="h-screen">
                    <img className="h-full object-cover" src={'https://i.ibb.co/D9v4G0S/group-of-young-adults-stood-in-office-environment-925260686-5b37905246e0fb00374456f0.jpg'} />
                    <p className="legend space-y-3 my-5">
                        <p className="text-3xl">Join As Employee</p>
                        <Link to={'/join-as-employee'} className="px-10 text-lg hover:bg-black  btn bg-transparent text-white outline-none">Join</Link>
                    </p>
                </div>
               
            </Carousel>

            {/* <p className="text-5xl text-red-600">Hello how are your</p> */}
          
        </div>
    );
};

export default Bannar;