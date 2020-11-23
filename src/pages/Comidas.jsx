import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Context from '../context/Context';
import Lupa from '../Components/Lupa';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';

export default function Comidas() {
  const { titulo, setTitulo } = useContext(Context);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTitulo('Comidas');
  }, []);

  const onClick = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <Header titulo={ titulo } />
      <Lupa onClick={ onClick } />
      {hidden ? '' : <SearchBar />}
      <h1>{ titulo }</h1>
      <Footer />
    </div>
  );
}
