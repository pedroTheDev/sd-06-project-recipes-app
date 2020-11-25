import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

class FoodCard extends React.Component {
  constructor() {
    super();
    this.state = {
      Food: [],
    };
    this.setFoodState = this.setFoodState.bind(this);
    this.handleShareFood = this.handleShareFood.bind(this);
  }

  async componentDidMount() {
    const foods = JSON.parse(localStorage.getItem('doneRecipes'));
    if (foods) {
      const filteredFood = foods.filter((element) => element.type === 'comida');
      this.setFoodState(filteredFood);
    }
  }

  handleShareFood({ id }) {
    const url = `http://localhost:3000/comidas/${id}`;
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

  setFoodState(Food) {
    this.setState({
      Food,
    });
  }

  render() {
    const { Food } = this.state;
    const { history, indexAcc } = this.props;
    return (
      <div>
        {Food.map((element, index) => (
          <div key={ index + indexAcc }>
            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-image` }
              src={ element.image }
              width="200px"
              alt="horizontal"
              onClick={ () => history.push(`/comidas/${element.id}`) }
            />
            <p data-testid={ `${index + indexAcc}-horizontal-top-text` }>
              {`${element.area} - ${element.category}`}
            </p>
            <button
              type="button"
              data-testid={ `${index + indexAcc}-horizontal-name` }
              onClick={ () => history.push(`/comidas/${element.id}`) }
              value={ element.name }
            >
              { element.name }
            </button>
            <p data-testid={ `${index + indexAcc}-horizontal-done-date` }>
              {element.doneDate}
            </p>
            {typeof element.tags === 'string'
              ? <div>
                <p
                  key="tag0"
                  data-testid={ `${'0'}-${element.tags.split(',')[0]}-horizontal-tag` }
                >
                  { `${element.tags.split(',')[0]}`}
                </p>
                <p
                  key="tag1"
                  data-testid={ `${'0'}-${element.tags.split(',')[1]}-horizontal-tag` }
                >
                  { `${element.tags.split(',')[1]}`}
                </p>
                </div>
              : <div>
                <p
                  key="tag0"
                  data-testid={ `${'0'}-${element.tags[0]}-horizontal-tag` }
                >
                  { `${element.tags[0]}`}
                </p>
                <p key="tag1" data-testid={ `${'0'}-${element.tags[1]}-horizontal-tag` }>
                  { `${element.tags[1]}`}
                </p>
              </div>}
            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
              onClick={ () => this.handleShareFood(element) }
            />

          </div>))}
      </div>
    );
  }
}

FoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(FoodCard);
