import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchInput from './SearchInput';

function Header(props) {
  const [hiddenInput, setHiddenInput] = useState(false);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <button
            aria-label="profile-btn"
            type="button"
            src={profileIcon}
            data-testid="profile-top-btn"
          />
        </Link>
        <div>
          <h2 data-testid="page-title">
            {props.pageName}
          </h2>
        </div>
        <button
          aria-label="search-btn"
          type="button"
          src={searchIcon}
          data-testid="search-top-btn"
          onClick={() => setHiddenInput(!hiddenInput)}
        />
        { hiddenInput ? <SearchInput /> : null }
      </header>
    </div>
  );
}

export default Header;
