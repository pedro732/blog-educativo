import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMicroscope } from 'react-icons/fa';
import './Header.css';

function Header({ title = "Mi Blog Educativo", showBlogButton = false }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (showBlogButton) {
      navigate('/');
    } else {
      navigate('/guias-de-estudio');
    }
  };

  return (
    <header className="header">
      <div className="header-icon">
        <FaUser />
      </div>
      <h1>{title}</h1>
      <button className="study-guides-button" onClick={handleButtonClick}>
          {showBlogButton ? 'Mi Blog' : 'Guías de estudio'}
        </button>
      <div className="header-right">
        
        <div className="header-icon">
          <FaMicroscope />
        </div>
      </div>
    </header>
  );
}

export default Header;