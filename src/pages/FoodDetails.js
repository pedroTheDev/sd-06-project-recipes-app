import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useRequestDrink from '../hooks/useRequestDrink';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [requestDetails, setrequestDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [apiResponse, setFilter] = useRequestDrink([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const maxShow = 6;
  const zero = 0;
  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    setrequestDetails(response.meals[0]);
  };

  const requestIngredients = () => {
    const twentyOne = 21;
    const TheIngredients = [];
    for (let i = 1; i < twentyOne; i += 1) {
      if (requestDetails.length !== zero
        && requestDetails[`strIngredient${i}`] !== null
        && requestDetails[`strIngredient${i}`] !== ''
      ) {
        TheIngredients
          .push(`${requestDetails[`strMeasure${i}`]}
            ${requestDetails[`strIngredient${i}`]}`);
      }
    }
    setIngredients(TheIngredients);
  };

  const handleInitRecipe = () => {
    history.push(`/comidas/${id}/in-progress`);
  };
  const changesFavorites = () => {
    if (localStorage.length > zero) {
      const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(readLocalStorage);
      console.log(requestDetails);
    }
    favoriteRecipes = [...favoriteRecipes, { id: requestDetails.idMeal,
      area: 'area',
      category: requestDetails.strCategory,
      alcoholicOrNot: requestDetails.strDrinkAlternate,
      name: requestDetails.strMeal,
      image: requestDetails.strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    // salvar o array de obj que veio do localStorage numa varriavel JS (JSON.stringify)
    // map no array de obj que vier do localStorage
    // ler array do local storage
    // favoriteRecipes O formato deve ser [{ id, type, area, category, alcoholicOrNot, name, image }]
  };

  useEffect(() => {
    requestIngredients();
  }, [requestDetails]);

  useEffect(() => {
    requestDetailsAPI();
    setFilter({ text: '', option: '', category: '' });
  }, []);
  return (
    <div data-testid="food-details" className="food-details">
      <img
        className="pictureDetail"
        src={ requestDetails.strMealThumb }
        alt={ requestDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{requestDetails.strMeal}</h1>
      <ShareBtn />
      <FavoriteBtn isFavorite={ isFavorite } changesFavorites={ changesFavorites } />
      <p data-testid="recipe-category">{requestDetails.strCategory}</p>
      {ingredients.map((ingredient, index) => (
        <div key={ index }>
          <ul>
            <li data-testid={ `${index}-ingredient-name-and-measure` }>{ingredient}</li>
          </ul>
        </div>
      ))}

      <iframe
        data-testid="video"
        title={ requestDetails.strMeal }
        width="100%"
        height="315"
        src={ requestDetails.strMeal
          ? requestDetails.strYoutube.replace('watch?v=', 'embed/') : undefined }
        frameBorder="0"
        allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <p data-testid="instructions">{requestDetails.strInstructions}</p>
      <h3>Receitas Recomendadas</h3>
      <div className="recomended">
        {apiResponse.filter((e, index) => e && index < maxShow).map((drink, index) => (
          <div
            className="mini-card"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</p>
            <img
              className="mini-picture"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>))}
      </div>
      <button
        onClick={ handleInitRecipe }
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.func.isRequired,
};

export default FoodDetails;
