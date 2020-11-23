import React from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import '../Components/style/style.css';

export default function DetalhesComidas() {
  /* const { id } = useParams(); */

  /* useEffect(() => {

  }, []); */

  return (
    <div>
      <h1>Detalhes Comidas</h1>
      <img data-testid="recipe-photo" alt="foto-recipe" />
      <h2 data-testid="recipe-title">Titulo da Receita</h2>
      <button
        type="button"
        src={ ShareIcon }
        alt="compartilhar"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        src={ HeartIcon }
        alt="favoritar"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <h3 data-testid="recipe-category">Categoria da receita</h3>
      {/* <h4 data-testid={ `${index}-ingredient-name-and-measure` }>
      Ingredientes da Receita
      </h4> */}
      <p data-testid="instructions">Instruções</p>
      <p data-testid="video">vídeo</p>
      {/* <p data-testid={ `${index}-recomendation-card` }>Card</p> */}
      <Link to="/comidas/:id/in-progress">
        <button type="button" id="iniciar-receita" data-testid="start-recipe-btn">
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}
