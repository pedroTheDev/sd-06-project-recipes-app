import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';

const Comidas = () => {
  const { searchBox } = useContext(ReceitasContext);

  return (
    <section>
      <Header searchBtn={true} />
      {searchBox && <SearchBar />}
    </section>
  );
};

export default Comidas;
