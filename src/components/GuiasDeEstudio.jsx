import React, { useEffect, useState } from 'react';
import Header from './Header';
import Card from './CardGuias';
import { db } from '../firebase'; // Importa la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';
import './GuiasDeEstudio.css';

function GuiasDeEstudio() {
  const [guias1, setGuias1] = useState([]);
  const [guias2, setGuias2] = useState([]);

  useEffect(() => {
    const fetchGuias = async () => {
      const guias1Collection = collection(db, 'Guias1');
      const guias2Collection = collection(db, 'Guias2');

      const guias1Snapshot = await getDocs(guias1Collection);
      const guias2Snapshot = await getDocs(guias2Collection);

      setGuias1(guias1Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setGuias2(guias2Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchGuias();
  }, []);

  return (
    <div className="guias-de-estudio">
      <Header title="Guías de estudio" showBlogButton={true} />
      <div className="content">
        <h2>Bienvenido a las Guías de Estudio</h2>
        <p>Aquí encontrarás recursos y materiales para ayudarte en tu aprendizaje.</p>
        
        <div className="cards-container">
          <Card title="Primer Medio">
            {guias1.map(guia => (
              <a key={guia.id} href={guia.link} target="_blank" rel="noopener noreferrer">
                {guia.titulo}
              </a>
            ))}
          </Card>
          <Card title="Segundo Medio">
            {guias2.map(guia => (
              <a key={guia.id} href={guia.link} target="_blank" rel="noopener noreferrer">
                {guia.titulo}
              </a>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GuiasDeEstudio;