import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';

export default function ExplorarBebidas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar Bebidas');
  }, []);

  return (
    <div>
      <Header titulo={titulo} />
    </div>
  );
}
