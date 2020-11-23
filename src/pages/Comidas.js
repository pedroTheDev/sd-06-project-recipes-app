import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import dataApi from '../service/foodApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import ComidaCard from '../components/ComidaCard';

const Comidas = () => {
  const { searchBox } = useContext(ReceitasContext);
  const location = useLocation();
  const { data, setData } = useContext(ReceitasContext);

  useEffect(() => {
    dataApi().then((response) => {
      setData(response);
    });
  }, []);

  if (!data.meals) return <div>Carregando...</div>;

  const doze = 12;
  return (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar />}
      {location.pathname === '/comidas' ? <Footer /> : null }
      <div>
        {/* <BotoesFiltrar /> */}
      </div>
      <div>
        {data.meals.filter((x, index) => index < doze)
          .map((food, i) => (<ComidaCard key={ food } food={ food } index={ i } />
          ))}
      </div>
      {location.pathname === '/comidas' ? <Footer /> : null}

    </section>
  );
};

export default Comidas;
