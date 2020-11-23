import React from 'react';
import { Link } from 'react-router-dom';
import searchImage from '../images/searchIcon.svg';

export default function Lupa() {
  return (
    <div>
      <Link to="/explorar">
        <img
          data-testid="search-top-btn"
          src={searchImage}
          alt="search"
        />
        </Link>
    </div>
  );
}
