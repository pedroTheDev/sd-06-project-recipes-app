import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Context from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritesRecipes() {
  const { getFavoritesRecipe, fetchFavoritesRecipe } = useContext(Context);

  function arrFavoriteFood() {
    fetchFavoritesRecipe((JSON.parse(localStorage.getItem('favoriteRecipes')))
      .filter((item) => item.type === 'comida'));
  }

  function arrFavoriteDrink() {
    fetchFavoritesRecipe((JSON.parse(localStorage.getItem('favoriteRecipes')))
      .filter((item) => item.type === 'bebida'));
  }

  function arrFavoriteRecipe() {
    fetchFavoritesRecipe(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }
  useEffect(() => { arrFavoriteRecipe(); }, []);

  // function renderFavorites(item, index) {
  //   if (item.category === 'comida') {
  //     if (item.category !== 'Vegetarian') {
  //       return <h5 data-testid={ `${index}-horizontal-top-text` }>{ `${item.area}` }</h5>
  //     }
  //     else
  //       <h5 data-testid={ `${index}-horizontal-top-text` }>{ `${item.area} - Vegetarian` }</h5>
  //     }

  //   if (item.category === 'bebida') {
  //     if(item.category === 'Alcoholic') {
  //       return <h5>'Alcoholic'</h5>
  //     }
  //     else {
  //       return <h5>{ `${item.area}` }</h5>
  //     }
  //   }
  // }

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ arrFavoriteFood }
      >
        Comidas
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ arrFavoriteDrink }
      >
        Bebidas
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ arrFavoriteRecipe }
      >
        All
      </button>
      { getFavoritesRecipe.map((item, index) => (
        <div key={ item.id }>
          <img
            src={ item.image }
            alt={ item.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <h3 data-testid={ `${index}-horizontal-name` }>{ item.name }</h3>

          <div data-testid={ `${index}-horizontal-top-text` }>
            {item.category !== 'Vegetarian' ? <h5>{ `${item.area}` }</h5>
              : <h5>{ `${item.area} - Vegetarian` }</h5>}
          </div>

          <div data-testid={ `${index}-horizontal-top-text` }>
            {item.category !== 'Alcoholic' ? <h5>{ `${item.area}` }</h5>
              : <h5>Alcoholic</h5>}
          </div>

          {/* <div>
            {renderFavorites(item, index)}
          </div> */}

          {/* { item.type === 'comida'
          ? <div>{item.category !== 'Vegetarian'
          ? <h5>{ `${item.area}` }</h5>
          : <h5>{ `${item.area} - Vegetarian` }</h5>}
          <div/>
          : <div>{item.category !== 'Alcoholic'
          ? <h5>{ `${item.area}` }</h5>
          : <h5>Alcoholic</h5>}<div/>} */}
          {/* <div> */}
          {/* {item.type === 'comida' ? <div data-testid={ `${index}-horizontal-top-text` }>
            {item.category !== 'Vegetarian' ? <h5>{ `${item.area}` }</h5>
              : <h5>{ `${item.area} - Vegetarian` }</h5>}
          </div>
            : <div data-testid={ `${index}-horizontal-top-text` }>
              {item.category !== 'Alcoholic' ? <h5>{ `${item.area}` }</h5>
                : <h5>Alcoholic</h5>}
            </div>} */}

          <input
            type="image"
            alt="sharebutton"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <input
            type="image"
            alt="favoritebutton"
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </div>)) }
    </div>
  );
}

export default FavoritesRecipes;
