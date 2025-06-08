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
      const response = await axios.get(`http://export.arxiv.org/api/query?search_query=${encodeURIComponent(searchTerm)}&start=0&max_results=10`);
      const results = response.data;
      const parsedResults = parseArxivResults(results);
      setSearchResults(parsedResults);
      console.log('Resultados de la búsqueda:', parsedResults);
    } catch (error) {
      console.error('Error al buscar artículos:', error);
      setError('Error al buscar artículos. Intenta de nuevo.');
      setSearchResults([]);
    }
  };

  const parseArxivResults = (data) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    const entries = xmlDoc.getElementsByTagName('entry');
    const results = [];

    for (let entry of entries) {
      results.push({
        title: entry.getElementsByTagName('title')[0]?.textContent || 'No title',
        url: entry.getElementsByTagName('id')[0]?.textContent || '#',
      });
    }
    return results;
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
