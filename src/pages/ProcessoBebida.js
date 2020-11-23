import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { shareIcon, whiteHeartIcon } from '../images';

function ProcessoBebida() {
  const { drinkIngredients } = useContext(RecipesContext);
  const [checked, setChecked] = useState({});

  const handleChange = ({ target }) => {
    setChecked({ ...checked, [target.name]: target.checked });
  };

  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="Foto da receita" />
      <h2 data-testid="recipe-title">Nome da Receita</h2>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Botão de Compartilhar"
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img
          src={ whiteHeartIcon }
          alt="Botão de Favorito"
        />
      </button>
      <p data-testid="recipe-category">
        Categoria
      </p>
      {drinkIngredients.map((ingredient, index) => (
        <span
          key={ index }
          data-testid="-ingredient-step"
        >
          {ingredient}
          <input
            type="checkbox"
            name={ ingredient }
            checked={ checked[ingredient[ingredient.name]] }
            onChange={ handleChange }
          />
        </span>
      ))}
      <p data-testid="instructions">
        Instruções
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default ProcessoBebida;
