import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import { fetchFoodAPI } from '../services/foodAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/RecipesInProgress.css';
import load from '../images/load.png';
import '../style/Loading.css';

function ComidasInProgress(props) {
  const { fetchById, doneRecipes, setFetchById } = useContext(ReceitasContext);

  const {
    match: {
      params: { id },
    },
  } = props;

  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [isFetching, setFetching] = useState(true);
  const recipesLocalStorage = JSON.parse(localStorage.getItem('recipes'));
  // const [isDisabled, setIsDisabled] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState(
    !recipesLocalStorage ? [] : recipesLocalStorage[id],
  );

  useEffect(() => {
    async function getFavorites() {
      const responseID = await fetchFoodAPI(id);

      setFetchById(responseID);

      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );

      const localStorageRecipes = JSON.parse(localStorage.getItem('recipes'));
      if (localStorageRecipes) {
        setCheckedIngredients(localStorageRecipes[id]);
      }

      if (!favoriteRecipes || !favoriteRecipes.length) {
        setIsFavorite(false);
      } else if (favoriteRecipes.some((recipe) => recipe.id === id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }

      setFetching(false);
    }

    getFavorites();
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify({ [id]: checkedIngredients }));
  }, [checkedIngredients]);

  const getIngredients = (obj, filter) => {
    const keys = [];

    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  const copyToCB = () => {
    const url = window.location.href;

    copy(url);
    setCopied(true);
  };

  const localVerify = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const {
      idMeal,
      strArea,
      strCategory,
      strMeal,
      strMealThumb,
    } = fetchById[0];

    if (!favoriteRecipes) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          {
            id: idMeal,
            type: 'comida',
            area: strArea,
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
          },
        ]),
      );
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          ...favoriteRecipes,
          {
            id: idMeal,
            type: 'comida',
            area: '',
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
          },
        ]),
      );
    }

    setIsFavorite(true);
  };

  const removeFavorite = (idRecipe) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    let index;

    favoriteRecipes.forEach((item, i) => {
      if (item.id === idRecipe) {
        index = i;
      }
    });

    const zero = 0;
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        ...favoriteRecipes.slice(zero, index),
        ...favoriteRecipes.slice(index + 1, favoriteRecipes.length),
      ]),
    );

    setIsFavorite(false);
  };

  const setFavorite = (idRecipe) => {
    const image = document.getElementById('favorite-img').src;

    if (image.includes(whiteHeartIcon)) {
      localVerify();
    } else {
      removeFavorite(idRecipe);
    }
  };

  // const handleButtomDisable = () => {
  //   const lastIngredient = document.getElementById('ingredient-step').lastChild;
  //   console.log('Last ingredient', lastIngredient.id);
  //   if (checkedIngredients.length === lastIngredient.id - 1) {
  //     console.log('Dentro do if', checkedIngredients.length);
  //     return false;
  //   }
  //   return true;
  // };

  const handleClick = (index, item) => {
    const label = document.querySelectorAll('label')[index];
    if (label.classList.contains('ingredient-not-done')) {
      label.classList.remove('ingredient-not-done');
      label.classList.add('ingredient-done');
    } else {
      label.classList.remove('ingredient-done');
      label.classList.add('ingredient-not-done');
    }

    if (checkedIngredients.includes(item)) {
      const zero = 0;
      let position;
      checkedIngredients.forEach((name, i) => {
        if (name === item) {
          position = i;
        } else {
          return position;
        }
      });
      setCheckedIngredients([
        ...checkedIngredients.slice(zero, position),
        ...checkedIngredients.slice(position + 1, checkedIngredients.length),
      ]);
    } else {
      setCheckedIngredients(checkedIngredients.concat(item));
    }
    // handleButtomDisable();
  };

  return isFetching ? (
    <div className="align-self-center d-flex justify-content-center">
      <img src={ load } alt="loading" className="loading" />
    </div>
  ) : (
    <section>
      <Header title="Detalhes Comidas" />
      {fetchById.map((meal, index) => (
        <div key={ index }>
          <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="" />
          <h2 data-testid="recipe-title">{meal.strMeal}</h2>
          <div>
            <button data-testid="share-btn" type="button" onClick={ copyToCB }>
              Compartilhar
            </button>
            {copied ? 'Link copiado!' : null}
          </div>
          <button type="button" onClick={ () => setFavorite(meal.idMeal) }>
            <img
              data-testid="favorite-btn"
              id="favorite-img"
              src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
              alt=""
            />
          </button>
          <p data-testid="recipe-category">{meal.strCategory}</p>
          <ul id="ingredient-step">
            {getIngredients(meal, /strIngredient/).map((item, indx) => {
              const measure = getIngredients(meal, /strMeasure/);
              return (
                <li
                  key={ indx }
                  id={ indx }
                  data-testid={ `${indx}-ingredient-step` }
                >
                  <label
                    htmlFor={ `${indx}-meal` }
                    id={ item }
                    className={
                      checkedIngredients.includes(item)
                        ? 'ingredient-done'
                        : 'ingredient-not-done'
                    }
                  >
                    <input
                      type="checkbox"
                      id={ `${indx}-meal` }
                      checked={ checkedIngredients.includes(item) }
                      onClick={ () => handleClick(indx, item) }
                    />
                    {`${item} - ${measure[indx]}`}
                  </label>
                </li>
              );
            })}
          </ul>
          <p data-testid="instructions">{meal.strInstructions}</p>
          {!doneRecipes.includes(meal.idMeal) && (
            <Link to="/receitas-feitas">
              <button
                type="button"
                className="start-recipe-btn"
                // disabled={ handleButtomDisable() }
                data-testid="finish-recipe-btn"
              >
                Finalizar Receita!
              </button>
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}

ComidasInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default ComidasInProgress;
