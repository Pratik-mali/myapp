// src/components/ImageTemplatesComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageTemplatesComponent.css';

const ImageTemplatesComponent = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, category: 'Category 1', imageUrl: 'https://i.pinimg.com/originals/d4/de/1a/d4de1a86d04a9a0d1637d18e50ee4a7c.jpg' },
    { id: 2, category: 'Category 1', imageUrl: 'https://i.pinimg.com/originals/d4/de/1a/d4de1a86d04a9a0d1637d18e50ee4a7c.jpg' },
    { id: 3, category: 'Category 2', imageUrl: 'https://i.pinimg.com/originals/d4/de/1a/d4de1a86d04a9a0d1637d18e50ee4a7c.jpg' },
    { id: 4, category: 'Category 2', imageUrl: 'https://i.pinimg.com/originals/d4/de/1a/d4de1a86d04a9a0d1637d18e50ee4a7c.jpg' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (template) => {
    navigate(`/input-form/${template.id}`);
  };

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter((template) => template.category === selectedCategory);

  return (
    <section className="image-templates-section">
      <h2>Choose Image Template</h2>
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
          <div key={template.id} className="template-option" onClick={() => handleImageClick(template)}>
            <img src={template.imageUrl} alt={`Template ${template.id}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageTemplatesComponent;
