import React, { useState, useEffect } from 'react';
import './QuoteSlideshow.css';

const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    "Don't let yesterday take up too much of today.",
    "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
    "It's not whether you get knocked down, it's whether you get up."
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
