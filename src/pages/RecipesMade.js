import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function RecipesMade() {
  const [doneRecipes,
    setDoneRecipes] = useState(JSON.parse(localStorage.getItem('doneRecipes')));
  // const [path, setPath] = useState('comidas');
  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const location = useLocation();
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
    // const idRecipe = target.id;
    // const path = target.value;
    // setIdRecipe(idRecipe);
    history.push(`/${path}/${idRecipe}`);
  };

  const handleShareIcon = () => {
    const zero = 0;
    const menosUm = -1;
    let fullPath = '';
    if (location.substr(location.length - 1) === '/') {
      fullPath = `http://localhost:3000${location.slice(zero, menosUm)}`;
    } else {
      fullPath = `http://localhost:3000${location}`;
    }
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
        onClick={ handleShareIcon }
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
        onClick={ handleShareIcon }
        aria-hidden="true"
      />
    </div>
  );

  const handleClick = ({ target }) => {
    const filter = target.value;
    if (filter !== 'all') {
      setDoneRecipes(doneRecipes.filter((recipe) => recipe.type === filter));
    } else {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  };

  return (
    <div>
      <Header title="Comidas Feitas" />
      {doneRecipes.map((recipe, index) => (
        recipe.type === 'comida' ? renderFood(recipe, index) : renderDrinks(recipe, index)
      ))}
      <div className="buttons">
        <button
          type="button"
          className="btn"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          type="button"
          className="btn"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ handleClick }
        >
          Foods
        </button>
        <button
          type="button"
          className="btn"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ handleClick }
        >
          Drinks
        </button>
      </div>

    </div>
  );
}

export default RecipesMade;
