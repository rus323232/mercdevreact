import React from 'react';
import { observer, inject } from 'mobx-react';
import { STORE_MODULES } from '../core/constants';

function App(props) {
  const store = props[STORE_MODULES.TASKS];

  console.log(store);

  return (
    <>
      <header>
        <h2> header </h2>
      </header>
      <main>
        <h2> main </h2>
      </main>
      <footer>
        <h2> footer </h2>
      </footer>
    </>
  );
}

export default inject(STORE_MODULES.TASKS)(observer(App));
