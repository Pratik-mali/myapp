import React from 'react';
import './FeedbackSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const feedbacks = [
  {
    text: '"Mazabiodata.com वेबसाईट अत्यंत उपयोगी ठरली आहे. माझ्या क्षेत्रासाठी योग्य असा बायोडाटा Templete मिळाले आणि त्याचा वापर करून माझा बायोडाटा तयार केला. साईटच्या वापरामुळे वेळ वाचला आणि काम सोपे झाले. उत्कृष्ट सेवा दिल्याबद्दल धन्यवाद!"',
    name: 'Laurie Smith',
    title: 'Psychedelic Artist'
  },
  {
    text: '"तुमच्या Mazabiodata वेबसाईटने माझ्या करिअरच्या वाटचालीला खूपच मदत केली.माझ्या सर्व मित्रांना ही वेबसाईट वापरण्याचा सल्ला देईल. वेबसाईट वापरण्याचा अनुभव खूपच चांगला आहे."',
    name: 'Elisabeth A. Rose',
    title: 'Founder, Sage & Saints'
  },
  {
    text: '"ह्या वेबसाईटने माझ्या अपेक्षांना पूर्णत: खर्यात उतरवले. इथे दिलेल्या टिप्स आणि नमुन्यांनी माझा बायोडाटा अधिक प्रभावी झाला.मी नक्कीच ह्या वेबसाईटची शिफारस इतरांना करेन.धन्यवाद आणि शुभेच्छा!"',
    name: 'Amanda Argot Efthimiou',
    title: 'Co-Founder, Reciproc Method'
  }
];

const FeedbackSlider = () => {
  return (
    <div className="feedback-slider">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        speed={1000} // Adjust speed for smoother scrolling
        modules={[Autoplay, Pagination]} // Use the modules prop to include Autoplay and Pagination
        pagination={{ clickable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false
            },
            speed: 4000 // Slow speed for desktop view
          }
        }}
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <div className="feedback-card">
              <p>{feedback.text}</p>
              <h3>{feedback.name}</h3>
              <p>{feedback.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackSlider;
