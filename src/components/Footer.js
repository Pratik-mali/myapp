// src/components/Footer.js
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; // Import Link if you need navigation

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo-text">mazabiodata.com</h2>
         
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; +91 77769 14543</span>
            <span><i className="fas fa-envelope"></i> &nbsp; mazabiodata@gmail.com</span>
          </div>
        </div>
        
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="mazabiodata.com"><i className="fab fa-facebook"></i></a>
            <a href="mazabiodata.com"><i className="fab fa-twitter"></i></a>
            <a href="mazabiodata.com"><i className="fab fa-instagram"></i></a>
            {/* <a href="#"><i className="fab fa-linkedin"></i></a> */}
          </div>
        </div>
      </div>
      <div className="footer-section links">
          <h2>Quick Links</h2>
          <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/terms">Terms and Conditions</Link>
          
        </div>
      <div className="footer-bottom">
        &copy; 2024 | Designed by xyz
      </div>
    </footer>
  );
};

export default Footer;
