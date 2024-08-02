// AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.heading}>About Mazabiodata</h2>
      <p style={styles.paragraph}>Welcome to Mazabiodata, your premier destination for creating personalized wedding biodata in PDF format. Our mission is to provide a seamless and efficient solution for couples seeking to showcase their love story in a beautiful and professional manner.</p>

      <h2 style={styles.heading}>Why Choose Mazabiodata?</h2>

      <ul style={styles.list}>
        <li><strong>Effortless Creation:</strong> Our user-friendly interface allows you to input your details with ease, guiding you through each step of the process.</li>
        <li><strong>Customization Options:</strong> Tailor your biodata to your preferences with various design templates and layout options.</li>
        <li><strong>High-Quality PDF Output:</strong> We ensure that every PDF biodata generated on our platform meets the highest standards of quality and professionalism.</li>
        <li><strong>Instant Download:</strong> Once your biodata is ready, simply download it instantly and share it with your intended audience.</li>
      </ul>

      <div style={styles.privacy}>
        <h2 style={styles.subHeading}>Your Privacy Matters</h2>
        <p style={styles.paragraph}>We understand the sensitivity of personal information, especially when it comes to matters of the heart. That's why we prioritize the privacy and security of your data, ensuring that your information remains confidential at all times.</p>
      </div>

      <div style={styles.cta}>
        <h2 style={styles.subHeading}>Get Started Today!</h2>
        <p style={styles.paragraph}>Ready to create your personalized PDF biodata? Sign up now and begin crafting a document that captures the essence of your love story. Mazabiodata is here to simplify the process and help you present your story with pride and confidence.</p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    marginBottom: '15px',
  },
  subHeading: {
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    marginBottom: '10px',
  },
  paragraph: {
    color: '#666',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  list: {
    color: '#666',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
    listStyleType: 'none',
    paddingLeft: '0',
  },
  privacy: {
    marginBottom: '40px',
  },
  cta: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '5px',
  },
};

export default AboutUs;
