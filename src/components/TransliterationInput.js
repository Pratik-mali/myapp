// src/TransliterationInput.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const TransliterationInput = ({ value, onChange, placeholder }) => {
  const [text, setText] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = async (event) => {
    const inputText = event.target.value;
    setText(inputText);
    onChange(inputText);

    const lastWord = inputText.split(' ').pop();

    if (lastWord) {
      try {
        const response = await axios.post('http://192.168.60.51:5000/suggestions', { text: lastWord });
        setSuggestions(response.data.suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const words = text.split(' ');
    words.pop();
    words.push(suggestion);
    const newText = words.join(' ');
    setText(newText);
    onChange(newText);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event) => {
    if (showSuggestions) {
      if (event.key === 'ArrowDown') {
        setActiveSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
      } else if (event.key === 'ArrowUp') {
        setActiveSuggestionIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
      } else if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
        setActiveSuggestionIndex(-1);
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100); // delay to allow click event to register
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        placeholder={placeholder}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          listStyleType: 'none',
          padding: '0',
          margin: '0',
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          zIndex: 1000,
        }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: index === activeSuggestionIndex ? '#f0f0f0' : 'white'
              }}
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransliterationInput;
