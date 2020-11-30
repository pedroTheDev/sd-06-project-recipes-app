import React, { useState } from 'react';
import inProgressContext from './inProgressContext';

function InProgressProvider({ children }) {
  const [inProgress, setInProgress] = useState([]);

  const value = {
    inProgress,
    setInProgress,
  };

  return (
    <inProgressContext.Provider value={ value }>
      {children}
    </inProgressContext.Provider>
  );
}

export default InProgressProvider;
