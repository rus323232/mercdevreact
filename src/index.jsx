import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { onPatch } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './store';

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
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
