// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusinessComponent from './components/BusinessComponent';
import ImageTemplatesComponent from './components/ImageTemplatesComponent';
import InputFormPage from './components/InputFormPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import Navbar from './components/Navbar';
import PreviewPage from './components/PreviewPage'; // Import PreviewPage component
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<BusinessComponent />} />
          <Route path="/image-templates" element={<ImageTemplatesComponent />} />
          <Route path="/input-form/:templateId" element={<InputFormPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/preview" element={<PreviewPage />} /> {/* Ensure PreviewPage route exists but not in navbar */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
