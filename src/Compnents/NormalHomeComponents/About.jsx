

const About = () => {
    return (
        <div className="container mx-auto mt-16">
            <div className="grid lg:grid-cols-2 lg:p-28 gap-10 items-center">
                <div>
                    <img src={'https://i.ibb.co/hXqMnmT/Employer-Services-square-scaled.jpg'} alt="" />
                </div>
                <div className="space-y-10">
                    <div className="space-y-3">
                        <h1 className="text-4xl">About Us</h1>
                        <p className="text-justify">Welcome to AssetFlow's Asset Management System, an innovative web application designed to assist businesses in efficiently managing their assets and products. Our platform is specifically crafted to support HR Managers in tracking and monitoring the utilization of company assets. By subscribing to AssetFlow, companies can streamline their asset management processes, ensuring optimal utilization and accountability across their organization.</p>
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-4xl">Our Mission</h1>
                        <p className="text-justify">Our mission at AssetFlow is to provide businesses with an intuitive, efficient, and secure asset management solution. We aim to simplify the complex tasks associated with asset tracking, enabling HR Managers to focus on strategic initiatives and improve overall resource management.</p>
                    </div>

                </div>
            </div>
            {/* <div className="text-center space-y-5">
                <h1 className="text-4xl">Our Mission</h1>
                <div className="flex justify-center">
                    <p className="w-1/2">Our mission at AssetFlow is to provide businesses with an intuitive, efficient, and secure asset management solution. We aim to simplify the complex tasks associated with asset tracking, enabling HR Managers to focus on strategic initiatives and improve overall resource management.</p>
                </div>
            </div> */}
        </div>
    );
};

export default About;