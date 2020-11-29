import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorePage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar"
      />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExplorePage;
