import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function DoneRecipe() {
	const FALSE = false;
	return (
		<div>
			<Header title="Receitas Feitas" search={FALSE} />
			<Link to="/receitas-favoritas">
				<button type="button" data-testid="profile-favorite-btn">
					Receitas Favoritas
        </button>
			</Link>
			<hr></hr>
			<button
				type="button"
				data-testid="filter-by-all-btn"
			>
				Filter all
        </button>
			<hr></hr>
			<button
				type="button"
				data-testid="filter-by-food-btn"
			>
				Filter food
        </button>
			<hr></hr>
			<button
				type="button"
				data-testid="filter-by-drink-btn"
			>
				Filter Drink
        </button>



		</div>
	);
}

export default DoneRecipe;
