import React, { useEffect, useState } from 'react';
import { getCards } from '../services/CardService';

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const cardsData = await getCards();
      setCards(cardsData);
    };

    fetchCards();
  }, []);

  return (
    <div>
      {cards.map(card => (
        <div key={card.id}>
          <h2>{card.title}</h2>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;