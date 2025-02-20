import React from 'react';
import './CardGuias.css'; // Asegúrate de crear este archivo de estilos también

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default Card;