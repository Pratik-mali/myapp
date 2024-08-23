import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules from swiper/modules
import { Navigation, Pagination } from 'swiper/modules';

const TemplateSlider = ({ templates, onCustomizeClick, onPreviewClick }) => {
  // Divide the templates into groups of 4 (2x2)
  const groupedTemplates = [];
  for (let i = 0; i < templates.length; i += 4) {
    groupedTemplates.push(templates.slice(i, i + 4));
  }

  return (
    <div style={styles.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination]} // Use modules from Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        style={styles.swiper} // Added to position navigation buttons
      >
        {groupedTemplates.map((group, index) => (
          <SwiperSlide key={index}>
            <div style={styles.slide}>
              {group.map((template) => (
                <div key={template.id} style={styles.templateOption}>
                  {/* {template.bestSeller && <div style={styles.bestSeller}>Best Seller</div>} */}
                  <img src={template.imageUrl} alt={`Template ${template.id}`} style={styles.image} />
                  <div style={styles.templateButtons}>
                    <button style={styles.templateButton} onClick={() => onPreviewClick(template)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button style={styles.templateButton} onClick={() => onCustomizeClick(template)}>वापरा</button>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const styles = {
  sliderContainer: {
    width: '80%',
    maxWidth: '80%',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    position: 'relative', // Make sure container is relative for absolute positioning of buttons
  },
  swiper: {
    paddingBottom: '50px', // Space for navigation buttons at the bottom
  },
  slide: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '10px',
    width: '100%',
    maxWidth: '600px',
    boxSizing: 'border-box',
    padding: '10px',
  },
  templateOption: {
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f72a7b',
    textAlign: 'center',
    padding: '10px',
    height: '230px', // Adjusted height for better display
  },
  bestSeller: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#ffd1dc',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '180px', // Adjust height to ensure the image fits well
    objectFit: 'contain', // Ensures the entire image is visible without getting cut off
    borderRadius: '5px',
  },
  templateButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  templateButton: {
    flex: 1,
    textAlign: 'center',
    padding: '5px',
    margin: '0 5px',
    backgroundColor: '#ffffff',
    color: '#f72a7b',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  // Custom styles for Swiper navigation buttons
  '.swiper-button-prev, .swiper-button-next': {
    color: '#f72a7b', // Change button color
    background: 'rgba(255, 255, 255, 0.8)', // Add background to make buttons visible
    padding: '10px', // Padding for larger clickable area
    borderRadius: '50%', // Rounded buttons
    bottom: '10px', // Position at bottom
    top: 'auto', // Override top positioning
    width: '40px', // Fixed width for consistency
    height: '40px', // Fixed height for consistency
    
  },
  '.swiper-button-prev': {
    left: '10px', // Position left button
  },
  '.swiper-button-next': {
    right: '10px', // Position right button
  },
};

export default TemplateSlider;
