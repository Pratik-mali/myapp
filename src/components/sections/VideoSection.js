import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.section`
  width: 99.8%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: white;

  animation: fadeInUp 2s ease-in-out;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Video = styled.video`
  width: 80%;
  height: auto;
`;

const VideoSection = () => {
  return (
    <VideoContainer>
      <Video controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
    </VideoContainer>
  );
};

export default VideoSection;
