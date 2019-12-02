import React from 'react';
import { Link } from 'react-router-dom';

import { NavList, NavListItem } from './styles';

export function MainNav({ routes = [] }) {
  return (
    <NavList>
      {routes.map(({ navTitle, path }) => (
        navTitle && (
          <NavListItem key={path}>
            <Link to={path}>{navTitle}</Link>
          </NavListItem>
        )
      ))}
    </NavList>
  );
}
