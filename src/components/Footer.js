import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 99.7%;
  background-color: black;
  color: white;
  padding: 20px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 10px;
`;

const FooterTitle = styled.h4`
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 5px 0;
  display: block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid white;
  padding-top: 10px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Footer = () => {
 



const closeMenu = () => {
 
};

  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>About Us</FooterTitle>
          <p>We provide the best tools to build and customize your wedding biodata.</p>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Links</FooterTitle>
          <FooterLink href="/" onClick={closeMenu}>Home</FooterLink>
          <FooterLink href="/image-templates" onClick={closeMenu}>Templates</FooterLink>
          <FooterLink href="/about" onClick={closeMenu}>About Us</FooterLink>
          <FooterLink href="/contact" onClick={closeMenu}>Contact Us</FooterLink>
          <FooterLink href="/terms" onClick={closeMenu}>Terms & Conditions</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Contact Us</FooterTitle>
          <p>Email: support@mazabiodata.com</p>
          <p>Phone: +91 7776897632</p>
        </FooterColumn>
      </FooterContent>
      <FooterBottom>
        <div>&copy; 2024 Param InnovateX. All rights reserved.</div>
        <div>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
