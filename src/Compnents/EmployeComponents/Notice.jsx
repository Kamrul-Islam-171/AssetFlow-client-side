import { Swiper, SwiperSlide } from 'swiper/react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { PDFDownloadLink } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    
});
const MyDocument = ({image}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image src={image} style={styles.image}></Image>
            </View>
            
        </Page>
    </Document>
);

const Notice = () => {
    const axiosPublic = useAxiosPublic();
    const { data: notice = [], isLoading } = useQuery({
        queryKey: ['notice-list'],
        queryFn: async () => {
            const { data } = await axiosPublic('/notice');
            return data;
        }
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    console.log("notice = ", notice);
    return (
        <div className='mt-16'>
            <h1 className='text-4xl text-center'>Notice</h1>
            <div className='mt-10 lg:mt-2'>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >

                    <SwiperSlide>
                        <div className='flex justify-center'>
                            <div className="space-y-3 h-[250px] md:h-[200px] lg:h-[200px] lg:w-1/2 flex flex-col justify-center items-center">
                                <h1 className="text-2xl">New Employee Orientation</h1>
                                <p>New Employee Orientation - June 25, 2024</p>
                                <button className='bg-primary-color text-white py-2 px-4'>
                                    <PDFDownloadLink document={<MyDocument image={notice[0]?.image} />} fileName="example.pdf">
                                        {({ blob, url, loading, error }) =>
                                            loading ? 'Loading document...' : 'Details'
                                        }
                                    </PDFDownloadLink>
                                </button>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex justify-center'>
                            <div className="space-y-3 h-[250px] md:h-[200px] lg:h-[200px] lg:w-1/2 flex flex-col justify-center items-center">
                                <h1 className="text-2xl">Upcoming Security Training</h1>
                                <p>Mandatory Security Training Session - November 25, 2024</p>
                                <button className='bg-primary-color text-white py-2 px-4'>
                                <PDFDownloadLink document={<MyDocument image={notice[1]?.image} />} fileName="example.pdf">
                                        {({ blob, url, loading, error }) =>
                                            loading ? 'Loading document...' : 'Details'
                                        }
                                    </PDFDownloadLink>
                                </button>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex justify-center'>
                            <div className="space-y-3 h-[250px] md:h-[200px] lg:h-[200px] lg:w-1/2 flex flex-col justify-center items-center">
                                <h1 className="text-2xl">Announcement</h1>
                                <p>Office Renovation Announcement</p>
                                <button className='bg-primary-color text-white py-2 px-4'>
                                <PDFDownloadLink document={<MyDocument image={notice[2]?.image} />} fileName="example.pdf">
                                        {({ blob, url, loading, error }) =>
                                            loading ? 'Loading document...' : 'Details'
                                        }
                                    </PDFDownloadLink>
                                </button>

                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default Notice;