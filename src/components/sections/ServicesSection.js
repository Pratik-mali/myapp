import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.section`
  width: 100%;
  padding: 50px;
  text-align: center;
  background-color: white;
  color: black;
  animation: fadeInDown 2s ease-in-out;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ServicesTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const ServicesContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ServiceItem = styled.div`
  width: 250px;
  padding: 20px;
  text-align: center;
  background-color: #e0e0e0;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
`;

const ServicesSection = () => {
  return (
    <ServicesContainer>
      <ServicesTitle>Our Services</ServicesTitle>
      <ServicesContent>
        <ServiceItem>
          <ServiceTitle>Customizable Templates</ServiceTitle>
          <ServiceDescription>Choose from a variety of templates to suit your style and preferences.</ServiceDescription>
        </ServiceItem>
        <ServiceItem>
          <ServiceTitle>Easy Editing</ServiceTitle>
          <ServiceDescription>Edit your biodata easily with our user-friendly interface.</ServiceDescription>
        </ServiceItem>
        <ServiceItem>
          <ServiceTitle>Download in PDF</ServiceTitle>
          <ServiceDescription>Download your biodata in PDF format with a single click.</ServiceDescription>
        </ServiceItem>
        <ServiceItem>
          <ServiceTitle>Customer Support</ServiceTitle>
          <ServiceDescription>Our support team is here to help you 24/7.</ServiceDescription>
        </ServiceItem>
      </ServicesContent>
    </ServicesContainer>
  );
};

export default ServicesSection;
