// components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if you need navigation
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; 2024 mazabiodata.com</p>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/terms">Terms and Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
