import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copyToClipboard from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';

function ProcessoComida() {
  const { foodIngredients } = useContext(RecipesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isShare, setShare] = useState();
  const [checked, setChecked] = useState({});

  const handleChange = ({ target }) => {
    setChecked({ ...checked, [target.name]: target.checked });
  };

  useEffect(() => {
    localStorage.inProgressRecipes = JSON.stringify(
      { meals: { idComida: Object.keys(checked) } },
    );
  }, [checked]);

  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="Foto da receita" />
      <h2 data-testid="recipe-title">Nome da Receita</h2>
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => setShare('Link copiado!') && copyToClipboard('http://localhost:3000/comidas/52771') }
        >
          <img
            src={ shareIcon }
            alt="Botão de Compartilhar"
          />
        </button>
        {isShare}
      </div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setIsFavorite(!isFavorite) }
      >
        <img
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
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDisable }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default ProcessoComida;
