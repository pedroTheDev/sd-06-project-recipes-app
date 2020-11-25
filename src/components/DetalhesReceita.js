// import React from 'react';
// import FetchApiBebidas from '../services/FetchApiBebidas';
// import FetchApiComidas from '../services/FetchApiComidas';
// import RecipeContext from '../context/RecipeContext';

// function DetalhesReceita(elemento, index) {
//   const urlPath = window.location.pathname;
//   async function renderVideo() {
//     if (urlPath.includes('comidas')) {
//       const response = await FetchApiComidas(valueRadioButton, searchBar);
//       return <section data-testid="video">Video</section>;
//     }
//   }
//   return (
//     <div key={ elemento.idDrink } data-testid={ `${index}-recipe-card` }>
//       <img
//         data-testid="recipe-photo"
//         src={ elemento.strDrinkThumb }
//         alt={ elemento.strDrink }
//       />
//       <h4 data-testid="recipe-title">{ elemento.strDrink }</h4>
//       <h6 data-testid="recipe-category">Categoria</h6>
//       <p data-testid={ `${index}-ingredient-name-and-measure` }>Ingredientes</p>
//       <p data-testid="instructions">Instruções</p>
//       { renderVideo }
//       <button type="button" data-testid="share-btn">Compartilhar</button>
//       <button type="button" data-testid="favorite-btn">Favoritar</button>

//     </div>
//   );
// }

// export default DetalhesReceita;
