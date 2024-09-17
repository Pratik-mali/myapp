import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuoteSlideshow.css';

const slides = [
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'विवाह म्हणजे दोन जीवांची एकत्र यात्रा.'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'प्रत्येक जोडीचा एक अनोखा प्रेमकहाणी असतो.'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'सुखी वैवाहिक जीवनाचे रहस्य म्हणजे एकमेकांचा आदर आणि प्रेम.'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'विवाह म्हणजे एकमेकांवर विश्वास ठेवण्याची आणि प्रेमाची प्रतिज्ञा.'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'प्रेमाची खरी परिभाषा म्हणजे साथ देणारे जोडीदार.'
    }
];

const QuoteSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    const handleJoinNow = () => {
        navigate('/join-whatsapp-group'); // Navigate to the /join page
    };

    return (
        <div className="slideshow">
            <div className="slide">
            <button className="join-button" onClick={handleJoinNow}></button>

                <div className="slide-title">
                    <p>{slides[currentSlide].title}</p>
                </div>
            </div>
        </div>
    );
};

export default QuoteSlideshow;
