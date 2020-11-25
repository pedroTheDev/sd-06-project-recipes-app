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
      disabledButton: false,
    };
    this.handleIngredients = this.handleIngredients.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.setMealState = this.setMealState.bind(this);
    this.checked = this.checked.bind(this);
    this.checkedItems = this.checkedItems.bind(this);
    this.test = this.test.bind(this);
    // this.getLocalStorage = this.getLocalStorage.bind(this);
    // this.handleButton = this.handleButton.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const endpoint = pathname.split('/')[2];
    const mealRecipe = await fetchMealsById(Number(endpoint));
    this.setMealState(mealRecipe);
    this.handleIngredients();
    this.checkedItems();
    // this.getLocalStorage();
  }

  // componentDidUpdate() {
  //   const { checkedItems} = this.state;
  //   if(checkedItems.length > 0)
  //   const getRecipesInProgress = localStorage.getItem('storedRecipe', );
  // }

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

  handleShareFood({ idMeal }) {
    const url = `http://localhost:3000/comidas/${idMeal}/in-progress`;
    window.alert('Link copiado!');
    const el = document.createElement('textarea');
    el.value = url;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  handleButton() {
    const { checkedItems, Ingredients } = this.state;
    if (Ingredients.length === Object.keys(checkedItems).length + 1) {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
    // console.log('checkedItems', Ingredients.length);
    // console.log('Ingredients', Object.keys(checkedItems).length + 1);
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

  // getLocalStorage() {
  //   const getRecipesInProgress = localStorage.getItem('storedRecipe');
  //   if (getRecipesInProgress) {
  //     const recipesInProgress = JSON.parse(getRecipesInProgress);
  //     this.state({ checkedItems: recipesInProgress });
  //   }
  // }

  checkedItems() {
    const checked = {};
    const { Ingredients } = this.state;
    const getCheckedItems = localStorage.getItem('storedRecipe');
    // const zero = 0;
    if (!getCheckedItems) {
      Ingredients.forEach((item) => {
        checked[item] = false;
      });
      this.setState({ checkedItems: checked });
      // localStorage.setItem('storedRecipe', JSON.stringify(checked));
    }
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

  test(e) {
    const { idCurrent } = this.props;
    console.log(idCurrent);
    const object = {
      meals: {
        idCurrent,
        ingredients: [
          e.target.value,
        ],
      },
    };
    const test = localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    console.log(test);
  }

  render() {
    const { Meal, Ingredients, Measures, checkedItems, disabledButton } = this.state;
    const { history } = this.props;
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
                  onClick={ () => this.handleShareFood(recipe) }
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
                <div
                  key={ i }
                  // onChange={ (i) => this.test(i) }
                >
                  <label
                    className="detail-ingredients"
                    htmlFor={ `ingredient ${i}` }
                    data-testid={ `${i}-ingredient-step` }
                  >
                    <input
                      id={ `ingredient ${i}` }
                      name={ `ingredient ${i}` }
                      type="checkbox"
                      onChange={ () => this.handleButton() }
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
              <button
                data-testid="finish-recipe-btn"
                type="button"
                onClick={ () => history.push('/receitas-feitas') }
                disabled={ !disabledButton }
              >
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
  idCurrent: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(FoodsRecipesInProgress);
