import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesButtons from '../components/RecipesButtons';
import ShareButton from '../components/ShareButton';

export default function DoneRecipes() {
  const doneRecipesStorage = localStorage.getItem('favoriteRecipes'); // TROCAR favoriteRecipes POR doneRecipes
  const doneList = JSON.parse(doneRecipesStorage);
  const [selectedFilter, setselectedFilter] = useState('All');

  let filteredResults;
  if (selectedFilter === 'All') filteredResults = [...doneList];
  if (selectedFilter === 'Meal') {
    filteredResults = doneList.filter((item) => item.type === selectedFilter);
  }
  if (selectedFilter === 'Drink') {
    filteredResults = doneList.filter((item) => item.type === selectedFilter);
  }
  const detailRoute = (id, type) => {
    const drinkOrFood = (type === 'Meal') ? '/comidas/' : '/bebidas/';
    return `${drinkOrFood}${id}`;
  };
  return (
    <div>
      <RecipesButtons setselectedFilter={ setselectedFilter } />
      {doneList && filteredResults.map((item, index) => (
        <div key={ index } className="cardRecipe">
          <Link to={ () => detailRoute(item.id, item.type) }>
            <img
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-horizontal-image` }
              className="imageCardRecipe"
            />
          </Link>
          <div className="textBoxCard">
            {(item.type === 'Meal')
              ? (
                <p>
                  <span data-testid={ `${index}-horizontal-top-text` }>
                    {item.category}
                  </span>
                  {' '}
                  |
                  {' '}
                  {item.area}
                </p>
              )
              : ''}
            {(item.type === 'Drink') ? <p>{item.alcoholicOrNot}</p> : ''}
            <h3 data-testid={ `${index}-horizontal-name` }>
              <Link to={ () => detailRoute(item.id, item.type) }>{item.name}</Link>
            </h3>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            {/* {item.tags.map((tagName, i) => (
              <div
                key={ i }
                className="tagRecipe"
                data-testid={ `${i}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </div>
            ))} */}
            {/* Descomentar o código acima quando
            TROCAR favoriteRecipes POR doneRecipes */}
            <ShareButton index={ index } id={ item.id } type={ item.type } />
          </div>
          <div />
        </div>
      ))}
    </div>
  );
}
