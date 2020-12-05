import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';

const ReceitasFeitas = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleFilter = ({ target }) => {
    const { name } = target;

    setCurrentFilter(name);
  };

  const copyToCB = ({ target }) => {
    const { id, name } = target;
    const div = document.getElementById(id).parentElement.parentElement;
    const copied = document.createElement('span');

    copy(`http://localhost:3000/${name}s/${id}`);

    div.appendChild(copied).innerText = 'Link copiado!';
  };

  return ((!recipes)
    ? <h1>No Recipes Yet!</h1>
    : (
      <section>
        <Header title="Receitas Feitas" />
        <div>
          <button
            id="All"
            name="all"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleFilter }
          >
            All
          </button>
          <button
            id="Food"
            name="comida"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleFilter }
          >
            Food
          </button>
          <button
            id="Drink"
            name="bebida"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleFilter }
          >
            Drinks
          </button>
        </div>
        {recipes.filter((recipe) => (
          (currentFilter === 'all') ? recipe.type : recipe.type === currentFilter
        ))
          .map((recipe, index) => (
            <div key={ index }>
              <Link
                to={ `/${recipe.type === 'comida' ? 'comidas' : 'bebidas'}/${recipe.id}` }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  width="40%"
                  alt=""
                />
              </Link>
              {recipe.area.length
                ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.area} - ${recipe.category}`}
                  </p>
                )
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                )}
              <h3
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h3>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
              <div className="detail-btn my-2">
                <button type="button" className="btn" onClick={ copyToCB }>
                  <img
                    id={ recipe.id }
                    name={ recipe.type }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ share }
                    alt="share"
                  />
                </button>
              </div>
              {recipe.tags.map((tagName, indx) => (
                <div
                  key={ indx }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  {tagName}
                </div>
              ))}
            </div>
          ))}
      </section>
    )
  );
};

export default ReceitasFeitas;
