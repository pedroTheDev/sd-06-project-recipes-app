import React from 'react';

function RecipeDetails(props) {
  const { match } = props;
  const { id } = match.params;

  return (
    <div>Página de Details</div>
  );
}

export default RecipeDetails;
