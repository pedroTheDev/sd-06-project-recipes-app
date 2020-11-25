import React from 'react';
import { fireEvent } from '@testing-library/react';
import Footer from './Footer';
import renderWithRouter from '../renderWithRouter';
import { drinkIcon, mealIcon, exploreIcon } from '../images';

describe('renders footer correctly', () => {
  it('expect "drinkIcon.svg, exploreIcon.svg and mealIcon.svg" in the document', () => {
    const { getAllByRole } = renderWithRouter(<Footer />);
    const FOOTER_PICS = getAllByRole('img');
    const FOOTER_PICS_NBR = 3;
    expect(FOOTER_PICS.length).toBe(FOOTER_PICS_NBR);
    expect(FOOTER_PICS[0]).toHaveAttribute('src', `${drinkIcon}`);
    expect(FOOTER_PICS[1]).toHaveAttribute('src', `${mealIcon}`);
    expect(FOOTER_PICS[2]).toHaveAttribute('src', `${exploreIcon}`);
  });

  it('expect drink link to redirect correctly', () => {
    const { history, getByText } = renderWithRouter(<Footer />);
    const DRINK = getByText(/Drinks/i);
    expect(DRINK).toBeInTheDocument();
    fireEvent.click(DRINK);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('expect meal link to redirect correctly', () => {
    const { history, getByText } = renderWithRouter(<Footer />);
    const MEAL = getByText(/Comidas/i);
    expect(MEAL).toBeInTheDocument();
    fireEvent.click(MEAL);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('expect meal link to redirect correctly', () => {
    const { history, getByText } = renderWithRouter(<Footer />);
    const EXPLORE = getByText(/Explore/i);
    expect(EXPLORE).toBeInTheDocument();
    fireEvent.click(EXPLORE);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});
