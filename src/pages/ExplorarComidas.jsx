import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';

export default function ExplorarComidas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar Comidas');
  }, []);

  return (
    <div>
      <Header titulo={titulo} />
    </div>
  );
}
