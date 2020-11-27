import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import splitPathname from '../utils/splitPathname';
import recipeDetailsProcessing from '../utils/recipeDetailsProcessing';
import checkRecipeInProgress from '../utils/checkRecipeInProgress';
import checkSavedRecipe from '../utils/checkSavedRecipe';
import checkFavoriteRecipe from '../utils/checkFavoriteRecipe';
import DetailAndProgressBody from '../components/DetailAndProgressBody';

function ReceitaProgresso(
  { location: { pathname } },
) {
  const [path, id, page] = splitPathname(pathname);
  const [recipe, setRecipe] = useState([]);
  const [disableButton, setdisableButton] = useState('visible');
  const [wasStarted, setWasStarted] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const buttonsProps = {
    path,
    id,
    isFav,
    wasCopied,
    setIsFav,
    setWasCopied,
  };

  useEffect(() => {
    recipeDetailsProcessing(id, path, setRecipe);
  }, []);

  useEffect(() => {
    checkSavedRecipe(recipe, setdisableButton);
    checkRecipeInProgress(path, recipe, setWasStarted);
    setIsFav(checkFavoriteRecipe(id));
  }, [recipe]);

  return (
    <main>
      ReceitaProgresso Page
      <DetailAndProgressBody
        recipe={ recipe }
        buttonsProps={ buttonsProps }
        recommendations={ [] }
        page={ page }
      />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className={ `start-recipe-btn ${disableButton}` }
      >
        Finalizar Receita
      </button>
    </main>
  );
}

ReceitaProgresso.propTypes = {
  pathname: PropTypes.string.isRequired,
  location: PropTypes.shape.isRequired,
};

export default ReceitaProgresso;
