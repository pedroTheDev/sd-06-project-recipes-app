import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   area: area-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]
function DoneCard({recipe, index}) {
  const [copied, setCopied] = useState(false);

  const {
    alcoholicOrNot,
    area,
    category,
    doneDate,
    id,
    image,
    name,
    tags,
    type,
  } = recipe;

  function foodTagsFunction() {
    let foodTags;
    if (typeof(tags) === 'string') {
      foodTags = tags.split(',', 2);
    } else {
      foodTags = [];
    }
    return foodTags;
  }

  const isFood = (type === 'comida');

  function handleShareClick() {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    const seconds = 5000;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, seconds);
  }

  const tagsTest = foodTagsFunction();
  console.log(tagsTest)
  return (
    <div className="recipe-card">
      <Link to={`/${type}s/${id}`} >
        <img
          className="card-img"
          data-testid={`${index}-horizontal-image`} src={ image } alt={ name }
        />
        <h4 data-testid={`${index}-horizontal-name`}>{name}</h4>
      </Link>
      {(isFood) && <p data-testid={`${index}-horizontal-top-text`}>{area} - {category}</p>}
      {(!isFood) && <p data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot}</p>}
      <p data-testid={`${index}-horizontal-done-date`}>{doneDate}</p>
      {(isFood) && tagsTest.map((tag) => (
        <div
          data-testid={`${index}-${tag}-horizontal-tag`}
        >
          {tag}
        </div>
      ))}
      <button
        type="button"
        onClick={ handleShareClick }
        >
        <img
          data-testid={`${index}-horizontal-share-btn`}
          src={ shareIcon }
          alt="Compartilhar"
        />
        Compartilhar
      </button>
      {(copied) && <span>Link copiado!</span>}
    </div>
  )
}

export default DoneCard;
