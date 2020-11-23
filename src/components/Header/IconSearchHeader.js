import React, { useContext } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import ContextAPI from '../../Context/ContextAPI';

const IconSearch = () => {
  const { searchComponent, setSearchComponent } = useContext(ContextAPI);
  const searchBarDisplay = () => {
    if (searchComponent === false) {
      setSearchComponent(true);
    } else {
      setSearchComponent(false);
    }
  };

  return (
    <button
      onClick={() => searchBarDisplay()}
      type="button"
    >
      <img
        data-testid="search-top-btn"
        src={searchIcon}
        alt="IconSearch"
      />
    </button>
  );
};

export default IconSearch;
