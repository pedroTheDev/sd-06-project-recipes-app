import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ExplorarComidas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar Comidas');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <Footer />
    </div>
  );
}
