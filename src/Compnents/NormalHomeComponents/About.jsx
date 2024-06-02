import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,  Autoplay } from 'swiper/modules';
const About = () => {
    return (
        <div className="container mx-auto mt-16">
            <div className="grid lg:grid-cols-2 lg:p-28 gap-10 items-center">
                <div>
                    <img src={'https://i.ibb.co/hXqMnmT/Employer-Services-square-scaled.jpg'} alt="" />
                </div>
                <div className="">
                    <div className="space-y-3">
                        <h1 className="text-4xl">About Us</h1>
                        <p className="text-justify">Welcome to AssetFlow's Asset Management System, an innovative web application designed to assist businesses in efficiently managing their assets and products. Our platform is specifically crafted to support HR Managers in tracking and monitoring the utilization of company assets. By subscribing to AssetFlow, companies can streamline their asset management processes, ensuring optimal utilization and accountability across their organization.</p>
                    </div>
                    {/* <div className="space-y-3">
                        <h1 className="text-4xl">Our Mission</h1>
                        <p className="text-justify">Our mission at AssetFlow is to provide businesses with an intuitive, efficient, and secure asset management solution. We aim to simplify the complex tasks associated with asset tracking, enabling HR Managers to focus on strategic initiatives and improve overall resource management.</p>
                    </div> */}



                </div>
            </div>

            <div className='mt-10 lg:mt-2'>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >

                    <SwiperSlide>
                        <div className='flex justify-center'>
                            <div className="space-y-3 h-[250px] md:h-[200px] lg:h-[200px] lg:w-1/2">
                                <h1 className="text-4xl">Our Mission</h1>
                                <p className="text-justify">Our mission at AssetFlow is to provide businesses with an intuitive, efficient, and secure asset management solution. We aim to simplify the complex tasks associated with asset tracking, enabling HR Managers to focus on strategic initiatives and improve overall resource management.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex justify-center'>
                            <div className="space-y-3 h-[250px] md:h-[200px] lg:h-[200px] lg:w-1/2">
                                <h1 className="text-4xl">Our Vision</h1>
                                <p className="text-justify">Our vision is to revolutionize asset management by creating a world where businesses can seamlessly manage and optimize their resources. We strive to be the leading provider of asset management solutions, empowering companies to achieve greater efficiency, transparency, and sustainability in their operation.</p>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>


        </div>
    );
};

export default About;