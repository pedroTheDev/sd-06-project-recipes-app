import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMealsById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodsRecipesInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      Meal: [],
      Ingredients: [],
      Measures: [],
      checkedItems: [],
    };
    this.handleIngredients = this.handleIngredients.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.setMealState = this.setMealState.bind(this);
    this.checked = this.checked.bind(this);
    this.checkedItems = this.checkedItems.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const endpoint = pathname.split('/')[2];
    const mealRecipe = await fetchMealsById(Number(endpoint));
    console.log(mealRecipe);
    this.setMealState(mealRecipe);
    this.handleIngredients();
    this.checkedItems();
  }

  handleIngredients() {
    const ingredientArray = [];
    const measureArray = [];
    let ingredient;
    let measure;
    const { Meal } = this.state;
    Meal.map((recipe) => {
      const twenty = 20;
      for (let index = 1; index <= twenty; index += 1) {
        ingredient = `strIngredient${index}`;
        measure = `strMeasure${index}`;
        ingredientArray.push(recipe[ingredient]);
        measureArray.push(recipe[measure]);
      }
      const filteredIngredients = ingredientArray
        .filter((item) => item !== '' && item !== null && item !== undefined);

      const filteredMeasure = measureArray
        .filter((item) => item !== '' && item !== null && item !== undefined);

      this.setIngredients(filteredIngredients, filteredMeasure);
      return null;
    });
  }

  setMealState(Meal) {
    this.setState({
      Meal,
    });
  }

  setIngredients(Ingredients, Measures) {
    this.setState({
      Ingredients,
      Measures,
    });
  }

  checkedItems() {
    const checked = {};
    const { Ingredients } = this.state;
    Ingredients.forEach((item) => {
      checked[item] = false;
    });
    this.setState({ checkedItems: checked });
  }

  checked(e) {
    const { checkedItems } = this.state;
    const { value, checked } = e.target;
    this.setState({
      checkedItems: { ...checkedItems, [value]: checked },
    });
    const inputsList = document.querySelectorAll('input');
    inputsList.forEach((item) => {
      if (item.checked === true) {
        item.parentNode.className = 'styled';
      } else {
        item.parentNode.className = 'not-styled';
      }
    });
  }

  render() {
    const { Meal, Ingredients, Measures, checkedItems } = this.state;
    return (
      <div className="food-drink-detail-container">
        {Meal ? Meal.map((recipe, index) => (
          <div className="detail-card" key={ index }>
            <img
              src={ recipe.strMealThumb }
              data-testid="recipe-photo"
              alt="recipe-img"
            />
            <div className="details-title-div">
              <div className="recipe-title">
                <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
                <p data-testid="recipe-category">{recipe.strCategory}</p>
              </div>
              <div className="recipe-buttons">
                <input
                  type="image"
                  data-testid="share-btn"
                  src={ shareIcon }
                  alt="shareIcon"
                />
                <input
                  type="image"
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  alt="whiteHeartIcon"
                />
              </div>
            </div>
            <hr className="card-hr" />
            <h2>Ingredients</h2>
            <div className="ingredients">
              {Ingredients.map((recipes, i) => (
                <div key={ i }>
                  <label
                    className="detail-ingredients"
                    htmlFor={ `ingredient ${i}` }
                    data-testid={ `${i}-ingredient-step` }
                  >
                    <input
                      id={ `ingredient ${i}` }
                      name={ `ingredient ${i}` }
                      type="checkbox"
                      onClick={ (e) => this.checked(e) }
                      value={ recipes }
                      checked={ checkedItems.recipes }
                    />
                    {recipes}
                    -
                    { Measures[i] }
                  </label>
                </div>
              ))}
            </div>
            <h2 data-testid="instructions">Instructions</h2>
            <div className="detail-instructions">{recipe.strInstructions}</div>
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <div>
              <button type="button" data-testid="finish-recipe-btn">
                Finalizar Receita
              </button>
            </div>
          </div>
        )) : null }
      </div>);
  }
}

const mapStateToProps = (state) => ({
  idCurrent: state.menu.currentID,
});

FoodsRecipesInProgress.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, null)(FoodsRecipesInProgress);
