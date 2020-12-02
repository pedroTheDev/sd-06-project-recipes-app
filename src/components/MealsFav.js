import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import whiteIcon from '../images/whiteHeartIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import MealsContext from '../context/MealsContext';
/* import useCopyToClipboard from '../services/clipboard-copy'; */

function MealsFav() {
  // const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);
  const { recipeMeal } = useContext(MealsContext);
  const { id } = useParams();
  /* const timeoutTextCopy = 2000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy); */
  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      return <p>Você ainda não tem nenhuma receita pronta.</p>;
    }
    setFavoriteRecipes(JSON.parse(localStorage.favoriteRecipes));
  }, []);
  const filterRecipes = ({ innerText }) => {
    if (innerText === 'Food') {
      const newDone = favoriteRecipes.filter((done) => (
        done.type === 'comida'
      ));
      setFavoriteRecipes(newDone);
    } else if (innerText === 'Drinks') {
      const newDone = favoriteRecipes.filter((done) => (
        done.type === 'bebida'
      ));
      setFavoriteRecipes(newDone);
    } else {
      setFavoriteRecipes(JSON.parse(localStorage.favoriteRecipes));
    }
  };

  function FavoriteRecipeClick() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      if (!isFavorite) {
        const newFavoriteRecipe = {
          id: recipeMeal.idMeal,
          type: 'comida',
          area: recipeMeal.strArea,
          category: recipeMeal.strCategory,
          alcoholicOrNot: '',
          name: recipeMeal.strMeal,
          image: recipeMeal.strMealThumb,
        };
        const arrayFavoriteRecipe = [...favoriteRecipes, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(true);
      } else {
        const arrayFavoriteRecipe = favoriteRecipes.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(false);
      }
      console.log(favoriteRecipes);
    }
  }

  return (
    <>
      <button
        className="button-all"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        Food
      </button>
      <button
        className="button-drink"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        Drinks
      </button>
      {favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </p>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.area} - ${recipe.category}` }
          </p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            src={ shareIcon }
            //onClick={ copyToClipboard }
          >
            <img
              src={ shareIcon }
              alt="Compatilhar Receita"
            />
          </button>
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="button"
            onClick={ FavoriteRecipeClick }
            src={ isFavorite ? blackIcon : whiteIcon }
          >
            <img
              src={ isFavorite ? blackIcon : whiteIcon }
              alt="Desfavoritar Receita"
            />
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.category }
          </p>
        </div>
      ))}
    </>
  );
}

export default MealsFav;
