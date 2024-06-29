// ImageTemplatesComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ImageTemplatesComponent = () => {
  const navigate = useNavigate();

  // Sample image template data with 5 categories and 4 images each
  const templates = [
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-01.png' },
    { id: 2, category: 'Category 1', imageUrl: './Marriage Biodata Template-02.png' },
    { id: 3, category: 'Category 1', imageUrl: './Marriage Biodata Template-03.png' },
    { id: 4, category: 'Category 1', imageUrl: './Marriage Biodata Template-04.png' },
    { id: 5, category: 'Category 2', imageUrl: './Marriage Biodata Template-05.png' },
    { id: 6, category: 'Category 2', imageUrl: './Marriage Biodata Template-06.png' },
    { id: 7, category: 'Category 2', imageUrl: './Marriage Biodata Template-07.png' },
    { id: 8, category: 'Category 2', imageUrl: './Marriage Biodata Template-08.png' },
    { id: 9, category: 'Category 3', imageUrl: './Marriage Biodata Template-09.png' },
    { id: 10, category: 'Category 3', imageUrl: './Marriage Biodata Template-10.png' },
    { id: 11, category: 'Category 3', imageUrl: './Marriage Biodata Template-11.png' },
    { id: 12, category: 'Category 3', imageUrl: './Marriage Biodata Template-12.png' },
    { id: 13, category: 'Category 4', imageUrl: './Marriage Biodata Template-13.png' },
    { id: 14, category: 'Category 4', imageUrl: './Marriage Biodata Template-14.png' },
    { id: 15, category: 'Category 4', imageUrl: './Marriage Biodata Template-15.png' },
    { id: 16, category: 'Category 4', imageUrl: './Marriage Biodata Template-16.png' },
    { id: 17, category: 'Category 5', imageUrl: './Marriage Biodata Template-17.png' },
    { id: 18, category: 'Category 5', imageUrl: './Marriage Biodata Template-18.png' },
    { id: 19, category: 'Category 5', imageUrl: './Marriage Biodata Template-19.png' },
    { id: 20, category: 'Category 5', imageUrl: './Marriage Biodata Template-20.png' },
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
    <Wrapper>
      <h2>Choose Image Template</h2>
      <FilterButtons>
        <FilterButton
          className={selectedCategory === 'All' ? 'active' : ''}
          onClick={() => handleCategoryChange('All')}
        >
          All
        </FilterButton>
        {Array.from(new Set(templates.map(template => template.category))).map((category) => (
          <FilterButton
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterButtons>
      <TemplateOptions>
        {filteredTemplates.map((template) => (
          <TemplateOption key={template.id} onClick={() => handleImageClick(template)}>
            <TemplateImage src={template.imageUrl} alt={`Template ${template.id}`} />
          </TemplateOption>
        ))}
      </TemplateOptions>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 80px 20px;
  text-align: center;
`;

const FilterButtons = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  border-radius: 20px; /* Rounded corners */
`;

const TemplateOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TemplateOption = styled.div`
  margin: 10px;
  cursor: pointer;
  border-radius: 10px; /* Rounded corners */
  overflow: hidden; /* Ensures images do not overflow rounded corners */
`;

const TemplateImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  max-height: 200px;
  object-fit: cover;
  border: 2px solid #ddd;
  transition: transform 0.3s ease;
  border-radius: 10px; /* Rounded corners */
`;

export default ImageTemplatesComponent;
