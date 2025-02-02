import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaStar, FaHeart } from 'react-icons/fa';
import { db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import './Card.css';

const Card = ({ id, imageUrl, summary, link, likes = 0, dislikes = 0, stars = 0, hearts = 0 }) => {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const [localStars, setLocalStars] = useState(stars);
  const [localHearts, setLocalHearts] = useState(hearts);

  const handleIconClick = async (field, setLocalCount) => {
    const cardRef = doc(db, 'cards', id);
    await updateDoc(cardRef, {
      [field]: increment(1)
    });
    setLocalCount(prevCount => prevCount + 1);
  };

  return (
    <div className="card">
      <img src={imageUrl} alt="Card" />
      <div className="card-content">
        <p>{summary}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
      <div className="card-icons">
        <FaThumbsUp className="icon" onClick={() => handleIconClick('likes', setLocalLikes)} />
        <FaThumbsDown className="icon" onClick={() => handleIconClick('dislikes', setLocalDislikes)} />
        <FaStar className="icon" onClick={() => handleIconClick('stars', setLocalStars)} />
        <FaHeart className="icon" onClick={() => handleIconClick('hearts', setLocalHearts)} />
      </div>
      <div className="card-counts">
        <span>{localLikes}</span>
        <span>{localDislikes}</span>
        <span>{localStars}</span>
        <span>{localHearts}</span>
      </div>
    </div>
  );
};

export default Card;