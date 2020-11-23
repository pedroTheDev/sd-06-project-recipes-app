import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import Context from '../context/Context';
import Lupa from '../Components/Lupa';

export default function Comidas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Comidas');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <Lupa />
      <h1>{ titulo }</h1>
    </div>
  );
}
