

const Events = () => {
    return (
        <>
            <div className="mt-16">
                <h1 className="text-center text-4xl">Upcoming Events</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 container mx-auto gap-6 mt-10">
                <div className="relative h-[500px] ">
                    <img className="h-full  object-cover w-full" src={'https://i.ibb.co/56zS3rp/pngtree-a-conceptual-illustration-of-web-design-development-and-seo-optimization-in-image-13584944.png'} alt="" />

                    <div className="text-white absolute top-0 w-full bg-black opacity-60 h-full text-center">
                        {/* <h1>Web Development Workshop</h1>
                    <p> A hands-on workshop where employees can learn about the latest trends and technologies in web development. Lunch will be provided.</p>
                    <p>June 20, 2024, 10:00 AM - 3:00 PM</p>
                    <p>Main Conference Room, Company Headquarters</p> */}
                    </div>
                    <div className="text-white absolute top-0 space-y-2 w-full h-full text-center py-36 px-5">
                        <h1 className="text-4xl font-bold">Web Development Workshop</h1>
                        <p> A hands-on workshop where employees can learn about the latest trends and technologies in web development. Lunch will be provided.</p>
                        <p className="text-2xl">June 20, 2024, 10:00 AM - 3:00 PM</p>
                        <p className="text-2xl">Main Conference Room, Company Headquarters</p>
                    </div>

                </div>
                <div className="relative h-[500px] ">
                    <img className="h-full object-cover w-full" src={'https://i.ibb.co/smgcNDj/web-development.webp'} alt="" />

                    <div className="text-white absolute top-0 w-full bg-black opacity-60 h-full text-center">
                        {/* <h1>Web Development Workshop</h1>
                    <p> A hands-on workshop where employees can learn about the latest trends and technologies in web development. Lunch will be provided.</p>
                    <p>June 20, 2024, 10:00 AM - 3:00 PM</p>
                    <p>Main Conference Room, Company Headquarters</p> */}
                    </div>
                    <div className="text-white absolute top-0 space-y-2 w-full h-full text-center py-36 px-5">
                        <h1 className="text-4xl font-bold">Client Project Showcase</h1>
                        <p>An event to showcase the latest projects completed for clients, with presentations from the development teams and feedback sessions.</p>
                        <p className="text-2xl">August 5, 2024, 2:00 PM - 5:00 PM</p>
                        <p className="text-2xl">Auditorium, Company Headquarters</p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Events;