import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import './BusinessComponent.css';

const BusinessComponent = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-01.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-02.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-03.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-04.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-05.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-06.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-07.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-08.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-09.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-10.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-11.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-12.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-13.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-14.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-15.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-16.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-17.png' },
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-18.png' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState(null);

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

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter((template) => template.category === selectedCategory);

  return (
    <div className="business-container">
      <section className="about-section">
        <h2>Steps to Use</h2>
        <p>
          Follow these simple steps to use our templates for your needs. 
          We provide a wide variety of templates that are easy to use and customize.
        </p>
      </section>

      <section className="video-section">
        <h2>Watch the Tutorial</h2>
        <div className="video-wrapper">
          <YouTube videoId="YOUR_VIDEO_ID_HERE" opts={{ width: '100%', height: '360' }} />
        </div>
      </section>

      <section className="templates-section">
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
              <img src={template.imageUrl} alt={`Template ${template.id}`} />
              <div className="template-buttons">
                <button className="template-button" onClick={() => handlePreviewClick(template)}>Preview</button>
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
    </div>
  );
};

export default BusinessComponent;
