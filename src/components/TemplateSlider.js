import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TemplateSlider.css';
// Import required modules from swiper/modules
import { Navigation, Pagination } from 'swiper/modules';

// Custom hook to detect screen size
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const TemplateSlider = ({ templates, onCustomizeClick, onPreviewClick }) => {
  const isMobile = useIsMobile();

  // Divide the templates into groups of 4 (2x2) for mobile slider
  const groupedTemplates = [];
  for (let i = 0; i < templates.length; i += 4) {
    groupedTemplates.push(templates.slice(i, i + 4));
  }

  return (
    <div style={styles.sliderContainer}>
      {isMobile ? (
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
      ) : (
        // Render templates in a grid for desktop view (4 in each row)
        <div style={styles.gridContainer}>
          {templates.map((template) => (
            <div key={template.id} style={styles.templateOption}>
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
      )}
    </div>
  );
};

const styles = {
  sliderContainer: {
    width: '100%', // Full width of the screen
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  swiper: {
    paddingBottom: '50px',
  },
  slide: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '10px',
    width: '100%',
    maxWidth: '1000px',
    boxSizing: 'border-box',
    padding: '0',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns for desktop
    gap: '20px',
    width: '100vw', // Set the grid width to 80% of the total screen width (80vw)
    margin: '0 auto', // Center the grid on the screen
    boxSizing: 'border-box',
    padding: '20px 0',
  },
  templateOption: {
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '300px', // Increase height for larger templates on desktop
    objectFit: 'contain',
    borderRadius: '5px',
  },
  templateButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '10px',
    padding: '0',
  },
  templateButton: {
    flex: 1,
    textAlign: 'center',
    padding: '8px',
    margin: '0 5px',
    backgroundColor: '#ffffff',
    color: '#f72a7b',
    borderRadius: '5px',
    border: '1px solid #f72a7b',
    cursor: 'pointer',
    fontSize: '14px',
  },
  // Custom styles for Swiper navigation buttons
  '.swiper-button-prev, .swiper-button-next': {
    color: '#f72a7b',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '50%',
    bottom: '10px',
    top: 'auto',
    width: '40px',
    height: '40px',
  },
  '.swiper-button-prev': {
    left: '10px',
  },
  '.swiper-button-next': {
    right: '10px',
  },
};

export default TemplateSlider;
