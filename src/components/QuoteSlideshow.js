import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuoteSlideshow.css';

const slides = [
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'लग्न गटात सामील होण्यासाठी क्लिक करा'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'लग्न गटात सामील होण्यासाठी क्लिक करा'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'लग्न गटात सामील होण्यासाठी क्लिक करा'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'लग्न गटात सामील होण्यासाठी क्लिक करा'
    },
    {
        image: 'https://mahatmaphule.net/img/5246196426_0cabeda139_z.jpg',  
        title: 'लग्न गटात सामील होण्यासाठी क्लिक करा'
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
