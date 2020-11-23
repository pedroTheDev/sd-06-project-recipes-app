import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';

export default function ReceitasFavoritas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Receitas Favoritas');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
    </div>
  );
}
