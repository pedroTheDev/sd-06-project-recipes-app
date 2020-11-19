import React from 'react';
import PropTypes from 'prop-types';

import { AuthProvider } from './auth';
import { SearchProvider } from './search';
import { RecipeProvider } from './recipes';

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <RecipeProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};

export default AppProvider;
