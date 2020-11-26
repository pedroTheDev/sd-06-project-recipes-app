import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';
import Lupa from '../Components/Lupa';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import DrinkCard from '../Components/DrinkCard';

export default function Bebidas() {
  const { titulo, setTitulo, loading, drinks, drinksByIngredient } = useContext(Context);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTitulo('Bebidas');
    console.log(drinksByIngredient);
  }, []);

  const onClick = () => {
    setHidden(!hidden);
  };

  const twelve = 12;

  return (
    <div>
      <Header titulo={ titulo } />
      <Lupa onClick={ onClick } />
      {hidden ? '' : <SearchBar />}
      <h1>{ titulo }</h1>
      {loading ? <p>Loading</p>
        : drinks.map((drink) => <DrinkCard key={ drink.idDrink } drink={ drink } />)}
      {!drinksByIngredient ? <p>Loading</p>
        : drinksByIngredient
          .filter((drink, index) => drink && index < twelve)
          .map((drink, index) => (
            <DrinkCard drink={ drink } key={ drink.idDrink } index={ index } />))}
      <Footer />
    </div>
  );
}
