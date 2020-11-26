import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';

function StartButton({ id, title }) {
  let setRoute = '';

  if (title === 'Comidas') {
    setRoute = 'comidas';
  } else {
    setRoute = 'bebidas';
  }

  const { startRecipe, setStartRecipe, finalizedRecipe } = useContext(RecipesAppContext);
  let textButton = 'Iniciar Receita';

  if (startRecipe && !finalizedRecipe) {
    textButton = 'Continuar Receita';
  }

  const handleStartRecipe = () => {
    setStartRecipe(true);
  };

  const alredyRecipeMade = '';

  const button = (
    <Link
      to={ `/${setRoute}/${id}/in-progress` }
      type="button"
    >
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleStartRecipe() }
      >
        {textButton}
      </button>
    </Link>
  );

  if (finalizedRecipe) {
    return alredyRecipeMade;
  }
  return (
    button
  );
}

export default StartButton;
