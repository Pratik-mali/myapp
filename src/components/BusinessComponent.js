import React from 'react';
import styled from 'styled-components';
import HeroSection from './sections/HeroSection';
import VideoSection from './sections/VideoSection';
import InfoSection from './sections/InfoSection';
import PricingSection from './sections/PricingSection';
import ServicesSection from './sections/ServicesSection';
import TemplateSection from './sections/TempletSection';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection />
      <TemplateSection/>
      <VideoSection />
      <InfoSection />
    </HomeContainer>
  );
};

export default Home;
