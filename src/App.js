import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusinessComponent from './components/BusinessComponent';
import ImageTemplatesComponent from './components/ImageTemplatesComponent';
import InputFormPage from './components/InputFormPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import Navbar from './components/Navbar';
import PreviewPage from './components/PreviewPage';
import Footer from './components/Footer';
import UsePolicy from './components/UsePolicy';
import JoinWhatsAppGroup from './components/JoinWhatsAppGroup'; // Import Join WhatsApp Group
import '@fortawesome/fontawesome-free/css/all.min.css';

const JoinPage = () => {
  return <h2>Join Page Placeholder</h2>; // Placeholder for the "Join" page
};

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
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/use-policy" element={<UsePolicy />} />
          <Route path="/join-whatsapp-group" element={<JoinWhatsAppGroup />} /> {/* Join WhatsApp Group Route */}
          <Route path="/join" element={<JoinPage />} /> {/* Add the Join page route */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
