import React from 'react';
import './FeedbackSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import flowerIcon from '../assets/Shape 44 1.svg';

const feedbacks = [
  {
    text: 'ह्या वेबसाईटने माझ्या अपेक्षांना पूर्णत: खर्यात उतरवले. इथे दिलेल्या टिप्स आणि नमुन्यांनी माझा बायोडाटा अधिक प्रभावी झाला.मी नक्कीच ह्या वेबसाईटची शिफारस इतरांना करेन.धन्यवाद आणि शुभेच्छा!',
    name: 'प्रतिक गवळी',
  },
  {
    text: 'तुमच्या वेबसाईटने माझ्या करिअरच्या वाटचालीला खूपच मदत केली.माझ्या सर्व मित्रांना ही वेबसाईट वापरण्याचा सल्ला देईल. वेबसाईट वापरण्याचा अनुभव खूपच चांगला आहे.',
    name: 'स्वागती शिंदे',
  },
  {
    text: 'ह्या वेबसाईटने माझ्या अपेक्षांना पूर्णत: खर्यात उतरवले. इथे दिलेल्या टिप्स आणि नमुन्यांनी माझा बायोडाटा अधिक प्रभावी झाला.मी नक्कीच ह्या वेबसाईटची शिफारस इतरांना करेन.धन्यवाद आणि शुभेच्छा!',
    name: 'समीर शेख',
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
        speed={1000}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false
            },
            speed: 4000
          }
        }}
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <div className="feedback-card">
            <div className='angry'>

              <div className="avatar"></div>
              <h3>{feedback.name}</h3>
              </div>

              <p>{feedback.text}</p>
              <div className="decoration">
                <img src={flowerIcon} alt="flower icon" />
                <img src={flowerIcon} alt="flower icon" />
                <img src={flowerIcon} alt="flower icon" />
                <img src={flowerIcon} alt="flower icon" />
                <img src={flowerIcon} alt="flower icon" />

               
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackSlider;
