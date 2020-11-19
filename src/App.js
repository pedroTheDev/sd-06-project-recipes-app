import React from 'react';
import Provider from './context/Provider';

import './App.css';

function App() {
  return (
    <Provider>
      <div id="meals">
        <span>TRYBE</span>
      </div>
    </Provider>

  );
}

export default App;
