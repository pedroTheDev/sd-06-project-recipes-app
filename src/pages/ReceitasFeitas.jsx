import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';

export default function ReceitasFeitas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Receitas Feitas');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
    </div>
  );
}
