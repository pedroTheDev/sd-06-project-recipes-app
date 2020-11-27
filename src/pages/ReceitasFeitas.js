import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { shareIcon } from '../images';

function ReceitasFeitas() {
  if (!localStorage.doneRecipes) {
    return <h1>Você ainda não tem nenhuma receita Favorita. :(</h1>;
  }

  const doneRecipes = JSON.parse(localStorage.doneRecipes);

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
        { doneRecipes
          .map(({ id, type, image, alcoholicOrNot, name, area, category, doneDate, tags }, index) => (
            <span
              key={ index }
            >
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                />
               {
                (type === 'comida')
                  ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${area} - ${category}` }
                    </p>)
                  : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { alcoholicOrNot }
                    </p>)
              }
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { doneDate }
              </p>
              <img
                src={ shareIcon }
                alt="Compatilhar Receita"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              {tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag }
                </p>
              )) }
            </span>
          )) }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
