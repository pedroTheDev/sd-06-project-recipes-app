import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useRequestDrink from '../hooks/useRequestDrink';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';

function FoodDetails(props) {
  const { match: { params: { id } }, location: { pathname } } = props;
  const history = useHistory();
  const [requestDetails, setrequestDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [apiResponse, setFilter] = useRequestDrink([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState('none');
  const textArea = useRef(null);
  const maxShow = 6;
  const zero = 0;

  const copyToClipboard = (e) => {
    textArea.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopied('block');
  };

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

  const removeIdLocalSotrage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = readLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  };

  const getLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idFavorito = readLocalStorage !== null
      ? readLocalStorage.find((element) => element.id === id)
      : undefined;
    if (idFavorito) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const setLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipes = readLocalStorage !== null ? readLocalStorage : [];
    const newRecipe = { id: requestDetails.idMeal,
      type: 'comida',
      area: requestDetails.strArea,
      category: requestDetails.strCategory,
      alcoholicOrNot: '',
      name: requestDetails.strMeal,
      image: requestDetails.strMealThumb,
    };
    favoriteRecipes.push(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const changesFavorites = () => {
    if (isFavorite) {
      removeIdLocalSotrage();
      setIsFavorite(!isFavorite);
    } else {
      setLocalStorage();
      setIsFavorite(!isFavorite);
    }
  };

  useEffect(() => {
    getLocalStorage();
  }, []);
  useEffect(() => {
    requestIngredients();
  }, [requestDetails]);

  useEffect(() => {
    requestDetailsAPI();
    setFilter({ text: '', option: '', category: '' });
  }, []);
  return (
    <div data-testid="food-details" className="food-details">
      <p style={ { display: copied } }>Link copiado!</p>
      <img
        className="pictureDetail"
        src={ requestDetails.strMealThumb }
        alt={ requestDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{requestDetails.strMeal}</h1>
      <ShareBtn copy={ copyToClipboard } />
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
      <textarea
        ref={ textArea }
        value={ `http://localhost:3000${pathname}` }
      />
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
  location: PropTypes.func.isRequired,
};

export default FoodDetails;
