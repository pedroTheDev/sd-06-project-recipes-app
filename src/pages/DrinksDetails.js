import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinksById, fetchRecommendedMeals } from '../services';
import { currentID, favRecipe } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class DrinksDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      Drink: [],
      RecommendedMeals: [],
      x: 0,
      Ingredients: [],
      Measures: [],
      Video: '',
      Update: false,
    };
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.handleYoutubeVideo = this.handleYoutubeVideo.bind(this);
    this.redirectFromState = this.redirectFromState.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } }, dispatchID } = this.props;
    const endpoint = pathname.split('/').pop();
    dispatchID(endpoint);
    const drinkRecipe = await fetchDrinksById(endpoint);
    const recommendedMeals = await fetchRecommendedMeals();
    this.setDrinkState(drinkRecipe, recommendedMeals);
    this.handleIngredients();
  }

  handleYoutubeVideo(url) {
    if (url) {
      const Video = url.split('=')[1];
      this.setState({ Video });
    }
  }

  handleIngredients() {
    const ingredientArray = [];
    const measureArray = [];
    let ingredient;
    let measure;
    const { Drink } = this.state;
    Drink.map((recipe) => {
      this.handleYoutubeVideo(recipe.strYoutube);
      const twenty = 20;
      for (let index = 1; index <= twenty; index += 1) {
        ingredient = `strIngredient${index}`;
        measure = `strMeasure${index}`;
        ingredientArray.push(recipe[ingredient]);
        measureArray.push(recipe[measure]);
      }

      const filteredIngredients = ingredientArray.filter((element) => element !== null)
        .filter((element) => element !== undefined).filter((element) => element !== '');
      const filteredMeasure = measureArray.filter((element) => element !== null)
        .filter((element) => element !== undefined).filter((element) => element !== '');

      this.setIngredients(filteredIngredients, filteredMeasure);
      return null;
    });
  }

  setDrinkState(Drink, RecommendedMeals) {
    this.setState({
      Drink,
      RecommendedMeals,
    });
  }

  setIngredients(Ingredients, Measures) {
    this.setState({
      Ingredients,
      Measures,
    });
  }

  setLocalState(recipe) {
    const myObject = [{
      id: recipe.idDrink,
      type: 'Drink',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }];
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(myObject));
    }
    const myLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const shareButton = document.querySelector('.fav-button');
    const blackHeart = 'http://localhost:3000/static/media/blackHeartIcon.b8913346.svg';
    const zero = 0;
    const minusOne = -1;
    if (shareButton.src === blackHeart && myLocalStorage) {
      const itemToRemove = myLocalStorage
        .find((element) => (element.id === recipe.idDrink));
      const indexToRemove = myLocalStorage.indexOf(itemToRemove, zero);
      if (indexToRemove !== minusOne) {
        myLocalStorage.splice(indexToRemove, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify(myLocalStorage));
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(myLocalStorage)); // assim remove
    } else {
      const MyLSObj = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const combineObjects = MyLSObj.concat(myObject);
      localStorage.setItem('favoriteRecipes', JSON.stringify(combineObjects)); // assim add
    }
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredStorage = favRecipes
      .filter((v, i, a) => a.findIndex((t) => (t.id === v.id)) === i); // só registra um único id
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredStorage));
    const { Update } = this.state;
    this.setState({ Update: !Update });
  }

  teste(recipe) {
    if (localStorage.favoriteRecipes) {
      const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const receitaAtual = favRecipes.find((element) => (element.id === recipe.idDrink));
      if (favRecipes.includes(receitaAtual)) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }

  changeFavIcon(idMeal) {
    const { favorite } = this.state;
    const { dispatchFavorite } = this.props;
    if (favorite) {
      dispatchFavorite(favorite, idMeal);
      return blackHeartIcon;
    }
    dispatchFavorite(favorite, idMeal);
    return whiteHeartIcon;
  }

  goLeft() {
    const additionalX = 110;
    const mintranslateX = 0;
    const maxtranslateX = 440;
    const { x } = this.state;
    if (x === mintranslateX) this.setState({ x: x - maxtranslateX });
    else this.setState({ x: x + additionalX });
  }

  goRight() {
    const additionalX = 110;
    const maxtranslateX = 440;
    const { x } = this.state;
    if (x === -maxtranslateX) this.setState({ x: x + maxtranslateX });
    else this.setState({ x: x - additionalX });
  }

  redirectFromState() {
    const { idCurrent } = this.props;
    const { history } = this.props;
    history.push(`/bebidas/${idCurrent}/in-progress`);
  }

  render() {
    const { Drink,
      RecommendedMeals,
      x,
      Ingredients,
      Measures,
      Video } = this.state;
    return (
      <div className="food-drink-detail-container">
        {Drink ? Drink.map((recipe, index) => (
          <div className="detail-card" key={ index }>
            <img
              src={ recipe.strDrinkThumb }
              data-testid="recipe-photo"
              alt="recipe-img"
            />
            <div className="details-title-div">
              <div className="recipe-title">
                <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
                <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
              </div>
              <div className="recipe-buttons">
                <input
                  type="image"
                  data-testid="share-btn"
                  src={ shareIcon }
                  onClick={ () => this.handleShareFood(recipe) }
                  alt="shareIcon"
                />
                <input
                  type="image"
                  data-testid="favorite-btn"
                  className="fav-button"
                  src={ this.teste(recipe) }
                  onClick={ () => this.setLocalState(recipe) }
                  alt="whiteHeartIcon"
                />
              </div>
            </div>
            <hr className="card-hr" />
            <h2>Ingredients</h2>
            <div className="ingredients">
              <ul className="detail-ingredients">
                {Ingredients.map((ingredient, i) => (
                  <li
                    key={ index }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                    -
                    { Measures[i] }
                  </li>
                ))}
              </ul>
            </div>
            <h2 data-testid="instructions">Instructions</h2>
            <div className="detail-instructions" data-testid="instructions">
              {recipe.strInstructions}
            </div>
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <h2>Recomendadas</h2>
            <div className="video-div">
              <iframe
                data-testid="video"
                title="recipe-video"
                src={ `https://www.youtube.com/embed/${Video}` }
                frameBorder="0"
                allow="accelerometer;autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="slider">
              {RecommendedMeals.map((recomend, i) => {
                console.log('bla');
                return (
                  <div
                    key={ i }
                    className="slide"
                    style={ { transform: `translateX(${x}%)` } }
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img
                      src={ recomend.strMealThumb }
                      data-testid="recipe-photo"
                      alt="recipe-img"
                    />
                    <div className="text-slider-div">
                      <p>{recomend.strCategory}</p>
                      <h4
                        data-testid={ `${i}-recomendation-title` }
                      >
                        {recomend.strMeal}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="slider-controls">
              <button type="button" id="goLeft" onClick={ this.goLeft }>
                <i className="fas fa-chevron-left" />
              </button>
              <button type="button" id="goRight" onClick={ this.goRight }>
                <i className="fas fa-chevron-right" />
              </button>
            </div>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe"
              onClick={ this.redirectFromState }
            >
              Iniciar Receita
            </button>
          </div>
        )) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  idCurrent: state.menu.currentID,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchID: (endpoint) => dispatch(currentID(endpoint)),
  dispatchFavorite: (isFavorite, idDrink) => dispatch(favRecipe(isFavorite, idDrink)),
});

DrinksDetails.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchID: PropTypes.func.isRequired,
  idCurrent: PropTypes.string.isRequired,
  dispatchFavorite: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrinksDetails);
