import React from 'react';

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
    }, []);
  return (
    <div>

      {/* map renderizando cateoria e imagem  */}
      {foods.map((food) => (
        <div key={ food.idCategory }>
          <img src={ food.strCategoryThumb } alt={ food.strCategory } />
          {food.strCategory}
        </div>
      ))}
      {/* map renderizando cateoria e imagem  */}

    </div>
  );
}
