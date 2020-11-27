import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';
import '../style/Processo.css';

function ProcessoComida() {
  const timeoutTextCopy = 3000;
  const { foodIngredients } = useContext(RecipesContext);
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataMeal, setDataMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [isDisable] = useState(true);
  const [checked, setChecked] = useState({});
  const history = useHistory();
  const idMeal = history.location.pathname.split('/')[2];

  const handleChange = ({ target }) => {
    setChecked({ ...checked, [target.name]: target.checked });
  };

  // useEffect(() => {
  //   localStorage.inProgressRecipes = JSON.stringify(
  //     { meals: { [idMeal]: Object.keys(checked) } },
  //   );
  // }, [checked]);

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const responseJson = await response.json();
      setDataMeal(responseJson.meals[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idMeal]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      // const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      setIsFavorite(true);
    }
  }, []);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      let favoriteRecipes = [];
      if (localStorage.favoriteRecipes) {
        favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      }
      localStorage.favoriteRecipes = JSON.stringify([...favoriteRecipes, {
        id: dataMeal.idMeal,
        type: 'comida',
        area: dataMeal.strArea,
        category: dataMeal.strCategory,
        alcoholicOrNot: '',
        name: dataMeal.strMeal,
        image: dataMeal.strMealThumb,
      }]);
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  const saveDoneRecipes = () => {
    const date = new Date();
    const doneDate = date;
    let doneRecipes = [];
    if (localStorage.doneRecipes) {
      doneRecipes = JSON.parse(localStorage.doneRecipes);
    }
    localStorage.doneRecipes = JSON.stringify([...doneRecipes, {
      id: dataMeal.idMeal,
      type: 'comida',
      area: dataMeal.strArea,
      category: dataMeal.strCategory,
      alcoholicOrNot: '',
      name: dataMeal.strMeal,
      image: dataMeal.strMealThumb,
      doneDate,
      tags: [],
    }]);
  };

  return (isLoading) ? <p>Loading</p> : (
    <div className="container-progress">
      <img
        data-testid="recipe-photo"
        src={ dataMeal.strMealThumb }
        alt="Foto da receita"
        className="food-image"
      />
      <h1 data-testid="recipe-title">{ dataMeal.strMeal }</h1>
      <span>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleCopy(`/comidas/${idMeal}`) }
        >
          <img
            src={ shareIcon }
            alt="Botão de Compartilhar"
          />
        </button>
        { isCopied ? <p>Link copiado!</p> : true }
      </span>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Botão de Favorito"
        />
      </button>
      <p data-testid="recipe-category">
        Categoria
      </p>
      {foodIngredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          {ingredient }
          <input
            type="checkbox"
            name={ ingredient }
            checked={ checked[ingredient[ingredient.name]] }
            onChange={ handleChange }
          />
        </span>
      )) }
      <p data-testid="instructions">
        Instruções
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          // disabled={ isDisable }
          onClick={ saveDoneRecipes }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default ProcessoComida;
