import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';

import ShareIcon from '../images/shareIcon.svg';
// import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

export default function ReceitasFavoritas() {
  const {
    titulo,
    setTitulo,
    favoriteDrinks,
  } = useContext(Context);

  useEffect(() => {
    setTitulo('Receitas Favoritas');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {favoriteDrinks.map((drink, index) => (
          <div key={ index }>
            <div>
              <img
                src={ drink.strDrinkThumb }
                alt="imagem da bebida favorita"
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
            <div>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { drink.strAlcoholic }
              </span>
              <p data-testid={ `${index}-horizontal-name` }>
                { drink.strDrink }
              </p>
              <div>
                <button
                  type="button"
                  src={ ShareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                >
                  { ShareIcon }
                </button>
                <button
                  type="button"
                  src={ whiteHeart }
                  alt="favoritar"
                  data-testid="favorite-btn"
                >
                  <img src={ whiteHeart } alt="favoritar" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
