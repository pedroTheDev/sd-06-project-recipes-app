import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterMatchInKeys } from '../helpers/assets';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import '../css/details.css';

function FoodDetail(props) {
  const { match: { path, params: { id } }, fetchId: { Comidas, Bebidas } } = props;
  const [objResponse, setObjResponse] = useState({});
  const [ingredientsItem, setIngredientsItem] = useState([]);
  const [mesuresItem, setMesuresItem] = useState([]);

  const settingResponseType = (response, nameType, idType, changeCategory) => {
    setObjResponse({
      img: response[idType][0][`str${nameType}Thumb`],
      title: response[idType][0][`str${nameType}`],
      category: response[idType][0][changeCategory],
      instruction: response[idType][0].strInstructions,
    });
  };

  const getIngredientsAndMesures = (object) => {
    const ingredients = filterMatchInKeys(/strIngredient/i, object);
    const showIngredients = ingredients.map((ingred) => object[ingred])
      .filter((eachIngredient) => eachIngredient !== '');
    setIngredientsItem(showIngredients);
    const mesures = filterMatchInKeys(/strMeasure/i, object);
    const showMesures = mesures.map((mesu) => object[mesu])
      .filter((eachMesure) => eachMesure !== '');
    setMesuresItem(showMesures);
  };

  const fetchRecipe = async () => {
    if (path === '/bebidas/:id') {
      const idType = 'drinks';
      const nameType = 'Drink';
      const changeCategory = 'strAlcoholic';
      const response = await Bebidas.idDrink(id);
      settingResponseType(response, nameType, idType, changeCategory);
      getIngredientsAndMesures(response.drinks[0]);
      console.log(response);
    } else {
      const idType = 'meals';
      const nameType = 'Meal';
      const changeCategory = 'strCategory';
      const response = await Comidas.idFood(id);
      console.log(response);
      settingResponseType(response, nameType, idType, changeCategory);
      getIngredientsAndMesures(response.meals[0]);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const showVideo = () => {
    if (path === '/bebidas/:id') {
      return '';
    }
    return (
      <video
        data-testid="video"
        controls
        src={ objResponse.video }
      >
        <track src={ objResponse.video } kind="captions" srcLang="en" />
      </video>
    );
  };
  console.log(objResponse);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ objResponse.img }
        alt={ objResponse.title }
        width="150"
      />
      <h1 data-testid="recipe-title">{objResponse.title}</h1>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
      <h4 data-testid="recipe-category">{objResponse.category}</h4>
      <ul>
        {ingredientsItem.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${item} - ${mesuresItem[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{objResponse.instruction}</p>
      {showVideo()}
      <span data-testid="index-0-recomendation-card">receitas recomendadas</span>
      <button
        data-testid="start-recipe-btn"
        className="button-position"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>);
}

const mapStateToProps = (state) => ({
  index: state.searchRecipes.recipes.results,
  fetchId: state.fetchmap,
});

FoodDetail.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
  fetchId: PropTypes.shape({
    Bebidas: PropTypes.objectOf(PropTypes.func).isRequired,
    Comidas: PropTypes.objectOf(PropTypes.func).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(FoodDetail);
