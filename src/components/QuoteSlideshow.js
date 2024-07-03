import React, { useState, useEffect } from 'react';
import './QuoteSlideshow.css';

const quotes = [
    "प्रेम म्हणजे दोन हृदयांचा एकात्मिक ध्यास.",
    "दोन जीवांची एकत्र यात्रा म्हणजेच विवाह.",
    "प्रत्येक जोडीचा एक अनोखा प्रेमकहाणी असतो.",
    "सुखी वैवाहिक जीवनाचे रहस्य म्हणजे एकमेकांचा आदर आणि प्रेम.",
    "विवाह म्हणजे एकमेकांवर विश्वास ठेवण्याची आणि प्रेमाची प्रतिज्ञा.",
    "प्रेमाची खरी परिभाषा म्हणजे साथ देणारे जोडीदार.",
    "विवाह म्हणजे दोन मनांचे संपूर्णता मिळवणे.",
    "एकत्रित जीवन म्हणजे परस्परांना समजून घेणे आणि एकत्र वाढणे.",
    "जीवनाच्या प्रत्येक टप्प्यावर एकमेकांचे साथीदार बनणे म्हणजेच विवाह.",
    "प्रेम आणि आदर हेच सुखी वैवाहिक जीवनाचे मुख्य घटक आहेत."
];

const QuoteSlideshow = () => {
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % quotes.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="quote-slideshow">
            <div className="quote-background">
                <div className="quote-content">
                    <p>{quotes[currentQuote]}</p>
                </div>
            </div>
        </div>
    );
};

export default QuoteSlideshow;
