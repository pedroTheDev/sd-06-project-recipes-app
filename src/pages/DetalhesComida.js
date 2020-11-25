import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CardBebida from '../components/CardBebida';
import RecipeContext from '../context/RecipeContext';
import { fetchApiComidasDetalhes } from '../services/FetchApiComidas';

function DetalhesComidas() {
  const { idDaReceita } = useParams();
  const [estadoApiComidas, setEstadoApiComidas] = useState([]);
  const {
    retornoApiBebidas,
  } = useContext(RecipeContext);
  const seis = 6;
  const zero = 0;
  const fetchComidasDetalhes = async () => {
    const response = await fetchApiComidasDetalhes(idDaReceita);
    setEstadoApiComidas(response);
  };
  useEffect(() => {
    fetchComidasDetalhes();
  }, []);

  return (
    estadoApiComidas.map((comida, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ comida.strMealThumb }
          alt={ comida.strMeal }
        />
        <h2 data-testid="recipe-title">{ comida.strMeal }</h2>
        <h3 data-testid="recipe-category">{comida.strCategory}</h3>
        <div>
          <p data-testid="0-ingredient-name-and-measure">
            {`${comida.strIngredient1}  ${comida.strMeasure1}`}
          </p>
          <p data-testid="1-ingredient-name-and-measure">
            {`${comida.strIngredient2}  ${comida.strMeasure2}`}
          </p>
          <p data-testid="2-ingredient-name-and-measure">
            {`${comida.strIngredient3}  ${comida.strMeasure3}`}
          </p>
          <p data-testid="3-ingredient-name-and-measure">
            {`${comida.strIngredient4}  ${comida.strMeasure4}`}
          </p>
          <p data-testid="4-ingredient-name-and-measure">
            {`${comida.strIngredient5}  ${comida.strMeasure5}`}
          </p>
          <p data-testid="5-ingredient-name-and-measure">
            {`${comida.strIngredient6}  ${comida.strMeasure6}`}
          </p>
          <p data-testid="6-ingredient-name-and-measure">
            {`${comida.strIngredient7}  ${comida.strMeasure7}`}
          </p>
          <p data-testid="7-ingredient-name-and-measure">
            {`${comida.strIngredient8}  ${comida.strMeasure8}`}
          </p>
          <p data-testid="8-ingredient-name-and-measure">
            {`${comida.strIngredient9}  ${comida.strMeasure9}`}
          </p>
          <p data-testid="9-ingredient-name-and-measure">
            {`${comida.strIngredient10}  ${comida.strMeasure10}`}
          </p>
          <p data-testid="10-ingredient-name-and-measure">
            {`${comida.strIngredient11}  ${comida.strMeasure11}`}
          </p>
          <p data-testid="11-ingredient-name-and-measure">
            {`${comida.strIngredient12}  ${comida.strMeasure12}`}
          </p>
          <p data-testid="12-ingredient-name-and-measure">
            {`${comida.strIngredient13}  ${comida.strMeasure13}`}
          </p>
          <p data-testid="13-ingredient-name-and-measure">
            {`${comida.strIngredient14}  ${comida.strMeasure14}`}
          </p>
          <p data-testid="14-ingredient-name-and-measure">
            {`${comida.strIngredient15}  ${comida.strMeasure15}`}
          </p>
          <p data-testid="15-ingredient-name-and-measure">
            {`${comida.strIngredient16}  ${comida.strMeasure16}`}
          </p>
          <p data-testid="16-ingredient-name-and-measure">
            {`${comida.strIngredient17}  ${comida.strMeasure17}`}
          </p>
          <p data-testid="17-ingredient-name-and-measure">
            {`${comida.strIngredient18}  ${comida.strMeasure18}`}
          </p>
          <p data-testid="18-ingredient-name-and-measure">
            {`${comida.strIngredient19}  ${comida.strMeasure19}`}
          </p>
          <p data-testid="19-ingredient-name-and-measure">
            {`${comida.strIngredient20}  ${comida.strMeasure20}`}
          </p>
        </div>
        <p data-testid="instructions">{comida.strInstructions}</p>
        <button
          type="button"
          data-testid={ `${index}-recomendation-card` }
        >
          Card receitas Recomendadas
        </button>

        <video
          controls
          data-testid="video"
          src={ comida.strYoutube }
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src={ comida.strYoutube }
          />

        </video>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <button type="button" data-testid="start-recipe-btn">Favoritar</button>
        <div data-testid={ `${index}-recomendation-card` }>
          {
            retornoApiBebidas
            && retornoApiBebidas.slice(zero, seis)
              .map((drink, indice) => CardBebida(drink, indice))
          }
        </div>
      </div>
    )));
}

export default DetalhesComidas;
