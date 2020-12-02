import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function RecipesMade() {
  const [doneRecipes,
    setDoneRecipes] = useState(JSON.parse(localStorage.getItem('doneRecipes')));
  const history = useHistory();

  const renderTags = (tags, index) => (
    tags.map((tag) => (
      <span
        key={ index }
        data-testid={ `${index}-${tag}-horizontal-tag` }
      >
        {tag}
      </span>
    ))
  );

  const goToDetails = (idRecipe, path) => {
    history.push(`/${path}/${idRecipe}`);
  };

  const handleShareIcon = (idRecipe, path) => {
    const fullPath = `http://localhost:3000/${path}/${idRecipe}`;
    const tempElement = document.createElement('textarea');
    tempElement.value = fullPath;
    tempElement.setAttribute('readonly', '');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    const linkCopy = document.createElement('p');
    linkCopy.innerHTML = 'Link copiado!';
    document.querySelector('.buttons').appendChild(linkCopy);
  };

  const renderFood = (recipe, index) => (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt="foto"
        width="100px"
        id={ recipe.id }
        value="comidas"
        onClick={ () => {
          goToDetails(recipe.id, 'comidas');
        } }
        aria-hidden="true"
      />
      <span
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${recipe.area} - ${recipe.category}`}
      </span>
      <span
        data-testid={ `${index}-horizontal-name` }
        id={ recipe.id }
        value="comidas"
        onClick={ () => {
          goToDetails(recipe.id, 'comidas');
        } }
        aria-hidden="true"
      >
        {recipe.name}
      </span>
      <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share icon"
        onClick={ () => handleShareIcon(recipe.id, 'comidas') }
        aria-hidden="true"
      />
      {renderTags(recipe.tags, index)}
    </div>
  );

  const renderDrinks = (recipe, index) => (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt="foto"
        width="100px"
        id={ recipe.id }
        value="bebidas"
        onClick={ () => {
          goToDetails(recipe.id, 'bebidas');
        } }
        aria-hidden="true"
      />
      <span
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.alcoholicOrNot}

      </span>
      <span
        data-testid={ `${index}-horizontal-name` }
        id={ recipe.id }
        value="bebidas"
        onClick={ () => {
          goToDetails(recipe.id, 'bebidas');
        } }
        aria-hidden="true"
      >
        {recipe.name}
      </span>
      <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share icon"
        onClick={ () => handleShareIcon(recipe.id, 'bebidas') }
        aria-hidden="true"
      />
    </div>
  );

  const handleClick = ({ target }) => {
    const filter = target.value;
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filter !== 'all') {
      setDoneRecipes(allRecipes.filter((recipe) => recipe.type === filter));
    } else {
      setDoneRecipes(allRecipes);
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="container-category">
        <button
          type="button"
          className="btn btn-light btn-sm btn-border"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm btn-border"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ handleClick }
        >
          Foods
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm btn-border"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ handleClick }
        >
          Drinks
        </button>
      </div>
      {doneRecipes ? (doneRecipes.map((recipe, index) => (
        recipe.type === 'comida' ? renderFood(recipe, index) : renderDrinks(recipe, index)
      ))) : <h5 className="favorite-message">Você não tem receitas prontas!</h5>}
    </div>
  );
}

export default RecipesMade;
