import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavDrinkCard extends React.Component {
  constructor() {
    super();

    this.state = {
      Drink: [],
      Update: false,
    };
    this.handleShareDrink = this.handleShareDrink.bind(this);
    this.setFavoriteDrink = this.setFavoriteDrink.bind(this);
  }

  async componentDidMount() {
    const drinks = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (drinks) {
      const filteredDrink = drinks.filter((element) => element.type === 'bebida');
      this.setFavoriteDrink(filteredDrink);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { Update } = this.state;
    if (Update !== prevState.Update) {
      const drinks = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (drinks) {
        const filteredDrink = drinks.filter((element) => element.type === 'bebida');
        this.setFavoriteDrink(filteredDrink);
      }
    }
  }

  async handleShareDrink({ id }) {
    const url = `http://localhost:3000/bebidas/${id}`;
    await copy(url);
    const shareBtn = document.querySelector('.share-btn');
    shareBtn.value = 'Link copiado!';
    const p = document.querySelector('.p');
    const span = document.createElement('span');
    p.appendChild(span);
    span.innerHTML = 'Link copiado!';
    // window.alert('Link copiado!');
    // https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
    // const el = document.createElement('textarea');
    // el.value = url;
    // el.setAttribute('readonly', '');
    // el.style.position = 'absolute';
    // el.style.left = '-9999px';
    // document.body.appendChild(el);
    // el.select();
    // document.execCommand('copy');
    // document.body.removeChild(el);
  }

  setFavoriteDrink(Drink) {
    this.setState({
      Drink,
    });
  }

  setLocalState(recipe) {
    const myObject = [{
      id: recipe.id,
      type: 'bebida',
      area: '',
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
    }];
    const myLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const shareButton = document.querySelector('.fav-button');
    const blackHeart = 'http://localhost:3000/static/media/blackHeartIcon.b8913346.svg';
    const zero = 0;
    const minusOne = -1;
    if (shareButton.src === blackHeart && myLocalStorage) {
      const itemToRemove = myLocalStorage
        .find((element) => (element.id === recipe.id));
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

  changeFavoriteIcon(recipe) {
    if (localStorage.favoriteRecipes) {
      const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const receitaAtual = favRecipes.find((element) => (element.id === recipe.id));
      if (favRecipes.includes(receitaAtual)) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }

  render() {
    const { history, indexAcc } = this.props;
    const { Drink } = this.state;
    return (
      <div>
        {Drink.map((element, index) => (
          <div key={ index }>
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
            <input
              type="image"
              className="share-btn"
              data-testid={ `${index + indexAcc}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
              onClick={ () => this.handleShareDrink(element) }
            />
            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-favorite-btn` }
              className="fav-button"
              src={ this.changeFavoriteIcon(element) }
              onClick={ () => this.setLocalState(element) }
              alt="whiteHeartIcon"
            />
            <p className="p" />
          </div>))}
      </div>
    );
  }
}

FavDrinkCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(FavDrinkCard);
