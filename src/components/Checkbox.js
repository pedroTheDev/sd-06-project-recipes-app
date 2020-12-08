// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// function Checkbox({ recipe, index, measure, item, url }) {
//   const [checked, setChecked] = useState([]);

//   const handleChecked = (ingredient) => {
//     console.log(ingredient);
//     setChecked([...checked, ingredient]);
//   };

//   return (
//     {<div data-testid="ingredient-step">
//       <input
//         type="checkbox"
//         key={ index }
//         name={ item }
//         onChange={ ({ target }) => handleChecked(target.name) }
//         id={ `step-${index}` }
//         data-testid={ `${index}-ingredient-name-and-measure` }
//       />
//       <label htmlFor={ `step-${index}` }>
//         {`- ${item} - ${measure[index]} `}
//       </label>
//     </div>}
//   );
// }

// Checkbox.propTypes = {
//   recipe: PropTypes.objectOf(PropTypes.string).isRequired,
//   index: PropTypes.number.isRequired,
//   measure: PropTypes.arrayOf(PropTypes.string).isRequired,
//   item: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
// };

// export default Checkbox;
