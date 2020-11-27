import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';

function FavoritesRecipes() {
  const { setHeader } = useContext(AppContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [copied, setCopied] = useState('none');
  const [filter, setFilter] = useState('All');
  const isFavorite = true;
  const getFavoritesLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(readLocalStorage);
  };
  const changesFavorites = (id) => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = readLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setFavoriteRecipes(newArray);
  };
  const copyToClipboard = (type, id) => {
    setCopied('block');
    window.navigator.clipboard
      .writeText(window.location.toString()
        .replace('receitas-feitas', `${type}s/${id}`));
    window.navigator.clipboard
      .writeText(window.location.toString()
        .replace('receitas-feitas', `${type}s/${id}`));
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
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => { setFilter('All'); } }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => { setFilter('comida'); } }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => { setFilter('bebida'); } }
        >
          Drink
        </button>
      </div>
      <div>
        {favoriteRecipes.filter((el) => el.type === filter || filter === 'All')
          .map((e, index) => (
            <div key={ index }>
              <Link to={ `/${e.type}s/${e.id}` }>
                <h1 data-testid={ `${index}-horizontal-name` }>{e.name}</h1>
                <img
                  src={ e.image }
                  alt={ e.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              {e.type === 'comida'
                ? (
                  <h2 data-testid={ `${index}-horizontal-top-text` }>
                    {`${e.area} - ${e.category}` }
                  </h2>
                )
                : (
                  <h2 data-testid={ `${index}-horizontal-top-text` }>
                    {e.alcoholicOrNot}
                  </h2>
                )}
              <ShareBtn
                copy={ () => copyToClipboard(e.type, e.id) }
                testid="done"
                index={ index }
              />
              <span
                className="link-copy"
                style={ { display: copied } }
              >
                Link copiado!
              </span>
              <FavoriteBtn
                isFavorite={ isFavorite }
                index={ index }
                changesFavorites={ () => { changesFavorites(e.id); } }
              />
            </div>
          ))}

      </div>
    </div>
  );
}

export default FavoritesRecipes;
