import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
<<<<<<< HEAD
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
=======
  return {
    ...render(<Router history={ history }>{component}</Router>), history,
  };
>>>>>>> 19df179b0dab3630ace85191ea8b8091e4d0967b
};

export default renderWithRouter;
