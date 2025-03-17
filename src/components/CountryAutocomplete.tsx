import React, { useState, useRef, useEffect } from 'react';
import { countries } from '../data/countries';

interface CountryAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  id,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const filtered = countries.filter((country: string) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
    setIsOpen(true);
  };

  const handleSelectCountry = (country: string) => {
    setInputValue(country);
    onChange(country);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (onBlur) onBlur();
    }, 200);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        id={id}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (inputValue.trim() !== '' && suggestions.length > 0) {
            setIsOpen(true);
          }
        }}
        onBlur={handleBlur}
        className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-white-300'}`}
        placeholder="Enter country"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-white-300 rounded shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((country, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCountry(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
