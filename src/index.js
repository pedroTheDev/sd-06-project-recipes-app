import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReceitasProvider from './context/ReceitasProvider';

ReactDOM.render(
  <ReceitasProvider>
    <App />
  </ReceitasProvider>,
  document.getElementById('root'),
);
