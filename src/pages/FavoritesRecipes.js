import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';

function FavoritesRecipes() {
  const { setHeader } = useContext(AppContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const isFavorite = true;
  const getFavoritesLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(readLocalStorage);
  };
  const changesFavorites = (id) => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = readLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  };

  useEffect(() => {
    setHeader({ page: 'Receitas Favoritas', search: false });
  }, []);
  useEffect(() => {
    getFavoritesLocalStorage();
  }, [isFavorite]);

  return (
    <div>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn" type="button">
          All
        </button>
        <button data-testid="filter-by-food-btn" type="button">
          Food
        </button>
        <button data-testid="filter-by-drink-btn" type="button">
          Drink
        </button>
      </div>
      <div>
        {favoriteRecipes.map((e, index) => (
          <div key={ index }>
            <h1 data-testid={ `${index}-horizontal-name` }>{e.name}</h1>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
            />
            {e.type === 'comida'
              ? (
                <div>
                  <h2>{e.category}</h2>
                  <h2>{e.area}</h2>
                </div>)
              : (<h2>{e.alcoholicOrNot}</h2>)}
            <ShareBtn />
            <FavoriteBtn
              isFavorite={ isFavorite }
              changesFavorites={ () => { changesFavorites(e.id); } }
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default FavoritesRecipes;
