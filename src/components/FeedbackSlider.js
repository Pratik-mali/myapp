// src/components/FeedbackSlider.js
import React from 'react';
import './FeedbackSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

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
  }
];

const FeedbackSlider = () => {
  return (
    <div className="feedback-slider">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }} // Ensure Swiper is correctly handling autoplay
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