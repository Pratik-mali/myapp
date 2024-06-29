import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  width: 96.8%;
  height: 10vh;
  background-color: #0073e6; 
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  
`;

const NavLogo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 34px;
 
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 680px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding:10px;
  &:hover {
     
      border-radius:10px;

      background-color: #042a7d;
      
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  width:50px;
 

  @media (max-width: 900px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin: 3px 0;
  transition: 0.4s;
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0073e6; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;

  ${({ isOpen }) => isOpen && `
    display: flex;
  `}
`;

const MobileNavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  margin: 20px 0;
  &:hover {
    color: #00f; /* Blue color on hover */
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <NavLogo to="/">MazaBiodata</NavLogo>
      <NavLinks>
        <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/image-templates" onClick={() => setIsOpen(false)}>Templates</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)}>About Us</NavLink>
        <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact Us</NavLink>
        <NavLink to="/terms" onClick={() => setIsOpen(false)}>Terms & Conditions</NavLink>
      </NavLinks>
      <HamburgerIcon onClick={toggleMenu}>
        <Bar />
        <Bar />
        <Bar />
      </HamburgerIcon>
      <MobileMenu isOpen={isOpen}>
        <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
        <MobileNavLink to="/image-templates" onClick={toggleMenu}>Templates</MobileNavLink>
        <MobileNavLink to="/about" onClick={toggleMenu}>About Us</MobileNavLink>
        <MobileNavLink to="/contact" onClick={toggleMenu}>Contact Us</MobileNavLink>
        <MobileNavLink to="/terms" onClick={toggleMenu}>Terms & Conditions</MobileNavLink>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;
