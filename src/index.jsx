import React from 'react';
import ReactDOM from 'react-dom';
import { onPatch } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import { ThemeProvider } from 'styled-components';

import theme from './core/theme';
import App from './containers/app';
import GlobalStyles from './global-styles';
import store, { StoreProvider } from './store';
import * as serviceWorker from './serviceWorker';

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

ReactDOM.render(
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
