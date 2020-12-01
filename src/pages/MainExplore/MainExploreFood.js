import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function MainExploreFood() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Comidas"
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

export default MainExploreFood;
