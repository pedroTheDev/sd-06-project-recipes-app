import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Context from '../context/Context';
import Lupa from '../Components/Lupa';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import FoodCard from '../Components/FoodCard';

export default function Comidas() {
  const { titulo, setTitulo, loading, meals } = useContext(Context);
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
      {loading ? <p>Loading</p>
        : meals.map((meal) => <FoodCard key={ meal.idMeal } food={ meal } />)}
      <Footer />
    </div>
  );
}
