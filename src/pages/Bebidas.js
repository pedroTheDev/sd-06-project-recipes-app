import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { drinkApi } from '../service/drinkApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import BebidaCard from '../components/BebidaCard';

// function Bebidas() {
//   const location = useLocation();
//   return location.pathname === '/bebidas' ? <Footer /> : null;
// }

const Bebidas = () => {
  const { searchBox } = useContext(ReceitasContext);
  const location = useLocation();
  const { data, setData } = useContext(ReceitasContext);

  useEffect(() => {
    drinkApi().then((response) => {
      setData(response);
    });
  }, []);

  if (!data.drinks) return <div>Carregando...</div>;

  const doze = 12;
  return (
    <section>
      <Header title="Bebidas" searchBtn />
      {searchBox && <SearchBar />}
      <div>
        {data.drinks
          .filter((x, index) => index < doze)
          .map((drink, i) => (
            <BebidaCard key={ drink } drink={ drink } index={ i } />
          ))}
      </div>
      {location.pathname === '/bebidas' ? <Footer /> : null}
    </section>
  );
};

export default Bebidas;
