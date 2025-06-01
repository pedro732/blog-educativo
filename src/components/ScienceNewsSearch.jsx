import React, { useState } from 'react';
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

    console.log(`Buscando noticias de ciencia para: ${searchTerm}`);

    try {
      const response = await fetch(`/api/fetchNews?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      const data = await response.json();
      setSearchResults(data);
      console.log('Resultados de la búsqueda:', data);
    } catch (error) {
      console.error('Error al buscar noticias:', error);
      setError('Error al buscar noticias. Intenta de nuevo.');
      setSearchResults([]);
    }
  };

  return (
    <div className="science-news-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar noticias de ciencia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
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