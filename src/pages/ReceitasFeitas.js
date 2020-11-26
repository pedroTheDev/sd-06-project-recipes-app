import React from 'react';
import { Header } from '../components';
import { shareIcon } from '../images';

function ReceitasFeitas() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        {doneRecipes.map((image, index) => (
          <span
            key={ index }
          >
            <img
              src=""
              alt=""
              data-testid={ `${index}-horizontal-image` }
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              Categoria da receita
            </p>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              Nome da receita
            </p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              Data da Receita foi feita
            </p>
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
            <p
              data-testid={ `${index}-{tagName}-horizontal-tag` }
            >
              Tags da receita
            </p>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ReceitasFeitas;
