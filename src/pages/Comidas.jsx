import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import Context from '../context/Context';

export default function Comidas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Comidas');
  }, []);

  return (
    <div>
      <Header titulo={titulo} />
      <h1>{ titulo }</h1>
    </div>
  );
}
