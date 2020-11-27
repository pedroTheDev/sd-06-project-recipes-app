import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesAppContext';
import { fetchDrinkById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

function RecipeDrinkProcess(props) {
  const ZERO = 0;
  const VINTE = 20;
  // let list = [];
  const [arrIngredient, setArrIngredient] = useState([]);
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { match } = props;
  const { id } = match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);

  const settingRecipeInProgress = async () => {
    const response = await fetchDrinkById(id);
    setRecipes(response);
  };

  const renderIngredients = () => {
    const arr = [];
    for (let i = 1; i <= VINTE; i += 1) {
      if (recipes[0][`strIngredient${i}`]) {
        arr.push({ ingredient: recipes[0][`strIngredient${i}`], checked: false });
      } else {
        break;
      }
    }
    setArrIngredient(arr);
  };

  const markIngredient = (index, event) => {
    const copyArrIngredient = [...arrIngredient];
    copyArrIngredient[index].checked = event.target.checked;
    setArrIngredient(copyArrIngredient);

    const response = arrIngredient.filter((item) => item.checked === true)
      .map((name) => name.ingredient);

    localStorage.setItem('cocktails', JSON.stringify({ [id]: response }));
  };

  const createCheckBoxes = () => (
    arrIngredient.map((ingredient, index) => (
      <label
        htmlFor={ ingredient.ingredient }
        key={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          checked={ arrIngredient[index].checked }
          // ={ arrIngredient[index].checked }
          id={ ingredient.ingredient }
          onClick={ (e) => markIngredient(index, e) }
        />
        { ingredient.ingredient }
      </label>
    ))
  );

  const favoritar = () => {
    setFavorite(!favorite);
    const favoritas = {
      id,
      type: 'bebida',
      area: recipes[0].strArea,
      category: recipes[0].strCategory,
      alcoholicOrNot: recipes[0].strAlcoholic,
      name: recipes[0].strDrink,
      image: recipes[0].strDrinkThumb,
    };

    const obj = [{
      favorite,
      favoritas,
    }];

    const response = obj.filter((fav) => !fav.favorite).map((item) => item.favoritas);
    localStorage.setItem('favoriteRecipes', JSON.stringify(response));
  };

  useEffect(() => {
    settingRecipeInProgress();
  }, []);

  useEffect(() => {
    if (recipes.length > ZERO) renderIngredients();
  }, [recipes]);

  return (
    recipes.length > ZERO
      && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ recipes[0].strDrinkThumb }
            alt="imagem"
          />
          <h4
            data-testid="recipe-title"
          >
            { recipes[0].strDrink }
          </h4>
          <button
            type="button"
            onClick={ () => setShare(true) }
            data-testid="share-btn"
            className="btn-copy"
            data-clipboard-text={ `http://localhost:3000/bebidas/${id}` }
            data-clipboard-action="copy"
          >
            <img
              src={ shareIcon }
              alt="compartilhar"
            />
          </button>
          {share && <span>Link copiado!</span>}
          <div>
            <button
              type="button"
              onClick={ () => favoritar() }
            >
              <img
                data-testid="favorite-btn"
                alt="Favoritar"
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
              />
            </button>
          </div>
          <h5
            data-testid="recipe-category"
          >
            {recipes[0].strCategory}
          </h5>
          <div className="checkbox">
            { createCheckBoxes() }
          </div>
          <p data-testid="instructions">{ recipes[0].strInstructions }</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => props.history.push('/receitas-feitas') }
            disabled={ !arrIngredient.every((item) => item.checked) }
          >
            Finalizar Receita
          </button>
        </div>
      )
  );
}

RecipeDrinkProcess.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDrinkProcess;
