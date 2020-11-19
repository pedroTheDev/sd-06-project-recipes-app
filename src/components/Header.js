import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ pageName, renderSearch }) {
  return (
    <header>
      <img src={ profileIcon } alt="profileIcon" />
      <h2>{ pageName }</h2>
      { renderSearch===true? <img src={ searchIcon } alt="searchIcon" />:null}
    </header>
  )
}
