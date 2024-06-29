import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  width: 99.7%;

  height: 100vh;
  background: url('https://via.placeholder.com/1500') no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  animation: fadeIn 2s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const HeroButton = styled.button`
  padding: 10px 20px;
  font-size: 1.5rem;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroTitle>Wedding Biodata Builder</HeroTitle>
      <HeroButtons>
        <HeroButton>Build with Image</HeroButton>
        <HeroButton>Build without Image</HeroButton>
      </HeroButtons>
    </HeroContainer>
  );
};

export default HeroSection;
