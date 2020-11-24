// import React from 'react';
// import fireEvent from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
// import { drinkIcon, mealIcon, exploreIcon } from '../images';
// import App from '../App';
// import ProfilePage from '../pages/ProfilePage/ProfilePage';

// describe.only('renders footer correctly', () => {
//   it('expect data-testid="footer" to be in the document', () => {
//     const { getByText } = renderWithRouter(<ProfilePage />);
//     const teste = getByText(/Tela de Perfil/i);
//     expect(teste).toBeInTheDocument();
//   });
// });

// it('expect "drinkIcon.svg, exploreIcon.svg and mealIcon.svg" in the document', () => {
//   const { getAllByRole } = renderWithRouter(<Footer />);
//   const FOOTER_PICS = getAllByRole('img');
//   const FOOTER_PICS_NBR = 3;
//   expect(FOOTER_PICS.length).toBe(FOOTER_PICS_NBR);
//   expect(FOOTER_PICS[0]).toHaveAttribute('src', `${drinkIcon}`);
//   expect(FOOTER_PICS[1]).toHaveAttribute('src', `${mealIcon}`);
//   expect(FOOTER_PICS[2]).toHaveAttribute('src', `${exploreIcon}`);
// });

// it('expect picture links to redirect correctly', async () => {
//   const { history, getByText } = renderWithRouter(<Footer />);
//   const DRINK = getByText(/Drinks/i);
//   expect(DRINK).toBeInTheDocument();
//   // fireEvent.click(DRINK);
//   // const { pathname } = history.location;
//   // // await waitFor(() => getByText('Página principal de Drinks'));
//   // expect(pathname).toBe('/bebidas');
// });
