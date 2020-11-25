import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

class DrinkCard extends React.Component {
  constructor() {
    super();
    this.state = {
      Drink: [],
    };
    this.setDrinkState = this.setDrinkState.bind(this);
    this.handleShareDrink = this.handleShareDrink.bind(this);
  }

  async componentDidMount() {
    const drinks = JSON.parse(localStorage.getItem('doneRecipes'));
    if (drinks) {
      const filteredDrink = drinks.filter((element) => element.type === 'bebida');
      this.setDrinkState(filteredDrink);
    }
  }

  handleShareDrink({ id }) {
    const url = `http://localhost:3000/bebidas/${id}`;
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

  setDrinkState(Drink) {
    this.setState({
      Drink,
    });
  }

  render() {
    const { Drink } = this.state;
    const { history, indexAcc } = this.props;
    return (
      <div>
        {Drink.map((element, index) => (
          <div key={ index + indexAcc }>
            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-image` }
              src={ element.image }
              width="200px"
              alt="horizontal"
              onClick={ () => history.push(`/bebidas/${element.id}`) }
            />

            <p data-testid={ `${index + indexAcc}-horizontal-top-text` }>
              {element.alcoholicOrNot}
            </p>
            <button
              type="button"
              data-testid={ `${index + indexAcc}-horizontal-name` }
              onClick={ () => history.push(`/bebidas/${element.id}`) }
              value={ element.name }
            >
              { element.name }
            </button>
            <p data-testid={ `${index + indexAcc}-horizontal-done-date` }>
              {element.doneDate}
            </p>

            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
              onClick={ () => this.handleShareDrink(element) }
            />

          </div>))}
      </div>
    );
  }
}

DrinkCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(DrinkCard);
