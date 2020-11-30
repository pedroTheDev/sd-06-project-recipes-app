import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explorar = () => (
  <div>
    <Header title="Explorar" />
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className="btn btn-block btn-lg"
          style={ { background: '#7ed95e' } }
        >
          <span>Explorar Comidas</span>
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className="btn btn-block btn-lg"
          style={ { background: '#7ed95e' } }
        >
          <span>Explorar Bebidas</span>
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export default Explorar;
