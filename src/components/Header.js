import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Components.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Context from '../context/Context';

function Header(props) {
  const { title, search } = props;
  const [hide, setHide] = useState(true);
  const [currentFilter, setCurrentFilter] = useState();
  const { categories, recipesToRender, recipesToRenderByCategory } = useContext(Context);
  const type = title === 'Comidas' ? 'meal' : 'drink';
  // const showFilterButtons = title === 'Comidas' || title === 'Bebidas';

  const handleClick = ({ target }) => {
    if (target.value === currentFilter) {
      setCurrentFilter('');
      recipesToRender(type);
    } else {
      setCurrentFilter(target.value);
      recipesToRenderByCategory(type, target.value);
    }
  };

  const filterButtons = () => (
    categories.map(({ strCategory }, index) => {
      if (!index) {
        return (
          <>
            <button
              key="All"
              data-testid="All-category-filter"
              type="button"
              value=""
              onClick={ () => recipesToRender(type) }
            >
              All
            </button>
            <button
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              value={ strCategory }
              onClick={ (e) => handleClick(e) }
            >
              {strCategory}
            </button>
          </>
        );
      }

      return (
        <button
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          type="button"
          value={ strCategory }
          onClick={ (e) => handleClick(e) }
        >
          {strCategory}
        </button>
      );
    })
  );

  return (
    <header>
      <div className="header">
        <Link to="/perfil">
          <input
            type="image"
            src={ profileIcon }
            alt="icone do perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {
          (!search) ? <p>{' '}</p> : <input
            type="image"
            src={ searchIcon }
            alt="icone de pesquisa"
            data-testid="search-top-btn"
            onClick={ () => (hide ? setHide(false) : setHide(true)) }
          />
        }
      </div>
      {(hide === true) ? <div>{filterButtons()}</div> : <SearchBar title={ title } />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
