import React, {/* useState */} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import { shareIcon, blackHeartIcon, whiteHeartIcon } from './images';

function inProgress() {
  // const [recipeInProgress, setRecipeInProgress] = useState([]);
  console.log(recipeInProgress);

  // useEffect(() => {
  //  if (!localStorage.recipeInProgress) {
  //    return <p>Você esta fazendo nenhuma receita.</p>
  //  };
  //  setRecipeInProgress(JSON.parse(localStorage.recipeInProgress));
  // }, []);

  return (
    <div>
      <Header data-testid="recipe-title" />
      <img
        src={ image }
        alt="nome da receita"
        data-testid="recipe-photo"
      />
      <button
        type="button"
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Compartilhar"
        />
      </button>
      <button
        type="button"
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorito"
        />
      </button>
      <p data-testid="recipe-category">
        Categoria
      </p>
      <p
        data-testid={ `${index}-ingredient-step` }
      >
        { ingredients }
      </p>
      <p
        data-testid={ instructions }
      >
        Instruções
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default inProgress;
