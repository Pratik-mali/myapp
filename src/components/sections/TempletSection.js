// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import YouTube from 'react-youtube';
// import './BusinessComponent.css';

// const BusinessComponent = () => {
//   const navigate = useNavigate();

//   const templates = [
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-01.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-02.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-03.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-04.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-05.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-06.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-07.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-08.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-09.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-10.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-11.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-12.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-13.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-14.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-15.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-16.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-17.png' },
//     { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-18.png' },


//   ];

//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleImageClick = (template) => {
//     navigate(`/input-form/${template.id}`);
//   };

//   const filteredTemplates = selectedCategory === 'All'
//     ? templates
//     : templates.filter((template) => template.category === selectedCategory);

//   return (
//     <div className="business-container">
//       <section className="about-section">
//         <h2>Steps to Use</h2>
//         <p>
//           Follow these simple steps to use our templates for your needs. 
//           We provide a wide variety of templates that are easy to use and customize.
//         </p>
//       </section>

//       <section className="video-section">
//         <h2>Watch the Tutorial</h2>
//         <div className="video-wrapper">
//           <YouTube videoId="YOUR_VIDEO_ID_HERE" opts={{ width: '100%', height: '360' }} />
//         </div>
//       </section>

//       <section className="templates-section">
//         <h2>Our Templates</h2>
//         <div className="filter-buttons">
//           <button
//             className={selectedCategory === 'All' ? 'active' : ''}
//             onClick={() => handleCategoryChange('All')}
//           >
//             All
//           </button>
//           {Array.from(new Set(templates.map(template => template.category))).map((category) => (
//             <button
//               key={category}
//               className={selectedCategory === category ? 'active' : ''}
//               onClick={() => handleCategoryChange(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <div className="template-options">
//           {filteredTemplates.map((template) => (
//             <div key={template.id} className="template-option" onClick={() => handleImageClick(template)}>
//               <img src={template.imageUrl} alt={`Template ${template.id}`} />
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BusinessComponent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const TemplateSection = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, category: 'Category 1', imageUrl: './Marriage Biodata Template-01.png' },
    { id: 2, category: 'Category 1', imageUrl: './Marriage Biodata Template-02.png' },
    { id: 3, category: 'Category 1', imageUrl: './Marriage Biodata Template-03.png' },
    { id: 4, category: 'Category 1', imageUrl: './Marriage Biodata Template-04.png' },
    { id: 5, category: 'Category 1', imageUrl: './Marriage Biodata Template-05.png' },
    { id: 6, category: 'Category 1', imageUrl: './Marriage Biodata Template-06.png' },
    { id: 7, category: 'Category 1', imageUrl: './Marriage Biodata Template-07.png' },
    { id: 8, category: 'Category 1', imageUrl: './Marriage Biodata Template-08.png' },
    { id: 9, category: 'Category 1', imageUrl: './Marriage Biodata Template-09.png' },
    { id: 10, category: 'Category 1', imageUrl: './Marriage Biodata Template-10.png' },
    { id: 11, category: 'Category 1', imageUrl: './Marriage Biodata Template-11.png' },
    { id: 12, category: 'Category 1', imageUrl: './Marriage Biodata Template-12.png' },
    { id: 13, category: 'Category 1', imageUrl: './Marriage Biodata Template-13.png' },
    { id: 14, category: 'Category 1', imageUrl: './Marriage Biodata Template-14.png' },
    { id: 15, category: 'Category 1', imageUrl: './Marriage Biodata Template-15.png' },
    { id: 16, category: 'Category 1', imageUrl: './Marriage Biodata Template-16.png' },
    { id: 17, category: 'Category 1', imageUrl: './Marriage Biodata Template-17.png' },
    { id: 18, category: 'Category 1', imageUrl: './Marriage Biodata Template-18.png' },
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
    <BusinessContainer>
      <TemplatesSection>
        <h2>Our Templates</h2>
        <FilterButtons>
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
        </FilterButtons>
        <TemplateOptions>
          {filteredTemplates.map((template) => (
            <TemplateOption key={template.id} onClick={() => handleImageClick(template)}>
              <img src={template.imageUrl} alt={`Template ${template.id}`} />
            </TemplateOption>
          ))}
        </TemplateOptions>
      </TemplatesSection>
    </BusinessContainer>
  );
};

export default TemplateSection;

const BusinessContainer = styled.div`

  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
`;


const TemplatesSection = styled.section`
  margin-bottom: 15%;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #0073e6;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  gap: 5px;

  button {
    background: linear-gradient(45deg, #0073e6, #005bb5);
    color: #fff;
    border: none;
    width: 100px;
    padding: 2px 5px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
    border-radius: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    white-space: nowrap;

    &.active,
    &:hover {
      background: linear-gradient(45deg, #005bb5, #003f8a);
      transform: translateY(-2px);
    }
  }
`;

const TemplateOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const TemplateOption = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, z-index 0.3s ease;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, z-index 0.3s ease;
  }

  &:hover {
    transform: scale(2.2);
    z-index: 1;
  }
`;


