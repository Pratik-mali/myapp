import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const TransliterationInput = ({ value, onChange, placeholder, restrictNumbers, inputType }) => {
  const [text, setText] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = async (event) => {
    let inputText = event.target.value;

    if (inputType === 'text' && restrictNumbers) {
      inputText = inputText.replace(/[0-9]/g, ''); // Remove numbers
    } else if (inputType === 'number') {
      inputText = inputText.replace(/[^0-9\u0966-\u096F]/g, '');     }

    setText(inputText);
    onChange(inputText);

    if (inputType === 'text') {
      const lastWord = inputText.split(' ').pop();

      if (lastWord) {
        try {
          const response = await axios.get(`https://pratikmal01.pythonanywhere.com/transliterate?text=${lastWord}&lang_code=hi`);
          setSuggestions(response.data.suggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
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
    inputRef.current.focus(); // Keep the focus on the input field
  };

  const handleKeyDown = (event) => {
    if (showSuggestions) {
      if (event.key === 'ArrowDown') {
        setActiveSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
      } else if (event.key === 'ArrowUp') {
        setActiveSuggestionIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
      } else if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
        event.preventDefault();
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
        style={{ width: '96%', padding: '8px', fontSize: '16px' }}
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
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur on suggestion click
              onClick={() => handleSuggestionClick(suggestion)}
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
