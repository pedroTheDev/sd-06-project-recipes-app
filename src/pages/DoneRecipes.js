import React from 'react';

export default function DoneRecipes() {
  return (
    <section>
      <section>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </section>
      <section>
        <img src="" data-testid="0-horizontal-image" alt="card" />
        <h4 data-testid="0-horizontal-toh4-text">Categoria</h4>
        <p data-testid="0-horizontal-name">Nome da receita</p>
        <span data-testid="0-horizontal-done-date">Data em que foi feita</span>
        <button type="button" data-testid="0-horizontal-share-btn">
          Compartilhar
        </button>
        <span data-testid="0-name-horizontal-tag"> Tag 1 </span>
        <span data-testid="0-name-horizontal-tag"> Tag 2 </span>
      </section>
    </section>

  );
}
