import React from 'react';
import styled from 'styled-components';

const PricingContainer = styled.section`
  width: 100%;
  padding: 50px;
  text-align: center;
  background-color: #f0f0f0;
  color: black;
  animation: fadeInLeft 2s ease-in-out;

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const PricingTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const PricingContent = styled.p`
  font-size: 1.2rem;
`;

const PricingSection = () => {
  return (
    <PricingContainer>
      <PricingTitle>Pricing</PricingTitle>
      <PricingContent>
        We offer competitive pricing plans to suit your needs. Choose from our basic, standard, and premium packages.
      </PricingContent>
    </PricingContainer>
  );
};

export default PricingSection;
