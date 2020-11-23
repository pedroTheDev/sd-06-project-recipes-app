import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const SearchBar = () => {
  const { searchComponent } = useContext(ContextAPI);
  return searchComponent && (
    <div id="search-bar">
      <input data-testid="search-input" type="text" />
    </div>
  );
};
export default SearchBar;
