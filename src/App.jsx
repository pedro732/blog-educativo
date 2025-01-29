import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import axios from 'axios';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('Fetching cards...');
    axios.get('/api/cards')
      .then(response => {
        console.log('Cards fetched:', response.data);
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
        if (error.response) {
          console.log('Error details:', error.response.data);
        }
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="card-container">
        {cards.map(card => (
          <Card
            key={card._id}
            imageUrl={card.imageUrl}
            summary={card.summary}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}

export default App;