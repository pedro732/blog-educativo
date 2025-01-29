import React from 'react';
import { FaUser, FaMicroscope } from 'react-icons/fa';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-icon">
        <FaUser />
      </div>
      <h1>Mi Blog Educativo</h1>
      <div className="header-icon">
        <FaMicroscope />
      </div>
    </header>
  );
}

export default Header;