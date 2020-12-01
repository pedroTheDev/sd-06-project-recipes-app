import React from 'react';
import ShareButton from './ShareButton'
import FavButton from './FavButton';
import './recipeCard.css';

const DoneRecipeCard = (props) => {
  const { index, recipe } = props;
  const { cardImage, name, category, date, tags } = recipe;
  return (
    <div>
      <img
        className="smallIMG"
        data-testid={ `${index}-horizontal-image` }
        src={ cardImage }
      />
      <p data-testid={`${index}-horizontal-name`}>Nome: { name }</p>
      <p>Categoria: { category }</p>
      <p data-testid={`${index}-horizontal-tag`}>Tags: {
        tags.map((tag) => (<span>{ tags.length > 1 ? `${ tag } ` : tag }</span>))
      };</p>
      <p data-testid={`${index}-horizontal-done-date`}>Feito em: { date }</p>
      <ShareButton  />
      <FavButton
        recipe={ recipe }
        type="/comidas"
        data-testid={`${index}-horizontal-share-btn`}
      />
    </div>
  );
}

export default DoneRecipeCard;
