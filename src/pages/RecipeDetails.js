import React from 'react';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
// import BlackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  function shareRecipeLink() {
    /* Get the text field */
    // AQUI TEM QUE IR O LINK DA RESPECTIVA RECEITA
    const copyText = document.getElementById('myInput');
    /* Select the text field */
    copyText.select();
    /* Copy the text inside the text field */
    document.execCommand('copy');
    /* Alert the copied text */
    alert('Link copiado!');
  }

  function whiteToBlackHeart() {
    // AO CLICAR NO BOTÃO DO CORÇÃO DEVE MUDAR O SRC PARA {BlackHeartIcon} E FICAR GRAVADO
    // LOCALSTORAGE?
    // USAR A MESMA LÓGICA DO DISABLED?
    // Salve as receitas favoritas no localStorage na chave favoriteRecipes
    // O formato deve ser [{ id, type, area, category, alcoholicOrNot, name, image }].
    // As receitas feitas devem ser salvas em localStorage na chave doneRecipes no formato [{ id, type, area, category, alcoholicOrNot, name, image, doneDate, tags }].
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src="meals[0].strMealThumb"
        alt="{...strMeal} recipe"
      />
      <h1 data-testid="recipe-title">...strMeal</h1>
      <a href onClick={ () => shareRecipeLink() }>
        <img src={ ShareIcon } alt="Share Button" data-testid="share-btn" />
      </a>
      <a href onClick={ () => whiteToBlackHeart() }>
        <img src={ WhiteHeartIcon } alt="Favorite Button" data-testid="favorite-btn" />
      </a>
      {/* AQUI NO CASO DE SER BEBIDA TEM QUE SER SE É ALCOOLICO OU NAO strAlcoholic */}
      <h6 data-testid="recipe-category">.strCategory ou strAlcoholic</h6>
      <ul>
        {/* Aqui vai ter que rolar um map pelo nome do ingrediente "strIngredient1[i]"
        e pela sua respectiva medida "strMeasure1[i]"  */}
        <li data-testid="0-ingredient-name-and-measure">
          .strIngredient1[i] - .strMeasure1[i]

        </li>
      </ul>
      <h4>INSTRUCTIONS: </h4>
      <p data-testid="instructions"> .strInstructions </p>
      <h4>VIDEO: </h4>
      <video data-testid="video" width="750" height="500" controls>
        <source src="'.strYoutube'" type="video/mp4" />
        <track src="" kind="captions" />
      </video>
      <h4>RECOMENDED: </h4>
      {/* AQUI VAMOS RENDERIZAR UM COMPONENTE CHAMADO 'RECOMMENDED RECIPES' */}
      {/* <RecommendedRecipes data-testid="${index}-recomendation-card" /> */}
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ console.log('Iniciar receita') }
      >
        INICIAR RECEITA
      </button>
    </div>
  );
}
