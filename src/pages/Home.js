import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

function Home({ title }) {
  const [isSearching, setSearch] = useState(false);

  return (
    <div>
      <div>
        <Header
          setSearch={ setSearch }
          isSearching={ isSearching }
          title={ title }
        />
      </div>
      { isSearching && <SearchBar /> }
    </div>
  );
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
