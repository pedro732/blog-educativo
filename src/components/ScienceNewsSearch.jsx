import React, { useState } from 'react';
import axios from 'axios';
import './ScienceNewsSearch.css';

function ScienceNewsSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    console.log(`Buscando artículos de ciencia para: ${searchTerm}`);

    try {
      const response = await axios.get(`/.netlify/functions/fetchNews`, {
        params: { q: searchTerm }
      });
      const results = response.data;
      setSearchResults(results);
      console.log('Resultados de la búsqueda:', results);
    } catch (error) {
      console.error('Error al buscar artículos:', error);
      setError('Error al buscar artículos. Intenta de nuevo.');
      setSearchResults([]);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    setError('');
  };

  return (
    <div className="science-news-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar artículos de ciencia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
        <button type="button" onClick={handleClear} className="clear-button">Limpiar</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="search-result-item">
            <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScienceNewsSearch;
