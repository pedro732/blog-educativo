// File: mi-blog-app/frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Card from './components/Card';
import GuiasDeEstudio from './components/GuiasDeEstudio';
import ScienceNewsSearch from './components/ScienceNewsSearch'; // Importar el nuevo componente
import './App.css';
import { getCards } from './services/CardService';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('Fetching cards...');
    const fetchCards = async () => {
      try {
        const cardsData = await getCards();
        console.log('Cards fetched:', cardsData);
        setCards(cardsData);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/guias-de-estudio" element={<GuiasDeEstudio />} />
          <Route path="/" element={
            <>
              <Header />
              {/* Renderizar el componente de búsqueda aquí, encima del contenedor de tarjetas */}
              <ScienceNewsSearch />
              <div className="card-container">
                {cards.map(card => (
                  <Card
                    key={card.id}
                    id={card.id}
                    imageUrl={card.imageUrl}
                    summary={card.summary}
                    link={card.link}
                    likes={card.likes}
                    dislikes={card.dislikes}
                    stars={card.stars}
                    hearts={card.hearts}
                  />
                ))}
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
