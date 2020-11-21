import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RevenueContext from '../context/RevenueContext';
import Footer from '../components/Footer';

export default function Foods(props) {
  const { title } = props;
  const { setSearchButton, setSearch } = useContext(RevenueContext);
  //
  const { fetchFoods, foods } = useContext(RevenueContext);
  //
  useEffect(() => {
    //
    fetchFoods();
    //
    setSearchButton(false);
    return () => {
      setSearchButton(true);
      setSearch(false);
    };
  }, []);
  return (
    <div>
      <Header title={ title } />

      {/* map renderizando cateoria e imagem  */}
      {foods.map((food) => (
        <div key={ food.idCategory }>
          <img src={ food.strCategoryThumb } alt={ food.strCategory } />
          {food.strCategory}
        </div>
      ))}
      {/* map renderizando cateoria e imagem  */}

      <Footer />
    </div>
  );
}

Foods.propTypes = {
  title: PropTypes.string.isRequired,
};
