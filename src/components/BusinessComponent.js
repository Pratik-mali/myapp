import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessComponent.css';
import FeedbackSlider from './FeedbackSlider';
import QuoteSlideshow from './QuoteSlideshow';
import TemplateSlider from './TemplateSlider';


const BusinessComponent = () => {
  const navigate = useNavigate();
  const [selectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = [
    { id: 1, category: 'Hindu', imageUrl: './Marriage Biodata Template-01.png', bestSeller: true },
    // { id: 23, category: 'Muslim', imageUrl: './Marriage Biodata Template-23.png', bestSeller: false },
    // { id: 24, category: 'Muslim', imageUrl: './Marriage Biodata Template-24.png', bestSeller: false },
    // { id: 25, category: 'Muslim', imageUrl: './Marriage Biodata Template-25.png', bestSeller: false },
    // { id: 26, category: 'Muslim', imageUrl: './Marriage Biodata Template-26.png', bestSeller: false },
    // { id: 27, category: 'Muslim', imageUrl: './Marriage Biodata Template-27.png', bestSeller: false },
    { id: 2, category: 'Muslim', imageUrl: './Marriage Biodata Template-02.png', bestSeller: false },
    { id: 3, category: 'Hindu', imageUrl: './Marriage Biodata Template-03.png', bestSeller: false },
    { id: 4, category: 'Muslim', imageUrl: './Marriage Biodata Template-04.png', bestSeller: false },
    { id: 5, category: 'Jain', imageUrl: './Marriage Biodata Template-05.png', bestSeller: true },
    { id: 6, category: 'Hindu', imageUrl: './Marriage Biodata Template-06.png', bestSeller: false },
    { id: 7, category: 'Baudhha', imageUrl: './Marriage Biodata Template-07.png', bestSeller: false },
    { id: 8, category: 'Jain', imageUrl: './Marriage Biodata Template-08.png', bestSeller: false },
    { id: 14, category: 'Jain', imageUrl: './Marriage Biodata Template-14.png', bestSeller: false },
    { id: 15, category: 'Hindu', imageUrl: './Marriage Biodata Template-15.png', bestSeller: false },
    { id: 9, category: 'Baudhha', imageUrl: './Marriage Biodata Template-09.png', bestSeller: false },
    { id: 10, category: 'Hindu', imageUrl: './Marriage Biodata Template-10.png', bestSeller: false },
    { id: 11, category: 'Baudhha', imageUrl: './Marriage Biodata Template-11.png', bestSeller: false },
    { id: 12, category: 'Hindu', imageUrl: './Marriage Biodata Template-12.png', bestSeller: false },
    { id: 13, category: 'Muslim', imageUrl: './Marriage Biodata Template-13.png', bestSeller: false },
   
    { id: 16, category: 'Muslim', imageUrl: './Marriage Biodata Template-16.png', bestSeller: false },
    // { id: 17, category: 'Jain', imageUrl: './Marriage Biodata Template-17.png', bestSeller: false },
    // { id: 18, category: 'Muslim', imageUrl: './Marriage Biodata Template-18.png', bestSeller: false },
    // { id: 19, category: 'Muslim', imageUrl: './Marriage Biodata Template-19.png', bestSeller: false },
    // { id: 20, category: 'Muslim', imageUrl: './Marriage Biodata Template-20.png', bestSeller: false },
    // { id: 21, category: 'Muslim', imageUrl: './Marriage Biodata Template-21.png', bestSeller: false },
    // { id: 22, category: 'Muslim', imageUrl: './Marriage Biodata Template-22.png', bestSeller: false },
  

  ];

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  // };

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
            <h1> <span className='hidemobile'>बायोडेटा साठी प्रत्येकाची पहिली पसंती....!</span> <br/><span className='brandname'>MAZABIODATA.COM</span></h1>
            <p className='brandpara'>Find and customize the perfect template for your needs</p>
            <div className="myButton">
              <button className="scroll-button" onClick={handleScrollToTemplates}>फोटोसह</button>
              <button className="scroll-button" onClick={handleScrollToTemplates}>फोटोशिवाय</button>
            </div>
          </div>
          {/* <img src="/starr.png" alt="Rotating" className="rotating-image" /> */}
        </div>
      </section>
      <section className="quotes-section">
        <QuoteSlideshow />
      </section>

      <section className="about-section1">
        <div className='impdiv'>
        <h1>बायोडाटा <br></br><span className='ka'>का</span> महत्त्वाचे?</h1>

        <p>
          सुखी आणि संपन्न आयुष्यासाठी प्रत्येकाला एका चांगल्या जोडीदाराची आवश्यकता असते. जोडीदाराचे व्यक्तिमत्व त्याच्यातले कलागुण आपल्याला माहिती होण्यासाठी एक योग्य बायोडाटा असणे गरजेचे असते. तुम्ही आमच्या प्लॅटफॉर्मच्या माध्यमातून योग्यरीत्या तुमचा बायोडाटा बनवू शकता.
          <b>माझा बायोडाटा</b> वेबसाईट वरती सगळी माहिती योग्यरीत्या भरता यावी याची आम्ही काळजी घेतली आहे. 
          तुमचा बायोडाटा अधिक आकर्षक आणि दर्जेदार असावा यासाठी आम्ही प्रयत्न केला आहे.
          सोशल मीडियाच्या माध्यमातून आज मोठ्या प्रमाणामध्ये आपल्याला अनेक गोष्टींची ओळख सहजरीत्या होते. आपण व्हाट्सअप वरील लिंकच्या माध्यमातून अगदी सहजरीच्या आपला बायोडाटा योग्यरीत्या व आकर्षक बनवू शकता. अत्यंत किफायतशीर किमतीमध्ये आपल्याला सेवेचा लाभ घेता येईल.
        </p>
       
        </div>
      
      </section>

      <section className="about-section2">
      <div className='impdiv'>
      <h1>अगदी <span className='ka'>सहज </span> उपयोगी</h1>

        <p>
          1. आपणास सर्व प्रथम mazabiodata.com असे गूगल वरती सर्च करायचं आहे नंतर तुम्हाला ही वेबसाईट ओपन होईल <br/>
          2. नंतर तुम्ही our templetes मधून सुसज्ज आणि सुंदर असे टेम्प्लेट select करायचं आहे.<br/>
          3. नंतर तुम्ही टेम्प्लेट चा खाली दिलेल्या वापरा ह्या बटनवर क्लिक करायचं आहे.<br/>
          4. नंतर तुम्ही next page वरती जाल मग तुम्हाला तुमची सर्व माहिती भरायची आहे उदा. नाव, वडिलांचे नाव.<br/>
          5. तुमची सर्व माहिती भरत असताना तुम्ही इंग्लिश keyboard वरून spelling type केलं तरी तिथे मराठी मध्ये येईल<br/>
          6. तुमची सर्व माहिती भरून झाल्यानंतर तुम्ही preview वरती क्लिक करून तुमचा बायोडाटा पाहू शकता.<br/>
          7. तुम्हाला जर वॉटरमार्क शिवाय बायोडाटा डाऊनलोड करायचं असेल तर तुम्ही download without watermark button वरती क्लिक करा. मग तुमचे फोन पेय किव्वा गूगल पेय वरून 49 rs pay करा <br/>
          8. मग तुमचा Biodata download होईल
        </p>

        </div>

      </section>

      <section className="templates-section" id="templates-section">
        <h2>Our Collection</h2>
        <TemplateSlider
          templates={filteredTemplates}
          onCustomizeClick={handleCustomizeClick}
          onPreviewClick={handlePreviewClick}
        />
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
    </div>
  );
};

export default BusinessComponent;
 