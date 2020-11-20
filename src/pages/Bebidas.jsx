import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';
import Lupa from '../Components/Lupa';

export default function Bebidas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Bebidas');
  }, []);

  return (
    <div>
      <Header titulo={titulo} />
      <Lupa />
    </div>
  );
}
