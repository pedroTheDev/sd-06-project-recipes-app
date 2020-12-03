import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { shareIcon, whiteHeartIcon, blackHeartIcon, loading } from '../images';
import '../style/Processo.css';

function ProcessoComida() {
  const timeoutTextCopy = 3000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataMeal, setDataMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [checked, setChecked] = useState([]);
  const history = useHistory();
  const idMeal = history.location.pathname.split('/')[2];

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
      const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      favoriteRecipes.forEach((favorite) => {
        if (favorite.id === idMeal) {
          setIsFavorite(true);
        }
      });
    }
    if (localStorage.inProgressRecipes) {
      if (JSON.parse(localStorage.inProgressRecipes).meals) {
        const progress = JSON.parse(localStorage.inProgressRecipes);
        if (progress.meals[idMeal]) setChecked(progress.meals[idMeal]);
        else {
          setChecked([]);
        }
      }
    } else setChecked([]);
  }, [idMeal]);

  const handleChange = (target, index) => {
    if (target.checked) {
      setChecked([...checked, index]);
    } else {
      const removed = [...checked];
      removed.splice(removed.indexOf(index), 1);
      setChecked(removed);
    }
  };

  useEffect(() => {
    if (localStorage.inProgressRecipes) {
      const progress = JSON.parse(localStorage.inProgressRecipes);
      localStorage.inProgressRecipes = JSON.stringify({
        ...progress,
        meals: {
          ...progress.meals,
          [idMeal]: checked,
        },
      });
    } else {
      localStorage.inProgressRecipes = JSON.stringify({
        meals: {
          [idMeal]: checked,
        },
      });
    }
    const result = (Object.keys(dataMeal)
      .filter((keys) => keys.includes('Ingredient'))
      .filter((ingredient) => (
        dataMeal[ingredient] !== '' && dataMeal[ingredient] !== null
      )).length);
    if (result === checked.length) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [checked, dataMeal, idMeal]);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    let favoriteRecipes = [];
    if (!isFavorite) {
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
      favoriteRecipes = JSON.parse(localStorage.favoriteRecipes)
        .filter(({ id }) => id !== dataMeal.idMeal);
      localStorage.favoriteRecipes = JSON.stringify(favoriteRecipes);
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

  return (isLoading) ? <img className="loading" src={ loading } alt="loading" /> : (
    <div className="container-progress">
      <img
        data-testid="recipe-photo"
        src={ dataMeal.strMealThumb }
        alt="Foto da receita"
      />
      <div className="div-header">
        <div className="div-icon">
          <button
            type="button"
            onClick={ handleClick }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Botão de Favorito"
              className="icons"
            />
          </button>
          <span>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => handleCopy(`/comidas/${idMeal}`) }
            >
              <img
                src={ shareIcon }
                alt="Botão de Compartilhar"
                className="icons"
              />
            </button>
            { isCopied ? <p>Link copiado!</p> : true }
          </span>
        </div>
        <div className="div-title">
          <h1 className="h1" data-testid="recipe-title">
            { dataMeal.strMeal }
          </h1>
        </div>
      </div>
      <div className="div-recipes">
        <h2 data-testid="recipe-category">
          Categoria
        </h2>
        { Object.keys(dataMeal)
          .filter((keys) => keys.includes('Ingredient'))
          .map((ingredient, index) => {
            if (dataMeal[ingredient] !== '' && dataMeal[ingredient] !== null) {
              return (
                <div
                  className="label"
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    className="checkbox"
                    type="checkbox"
                    name={ dataMeal[ingredient] }
                    checked={ checked.includes(index) }
                    onChange={ ({ target }) => { handleChange(target, index); } }
                  />
                  { dataMeal[ingredient] }
                </div>
              );
            }
            return '';
          }) }
        <h2 data-testid="instructions">
          Instruções
        </h2>
      </div>
      <div className="buttons-progress">
        <Link to="/receitas-feitas">
          <button
            className="finish-recipe"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isDisable }
            onClick={ saveDoneRecipes }
          >
            Finalizar Receita
          </button>
        </Link>
        <Link to="/comidas">
          <button
            className="back"
            type="button"
          >
            Ver Outras Receitas
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProcessoComida;
