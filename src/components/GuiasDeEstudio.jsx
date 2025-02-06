import React from 'react';
import Header from './Header';
import './GuiasDeEstudio.css';

function GuiasDeEstudio() {
  return (
    <div className="guias-de-estudio">
      <Header title="Guías de estudio" showBlogButton={true} />
      <div className="content">
        {/* Contenido de las guías de estudio */}
        <h2>Bienvenido a las Guías de Estudio</h2>
        <p>Aquí encontrarás recursos y materiales para ayudarte en tu aprendizaje.</p>
      </div>
    </div>
  );
}

export default GuiasDeEstudio;