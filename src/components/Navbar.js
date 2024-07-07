import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img src="/logo.png" alt="Sandra Dreisbach" className="navbar-logo" />
        </Link>
        <div className="navbar-menu-desktop">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/image-templates" onClick={closeMenu}>Templates</Link>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
          <Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link>
        </div>
        <Link to="/image-templates" className="self-assess-button" onClick={closeMenu}>
          <i className="fab fa-whatsapp"></i> Matrimony
        </Link>
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span className="hamburger-icon"></span>
        </button>
        <div className={`navbar-menu-mobile ${isOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/image-templates" onClick={closeMenu}>Templates</Link>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
          <Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
