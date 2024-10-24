import React, { useState, useEffect } from 'react';
import {
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react';
import './Autocomplete.css';
import musicData from '../../assets/data.json';

const Autocomplete = ({ label }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    if (!isSuggestionSelected) {
      const timer = setTimeout(() => setDebouncedQuery(query), 300);
      return () => clearTimeout(timer);
    }
  }, [query, isSuggestionSelected]);

  useEffect(() => {
    if (debouncedQuery.length > 0 && !isSuggestionSelected) {
      const filteredSuggestions = filterSuggestions(debouncedQuery);
      setSuggestions(filteredSuggestions.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, isSuggestionSelected]);

  const handleInputChange = (e) => {
    setIsSuggestionSelected(false);
    setQuery(e.target.value);
    setHighlightIndex(-1);
  };

  const filterSuggestions = (input) => {
    const lowercaseInput = input.toLowerCase();
    const result = [];

    musicData.forEach((artist) => {
      if (artist?.name?.toLowerCase().includes(lowercaseInput)) {
        result.push({ type: 'artist', name: artist.name, highlightedName: highlightMatch(artist.name, lowercaseInput) });
      }

      artist.albums?.forEach((album) => {
        if (album?.title?.toLowerCase().includes(lowercaseInput)) {
          result.push({
            type: 'album',
            name: album.title,
            artist: artist.name,
            highlightedName: highlightMatch(album.title, lowercaseInput),
          });
        }

        album.songs?.forEach((song) => {
          if (song?.title?.toLowerCase().includes(lowercaseInput)) {
            result.push({
              type: 'song',
              name: song.title,
              album: album.title,
              artist: artist.name,
              highlightedName: highlightMatch(song.title, lowercaseInput),
            });
          }
        });
      });
    });

    return result;
  };

  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, (match) => `<strong>${match}</strong>`);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setIsSuggestionSelected(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      handleSuggestionClick(suggestions[highlightIndex]);
    }
  };

  return (
    <div className="autocomplete-container" onKeyDown={handleKeyDown}>
      <CInputGroup className="mb-4 input-group-custom">
        <CInputGroupText className="input-group-text-custom">{label}</CInputGroupText>
        <CFormInput
          className="input-box-react inputBoxReact"
          type="text"
          placeholder={`Search for ${label.toLowerCase()}...`}
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </CInputGroup>

      {suggestions.length > 0 && (
        <div className="search-results-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`search-result-item ${index === highlightIndex ? 'highlighted' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              dangerouslySetInnerHTML={{ __html: suggestion.highlightedName }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
