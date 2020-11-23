import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ExplorarComidasingredientes() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar Ingredientes');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <Footer />
    </div>
  );
}
