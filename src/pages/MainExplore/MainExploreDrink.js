import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function MainExploreDrink() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Bebidas"
      />
      <div className="explore-area">
        Explorar por Ingrediente/Origem/Me surpreenda
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default MainExploreDrink;
