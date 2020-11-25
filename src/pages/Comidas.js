import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipeContext from '../context/RecipeContext';
import CardComida from '../components/CardComida';
import FetchApiComidas, { fetchApiComidasByCategory } from '../services/FetchApiComidas';

function Comidas() {
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const {
    setRetornoApiComidas,
    retornoApiComidas,
    categoriesComida,
  } = useContext(RecipeContext);

  const zero = 0;
  const doze = 12;
  const cinco = 5;

  async function renderAll() {
    const response = await FetchApiComidas('1', '');
    setRetornoApiComidas(response);
  }

  async function renderCategory(category) {
    const response = await fetchApiComidasByCategory(category);
    setRetornoApiComidas(response);
  }

  return (
    <div>
      <Header title="Comidas" />
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ renderAll }
        >
          All
        </button>
        {categoriesComida
             && categoriesComida.slice(zero, cinco).map((category, index) => (
               <button
                 key={ index }
                 type="button"
                 data-testid={ `${category.strCategory}-category-filter` }
                 onClick={ () => {
                   if (categoriaAtual === '') {
                     renderCategory(category.strCategory);
                     setCategoriaAtual(category.strCategory);
                   }
                   if (categoriaAtual === category.strCategory) {
                     renderAll();
                     setCategoriaAtual(category.strCategory);
                   }
                   if (categoriaAtual !== category.strCategory) {
                     renderCategory(category.strCategory);
                     setCategoriaAtual(category.strCategory);
                   }
                 } }
               >
                 { category.strCategory }
               </button>
             ))}
      </div>
      {
        retornoApiComidas ? retornoApiComidas.map((comida, index) => {
          if (index < doze) {
            return CardComida(comida, index);
          }
          return undefined;
        }) // eslint-disable-next-line no-alert
          : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
      <MenuInferior />
    </div>
  );
}

export default Comidas;
