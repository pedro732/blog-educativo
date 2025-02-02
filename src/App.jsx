import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
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
    <div className="App">
      <Header />
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
    </div>
  );
}

export default App;