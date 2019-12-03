import styled from 'styled-components';

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  margin-bottom: 15px;
`;

export const NavListItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;
