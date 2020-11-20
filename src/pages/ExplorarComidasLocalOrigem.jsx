import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';
import Lupa from '../Components/Lupa';

export default function ExplorarComidasLocalOrigem() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar Origem');
  }, []);

  return (
    <div>
      <Header titulo={titulo} />
      <Lupa />
    </div>
  );
}
