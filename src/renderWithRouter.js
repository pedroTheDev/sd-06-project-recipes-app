import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
<<<<<<< HEAD
<<<<<<< HEAD
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
=======
  return {
    ...render(<Router history={ history }>{component}</Router>), history,
  };
>>>>>>> 19df179b0dab3630ace85191ea8b8091e4d0967b
=======
  return {
    ...render(<Router history={ history }>{component}</Router>), history,
  };
>>>>>>> 5b6cb9f08f8d51766b974ec1c909aa9f3fcfb60c
};

export default renderWithRouter;
