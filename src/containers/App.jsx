import React from 'react';
import { observer, inject } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { STORE_MODULES } from '../core/constants';
import theme from '../core/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <header>
        <h2> header </h2>
      </header>
      <main>
        <h2> main </h2>
      </main>
      <footer>
        <h2> footer </h2>
      </footer>
    </ThemeProvider>
  );
}

export default inject(STORE_MODULES.TASKS)(observer(App));
