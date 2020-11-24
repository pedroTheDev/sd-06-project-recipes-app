import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Perfil from './pages/Perfil';
import ExploreBebidas from './pages/ExploreBebidas';
import ExploreComidas from './pages/ExploreComidas';
<<<<<<< HEAD
import MenuDetails from './pages/MenuDetails';
import NotFound from './pages/NotFound';
import Explore from './pages/Explore';
=======
>>>>>>> ee71e3e5ad69c61488d77d0770cff6c572605c7a
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
<<<<<<< HEAD
          <Route exact path="/explorar/comidas" component={ ExploreComidas } />
          <Route exact path="/explorar/bebidas" component={ ExploreBebidas } />
          <Route exact path="/comidas" component={ Menu } />
          <Route exact path="/bebidas" component={ Menu } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/comidas/:id" component={ MenuDetails } />
          <Route exact path="/bebidas/:id" component={ MenuDetails } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/" component={ Login } />
          <Route component={ NotFound } />
=======
          <Route exact path="/" component={Login} />
          <Route exact path="/comidas" component={Comidas} />
          <Route exact path="/bebidas" component={Bebidas} />
          <Route exact path="/explorar" component={Explore} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/explorar/comidas" component={ExploreComidas} />
          <Route exact path="/explorar/bebidas" component={ExploreBebidas} />
          <Route exact path="/receitas-feitas" component={ReceitasFeitas} />
          <Route exact path="/receitas-favoritas" component={ReceitasFavoritas} />

>>>>>>> ee71e3e5ad69c61488d77d0770cff6c572605c7a
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
