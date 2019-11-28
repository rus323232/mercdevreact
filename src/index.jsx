import React from 'react';
import ReactDOM from 'react-dom';
import { onPatch } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'mobx-react';

import store from './store';
import theme from './core/theme';
import App from './containers/App';
import GlobalStyles from './globalStyles';
import * as serviceWorker from './serviceWorker';

const switchOnDebugTools = () => {
  Object.values(store).forEach((storeInstance) => {
    onPatch(storeInstance, (patch) => {
      // eslint-disable-next-line no-console
      console.log(patch);
    });
    makeInspectable(storeInstance);
  });
};

if (process.env.NODE_ENV === 'development') {
  switchOnDebugTools();
}

ReactDOM.render(
  <StoreProvider {...store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
