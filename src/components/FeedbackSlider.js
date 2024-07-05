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
    text: 'Working alongside Sandra has been an enriching experience, filled with deep insights and profound healing. Her dedication to ethical practice and holistic well-being shines through in every interaction, making her an indispensable asset in the psychedelic therapy field.',
    name: 'Laurie Smith',
    title: 'Psychedelic Artist'
  },
  {
    text: 'As compassionate as she is wise, I found her to be a welcome breath of fresh air within the psychedelic space, a supportive teacher and guide for those within her sphere. An exceptional individual who deeply values community support and growth.',
    name: 'Elisabeth A. Rose',
    title: 'Founder, Sage & Saints'
  },
  {
    text: 'Sandra brings a critically necessary, thoughtful, and integrative approach to psychedelic ethics. Her teachings both inspire and provoke important discussions on what it means to hold a safe and responsible container for individual and group integration.',
    name: 'Amanda Argot Efthimiou',
    title: 'Co-Founder, Reciproc Method'
  },
    {
    text: 'Working alongside Sandra has been an enriching experience, filled with deep insights and profound healing. Her dedication to ethical practice and holistic well-being shines through in every interaction, making her an indispensable asset in the psychedelic therapy field.',
    name: 'Laurie Smith',
    title: 'Psychedelic Artist'
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
