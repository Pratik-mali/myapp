// // src/components/ContactUs.js
// import React from 'react';
// import './ContactUs.css';

// const ContactUs = () => {
//   return (
//     <div className="contact-us-container">
//       <h2>Contact Us</h2>
//       <p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
//       <form className="contact-form">
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input type="text" id="name" name="name" placeholder="Your name" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" placeholder="Your email" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message">Message</label>
//           <textarea id="message" name="message" placeholder="Your message" rows="5" required></textarea>
//         </div>
//         <button type="submit" className="submit-button">Send Message</button>
//       </form>
//     </div>
//   );
// };

// export default ContactUs;


import React from 'react';
import styled from 'styled-components';

const ContactUs = () => {
  return (
    <ContactUsContainer>
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
      <form className="contact-form">
        <FormGroup>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email" required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your message" rows="5" required></textarea>
        </FormGroup>
        <SubmitButton type="submit">Send Message</SubmitButton>
      </form>
    </ContactUsContainer>
  );
};

export default ContactUs;

const ContactUsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    font-size: 2.5em;
    color: #333;
  }

  p {
    margin-bottom: 20px;
    font-size: 1.2em;
    color: #666;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    margin-bottom: 5px;
    font-size: 1.1em;
    color: #333;
  }

  input,
  textarea {
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  input:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;
