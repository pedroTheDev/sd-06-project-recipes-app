import React from 'react';
import { Link } from 'react-router-dom';
import { drinkIcon, mealIcon, exploreIcon } from '../images';

function Footer() {
  return (
    <footer data-testid="footer" className="footerComponent">
      <nav>
        <Link to="/bebidas">
          <p src={ drinkIcon } data-testid="drinks-bottom-btn">
            Navegar para bebidas
            <img
              src={ drinkIcon }
              alt="Icone bebidas"
              height="25"
            />
          </p>
        </Link>
        <Link to="/comidas">
          <p src={ mealIcon } data-testid="food-bottom-btn">
            Navegar para comidas
            <img
              src={ mealIcon }
              alt="Icone alimentos"
              height="25"
            />
          </p>
        </Link>
        <Link to="/explorar">
          <p src={ exploreIcon } data-testid="explore-bottom-btn">
            Explorar receitas
            <img
              src={ exploreIcon }
              alt="Icone explorar"
              height="25"
            />
          </p>
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
