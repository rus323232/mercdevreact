import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';

import RootStore from './root-store';

const getDefaultStore = () => RootStore;

export const StoreContext = createContext({});

export function StoreProvider({ children }) {
  const store = useLocalStore(getDefaultStore);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}
