import React, { useContext, useEffect } from 'react';
import foodApi from '../service/foodApi';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import ComidaCard from '../components/ComidaCard';

const Comidas = () => {
  const { data, setData } = useContext(ReceitasContext);

  useEffect(() => {
    foodApi().then((response) => {
      setData(response);
    });
  }, []);

  if (!data.meals) return <div>Carregando...</div>;

  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <div>
          {data.meals.filter((x, index) => index < 12).map((food, i) => (
            <ComidaCard food={food} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comidas;
