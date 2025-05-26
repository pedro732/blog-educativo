import React, { useEffect, useState } from 'react';
import Header from './Header';
import Card from './CardGuias';
import { db } from '../firebase'; // Importa la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';
import './GuiasDeEstudio.css';

function GuiasDeEstudio() {
  const [guias1, setGuias1] = useState([]);
  const [guias2, setGuias2] = useState([]);
  const [guias3, setGuias3] = useState([]);
  const [temasGenerales, setTemasGenerales] = useState([]); // Nuevo estado para temas generales


  useEffect(() => {
    const fetchGuias = async () => {
      const guias1Collection = collection(db, 'Guias1');
      const guias2Collection = collection(db, 'Guias2');
      const guias3Collection = collection(db, 'Guias3');
      const temasGeneralesCollection = collection(db, 'temas generales'); // Nueva colección

      const guias1Snapshot = await getDocs(guias1Collection);
      const guias2Snapshot = await getDocs(guias2Collection);
      const guias3Snapshot = await getDocs(guias3Collection);
      const temasGeneralesSnapshot = await getDocs(temasGeneralesCollection); // Obtener datos de la nueva colección

      setGuias1(guias1Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setGuias2(guias2Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setGuias3(guias3Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTemasGenerales(temasGeneralesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Guardar datos de la nueva colección
    };

    fetchGuias();
  }, []);

  return (
    <div className="guias-de-estudio">
      <Header title="Guías de estudio" showBlogButton={true} />
      <div className="content">
        <h2>Bienvenido a las Guías de Estudio</h2>
        <p>Aquí encontrarás recursos y materiales para que puedas profundizar en tu aprendizaje</p>

        <div className="cards-container">
          <Card title="Primero Medio">
            {guias1.map(guia => (
              <div key={guia.id}>
                <a href={guia.link} target="_blank" rel="noopener noreferrer">
                  {guia.titulo}
                </a>
              </div>
            ))}
          </Card>
          <Card title="Segundo Medio">
            {guias2.map(guia => (
              <div key={guia.id}>
                <a href={guia.link} target="_blank" rel="noopener noreferrer">
                  {guia.titulo}
                </a>
              </div>
            ))}
          </Card>
          <Card title="Tercero medio">
            {guias3.map(guia => (
              <div key={guia.id}>
                <a href={guia.link} target="_blank" rel="noopener noreferrer">
                  {guia.titulo}
                </a>
              </div>
            ))}
          </Card>
          {/* Nueva Card para Temas Generales */}
          <Card title="Temas Generales">
            {temasGenerales.map(tema => (
              <div key={tema.id}>
                <a href={tema.link} target="_blank" rel="noopener noreferrer">
                  {tema.titulo}
                </a>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GuiasDeEstudio;
