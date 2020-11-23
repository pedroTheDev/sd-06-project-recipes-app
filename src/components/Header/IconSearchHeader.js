import React, { useState } from 'react';
// import '../Header/styles.css';
import searchIcon from '/home/bestcpu/Trybe/sd-06-project-recipes-app/src/images/searchIcon.svg';

const IconSearch = () => {
  const [icon, setIcon] = useState(false);

  const searchBarDisplay = () => {
    if (icon === false) {
      setIcon(true);
      document.getElementById('search-bar').style.display = 'none';
    } else {
      setIcon(false);
      document.getElementById('search-bar').style.display = 'flex';
    }
  };

  return (
    <button onClick={() => searchBarDisplay()} type="button">
      <img
        date-testid="search-top-btn"
        src={searchIcon}
        alt="IconSearch"
      />
    </button>
  );
};

export default IconSearch;
