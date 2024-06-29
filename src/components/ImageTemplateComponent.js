// ImageTemplatesComponent.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const ImageTemplatesComponent = () => {
  const history = useHistory();

  // Function to handle image click and redirect to input form page
  const handleImageClick = (templateId) => {
    history.push(`/input-form/${templateId}`);
  };

  // Sample image template data
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

  return (
    <div>
      <h2>Choose Image Template</h2>
      <div>
        {templates.map((template) => (
          <div key={template.id} onClick={() => handleImageClick(template.id)}>
            <img src={template.imageUrl} alt={`Template ${template.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTemplatesComponent;
