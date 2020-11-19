import React from 'react';

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

export default AppProvider;
