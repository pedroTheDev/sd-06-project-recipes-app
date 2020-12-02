import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.state = {
      check: '',
    };
  }
  // const isChecked = () => {
  //   const local = !localStorage.getItem('checkeds') ? ''
  //     : JSON.parse(localStorage.getItem('checkeds'));
  //   local.forEach((item, index) => {
  //     if (url.includes(Object.keys(item))) {
  //       const id = url.replace(/\D/g, '');
  //       console.log(item[id][0])
  //       item[id].map((recipe, index) => {
  //         const i = `step-2`;
  //         //console.log(document.getElementById(recipe).checked );
  //         console.log(recipe[i])
  //       })
  //     }
  //   });
  // };
  // useEffect(() => isChecked(), []);

  render() {
    const { recipe, index, measure, item, url } = this.props;
    // const { check } = this.state;
    console.log(recipe);
    const setChecked = (id, target) => {
      // const local = !localStorage.getItem('checkeds') ? ''
      //   : JSON.parse(localStorage.getItem('checkeds'));

      this.setState((prev) => ({
        ...prev,
        [target.id]: target.checked,
      }));
      // const ingredient = {
      //   ...local,
      //   [id]: {
      //     ...check,
      //   }
      // };
      // localStorage.setItem('checkeds', JSON.stringify(ingredient));
    };

    return (
      <div data-testid="ingredient-step">
        <input
          type="checkbox"
          key={ index }
          onChange={ ({ target }) => setChecked(url.replace(/\D/g, ''), target) }
          id={ `step-${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        />
        <label htmlFor={ `step-${index}` }>
          {`- ${item} - ${measure[index]} `}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  measure: PropTypes.arrayOf(PropTypes.string).isRequired,
  item: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Checkbox;
