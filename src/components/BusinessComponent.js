import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessComponent.css';
import FeedbackSlider from './FeedbackSlider';
import QuoteSlideshow from './QuoteSlideshow';

const BusinessComponent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = [
    { id: 1, category: 'Hindu', imageUrl: './Marriage Biodata Template-01.png', bestSeller: true },
    { id: 2, category: 'Muslim', imageUrl: './Marriage Biodata Template-02.png', bestSeller: false },
    { id: 3, category: 'Hindu', imageUrl: './Marriage Biodata Template-03.png', bestSeller: false },
    { id: 4, category: 'Muslim', imageUrl: './Marriage Biodata Template-04.png', bestSeller: false },
    { id: 5, category: 'Jain', imageUrl: './Marriage Biodata Template-05.png', bestSeller: true },
    { id: 6, category: 'Hindu', imageUrl: './Marriage Biodata Template-06.png', bestSeller: false },
    { id: 7, category: 'Baudhha', imageUrl: './Marriage Biodata Template-07.png', bestSeller: false },
    { id: 8, category: 'Jain', imageUrl: './Marriage Biodata Template-08.png', bestSeller: false },
    { id: 9, category: 'Baudhha', imageUrl: './Marriage Biodata Template-09.png', bestSeller: false },
    { id: 10, category: 'Hindu', imageUrl: './Marriage Biodata Template-10.png', bestSeller: false },
    { id: 11, category: 'Baudhha', imageUrl: './Marriage Biodata Template-11.png', bestSeller: false },
    { id: 12, category: 'Hindu', imageUrl: './Marriage Biodata Template-12.png', bestSeller: false },
    { id: 13, category: 'Muslim', imageUrl: './Marriage Biodata Template-13.png', bestSeller: false },
    { id: 14, category: 'Jain', imageUrl: './Marriage Biodata Template-14.png', bestSeller: false },
    { id: 15, category: 'Hindu', imageUrl: './Marriage Biodata Template-15.png', bestSeller: false },
    { id: 16, category: 'Muslim', imageUrl: './Marriage Biodata Template-16.png', bestSeller: false },
    { id: 17, category: 'Jain', imageUrl: './Marriage Biodata Template-17.png', bestSeller: false },
    { id: 18, category: 'Muslim', imageUrl: './Marriage Biodata Template-18.png', bestSeller: false },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCustomizeClick = (template) => {
    navigate(`/input-form/${template.id}`);
  };

  const handlePreviewClick = (template) => {
    setPreviewTemplate(template);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  const handleScrollToTemplates = () => {
    document.getElementById('templates-section').scrollIntoView({ behavior: 'smooth' });
  };

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter((template) => template.category === selectedCategory);

  return (
    <div className="business-container">
      <section className="hero-section">
        <div className="hero-image">
          <div className="hero-text">
            <h1>प्रभावी बायोडाटा सेवांसाठी तुमची पहिली पसंती! <br></br>'mazabiodata.com'</h1>
            <p>Find and customize the perfect template for your needs</p>
    <div className="myButton">
            <button className="scroll-button" onClick={handleScrollToTemplates}>Explore Templates</button>
            <button className="scroll-button" onClick={handleScrollToTemplates}>With Photo</button>
            <button className="scroll-button" onClick={handleScrollToTemplates}>Without Photo</button>
            </div>
          </div>
          <img src="/starr.png" alt="Rotating" className="rotating-image" />
        </div>
      </section>

      <section className="about-section">
        <h2>बायोडाटा का महत्त्वाचे</h2>
        <p>
 सुखी आणि संपन्न आयुष्यासाठी प्रत्येकाला एका चांगल्या जोडीदाराची आवश्यकता असते. जोडीदाराचे व्यक्तिमत्व त्याच्यातले कलागुण आपल्याला माहिती होण्यासाठी एक योग्य बायोडाटा असणे गरजेचे असते. तुम्ही आमच्या प्लॅटफॉर्मच्या माध्यमातून योग्यरीत्या तुमचा बायोडाटा बनवू शकता.<br></br>
<b>माझा बायोडाटा</b> वेबसाईट वरती सगळी माहिती योग्यरीत्या भरता यावी याची आम्ही काळजी घेतली आहे. <br></br>
तुमचा बायोडाटा अधिक आकर्षक आणि दर्जेदार असावा यासाठी आम्ही प्रयत्न केला आहे.<br></br>
सोशल मीडियाच्या माध्यमातून आज मोठ्या प्रमाणामध्ये आपल्याला अनेक गोष्टींची ओळख सहजरीत्या होते. आपण व्हाट्सअप वरील लिंकच्या माध्यमातून अगदी सहजरीच्या आपला बायोडाटा योग्यरीत्या व आकर्षक बनवू शकता. अत्यंत किफायतशीर किमतीमध्ये आपल्याला सेवेचा लाभ घेता येईल.
        </p>
      </section>

      <section className="about-section">
        <h2>Steps to Use</h2>
        <p>
          Follow these simple steps to use our templates for your needs. 
          We provide a wide variety of templates that are easy to use and customize.
        </p>
      </section>

      <section className="templates-section" id="templates-section">
        <h2>Our Templates</h2>
        <div className="filter-buttons">
          <button
            className={selectedCategory === 'All' ? 'active' : ''}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          {Array.from(new Set(templates.map(template => template.category))).map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="template-options">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="template-option">
              {template.bestSeller && <div className="best-seller">Best Seller</div>}
              <img src={template.imageUrl} alt={`Template ${template.id}`} />
              <p className="template-description"> Temp {template.id}.</p>
              <div className="template-buttons">
                <button className="template-button" onClick={() => handlePreviewClick(template)}>
                  <i className="fas fa-eye"></i>
                </button>
                <button className="template-button" onClick={() => handleCustomizeClick(template)}>Use</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {previewTemplate && (
        <div className="preview-modal">
          <div className="preview-content">
            <button className="close-button" onClick={handleClosePreview}>✖</button>
            <img src={previewTemplate.imageUrl} alt={`Template ${previewTemplate.id}`} />
            <button className="template-button" onClick={() => handleCustomizeClick(previewTemplate)}>Customize</button>
          </div>
        </div>
      )}
      <FeedbackSlider />
      <QuoteSlideshow />
    </div>
  );
};

export default BusinessComponent;
