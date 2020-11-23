// import React, { useContext } from 'react';
// import { categoriesApi } from '../service/foodApi';
// import ReceitasContext from '../context/ReceitasContext';

// const BotoesFiltrar = () => {
//   const { filtersData, setFiltersData } = useContext(ReceitasContext);

//   function teste() {
//     categoriesApi().then((response) => {
//       setFiltersData(response);
//     });
//   }
//   teste();

//   const cinco = 5;
//   return (
//     <div>
//       {filtersData.meals
//         .filter((x, index) => index < cinco)
//         .map((cat) => (
//           <button
//             type="button"
//             key={ cat.strCategory }
//             data-testid={ `${cat.strCategory}-category-filter` }
//           >
//             {cat.strCategory}
//           </button>
//         ))}
//     </div>
//   );
// };

// export default BotoesFiltrar;
