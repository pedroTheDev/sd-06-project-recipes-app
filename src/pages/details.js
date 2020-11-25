import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style/login.css';
import addLogin from '../actions/login';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      mealsDetails: [],
      isLoading: true,
    }
    this.requestDetails = this.requestDetails.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);

  }
  componentDidMount() {
    this.requestDetails();
  }

  requestDetails() {
    this.setState({ isLoading: true }, async () => {
      const { id } = this.props.match.params;
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const mealsApi = await fetch(endPoint);
      const { meals } = await mealsApi.json();
      // console.log("28", meals)
      this.setState({
        mealsDetails: meals,
        isLoading: false,
      })
    })

    // document.getElementById(id).classList.add('selected');
    // console.log(meals);
  }

  renderCardDetails() {
    const { mealsDetails } = this.state;
    let index = 0;
    const ings = Object.entries(mealsDetails[0]).filter(([key, value ]) => {
      if (key === `strIngredient${index+1}`) {
        index += 1; 
        return value
      }
      return null
    })
    console.log("1", mealsDetails)
    console.log(ings)
    return (
      <div>
        {/* <h3 data-testid="recipe-title" >{mealsDetails[0].strMeal}</h3>
        <img data-testid="recipe-photo" src="" /> //[0].strMealThumb
        <button data-testid="share-btn">share</button>
        <button data-testid="favorite-btn">favorite</button>
        <p data-testid="recipe-category"></p> // [0].strCategory
        <p data-testid="${index}-ingredient-name-and-measure"></p>  // [0].strIngredient1 - [0].strIngredient1
        <p data-testid="instructions"></p> // [0].strInstructions
        <p data-testid="video"></p>   //[0].strYoutube
        <p data-testid="${index}-recomendation-card"></p>
        <button data-testid="start-recipe-btn"></button> */}
      </div>)
  }

  render() {
    const { isLoading } = this.state;
    // console.log("50", this.state);
    return (
      <div>
        { isLoading ? (<p>carregando</p>) : this.renderCardDetails() }
      </div>

    )
  }
}

// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
// O texto de instruções deve possuir o atributo data-testid="instructions";
// O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";


// const mapDispatchToProps = (dispatch) => ({
//   sendLogin: (email) => dispatch(addLogin(email)),
// });

// Login.propTypes = {
//   sendLogin: PropTypes.func.isRequired,
//   history: PropTypes.objectOf().isRequired,
// };

// export default connect(null, mapDispatchToProps)(Login);
export default Details;
