import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

class FoodCard extends React.Component {
  constructor() {
    super();

    this.handleShareFood = this.handleShareFood.bind(this);
  }

  handleShareFood({ idMeal }) {
    const url = `http://localhost:3000/comidas/${idMeal}`;
    window.alert('Link copiado!');
    //  https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
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

  render() {
    const { history, myRecipesFood } = this.props;
    return (
      <>
        {myRecipesFood.map((element, index) => (
          <div key={ index }>
            <input
              type="image"
              data-testid={ `${index}-horizontal-image` }
              src={ element.strMealThumb }
              width="200px"
              alt="horizontal"
              onClick={ () => history.push(`/comidas/${element.idMeal}`) }
            />

            <p id="area">
              {element.strArea}
            </p>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {element.strCategory}
            </p>
            <input
              type="button"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => history.push(`/comidas/${element.idMeal}`) }
              value={ element.strMeal }
            />
            <p data-testid={ `${index}-horizontal-done-date` }>
              {element.dateModified}
            </p>

            {element.strTags.split(',').map((tag, i) => (
              <span key={ i } data-testid={ `${i}-${tag}-horizontal-tag` }>
                { `${tag} `}
              </span>
            ))}

            <input
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
              onClick={ () => this.handleShareFood(element) }
            />

          </div>))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  myRecipesFood: state.menu.doneRecipesFood,
});

FoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
  myRecipesFood: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, null)(FoodCard);
