import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import feedbackApp from '../assets/feedbackApp.png';
import smartFood from '../assets/SmartFood.png';

function Gallery() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
        >
            <SwiperSlide><img src={feedbackApp} alt="Feedback App" /></SwiperSlide>
            <SwiperSlide><img src={smartFood} alt="Smart Food" /></SwiperSlide>
        </Swiper>
    );
}

export default Gallery;

