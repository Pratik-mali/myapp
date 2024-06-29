import React from 'react';
import styled from 'styled-components';

const InfoContainer = styled.section`
  width: 99.7%;
  padding: 50px 0 50px 0 ;
  text-align: center;
  background-color: white;
  color: black;
  animation: fadeInRight 2s ease-in-out;

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const InfoTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const InfoContent = styled.p`
  font-size: 1.2rem;
`;

const InfoSection = () => {
  return (
    <InfoContainer>
      <InfoTitle>How to Download the Resume</InfoTitle>
      <InfoContent>
        After building your wedding biodata, you can download the resume in a PDF format with just one click. 
        The process is simple and user-friendly.
      </InfoContent>
    </InfoContainer>
  );
};

export default InfoSection;
