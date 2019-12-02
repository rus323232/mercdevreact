import React from 'react';
import ReactDOM from 'react-dom';
import { onPatch } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import { ThemeProvider } from 'styled-components';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

import routes from './routes';
import theme from './core/theme';
import GlobalStyles from './global-styles';
import store, { StoreProvider } from './store';
import * as serviceWorker from './serviceWorker';
import MainNavigation from './components/main-nav';

const switchOnDebugTools = () => {
  onPatch(store, (patch) => {
    // eslint-disable-next-line no-console
    console.log(patch);
  });
  makeInspectable(store);
};

if (process.env.NODE_ENV === 'development') {
  switchOnDebugTools();
}

const arrayOfRoutes = Object.values(routes);

const renderRoutes = arrayOfRoutes.map(({
  path,
  component: Component,
  exact = false,
  routes: subRoutes = [],
}) => (
  <Route
    key={path}
    path={path}
    exact={exact}
    routes={subRoutes}
    render={props => (
      <Component {...props} />
    )}
  />
));

ReactDOM.render(
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <MainNavigation routes={arrayOfRoutes} />
        <Switch>
          {renderRoutes}
        </Switch>
      </Router>
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
