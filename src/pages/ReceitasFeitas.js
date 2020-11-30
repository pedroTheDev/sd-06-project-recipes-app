import React from 'react';
import Header from '../components/Header';

function ReceitasFeitas(props) {
  const { location } = props;
  const { pathname } = location;
  console.log('Path', pathname);
  return (
    <main>
      <Header pageName="Receitas Feitas" renderSearch={ false } />
      ReceitasFeitas Page
    </main>
  );
}

export default ReceitasFeitas;
